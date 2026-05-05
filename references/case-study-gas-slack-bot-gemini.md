# Case Study: GAS Slack Bot Gemini

This note distills the reusable lessons from the public example repository [`Sunwood-ai-labs/gas-slack-bot-gemini`](https://github.com/Sunwood-ai-labs/gas-slack-bot-gemini) and the March 10, 2026 internal build write-up captured for this skill.

## What Was Built

- A Google Apps Script Slack bot
- Gemini-backed replies for public channels
- Support for text plus selected file attachments
- End-to-end setup through Codex, logged-in Chrome, Apps Script, and Slack App configuration

## Highest-Value Lessons

### 1. Automate The Value Handoff Between Platforms

The hardest part was not code generation. The fragile part was moving values across systems:

- Apps Script Web App `/exec` URL into Slack `request_url`
- Slack Bot Token, Verification Token, App ID, and Team ID into Apps Script
- Gemini API key into Apps Script

Treat those values as first-class workflow outputs and explicitly verify each transfer.

### 2. Prefer App Manifest Over Repetitive UI Clicking

For the Gemini variant, Slack configuration was more reliable when the manifest carried:

- bot scopes including `files:read`
- event subscriptions including `message.channels` and `file_shared`
- the final `request_url`

### 3. Use A Bootstrap Function When Script Properties UI Fights Back

Temporarily writing a bootstrap function into Apps Script and executing it once was more reliable than filling the Script Properties UI row by row.

### 4. Guard Against Dual File Events

Slack can trigger both `message.channels` and `file_shared` for one upload. The example repo fixed duplicate replies by claiming file IDs with `CacheService` and `LockService` before posting.

### 5. Keep Public-Channel Noise Under Control

The more practical default was:

- require a bot mention for normal messages
- still analyze file-only uploads when intended
- ignore bot-originated events
- reply in-thread when `thread_ts` exists

## What To Reuse Next Time

- [references/gemini-multimodal-bot.md](./gemini-multimodal-bot.md) for the actionable variant checklist
- [assets/templates/slack-app-manifest.gemini.json](./../assets/templates/slack-app-manifest.gemini.json) for Slack setup
- [assets/templates/script-properties-bootstrap.js](./../assets/templates/script-properties-bootstrap.js) for one-shot property injection

## What To Verify Explicitly

- the Web App URL opens successfully before returning to Slack
- Slack Event Subscriptions show `Verified`
- the bot is invited to the correct public channel
- one real file upload results in one reply, not two
