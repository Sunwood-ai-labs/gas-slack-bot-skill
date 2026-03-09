# トラブルシュート

## Apps Script の UI が不安定

- Apps Script のホームを使わず `https://script.new` を使う
- Monaco editor には直接値を流し込む

## Slack の Event Subscriptions が保存されない

- App Manifest に切り替える
- `settings.event_subscriptions.request_url` を入れる
- `settings.event_subscriptions.bot_events` を入れる
- Event Subscriptions ページを再読込して `Verified` を確認する

## Google の未検証アプリ警告が出る

- 詳細経由で意図的に続行する
- 同意を完了してからデプロイ結果ページへ戻る

## Slack で Enter が送信にならない

- 送信ボタンを明示的に押す
- Bot の返信待ちの前に、自分の投稿が履歴に出ていることを確認する

