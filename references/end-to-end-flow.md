# End-To-End Flow

Use this flow when you need to take a GAS x Slack bot from empty repo to live verification.

## 1. Scaffold the repo

- Create or open the target repo
- Copy the templates with `scripts/scaffold_gas_slack_bot.ps1`
- Adjust the behavior in `Code.js` if the bot should do more than echo text
- For Gemini or attachment-aware bots, also read [references/gemini-multimodal-bot.md](./gemini-multimodal-bot.md)

## 2. Start the logged-in browser

- Use [logged-in-google-chrome-skill](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill)
- Confirm the dedicated Chrome profile is running
- Attach Playwright over CDP

## 3. Build the Apps Script project

- Open `https://script.new`
- Rename the project
- Insert the generated `Code.js`
- Save the project

## 4. Build the Slack App

- Create a new Slack App from scratch
- Add `chat:write`
- Add `channels:history`
- Add `files:read` when the bot must inspect Slack file uploads
- Install the app to the target workspace
- Capture:
  - Bot User OAuth Token
  - Verification Token
  - App ID

## 5. Configure Apps Script settings

In `Project Settings`, add:

- `SLACK_BOT_TOKEN`
- `SLACK_VERIFICATION_TOKEN`
- `SLACK_ALLOWED_CHANNEL_ID`
- `SLACK_TEAM_ID`
- `SLACK_API_APP_ID`
- `GEMINI_API_KEY` when the bot calls Gemini

If the settings UI refuses to cooperate during browser automation, temporarily run [assets/templates/script-properties-bootstrap.js](./../assets/templates/script-properties-bootstrap.js) inside the Apps Script project instead of clicking through the panel.

## 6. Deploy the Web App

- Deploy type: `Web app`
- Execute as: current Google account
- Access: `Anyone`
- If Google shows the unverified warning:
  - open `Advanced`
  - continue to the app
  - finish consent

## 7. Verify the `/exec` URL directly

- Open the `/exec` URL in a browser
- Confirm `doGet()` returns the expected JSON

## 8. Configure Slack subscriptions

Prefer App Manifest for durable setup:

- open the App Manifest page
- set `settings.event_subscriptions.request_url`
- set `settings.event_subscriptions.bot_events = ["message.channels"]`
- add `file_shared` when the bot should analyze file uploads
- save
- if Slack says the URL is not verified, run its verification flow

## 9. Confirm the Slack App state

Reload the Event Subscriptions page and confirm:

- `Enable Events` is `On`
- `Request URL` is `Verified`
- `message.channels` is present

## 10. Live-test the bot

- Invite the bot to the target channel if needed
- Post a unique message
- Confirm the bot replies with the expected text
- For Gemini or attachment-aware bots, upload a real supported file and confirm the bot replies exactly once
