# GAS Slack Bot Skill

Google Apps Script と Slack を組み合わせた Bot を、Codex とログイン済み Chrome を使ってセットアップするための Skill です。

## このリポジトリでできること

- GAS x Slack Bot 用の Codex Skill を再利用できる
- 生成先 Bot repo のひな形をすぐに作れる
- Google と Slack の管理画面設定をログイン済みセッションで安全に進められる
- 実運用で詰まりやすい箇所と回避策を参照できる

## 推奨フロー

1. 先に [`$logged-in-google-chrome`](D:\Prj\logged-in-google-chrome-skill\SKILL.md) を使います。
2. この repo の scaffold script で生成先 Bot repo を作ります。
3. Apps Script、Slack App、デプロイ、最終確認までガイドに沿って進めます。

## ガイド

- [はじめに](./guide/getting-started.md)
- [使い方](./guide/usage.md)
- [構成](./guide/architecture.md)
- [トラブルシュート](./guide/troubleshooting.md)

