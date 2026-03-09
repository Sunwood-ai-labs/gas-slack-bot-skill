# GAS Slack Bot Skill

Google Apps Script と Slack を使った Bot を、ローカルの scaffold とログイン済み Chrome を組み合わせて構築するための Codex Skill です。

このリポジトリには、次の一連の構築作業を再利用しやすい形でまとめています。

- GAS ベースの Slack Bot 用 repo を作る
- Apps Script プロジェクトを作成する
- Slack App を作成してインストールする
- Script Properties と Event Subscriptions を設定する
- Slack 上で実メッセージを送って動作確認する

Google と Slack のブラウザ操作は、[`$logged-in-google-chrome`](D:\Prj\logged-in-google-chrome-skill\SKILL.md) と組み合わせて行う前提です。Playwright で新規ブラウザを立ち上げるのではなく、CDP 接続したログイン済み Chrome を使って安全に進められます。

[English README](D:\Prj\gas-slack-bot-skill\README.md) | [Docs](D:\Prj\gas-slack-bot-skill\docs\ja\index.md)

## 含まれているもの

- [`SKILL.md`](D:\Prj\gas-slack-bot-skill\SKILL.md): Skill 本体の手順書
- [`scripts/scaffold_gas_slack_bot.ps1`](D:\Prj\gas-slack-bot-skill\scripts\scaffold_gas_slack_bot.ps1): 生成先 repo を作る PowerShell スクリプト
- [`assets/templates`](D:\Prj\gas-slack-bot-skill\assets\templates): Apps Script、Slack manifest、repo 初期ファイルのテンプレート
- [`references/end-to-end-flow.md`](D:\Prj\gas-slack-bot-skill\references\end-to-end-flow.md): 推奨の実行順序
- [`references/blockers-and-workarounds.md`](D:\Prj\gas-slack-bot-skill\references\blockers-and-workarounds.md): よくある詰まりどころと回避策

## 使いどころ

次のようなときにこの skill が向いています。

- Google Apps Script で Slack Bot を作りたい
- Google 側と Slack 側の設定までまとめて進めたい
- Apps Script や Slack App の UI を実ブラウザで操作したい
- 新規 Playwright ブラウザではなく、ログイン済み Chrome を使いたい

## クイックスタート

1. 先に [`$logged-in-google-chrome`](D:\Prj\logged-in-google-chrome-skill\SKILL.md) で専用 Chrome セッションを起動または再利用します。
2. 次のコマンドで Bot 用 repo を生成します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\scaffold_gas_slack_bot.ps1 `
  -TargetRepoPath D:\Prj\my-slack-bot `
  -BotName "Slack Parrot Bot" `
  -TeamId T0AL9FZTL72 `
  -ChannelId C0AJZQJCVTR
```

3. 生成後は [`SKILL.md`](D:\Prj\gas-slack-bot-skill\SKILL.md) の流れに沿ってセットアップします。
4. UI 操作や verification で詰まったら [`references/blockers-and-workarounds.md`](D:\Prj\gas-slack-bot-skill\references\blockers-and-workarounds.md) を確認します。

## リポジトリ構成

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

- 秘密情報は生成先 repo ではなく、Apps Script の `Script Properties` に設定する前提です。
- デフォルト実装では、Apps Script Web App 側で Slack Signing Secret 検証に必要なヘッダーを扱いづらいため、Verification Token ベースの検証を採用しています。
- Slack の署名を厳密に検証したい場合は、Cloud Run や Cloud Functions など、HTTP ヘッダーを素直に扱える実行基盤への移行を検討してください。
- `docs/` に VitePress ベースのドキュメントを含めており、`.github/workflows/deploy-docs.yml` で GitHub Pages 配信できる構成にしています。

## GitHub Pages 補足

- この repo を private のまま運用する場合、GitHub の現在のプランによっては GitHub Pages を利用できません。
- workflow はそのまま残し、公開サイトが必要になった段階で repo を public に切り替えるか、Pages 対応プランで有効化してください。
