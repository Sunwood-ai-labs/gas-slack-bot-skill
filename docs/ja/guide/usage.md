# 使い方

## 基本フロー

- skill を使って生成先 repo を作る
- Bot の挙動がオウム返し以外なら `Code.js` を調整する
- Google と Slack の設定はログイン済みブラウザ上で行う
- 秘密情報は Apps Script の `Script Properties` に保存する
- Event Subscriptions が不安定なら App Manifest に切り替える

## 生成されるファイル

scaffold script で主に次を生成します。

- `Code.js`
- `appsscript.json`
- `package.json`
- `.clasp.json.example`
- `.gitignore`
- `README.md`
- `slack-app-manifest.json`

