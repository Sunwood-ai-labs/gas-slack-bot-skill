# Troubleshooting

## Apps Script の UI が不安定

- Apps Script のホームではなく `https://script.new` を使う
- Monaco editor には直接まとめて貼り付ける

## Slack の Event Subscriptions が保持されない

- App Manifest に切り替える
- `settings.event_subscriptions.request_url` を設定する
- `settings.event_subscriptions.bot_events` を設定する
- Event Subscriptions ページを再読み込みして `Verified` を確認する

## Google で未確認アプリ警告が出る

- 詳細表示から意図的に続行する
- 同意を完了したあと、デプロイ結果ページに戻る

## Slack で Enter 送信できない

- 送信ボタンを明示的に使う
- Bot の返信を待つ前に、投稿がチャンネル履歴に出たことを確認する

## GitHub Pages workflow が `Setup Pages` で失敗する

- `Not Found` や、現在のプランでは GitHub Pages を利用できないというエラーが出る場合、workflow 自体の記述は正しいことが多いです。
- 特に repo が private のままで、現在の GitHub プランがその repo の Pages をサポートしていないと、この状態になります。
- `.github/workflows/deploy-docs.yml` はそのまま残し、必要になった時点で repo を public に切り替えるか、Pages 対応プランで有効化してから workflow を再実行してください。
