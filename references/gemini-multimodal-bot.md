# Gemini Multimodal Bot Variant

Use this reference when the target bot should call Gemini, analyze Slack attachments, or move beyond a simple echo bot.

## What Changes From The Base Skill

- The Slack app needs `files:read` in addition to `chat:write` and `channels:history`
- Event subscriptions should include both `message.channels` and `file_shared`
- Apps Script `Script Properties` need Gemini-specific values such as `GEMINI_API_KEY`
- The runtime needs attachment routing, Gemini API calls, and duplicate-response control

## Reusable Assets In This Skill

- [assets/templates/slack-app-manifest.gemini.json](./../assets/templates/slack-app-manifest.gemini.json)
- [assets/templates/script-properties-bootstrap.js](./../assets/templates/script-properties-bootstrap.js)

## Recommended Build Order

1. Scaffold the repo with the normal PowerShell script.
2. Replace the simple manifest with the Gemini manifest template.
3. Extend `Code.js` for:
   - `url_verification`
   - `event_callback`
   - `message.channels`
   - `file_shared`
4. Add the required `Script Properties`.
5. Deploy the Apps Script Web App and wire the `/exec` URL into the manifest.
6. Install the Slack app, invite the bot, and test with both text and a real file attachment.

## Script Properties

Minimum Slack and Gemini properties:

- `SLACK_BOT_TOKEN`
- `SLACK_VERIFICATION_TOKEN`
- `SLACK_TEAM_ID`
- `SLACK_API_APP_ID`
- `GEMINI_API_KEY`

Common useful optional properties:

- `SLACK_ALLOWED_CHANNEL_ID`
- `SLACK_REQUIRE_MENTION`
- `GEMINI_MODEL`
- `GEMINI_MAX_ATTACHMENTS`
- `GEMINI_MAX_MEDIA_FILE_BYTES`
- `GEMINI_MAX_TEXT_FILE_BYTES`
- `GEMINI_MAX_TEXT_FILE_CHARS`

## Attachment Handling Pattern

- Route binary-style files such as images, PDFs, audio, and video through Gemini Files API
- Route text-like files through direct text extraction and prompt inlining
- Skip unsupported Office binaries unless you add a separate conversion path

## Script Properties Bootstrap Pattern

If the Apps Script `Script Properties` UI becomes unreliable during browser automation:

1. Temporarily insert [assets/templates/script-properties-bootstrap.js](./../assets/templates/script-properties-bootstrap.js) into the Apps Script project.
2. Replace the placeholders with the current secrets and identifiers.
3. Run the bootstrap function once.
4. Restore the production `Code.js`.

This is often more reliable than fighting the settings panel through UI clicks.

## Duplicate Reply Guard

Gemini and file-aware bots often receive both:

- a `message.channels` event
- a `file_shared` event

for the same uploaded file. Claim file processing once with `CacheService` and `LockService` before generating a reply, or the bot may answer twice.

## Live Verification Checklist

- Confirm the deployed `/exec` URL responds via `doGet()`
- Confirm Slack Event Subscriptions show `Verified`
- Send a plain text mention and confirm a reply
- Upload a supported file and confirm exactly one reply is posted
