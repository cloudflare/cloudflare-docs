---
pcx_content_type: concept
title: Paragraphs and line breaks
---

# Paragraphs and line breaks

## Paragraphs in Markdown

To start a new paragraph, leave an empty line (with no spaces) before adding the new paragraph content.

``` This sentence is the first one in this paragraph.
This second sentence also belongs to the first paragraph.
 
This is the first sentence of the second paragraph. 
```

## Line breaks in Markdown

Avoid line breaks when possible. Considering creating a separate paragraph, even inside numbered lists.

If you need to add a line break, use the `<br/>` HTML element.

Example inside a table:

```| Feature                          | Enabled |
|----------------------------------|---------|
| Feature name<br/>Additional info | Yes     |
```

This is how the table looks:

| Feature                          | Enabled |
|----------------------------------|---------|
| Feature name<br/>Additional info | Yes     |

{{<Aside type="warning">}}
Do not use two spaces at the end of a sentence to create a forced line break. Although this Markdown syntax is supported, it is not immediately visible and can easily miss these line breaks during peer reviews.
{{</Aside>}}
