# __BOT_NAME__

Serverless Slack bot on Google Apps Script.

## Setup

1. Install dependencies with `npm install`
2. Copy `.clasp.json.example` to `.clasp.json`
3. Create or attach an Apps Script project
4. Push the files with `clasp push`
5. Set Script Properties:
   - `SLACK_BOT_TOKEN`
   - `SLACK_VERIFICATION_TOKEN`
   - `SLACK_ALLOWED_CHANNEL_ID`
   - `SLACK_TEAM_ID`
   - `SLACK_API_APP_ID`
6. Deploy as a Web App
7. Put the `/exec` URL into the Slack App Event Subscriptions or App Manifest

## Defaults

- Team ID: `__DEFAULT_ALLOWED_TEAM_ID__`
- Channel ID: `__DEFAULT_ALLOWED_CHANNEL_ID__`
