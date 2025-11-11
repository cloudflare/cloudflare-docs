---
trigger: always_on
---

# General rules

## Partial files location

- The partial files used in the docs are located in src/content/partials/

## Partial files variables

- Some partial files have variables to account for the fact that the partials are reused in different places and even products.
- Some partials also have JSX fragments. These pieces of code are conditionally rendered in the pages where the specific variable (magic word as it's called sometimes) is present. An example of these conditionally rendered pieces of code is:

{ props.magicWord === "hardware" && (
  <>
    <p>You need to purchase <a href="https://www.cloudflare.com/magic-wan">{props.productOriginalName}</a> before you can purchase and use the {props.productName}. The {props.productName} can function as your primary edge device for your network, or be deployed in-line with existing network gear.</p>
  </>
)
}

This code would only be rendered if the page has a magicWord variable set to "hardware".

## General guidance

- Do not make any changes to content without showing me what you want to change and asking if I agree to the changes.
- Do not use HTML for ordered lists.
- When you use JSX fragments to conditionally render a block of code, always use the props variable to account for the fact that the partials are reused in different places and even products.
- When you use JSX fragments to conditionally render a block of code, be aware that you will probably need to use the <Markdown /> component to properly render content that is not a single sentence.
- Only use the <Markdown /> component in JSX conditionals, and only if needed.
- Do not duplicate content when creating ternary or binary conditions.
- When adding a variable to a link, use HTML instead of Markdown.
- Whenever something is not clear, ask the user for more input.

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