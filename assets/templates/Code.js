const DEFAULT_ALLOWED_CHANNEL_ID = '__DEFAULT_ALLOWED_CHANNEL_ID__';
const DEFAULT_ALLOWED_TEAM_ID = '__DEFAULT_ALLOWED_TEAM_ID__';
const EVENT_CACHE_TTL_SECONDS = 60 * 10;

function doGet() {
  return jsonOutput_({
    ok: true,
    service: '__BOT_NAME__',
    message: 'Send Slack Events API requests to this web app with POST.',
  });
}

function doPost(e) {
  try {
    const payload = parseJsonBody_(e);
    verifyPayload_(payload);

    if (payload.type === 'url_verification') {
      return jsonOutput_({ challenge: payload.challenge });
    }

    if (payload.type === 'event_callback') {
      handleEventCallback_(payload);
      return textOutput_('ok');
    }

    return textOutput_('ignored');
  } catch (error) {
    console.error('[gas-slack-bot] %s\n%s', error.message, error.stack || '');
    return jsonOutput_({
      ok: false,
      error: error.message,
    });
  }
}

function handleEventCallback_(payload) {
  if (isDuplicateEvent_(payload.event_id)) {
    return;
  }

  const event = payload.event || {};
  if (!shouldReplyToEvent_(event)) {
    return;
  }

  postReply_(event);
}

function shouldReplyToEvent_(event) {
  if (event.type !== 'message') {
    return false;
  }

  if (event.subtype) {
    return false;
  }

  if (event.bot_id || event.app_id) {
    return false;
  }

  if (!event.user || !event.channel) {
    return false;
  }

  if (event.channel !== getAllowedChannelId_()) {
    return false;
  }

  if (event.channel_type && event.channel_type !== 'channel') {
    return false;
  }

  return Boolean(normalizeText_(event.text));
}

function postReply_(event) {
  const body = {
    channel: event.channel,
    text: normalizeText_(event.text),
  };

  if (event.thread_ts) {
    body.thread_ts = event.thread_ts;
  }

  callSlackApi_('chat.postMessage', body);
}

function callSlackApi_(method, payload) {
  const token = getRequiredProperty_('SLACK_BOT_TOKEN');
  const response = UrlFetchApp.fetch('https://slack.com/api/' + method, {
    method: 'post',
    contentType: 'application/json; charset=utf-8',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  });

  const bodyText = response.getContentText();
  const body = bodyText ? JSON.parse(bodyText) : {};

  if (response.getResponseCode() !== 200 || !body.ok) {
    throw new Error('Slack API call failed: ' + method + ' ' + bodyText);
  }

  return body;
}

function verifyPayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Request body must be a JSON object.');
  }

  const verificationToken = getRequiredProperty_('SLACK_VERIFICATION_TOKEN');
  if (payload.token !== verificationToken) {
    throw new Error('Slack verification token did not match.');
  }

  const allowedTeamId = getOptionalProperty_('SLACK_TEAM_ID') || DEFAULT_ALLOWED_TEAM_ID;
  if (allowedTeamId && payload.team_id && payload.team_id !== allowedTeamId) {
    throw new Error('Unexpected Slack team_id: ' + payload.team_id);
  }

  const allowedAppId = getOptionalProperty_('SLACK_API_APP_ID');
  if (allowedAppId && payload.api_app_id && payload.api_app_id !== allowedAppId) {
    throw new Error('Unexpected Slack api_app_id: ' + payload.api_app_id);
  }
}

function parseJsonBody_(e) {
  const rawBody = e && e.postData && e.postData.contents;
  if (!rawBody) {
    throw new Error('POST body was empty.');
  }

  return JSON.parse(rawBody);
}

function isDuplicateEvent_(eventId) {
  if (!eventId) {
    return false;
  }

  const cache = CacheService.getScriptCache();
  const cacheKey = 'slack-event:' + eventId;

  if (cache.get(cacheKey)) {
    return true;
  }

  cache.put(cacheKey, '1', EVENT_CACHE_TTL_SECONDS);
  return false;
}

function getAllowedChannelId_() {
  return getOptionalProperty_('SLACK_ALLOWED_CHANNEL_ID') || DEFAULT_ALLOWED_CHANNEL_ID;
}

function getRequiredProperty_(name) {
  const value = getOptionalProperty_(name);
  if (!value) {
    throw new Error('Missing script property: ' + name);
  }

  return value;
}

function getOptionalProperty_(name) {
  return PropertiesService.getScriptProperties().getProperty(name);
}

function normalizeText_(text) {
  return String(text || '').trim();
}

function jsonOutput_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function textOutput_(value) {
  return ContentService
    .createTextOutput(String(value))
    .setMimeType(ContentService.MimeType.TEXT);
}
