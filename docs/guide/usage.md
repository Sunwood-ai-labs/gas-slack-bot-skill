# Usage

## Core Flow

- use the skill to create the target repo structure
- customize the generated `Code.js` if the bot should do more than echo
- use the logged-in browser workflow for all Google and Slack console work
- store secrets in Apps Script `Script Properties`
- prefer Slack App Manifest when Event Subscriptions become unstable

## Variant Patterns

### Gemini or file-aware bot

- start from [references/gemini-multimodal-bot.md](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md)
- use [assets/templates/slack-app-manifest.gemini.json](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/slack-app-manifest.gemini.json) instead of the simple manifest
- add Gemini properties such as `GEMINI_API_KEY` and `GEMINI_MODEL`
- test with a real file upload, not just a plain text message

### Script Properties bootstrap

- if Apps Script settings are hard to automate, temporarily run [assets/templates/script-properties-bootstrap.js](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/script-properties-bootstrap.js)
- restore the final production code after the properties are written

## Generated Files

The scaffold script produces:

- `Code.js`
- `appsscript.json`
- `package.json`
- `.clasp.json.example`
- `.gitignore`
- `README.md`
- `slack-app-manifest.json`
