---
layout: home

hero:
  name: "GAS Slack Bot Skill"
  text: "Build Google Apps Script x Slack bots with a logged-in Chrome workflow."
  tagline: "A Codex skill for scaffolding, browser-driven setup, deployment, and verification."
  image:
    src: /icon.svg
    alt: GAS Slack Bot Skill
  actions:
    - theme: brand
      text: Getting Started
      link: /guide/getting-started
    - theme: alt
      text: Japanese Docs
      link: /ja/
    - theme: alt
      text: GitHub
      link: https://github.com/Sunwood-ai-labs/gas-slack-bot-skill

features:
  - title: Scaffold and Templates
    details: Generate a bot repo with Apps Script, manifest, README, and bootstrap templates ready to customize.
  - title: Logged-in Browser Setup
    details: Reuse a Chrome session that is already signed in, so Google and Slack admin work can happen without fragile fresh-browser logins.
  - title: End-to-End Verification
    details: Carry the flow through deployment, Slack event wiring, and a real message-based verification step.
---

## Overview

`gas-slack-bot-skill` is a practical skill for building a working Slack bot on Google Apps Script while reusing a logged-in Chrome session for the browser steps.

It packages the scaffolding, browser workflow, and troubleshooting notes needed to go from an empty repo to a verified bot.

## Ideal For

- users who want to build a lightweight Slack bot on Google Apps Script
- flows that need real browser UI work inside Google and Slack
- setups where Codex should reuse an already logged-in Chrome profile

## Quick Links

- [Getting Started](/guide/getting-started)
- [Usage](/guide/usage)
- [Architecture](/guide/architecture)
- [Troubleshooting](/guide/troubleshooting)
