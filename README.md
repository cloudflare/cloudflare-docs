# Cloudflare Docs

**[View the docs →](https://developers.cloudflare.com/)**

[Contribute to the docs](https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md)

## Setup

You must have [Hugo](https://gohugo.io) installed on your system and available in your `$PATH` as a global binary. Most operating systems are supported – follow the relevant [Install Hugo](https://gohugo.io/getting-started/installing) instructions for your operating system guides to get started.

> **Important:** This project is built with version `0.110.0+extended` and is the minimum required version. You may (probably) use a newer version of Hugo, but will be subject to any Hugo changes.

You must also have a recent version of Node.js (14+) installed. You may use [Volta](https://github.com/volta-cli/volta), a Node version manager, to install the latest version of Node and `npm`, which is a package manager that is included with `node`'s installation.

```sh
$ curl https://get.volta.sh | bash
$ volta install node
```

Finally, install the Node.js dependencies for this project using npm or another package manager:

```sh
$ npm install
```

## Development

When making changes to the site, including any content changes, you may run a local development server by running the following command:

```sh
$ npm run dev
```

This spawns a server that will be accessible via `http://localhost:5173` in your browser. Additionally, any changes made within the project – including `content/**` changes – will automatically reload your browser tab(s), allowing you to instantly preview your changes!

Additionally, this project includes a CI step for ensuring consistent code style. This applies to all files within the project, including markdown (`*.md`) files, but will not affect the content itself or the content's output display. To see the style error(s), you may run:

```sh
$ npm run lint
```

Finally, some of these code-style errors may be fixed automatically. To do so, you may run:

```sh
$ npm run format
```

## Deployment

Our docs are deployed using [Cloudflare Pages](https://pages.cloudflare.com). Every commit pushed to production will automatically deploy to [developers.cloudflare.com](https://developers.cloudflare.com), and any pull requests opened will have a corresponding staging URL available in the pull request comments.

## Visual Studio Code snippets

This repository includes a file with [Visual Studio Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) for the most common Hugo shortcodes used Developer Docs.

The available snippets are:

Prefixes | Description
---|---
`asideheader` | Inserts an `Aside` shortcode with header text.
`asidenoheader` | Inserts an `Aside` shortcode without a header.
`ccol` | Surrounds the current selection with `content-column` shortcodes.
`tblwrap` | Surrounds the current selection with `table-wrap` shortcodes.
`directory` | Inserts a `directory-listing` shortcode.
`headerfullfile` | Inserts a file header for a complete Markdown file.
`metatitle` | Inserts meta title fields in existing Markdown header. Used to complement a full file header.
`metadescription` | Inserts meta description fields in existing Markdown header. Used to complement a full file header.
`headerpartialfile` | Inserts a header for a partial Markdown file.
`headerpartialfileparams` | Inserts a header for a partial Markdown file with input parameters.
`partialinclude` or `renderpartial` | Inserts a `render` shortcode to include content from a partial in the current document.
`partialincludeparams` or `renderpartialparams` | Inserts a `render` shortcode to include content from a partial with input parameters in the current document.
`twotabs` or `addtabs` | Inserts a new tabs section with two tabs for dashboard and API instructions.
`detailssection` or `collapsible` | Inserts a collapsible `<details>` HTML element.

Triggering one of the available snippets will insert their body content at the current cursor position.

Additionally, the following snippets support surrounding existing text:
* `Aside with header`
* `Aside without header`
* `Surround with content-column`
* `Surround with table-wrap`
* `Create collapsible details section`

### How to use

Note: Make sure you open the root folder of your cloned repository in Visual Studio Code (VS Code), so that VS Code correctly detects the snippets file stored in the `.vscode/` sub-folder.

To enter a snippet:
1. Enter the snippet prefix and press `Ctrl+Space` (`Command+Space` on a Mac).
2. Select the desired snippet and press `Enter`.
3. (Optional) Enter or select a value for the first placeholder supported by the snippet, if any, and press `Tab` to move to the next placeholder. Keep replacing placeholders and pressing `Tab`. When there are no more placeholders, pressing `Tab` will end the process.

To surround existing content with a snippet:
1. Select the text you wish to surround with a snippet.
2. Enter the snippet prefix (temporarily replacing the selected text) and press `Ctrl+Space` (`Command+Space` on a Mac).
3. Select the desired snippet and press `Enter`. VS Code will insert the snippet body and paste the previously selected content in the correct location.
4. (Optional) Enter or select a value for the first placeholder supported by the snippet, if any, and press `Tab` to move to the next placeholder. Keep replacing placeholders and pressing `Tab`. When there are no more placeholders, pressing `Tab` will end the process.

## For Cloudflare employees

To get write access to this repo, please reach out to the **Developer Docs** room in chat.

## License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.
