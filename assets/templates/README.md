# __BOT_NAME__

Serverless Slack bot on Google Apps Script.

## What This Repo Contains

- `Code.js`: the default Slack Events API handler and reply logic
- `appsscript.json`: the Apps Script manifest
- `.env.example`: the checklist for local-only environment values and created IDs
- `.clasp.json.example`: a safe starter config for local `clasp` usage
- `slack-app-manifest.json`: a manifest template for wiring the Slack App

## Quick Start

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and keep it updated as you create or discover environment-specific values.
3. Copy `.clasp.json.example` to `.clasp.json`.
4. Create or attach an Apps Script project.
5. Push the files with `npx clasp push`.
6. Set the required Script Properties from `.env`:
   - `SLACK_BOT_TOKEN`
   - `SLACK_VERIFICATION_TOKEN`
   - `SLACK_ALLOWED_CHANNEL_ID`
   - `SLACK_TEAM_ID`
   - `SLACK_API_APP_ID`
7. Record the Apps Script IDs and deployed `/exec` URL in `.env`.
8. Put the `/exec` URL into the Slack App Event Subscriptions or App Manifest.

## Local Workflow

- Use `npx clasp login` if you have not authenticated locally yet.
- Use `npx clasp push` after editing `Code.js` or `appsscript.json`.
- Use `npx clasp open` to jump to the Apps Script editor.
- Keep secrets out of this repository, store runtime values in Apps Script `Script Properties`, and mirror the local source-of-truth values in `.env`.
- Keep `.env` ignored by git and only commit `.env.example`.

## Defaults

- Team ID: `__DEFAULT_ALLOWED_TEAM_ID__`
- Channel ID: `__DEFAULT_ALLOWED_CHANNEL_ID__`
