# はじめに

## 前提条件

- Codex がローカル workspace を扱えること
- Codex 環境で [`logged-in-google-chrome-skill`](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill) を使えること
- Google Apps Script と Slack の設定対象ワークスペースにアクセスできること

## 最初にやること

1. `logged-in-google-chrome` を使って、ログイン済み Chrome セッションを立ち上げます。
2. [`scripts/scaffold_gas_slack_bot.ps1`](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/scripts/scaffold_gas_slack_bot.ps1) で生成先 repo を作ります。
3. [`SKILL.md`](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/SKILL.md) に沿って Google 側と Slack 側の設定を進めます。
4. 実際に Slack へメッセージを送って Bot の応答を確認します。
