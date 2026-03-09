# Blockers And Workarounds

This file captures the failure modes that were most likely to stall the setup.

## Apps Script home screen is flaky

Symptom:

- `New project` is visible but Playwright click fails or never transitions

Workaround:

- Open `https://script.new` directly

## Monaco editor resists normal text input

Symptom:

- Playwright finds the textarea but another editor layer intercepts pointer events

Workaround:

- Update the Monaco model directly instead of typing line by line

## Script Properties buttons look clickable but clicks fail

Symptom:

- Button exists, but a side panel or overlay steals pointer events

Workaround:

- Enumerate only visible inputs
- Click the button through DOM evaluation if needed
- Confirm the number of property rows increases before filling values

## Google blocks the first deploy with an unverified app warning

Symptom:

- `Google hasn't verified this app`

Workaround:

- Open `Advanced`
- Continue to the app anyway
- Finish the consent flow

## Slack Event Subscriptions do not persist

Symptom:

- Request URL appears filled in
- Save stays disabled or changes vanish after reload

Workaround:

- Stop fighting the Event Subscriptions UI
- Move to `App Manifest`
- Save `request_url` and `bot_events` there
- Verify again from the Event Subscriptions page

## Slack event picker is hard to click

Symptom:

- The `message.channels` option appears but locator click does not land

Workaround:

- Try keyboard navigation first
- If still unstable, use App Manifest for the final event declaration

## Slack send behavior is not consistent

Symptom:

- `Enter` inserts a newline instead of sending

Workaround:

- Use the send button explicitly
- Verify by checking the message appears in history, not just in the composer

## A value looks saved but is not really committed

Symptom:

- The page visually shows the value, but the app state reverts after reload

Workaround:

- Always reload the relevant page and confirm the value persists
- Treat `Verified`, visible saved rows, and post-reload state as the real source of truth
