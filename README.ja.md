# GAS Slack Bot Skill

Google Apps Script と Slack を使った Bot を、ローカルの scaffold とログイン済み Chrome を組み合わせて構築するための Codex Skill です。

このリポジトリには、次の一連の作業を再利用できる形でまとめています。

- GAS ベースの Slack Bot リポジトリを作る
- Apps Script プロジェクトを作る
- Slack App を作成してインストールする
- Script Properties と Event Subscriptions を設定する
- Slack 上で実際に Bot が返信するところまで確認する

Google と Slack の管理画面操作は、[`$logged-in-google-chrome`](D:\Prj\logged-in-google-chrome-skill\SKILL.md) を前提にしています。Playwright で新規ブラウザを立ち上げるのではなく、ログイン済み Chrome に CDP 接続してセットアップを進める想定です。

[English README](D:\Prj\gas-slack-bot-skill\README.md) | [Docs](D:\Prj\gas-slack-bot-skill\docs\ja\index.md)

## 含まれているもの

- [SKILL.md](D:\Prj\gas-slack-bot-skill\SKILL.md): Skill 本体の手順
- [scripts/scaffold_gas_slack_bot.ps1](D:\Prj\gas-slack-bot-skill\scripts\scaffold_gas_slack_bot.ps1): 生成先 repo のひな形を作る PowerShell スクリプト
- [assets/templates](D:\Prj\gas-slack-bot-skill\assets\templates): Apps Script、Slack manifest、repo 初期ファイルのテンプレート群
- [references/end-to-end-flow.md](D:\Prj\gas-slack-bot-skill\references\end-to-end-flow.md): 最短の実行フロー
- [references/blockers-and-workarounds.md](D:\Prj\gas-slack-bot-skill\references\blockers-and-workarounds.md): 詰まりやすい箇所と回避策

## 使いどころ

この Skill は、次のような依頼に向いています。

- Google Apps Script で Slack Bot を作りたい
- Google 側と Slack 側の設定までまとめて終わらせたい
- Apps Script や Slack App の管理画面を実ブラウザで操作したい
- ログイン済み Chrome セッションを再利用して安全にセットアップしたい

## クイックスタート

1. 先に [`$logged-in-google-chrome`](D:\Prj\logged-in-google-chrome-skill\SKILL.md) で専用 Chrome を起動または再利用します。
2. 必要な Bot repo を次のコマンドで生成します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\scaffold_gas_slack_bot.ps1 `
  -TargetRepoPath D:\Prj\my-slack-bot `
  -BotName "Slack Parrot Bot" `
  -TeamId T0AL9FZTL72 `
  -ChannelId C0AJZQJCVTR
```

3. その後の詳細な流れは [SKILL.md](D:\Prj\gas-slack-bot-skill\SKILL.md) に従います。
4. 途中で UI 操作や verification に詰まったら [references/blockers-and-workarounds.md](D:\Prj\gas-slack-bot-skill\references\blockers-and-workarounds.md) を見ます。

## ディレクトリ構成

```text
gas-slack-bot-skill/
|- SKILL.md
|- LICENSE
|- README.md
|- README.ja.md
|- docs/
|- agents/
|  `- openai.yaml
|- scripts/
|  `- scaffold_gas_slack_bot.ps1
|- references/
|  |- end-to-end-flow.md
|  `- blockers-and-workarounds.md
`- assets/
   `- templates/
      |- Code.js
      |- appsscript.json
      |- package.json
      |- .clasp.json.example
      |- .gitignore
      |- README.md
      `- slack-app-manifest.json
```

## 補足

- 秘密情報は生成先 repo に入れず、Apps Script の `Script Properties` に設定する前提です。
- デフォルト実装では、Apps Script Web App の制約により Slack Signing Secret のヘッダー検証ではなく、Verification Token ベースの検証を使っています。
- Slack の署名ヘッダーを厳密に検証したい場合は、Cloud Run や Cloud Functions など、HTTP ヘッダーを直接扱える実行環境への移行が向いています。
- `docs/` に VitePress ベースのドキュメントを含めており、`.github/workflows/deploy-docs.yml` で GitHub Pages 配信できる構成にしています。
