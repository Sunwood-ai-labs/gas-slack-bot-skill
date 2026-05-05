---
layout: home

hero:
  name: "GAS Slack Bot Skill"
  text: "ログイン済み Chrome を使って GAS x Slack Bot を構築する。"
  tagline: "scaffold、ブラウザ設定、デプロイ、検証までを一気通貫で進めるための Codex skill です。"
  image:
    src: /icon.svg
    alt: GAS Slack Bot Skill
  actions:
    - theme: brand
      text: はじめに
      link: /ja/guide/getting-started
    - theme: alt
      text: English Docs
      link: /
    - theme: alt
      text: GitHub
      link: https://github.com/Sunwood-ai-labs/gas-slack-bot-skill

features:
  - title: scaffold とテンプレート
    details: Apps Script、manifest、README、初期設定ファイルを含む bot repo を生成できます。
  - title: ログイン済みブラウザの再利用
    details: Google と Slack の管理 UI 操作を、既にログイン済みの Chrome で安定して進められます。
  - title: 最後までの動作確認
    details: デプロイ、Slack event 設定、実メッセージによる verification まで流れを通せます。
  - title: 派生パターンの再利用
    details: Gemini 対応やファイル添付対応向けの参照資料とテンプレートを使い回せます。
---

## 概要

`gas-slack-bot-skill` は、Google Apps Script 上で動く Slack Bot を、ログイン済み Chrome を再利用しながら構築するための実務向け skill です。

空の repo から、scaffold、ブラウザ設定、トラブルシュート、最終確認まで進めるための材料をひとまとめにしています。

ローカル保守で Python 補助処理が必要な場合は、`uv` 経由で実行する前提です。

## こんな場面向け

- Google Apps Script で軽量な Slack Bot を作りたい
- Google や Slack の設定を実ブラウザ UI で進めたい
- Codex にログイン済み Chrome プロファイルを再利用させたい

## クイックリンク

- [はじめに](/ja/guide/getting-started)
- [使い方](/ja/guide/usage)
- [事例集](/ja/guide/case-studies)
- [構成](/ja/guide/architecture)
- [トラブルシュート](/ja/guide/troubleshooting)
