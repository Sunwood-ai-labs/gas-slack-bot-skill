import { defineConfig } from "vitepress";

export default defineConfig({
  title: "GAS Slack Bot Skill",
  description: "Codex skill for building and configuring Google Apps Script x Slack bots with logged-in Chrome.",
  base: "/gas-slack-bot-skill/",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "日本語", link: "/ja/" },
      { text: "GitHub", link: "https://github.com/Sunwood-ai-labs/gas-slack-bot-skill" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Usage", link: "/guide/usage" },
            { text: "Architecture", link: "/guide/architecture" },
            { text: "Troubleshooting", link: "/guide/troubleshooting" }
          ]
        }
      ],
      "/ja/guide/": [
        {
          text: "ガイド",
          items: [
            { text: "はじめに", link: "/ja/guide/getting-started" },
            { text: "使い方", link: "/ja/guide/usage" },
            { text: "構成", link: "/ja/guide/architecture" },
            { text: "トラブルシュート", link: "/ja/guide/troubleshooting" }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Sunwood-ai-labs/gas-slack-bot-skill" }
    ]
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/guide/getting-started" },
          { text: "日本語", link: "/ja/" },
          { text: "GitHub", link: "https://github.com/Sunwood-ai-labs/gas-slack-bot-skill" }
        ]
      }
    },
    ja: {
      label: "日本語",
      lang: "ja",
      link: "/ja/",
      themeConfig: {
        nav: [
          { text: "ガイド", link: "/ja/guide/getting-started" },
          { text: "English", link: "/" },
          { text: "GitHub", link: "https://github.com/Sunwood-ai-labs/gas-slack-bot-skill" }
        ]
      }
    }
  }
});

