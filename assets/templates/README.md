# __BOT_NAME__

Serverless Slack bot on Google Apps Script.

## What This Repo Contains

- `Code.js`: the default Slack Events API handler and reply logic
- `appsscript.json`: the Apps Script manifest
- `.clasp.json.example`: a safe starter config for local `clasp` usage
- `slack-app-manifest.json`: a manifest template for wiring the Slack App

## Quick Start

1. Install dependencies with `npm install`.
2. Copy `.clasp.json.example` to `.clasp.json`.
3. Create or attach an Apps Script project.
4. Push the files with `npx clasp push`.
5. Set the required Script Properties:
   - `SLACK_BOT_TOKEN`
   - `SLACK_VERIFICATION_TOKEN`
   - `SLACK_ALLOWED_CHANNEL_ID`
   - `SLACK_TEAM_ID`
   - `SLACK_API_APP_ID`
6. Deploy as a Web App.
7. Put the `/exec` URL into the Slack App Event Subscriptions or App Manifest.

## Local Workflow

- Use `npx clasp login` if you have not authenticated locally yet.
- Use `npx clasp push` after editing `Code.js` or `appsscript.json`.
- Use `npx clasp open` to jump to the Apps Script editor.
- Keep secrets out of this repository and store them in Apps Script `Script Properties`.

## Defaults

- Team ID: `__DEFAULT_ALLOWED_TEAM_ID__`
- Channel ID: `__DEFAULT_ALLOWED_CHANNEL_ID__`
