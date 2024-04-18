# Visual Studio Code snippets

This repository includes a file with [Visual Studio Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) for the most common Hugo shortcodes used in Developer Docs.

The available snippets are:

Prefixes | Description
---|---
`asideheader` | Inserts an `Aside` shortcode with header text.
`asidenoheader` | Inserts an `Aside` shortcode without a header.
`ccol` | Inserts `content-column` shortcodes.
`tblwrap` | Inserts `table-wrap` shortcodes.
`directory` | Inserts a `directory-listing` shortcode.
`faqentry` or `faqitem` | Inserts shortcodes for an entire FAQ entry (question and answer).
`headerfullfile` | Inserts a file header for a complete Markdown file.
`headingpill` or `pillheading` | Inserts shortcode for a heading with a pill stating the release status (for example, Beta).
`metatitle` | Inserts meta title fields in existing Markdown header. Used to complement a full file header (refer to `headerfullfile`).
`metadescription` | Inserts meta description fields in existing Markdown header. Used to complement a full file header (refer to `headerfullfile`).
`glossarydefinition` | Adds the definition of a glossary entry in the current location.
`glossarytooltip` | Adds a new glossary reference, displaying its (short) definition as a tooltip.
`headerpartialfile` | Inserts a header for a partial Markdown file.
`headerpartialfileparams` | Inserts a header for a partial Markdown file with input parameters.
`headerexternallink` | Inserts a header for a page with no content that links to an external URL.
`inlinepill` or `pillinline` | Inserts shortcode for an inline pill (appearing after a piece of text) stating the release status (for example, Beta).
`partialinclude` or `renderpartial` | Inserts a `render` shortcode to include content from a partial in the current document.
`partialincludeparams` or `renderpartialparams` | Inserts a `render` shortcode to include content from a partial with input parameters in the current document.
`twotabs` or `addtabs` | Inserts a new tabs section with two tabs for dashboard and API instructions.
`detailssection` or `collapsible` | Inserts a collapsible details section.

Triggering one of the available snippets will insert their body content at the current cursor position.

Additionally, the following snippets support surrounding existing text:
* `asideheader`
* `asidenoheader`
* `ccol`
* `detailssection` or `collapsible`
* `glossarytooltip`
* `tblwrap`

### How to use

Note: Make sure you open the root folder of your cloned repository in Visual Studio Code (VS Code), so that VS Code correctly detects the snippets file stored in the `.vscode/` sub-folder.

To enter a snippet:
1. Enter the snippet prefix and press <kbd>Ctrl</kbd>+<kbd>Space</kbd> (<kbd>Command</kbd>+<kbd>Space</kbd> on a Mac).
2. Select the desired snippet and press <kbd>Enter</kbd>.
3. (Optional) Enter or select a value for the first placeholder supported by the snippet, if any, and press <kbd>Tab</kbd> to move to the next placeholder. Keep replacing placeholders and pressing <kbd>Tab</kbd>. When there are no more placeholders, pressing <kbd>Tab</kbd> will end the process.

To surround existing content with a snippet:
1. Select the text you wish to surround with a snippet.
2. Press <kbd>F1</kbd>, search for the **Snippets: Surround with Snippet...** command, and press <kbd>Enter</kbd>.
3. Select the desired snippet from the list. VS Code will insert the snippet body and paste the previously selected content in the correct location.
4. (Optional) Enter or select a value for the first placeholder supported by the snippet, if any, and press <kbd>Tab</kbd> to move to the next placeholder. Keep replacing placeholders and pressing <kbd>Tab</kbd>. When there are no more placeholders, pressing <kbd>Tab</kbd> will end the process.
