<div align="center">
  <h1>GAS Slack Bot Skill</h1>
  <img src="./docs/public/icon.svg" alt="GAS Slack Bot Skill" width="280">
  <p>
    <img src="https://img.shields.io/badge/Codex-Skill-4285F4" alt="Codex Skill">
    <img src="https://img.shields.io/badge/Google%20Apps%20Script-34A853?logo=googleappsscript&logoColor=white" alt="Google Apps Script">
    <img src="https://img.shields.io/badge/Slack-Bot-EA4335?logo=slack&logoColor=white" alt="Slack Bot">
    <img src="https://img.shields.io/badge/Docs-VitePress-FBBC05?logo=vitepress&logoColor=202124" alt="VitePress">
  </p>
  <p>
    <a href="./README.md">
      <img src="https://img.shields.io/badge/Language-English-4285F4" alt="English">
    </a>
    <a href="./README.ja.md">
      <img src="https://img.shields.io/badge/Language-Japanese-34A853" alt="Japanese">
    </a>
  </p>
</div>

Google Apps Script と Slack を使った Bot を、ローカルの scaffold とログイン済み Chrome を組み合わせて構築するための Codex skill です。

このリポジトリには、次の一連の構築作業を再利用しやすい形でまとめています。

- GAS ベースの Slack Bot 用 repo を作る
- Apps Script プロジェクトを作成する
- Slack App を作成してインストールする
- Script Properties と Event Subscriptions を設定する
- Slack 上で実メッセージを送って動作確認する

Google と Slack のブラウザ操作は、関連リポジトリ [`logged-in-google-chrome-skill`](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill) と組み合わせて行う前提です。Playwright で新規ブラウザを立ち上げるのではなく、CDP 接続したログイン済み Chrome を使って安全に進められます。

[English README](./README.md) | [Docs Site](https://sunwood-ai-labs.github.io/gas-slack-bot-skill/ja/)

## ローカルツール

- このリポジトリで Python 系の補助処理を実行するときは、`python` ではなく `uv run ...` を使います。
- Node.js に加えて `uv` もローカルに入れておく前提です。

## 含まれているもの

- [`SKILL.md`](./SKILL.md): skill 本体の手順書
- [`scripts/scaffold_gas_slack_bot.ps1`](./scripts/scaffold_gas_slack_bot.ps1): 生成先 repo を作る PowerShell スクリプト
- [`assets/templates`](./assets/templates): Apps Script、Slack manifest、repo 初期ファイルのテンプレート
- [`references/end-to-end-flow.md`](./references/end-to-end-flow.md): 推奨の実行順序
- [`references/blockers-and-workarounds.md`](./references/blockers-and-workarounds.md): よくある詰まりどころと回避策
- [`references/gemini-multimodal-bot.md`](./references/gemini-multimodal-bot.md): Gemini 対応や添付解析 Bot 向けの派生ガイド
- [`references/case-study-gas-slack-bot-gemini.md`](./references/case-study-gas-slack-bot-gemini.md): Gemini 事例から抽出した実践知

## 事例と派生パターン

- [`Sunwood-ai-labs/gas-slack-bot-gemini`](https://github.com/Sunwood-ai-labs/gas-slack-bot-gemini): 今回の skill 更新に反映した公開事例 repo
- [Gemini マルチモーダル派生ガイド](./references/gemini-multimodal-bot.md): 次回 Gemini やファイル添付対応 Bot を作るときの最短導線
- [Gemini 事例メモ](./references/case-study-gas-slack-bot-gemini.md): repo と構築ログから抜き出した再利用ポイント

この更新で、Gemini 向けの再利用 assets も追加しています。

- [`assets/templates/slack-app-manifest.gemini.json`](./assets/templates/slack-app-manifest.gemini.json)
- [`assets/templates/script-properties-bootstrap.js`](./assets/templates/script-properties-bootstrap.js)

## 使いどころ

次のようなときにこの skill が向いています。

- Google Apps Script で Slack Bot を作りたい
- Google 側と Slack 側の設定までまとめて進めたい
- Apps Script や Slack App の UI を実ブラウザで操作したい
- 新規 Playwright ブラウザではなく、ログイン済み Chrome を使いたい

## クイックスタート

1. 先に関連リポジトリ [`logged-in-google-chrome-skill`](https://github.com/Sunwood-ai-labs/logged-in-google-chrome-skill) を使って、専用 Chrome セッションを起動または再利用します。
2. 次のコマンドで Bot 用 repo を生成します。

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\scaffold_gas_slack_bot.ps1 `
  -TargetRepoPath D:\Prj\my-slack-bot `
  -BotName "Slack Parrot Bot" `
  -TeamId T0AL9FZTL72 `
  -ChannelId C0AJZQJCVTR
```

3. 生成後は [`SKILL.md`](./SKILL.md) の流れに沿ってセットアップします。
4. UI 操作や verification で詰まったら [`references/blockers-and-workarounds.md`](./references/blockers-and-workarounds.md) を確認します。
5. Gemini 対応やファイル解析 Bot を作る場合は、`Code.js` を広げる前に [`references/gemini-multimodal-bot.md`](./references/gemini-multimodal-bot.md) を確認します。

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
|  |- install_codex_skill_junction.ps1
|  `- scaffold_gas_slack_bot.ps1
|- references/
|  |- end-to-end-flow.md
|  |- blockers-and-workarounds.md
|  |- gemini-multimodal-bot.md
|  `- case-study-gas-slack-bot-gemini.md
`- assets/
   `- templates/
      |- Code.js
      |- appsscript.json
      |- package.json
      |- .clasp.json.example
      |- .gitignore
      |- README.md
      |- slack-app-manifest.json
      |- slack-app-manifest.gemini.json
      `- script-properties-bootstrap.js
```

## 補足

- 秘密情報は生成先 repo ではなく、Apps Script の `Script Properties` に設定する前提です。
- 今後 Python スクリプトを追加する場合も、実行は `uv run path/to/script.py` に統一します。
- デフォルト実装では、Apps Script Web App 側で Slack Signing Secret 検証に必要なヘッダーを扱いづらいため、Verification Token ベースの検証を採用しています。
- Slack の署名を厳密に検証したい場合は、Cloud Run や Cloud Functions など、HTTP ヘッダーを素直に扱える実行基盤への移行を検討してください。
- Gemini 派生の知見は別リファレンスに切り出し、skill 本体は軽いまま必要な場面だけ深掘りできる構成にしています。
- VitePress ベースの docs は `docs/` 配下にあり、`.github/workflows/deploy-docs.yml` から公開できる構成です。

## 公開リンク

- 公開リポジトリ: [Sunwood-ai-labs/gas-slack-bot-skill](https://github.com/Sunwood-ai-labs/gas-slack-bot-skill)
- docs サイト: [sunwood-ai-labs.github.io/gas-slack-bot-skill](https://sunwood-ai-labs.github.io/gas-slack-bot-skill/)
