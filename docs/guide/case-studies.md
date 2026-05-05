# Case Studies

## Gemini Multimodal Slack Bot

The strongest current example for this skill is the public repository [`Sunwood-ai-labs/gas-slack-bot-gemini`](https://github.com/Sunwood-ai-labs/gas-slack-bot-gemini).

It extends the base skill in four useful ways:

- routes Slack attachments into Gemini
- adds `files:read` and `file_shared` to the Slack setup
- uses a one-shot Script Properties bootstrap when the Apps Script UI is stubborn
- prevents duplicate replies caused by both `message.channels` and `file_shared`

## Fastest Reuse Path

1. Scaffold the repo with the normal PowerShell script.
2. Read [references/gemini-multimodal-bot.md](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md).
3. Start from [assets/templates/slack-app-manifest.gemini.json](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/slack-app-manifest.gemini.json).
4. Use [assets/templates/script-properties-bootstrap.js](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/script-properties-bootstrap.js) if Script Properties automation stalls.
5. Verify once with text and once with a real file upload.

## Extracted Lessons

- The cross-platform value handoff matters more than the first code draft.
- App Manifest is more durable than manually reproducing the same Slack settings.
- A live file-upload test catches issues that a plain text echo test will miss.
- The core skill should stay lean, so Gemini-specific details live in references and templates instead of the main `SKILL.md`.

## Related References

- [Gemini Multimodal Bot Variant](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md)
- [Gemini Case Study Notes](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/case-study-gas-slack-bot-gemini.md)
