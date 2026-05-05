# 事例集

## Gemini マルチモーダル Slack Bot

現時点でこの skill に一番効く公開事例は [`Sunwood-ai-labs/gas-slack-bot-gemini`](https://github.com/Sunwood-ai-labs/gas-slack-bot-gemini) です。

この事例では、ベース skill に対して主に次の 4 点が拡張されました。

- Slack 添付ファイルを Gemini に渡す
- Slack 設定に `files:read` と `file_shared` を追加する
- Apps Script の UI が不安定なときに一時 bootstrap 関数で Script Properties を入れる
- `message.channels` と `file_shared` の二重到達で返信が重複しないようにする

## 次回の最短導線

1. いつも通り PowerShell script で repo を scaffold します。
2. [references/gemini-multimodal-bot.md](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md) を読みます。
3. [assets/templates/slack-app-manifest.gemini.json](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/slack-app-manifest.gemini.json) を起点にします。
4. Script Properties の自動化が詰まったら [assets/templates/script-properties-bootstrap.js](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/assets/templates/script-properties-bootstrap.js) を一時利用します。
5. 最後にテキスト投稿と実ファイル添付の両方で検証します。

## 抽出した学び

- 最初のコード生成より、プラットフォーム間の値の受け渡しを確実にする方が重要です。
- Slack の設定は、同じ内容を UI で繰り返すより App Manifest に寄せた方が安定します。
- テキストだけの確認では見えない不具合があるので、実ファイル添付の live test が必要です。
- skill 本体は軽く保ち、Gemini 固有の知見は references と templates に分離した方が再利用しやすいです。

## 関連リファレンス

- [Gemini マルチモーダル派生ガイド](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/gemini-multimodal-bot.md)
- [Gemini 事例メモ](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill/blob/main/references/case-study-gas-slack-bot-gemini.md)
