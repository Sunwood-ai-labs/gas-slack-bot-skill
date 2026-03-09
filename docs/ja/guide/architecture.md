# 構成

## 実行モデル

1. ユーザーが Slack に投稿する
2. Slack Events API が Apps Script Web App にイベントを送る
3. `doPost(e)` が payload を検証して対象イベントだけ処理する
4. GAS が Slack Web API の `chat.postMessage` を呼ぶ
5. Bot が同じチャンネルまたはスレッドへ返信する

## セキュリティモデル

- 秘密情報は Apps Script `Script Properties` に保存する
- デフォルトテンプレートは payload 内の verification token を使って検証する
- 重複イベントは `CacheService` で除外する

## ブラウザ設定モデル

- Chrome は専用 user-data-dir で通常起動する
- Playwright はあとから CDP で接続する
- Google と Slack の設定作業はログイン済みブラウザで行う

