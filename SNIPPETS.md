# markbook rss feed

Visual Studio Code snippets

This repository includes a file with [Visual Studio Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) for the most common Hugo shortcodes used in Developer Docs.

The available snippets are:

Prefixes | Description
---|---
`asideheader` | Inserts an `Aside` shortcode with header text.
`asidenoheader` | Inserts an `Aside` shortcode without a header.
`ccol` | Surrounds the current selection with `content-column` shortcodes.
`tblwrap` | Surrounds the current selection with `table-wrap` shortcodes.
`directory` | Inserts a `directory-listing` shortcode.
`faqentry` or `faqitem` | Inserts shortcodes for an entire FAQ entry (question and answer).
`headerfullfile` | Inserts a file header for a complete Markdown file.
`headingpill` or `pillheading` | Inserts shortcode for a heading with a pill stating the release status (for example, Beta).
`metatitle` | Inserts meta title fields in existing Markdown header. Used to complement a full file header (refer to `headerfullfile`).
`metadescription` | Inserts meta description fields in existing Markdown header. Used to complement a full file header (refer to `headerfullfile`).
`headerpartialfile` | Inserts a header for a partial Markdown file.
`headerpartialfileparams` | Inserts a header for a partial Markdown file with input parameters.
`inlinepill` or `pillinline` | Inserts shortcode for an inline pill (appearing after a piece of text) stating the release status (for example, Beta).
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
