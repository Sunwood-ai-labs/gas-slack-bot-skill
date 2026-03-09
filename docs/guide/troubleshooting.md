# Troubleshooting

## Apps Script UI Is Unstable

- use `https://script.new` instead of the Apps Script home page
- update Monaco directly instead of typing line by line

## Slack Event Subscriptions Do Not Stick

- switch to App Manifest
- set `settings.event_subscriptions.request_url`
- set `settings.event_subscriptions.bot_events`
- reload the Event Subscriptions page and confirm `Verified`

## Google Shows The Unverified App Warning

- use the advanced path and continue intentionally
- finish consent, then return to the deploy result page

## Slack Does Not Send On Enter

- use the send button explicitly
- confirm the message appears in channel history before waiting for the bot reply

