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

## GitHub Pages Fails At `Setup Pages`

- If the workflow fails with `Not Found` or a message that the current plan does not support GitHub Pages, the workflow itself is usually correct.
- This commonly happens when the repository is private and the current GitHub plan does not allow Pages for that repository.
- Keep `.github/workflows/deploy-docs.yml` committed, then switch the repository to public visibility or enable Pages on a supported plan before rerunning the workflow.
