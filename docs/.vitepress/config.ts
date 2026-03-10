import { defineConfig } from "vitepress";

const siteTitle = "GAS Slack Bot Skill";
const siteDescription =
  "Codex skill for building and configuring Google Apps Script x Slack bots with a logged-in Chrome workflow.";
const siteOrigin = "https://sunwood-ai-labs.github.io";
const siteBase = "/gas-slack-bot-skill/";
const siteUrl = new URL(siteBase, siteOrigin).toString();
const ogImageUrl = new URL("ogp.svg", siteUrl).toString();
const repoUrl = "https://github.com/Sunwood-ai-labs/gas-slack-bot-skill";

function toPagePath(page: string): string {
  if (page === "index.md") return "/";
  if (page.endsWith("/index.md")) return `/${page.replace(/\/index\.md$/, "")}/`;
  return `/${page.replace(/\.md$/, "")}`;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path.replace(/^\/+/, ""), siteUrl).toString();
}

const socialLinks = [{ icon: "github", link: repoUrl }];

const footer = {
  message: "Built for practical Google Apps Script x Slack bot setup workflows.",
  copyright: "Copyright (c) 2026 Sunwood AI Labs",
};

export default defineConfig({
  title: siteTitle,
  description: siteDescription,
  base: siteBase,
  lang: "en-US",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: `${siteBase}favicon.svg` }],
    ["meta", { name: "theme-color", content: "#4285F4" }],
  ],
  sitemap: {
    hostname: siteUrl,
  },
  transformHead({ page, title, description }) {
    const pageUrl = toAbsoluteUrl(toPagePath(page));
    const locale = page.startsWith("ja/") ? "ja_JP" : "en_US";

    return [
      ["link", { rel: "canonical", href: pageUrl }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: siteTitle }],
      ["meta", { property: "og:locale", content: locale }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:url", content: pageUrl }],
      ["meta", { property: "og:image", content: ogImageUrl }],
      ["meta", { property: "og:image:type", content: "image/svg+xml" }],
      ["meta", { property: "og:image:alt", content: "GAS Slack Bot Skill social card" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: ogImageUrl }],
    ];
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: siteTitle,
      description: siteDescription,
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "Home", link: "/" },
          { text: "Guide", link: "/guide/getting-started" },
          { text: "Japanese", link: "/ja/" },
          { text: "GitHub", link: repoUrl },
        ],
        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Getting Started", link: "/guide/getting-started" },
              { text: "Usage", link: "/guide/usage" },
              { text: "Architecture", link: "/guide/architecture" },
              { text: "Troubleshooting", link: "/guide/troubleshooting" },
            ],
          },
        ],
        socialLinks,
        footer,
      },
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      title: siteTitle,
      description:
        "ログイン済み Chrome を使いながら Google Apps Script x Slack Bot を構築・設定するための Codex skill。",
      themeConfig: {
        logo: "/logo.svg",
        nav: [
          { text: "ホーム", link: "/ja/" },
          { text: "ガイド", link: "/ja/guide/getting-started" },
          { text: "English", link: "/" },
          { text: "GitHub", link: repoUrl },
        ],
        sidebar: [
          {
            text: "ガイド",
            items: [
              { text: "はじめに", link: "/ja/guide/getting-started" },
              { text: "使い方", link: "/ja/guide/usage" },
              { text: "構成", link: "/ja/guide/architecture" },
              { text: "トラブルシュート", link: "/ja/guide/troubleshooting" },
            ],
          },
        ],
        socialLinks,
        footer,
      },
    },
  },
  themeConfig: {
    socialLinks,
    footer,
  },
});
