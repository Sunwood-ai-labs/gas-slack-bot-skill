# はじめに

## 前提

- 専用 Chrome プロファイルで Google にログイン済みであること
- 同じ Chrome プロファイルで Slack にログイン済みであること
- ローカルに Node.js があること
- Apps Script と Slack App を作成できる権限があること

## 最初の流れ

1. `$logged-in-google-chrome` で専用 Chrome を起動または再利用します。
2. `scripts/scaffold_gas_slack_bot.ps1` で生成先 Bot repo を作成します。
3. CDP で Playwright を接続します。
4. Apps Script プロジェクトを作って `Code.js` を投入します。
5. Slack App を作成してインストールします。
6. Web App をデプロイして `/exec` URL を Slack に設定します。
7. Bot を対象チャンネルに招待して実メッセージで確認します。

