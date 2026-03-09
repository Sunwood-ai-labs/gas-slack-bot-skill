# Architecture

## Runtime Model

1. A user posts a message in Slack.
2. Slack Events API sends the event to the Apps Script Web App.
3. `doPost(e)` validates the payload and filters supported events.
4. The GAS code calls `chat.postMessage` through Slack Web API.
5. The bot replies in the same channel or thread.

## Security Model

- secrets stay in Apps Script `Script Properties`
- the default template checks the Slack verification token in the payload
- duplicate events are filtered with `CacheService`

## Browser Setup Model

- Chrome is launched normally with a dedicated user-data-dir
- Playwright attaches later over CDP
- Google and Slack admin steps happen inside the already logged-in browser session

