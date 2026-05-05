# Usage

## 標準フロー

1. scaffold script で Apps Script 向けの repo 一式を生成する
2. Apps Script プロジェクトを作成してコードを投入する
3. Slack App を作成し、権限と Event Subscriptions を設定する
4. Apps Script の Script Properties に必要な値を入れる
5. Web App をデプロイして Slack から疎通確認する

## 派生パターン

### Gemini やファイル添付対応 Bot

- [references/gemini-multimodal-bot.md](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md) から始める
- 単純版 manifest ではなく [assets/templates/slack-app-manifest.gemini.json](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/slack-app-manifest.gemini.json) を使う
- `GEMINI_API_KEY` や `GEMINI_MODEL` などの Script Properties を追加する
- テキスト投稿だけでなく、実際のファイル添付でも検証する

### Script Properties bootstrap

- Apps Script の設定 UI が自動化しづらい場合は、[assets/templates/script-properties-bootstrap.js](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/script-properties-bootstrap.js) を一時的に実行する
- 値を書き込んだら本番用のコードへ戻す

## 生成物

- `Code.js`
- `appsscript.json`
- `README.md`
- `package.json`
- `.clasp.json.example`
- `slack-app-manifest.json`
