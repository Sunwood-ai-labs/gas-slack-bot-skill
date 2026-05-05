# Troubleshooting

## Apps Script UI Is Unstable

- use `https://script.new` instead of the Apps Script home page
- update Monaco directly instead of typing line by line

## Slack Event Subscriptions Do Not Stick

- switch to App Manifest
- set `settings.event_subscriptions.request_url`
- set `settings.event_subscriptions.bot_events`
- reload the Event Subscriptions page and confirm `Verified`

## Apps Script Script Properties UI Fights Back

- stop retrying the settings panel indefinitely
- temporarily use [assets/templates/script-properties-bootstrap.js](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/script-properties-bootstrap.js)
- run it once, confirm the properties exist, then restore the final code

## Google Shows The Unverified App Warning

- use the advanced path and continue intentionally
- finish consent, then return to the deploy result page

## Slack Does Not Send On Enter

- use the send button explicitly
- confirm the message appears in channel history before waiting for the bot reply

## File Upload Triggers Two Replies

- if the bot watches both `message.channels` and `file_shared`, one upload can arrive twice
- claim file processing once with `CacheService` and `LockService`
- verify with a live file upload after each change

## GitHub Pages Fails At `Setup Pages`

- If the workflow fails with `Not Found` or a message that the current plan does not support GitHub Pages, the workflow itself is usually correct.
- This commonly happens when the repository is private and the current GitHub plan does not allow Pages for that repository.
- Keep `.github/workflows/deploy-docs.yml` committed, then switch the repository to public visibility or enable Pages on a supported plan before rerunning the workflow.
