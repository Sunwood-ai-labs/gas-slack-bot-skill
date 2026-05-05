---
name: gas-slack-bot
description: Create and configure a Google Apps Script x Slack Events API bot while relying on an already logged-in Chrome session attached over CDP via $logged-in-google-chrome. Use when Codex needs to scaffold a GAS Slack bot repo, create the Apps Script project, create and install the Slack app, set script properties, verify the request URL, and confirm the bot replies in a Slack channel.
---

# GAS Slack Bot Skill

Build a serverless Slack bot on Google Apps Script and finish the Google and Slack console setup through a logged-in Chrome session.

When Python is needed for helper scripts or local maintenance, run it through `uv` such as `uv run path/to/script.py`.

## Use This Skill When

- The user wants a Slack bot built on Google Apps Script
- The task includes Google-side setup in Apps Script
- The task includes Slack App creation, scopes, event subscriptions, or installation
- The workflow should reuse an already logged-in Google or Slack session

Always use [logged-in-google-chrome-skill](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill) first for the browser session.

## Default Outcome

Produce:

- a target bot repo with `Code.js`, `appsscript.json`, `package.json`, `.clasp.json.example`, `.env.example`, `.gitignore`, and optional `README.md`
- a deployed Apps Script Web App URL
- a Slack App installed to the target workspace
- verified `Event Subscriptions` with `message.channels`
- a final live test in the target Slack channel

## Quick Start

1. Scaffold the target repo with [scripts/scaffold_gas_slack_bot.ps1](./scripts/scaffold_gas_slack_bot.ps1).
2. Copy `.env.example` to `.env` in the target repo before browser work starts.
3. Launch or reuse the dedicated Chrome profile with [logged-in-google-chrome-skill](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill).
4. Attach Playwright over CDP in `js_repl`.
5. Create or open the Apps Script project and populate the GAS code.
6. Create the Slack App, add scopes, and install it.
7. Set Apps Script `Script Properties`.
8. Deploy the GAS project as a Web App.
9. Prefer Slack `App Manifest` to lock in `request_url` and `message.channels`.
10. Invite the bot to the target channel and confirm a live echo reply.

## Scaffold The Target Repo

Use the scaffold script when starting from an empty or near-empty repo:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\scaffold_gas_slack_bot.ps1 `
  -TargetRepoPath D:\Prj\my-slack-bot `
  -BotName "Slack Parrot Bot" `
  -TeamId T0AL9FZTL72 `
  -ChannelId C0AJZQJCVTR
```

The script copies templates from `assets/templates/` and replaces placeholders. After scaffold, copy `.env.example` to `.env` and keep filling it as soon as you create or discover environment-specific values.

## Browser Workflow

After using `$logged-in-google-chrome`, attach with `playwright-core` or `playwright` from the current workspace:

```javascript
var chromium;
var browser;
var context;
var page;

{
  const nm = await import("node:module");
  const requireForPw = nm.createRequire("file:///D:/Prj/some-workspace/package.json");
  ({ chromium } = requireForPw("playwright-core"));

  browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  context = browser.contexts()[0];
  page = context.pages()[0];
}
```

Keep the same attached browser alive across the whole setup.

## Workflow Details

### 1. Build the local repo first

- Scaffold the repo or patch the existing files to the desired behavior
- Keep secrets out of the repo
- Use `Script Properties` for tokens and environment-specific values
- Copy `.env.example` to `.env` right away and treat it as the durable run log for the target environment
- Record unique values in `.env` as soon as they are created or discovered, including Slack IDs, tokens, Apps Script IDs, deployment IDs, and the final Web App URL
- Keep `.env` ignored by git and keep `.env.example` sanitized with placeholders only

Templates live in:

- [assets/templates/Code.js](./assets/templates/Code.js)
- [assets/templates/appsscript.json](./assets/templates/appsscript.json)
- [assets/templates/.env.example](./assets/templates/.env.example)
- [assets/templates/package.json](./assets/templates/package.json)
- [assets/templates/slack-app-manifest.json](./assets/templates/slack-app-manifest.json)
- [assets/templates/slack-app-manifest.gemini.json](./assets/templates/slack-app-manifest.gemini.json)
- [assets/templates/script-properties-bootstrap.js](./assets/templates/script-properties-bootstrap.js)

### 2. Create the Apps Script project

- Prefer `https://script.new` over the Apps Script home screen if the home UI is flaky
- Rename the project early
- If the editor is Monaco, prefer updating the model directly over unreliable clicks
- Save before opening `Project Settings`

### 3. Create the Slack App

- Create the app from scratch unless an existing app is clearly intended
- Add at least:
  - `chat:write`
  - `channels:history`
- Install the app to the target workspace before trying to use the token
- Write the Slack app metadata back into `.env`, especially `SLACK_TEAM_ID`, `SLACK_ALLOWED_CHANNEL_ID`, `SLACK_API_APP_ID`, optional `SLACK_CLIENT_ID`, and any tokens revealed during setup

### 4. Set `Script Properties`

Minimum properties:

- `SLACK_BOT_TOKEN`
- `SLACK_VERIFICATION_TOKEN`
- `SLACK_ALLOWED_CHANNEL_ID`
- `SLACK_TEAM_ID`
- `SLACK_API_APP_ID`

Source these values from `.env` when possible, and if setup reveals a missing value during this step, add it to `.env` before moving on.

### 5. Deploy Apps Script

- Deploy as `Web app`
- Execute as the current Google account
- Set access to `Anyone` for Slack event delivery
- Capture the script ID, deployment ID, and `/exec` URL in `.env`, then verify `doGet()` works before returning to Slack

### 6. Configure Slack events

Prefer the App Manifest for the final durable configuration. Use the template in [assets/templates/slack-app-manifest.json](./assets/templates/slack-app-manifest.json) and set:

- `settings.event_subscriptions.request_url`
- `settings.event_subscriptions.bot_events = ["message.channels"]`

If Slack reports the URL as unverified, trigger the built-in verification flow and re-check the Event Subscriptions page until it shows:

- `Enable Events: On`
- `Request URL Verified`
- `message.channels`

### 7. Final verification

- Invite the bot to the target channel if it is not already present
- Post a unique test message
- Confirm the same text comes back from the bot

## Default Implementation Notes

- The template uses verification-token payload checking because Apps Script Web Apps do not expose Slack signature headers in a usable way
- Deduplicate by `event_id` with `CacheService`
- Ignore bot messages and subtype events
- Keep replies in-thread when `thread_ts` exists

## When To Read References

- Read [references/end-to-end-flow.md](./references/end-to-end-flow.md) when you need the full setup order and rationale
- Read [references/blockers-and-workarounds.md](./references/blockers-and-workarounds.md) when UI automation or verification gets stuck
- Read [references/gemini-multimodal-bot.md](./references/gemini-multimodal-bot.md) when the bot should call Gemini or process Slack file attachments
- Read [references/case-study-gas-slack-bot-gemini.md](./references/case-study-gas-slack-bot-gemini.md) when you want the concrete lessons extracted from the `gas-slack-bot-gemini` build

## Variant Notes

- Keep the default template lean for simple echo or command bots
- When the bot must analyze attachments or call Gemini:
  - start from [references/gemini-multimodal-bot.md](./references/gemini-multimodal-bot.md)
  - reuse [assets/templates/slack-app-manifest.gemini.json](./assets/templates/slack-app-manifest.gemini.json) for `files:read` and `file_shared`
  - if the Apps Script `Script Properties` UI blocks automation, temporarily insert and run [assets/templates/script-properties-bootstrap.js](./assets/templates/script-properties-bootstrap.js), then restore the final production code
- When file events can arrive through both `message.channels` and `file_shared`, claim the file response once with `CacheService` plus `LockService` before posting a reply

## Guardrails

- Do not store secrets in the repo
- Do not commit `.env`; only track `.env.example`
- Do not assume Slack UI changes are stable; verify after reload
- Do not trust visual input alone; confirm values persist after save or reload
- Do not invoke Python directly; use `uv run` for Python-based helpers
- If Slack UI becomes unreliable, switch to App Manifest instead of fighting the page
- If Google shows the unverified app warning during first deploy, handle that approval flow deliberately and continue
