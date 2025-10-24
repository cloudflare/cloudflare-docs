---
trigger: glob
globs: *.mdx
---

# General styling

- Follow all guidance in the [Cloudflare Style Guide](https://developers.cloudflare.com/style-guide/).

## Grammar rules

- Do not use contractions, exclamation marks, or non-standard quotes like `‘’“”`
- Fix common spelling errors, specifically misspellings of "wrangler"
- Remove whitespace characters from the end of the line.
- Remove duplicate words.

## Links

- Use links that exist in the current file context. In most cases, these links will be very close to those at https://developers.cloudflare.com/sitemap-0.xml
- When referring to another page in our docs, use the full relative link (`/1.1.1.1/check/`) instead of the full URL (`https://developers.cloudflare.com/1.1.1.1/check/`), a local development link (`http://localhost:1111/1.1.1.1/check/`), or a dot notation link `../check/`).
- For links without anchors, always use a trailing slash
- Use meaningful link words, such as the title of the linked page. Avoid link words like "here", "this page", "our documentation", or "read more".
- Where appropriate, add cross links to relevant other pages in our documentation. These links will exist in the current file context and most are also available at https://developers.cloudflare.com/sitemap-0.xml.

## Components

- If a component is used in a page, it needs to be imported below the initial frontmatter (`import { DashButton } from "~/components";`)
- If `https://dash.cloudflare.com` is used in a series of steps, replace with the [`DashButton` component](https://developers.cloudflare.com/style-guide/components/dash-button/).
- Replace `sh` code blocks that have requests to `https://api.cloudflare.com` with our [`APIRequest` component](https://developers.cloudflare.com/style-guide/components/api-request/).
- Replace `txt` blocks attempted to show a file tree with our [`FileTree` component](https://developers.cloudflare.com/style-guide/components/file-tree/).
- Replace `sh` blocks using `npm commands` with our [`PackageManagers` component](https://developers.cloudflare.com/style-guide/components/package-managers/).
- Replace in-text mentions of Cloudflare's number of data centers, network capacity, or network peers with our [`PublicStats` component](https://developers.cloudflare.com/style-guide/components/public-stats/).
- Replace `toml` or `json` code blocks with [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration) information with our [`WranglerConfig` component](https://developers.cloudflare.com/style-guide/components/wrangler-config/).
- Replace `ts` or `typescript` code blocks with our [`TypeScriptExample` component](https://developers.cloudflare.com/style-guide/components/typescript-example/). Ignore this rule if the original code block is within a tutorial or other step-by-step guide that is specific to TypeScript.
