# Architecture

## Skill の役割分担

- `SKILL.md` が全体フローを定義する
- `scripts/scaffold_gas_slack_bot.ps1` が生成先 repo を初期化する
- `assets/templates/` が再利用テンプレートを提供する
- `references/` が実運用での判断材料を補完する

## 実行モデル

- ローカルでは PowerShell で scaffold を行う
- ブラウザ操作ではログイン済み Chrome を再利用する
- 実行先は Google Apps Script Web App を前提にする
- Slack との接続確認は実チャンネル上の投稿で行う
