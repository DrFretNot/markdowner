# Markdowner

A command-line tool that downloads a web page and converts it to Markdown.

Markdowner is optimized for article-style pages, including Substack newsletters (The Bulwark, Astral Codex Ten, and custom domains), blogs, and news sites.

## Quick Start

Install dependencies and run locally:

```bash
npm install
node src/index.js -u https://www.thebulwark.com/p/a-season-of-death-and-fear-immigration-mass-deportation-springfield-haitians-texas-ice
```

Or install globally:

```bash
npm i -g @dougskinner/markdowner
markdowner -u https://example.com
```

Requires Node.js 18 or later.

## How It Works

Markdowner uses a tiered extraction pipeline:

1. **Substack API** — For URLs matching `/p/{slug}` (including custom domains like `thebulwark.com`), fetches clean article HTML from `{origin}/api/v1/posts/{slug}`.
2. **Mozilla Readability** — For other sites, extracts the main article content and strips navigation chrome.
3. **Full-page fallback** — If Readability cannot find an article, converts the full HTML page.

Output includes the article title, subtitle (when available), author/byline, publication date, and body content.

## Command-Line Flags

| Long Flag   | Short Flag | Required | Description |
|-------------|------------|----------|-------------|
| `--url <url>` | `-u <url>` | Yes | The URL to convert to Markdown. |
| `--debug`   | `-d`       | No       | Print extra diagnostic information. |
| `--clipboard` | `-c`     | No       | Copy Markdown to the system clipboard instead of stdout. |

## Samples

Example output lives in [`samples/`](samples/). These are real articles from [The Bulwark](https://www.thebulwark.com/) used as regression fixtures.

Regenerate them after changing extraction logic:

```bash
npm run samples
```

## Development

```bash
npm install
npm run lint
npm run samples
```

## Limitations

- **Paywalled content** — Substack paywalls may return truncated or empty article bodies.
- **JavaScript-rendered pages** — SPAs without server-rendered HTML may not convert well (no headless browser).
- **Bot blocking** — Some sites may return 403 or challenge pages.

## How to Contribute

The easiest way to help is to [submit issues](https://github.com/doug-skinner/markdowner/issues) noting bugs or sites that do not convert well.

If you want to work on an existing issue, comment on it first to avoid duplicate effort.
