---
pcx_content_type: concept
title: Notes/tips/warnings

---

# Notes/tips/warnings

## Definition

A colored info box or aside with content (text, images, lists, code blocks) that adds relevant notes that do not fit the text or warns users of specific behavior that can break functionality or impact security.

## Used in

[How to](/style-guide/documentation-content-strategy/content-types/how-to/), [Configuration](/style-guide/documentation-content-strategy/content-types/configuration/), [FAQ](/style-guide/documentation-content-strategy/content-types/faq/), [Concept](/style-guide/documentation-content-strategy/content-types/concept/), [Reference](/style-guide/documentation-content-strategy/content-types/reference/), [Tutorial](/style-guide/documentation-content-strategy/content-types/tutorial/)

## Structure

**Type**: note or warning (defines the background color)

**Aside content**

**(optional) Title/Header**

## Templates

```
{{</*Aside type="note" header="Header text"*/>}} 

This is a "note" aside. 

{{</*/Aside*/>}}
```

```
{{</*Aside type="warning" header="Header text"*/>}} 

This is a "warning" aside. 

{{</*/Aside*/>}}
```

```
{{</*Aside type="note"*/>}} 

This is a "note" aside without a header.

{{</*/Aside*/>}}
```

There is no need to add buffer lines between the `{{</*/Aside*/>}}` elements, but you can add them if you want. Supported ways of building asides are:

```
{{</*Aside type="note" header="Header text"*/>}} 
    Newlines are not required and you can still use markdown.
{{</*/Aside*/>}}
```

```
{{</*Aside type="note"*/>}} This is also valid.{{</*/Aside*/>}}
```

Make sure you use double quitation marks in the `header=` section. If you use single quotation marks, building locally will error out.

## Rendered examples

{{<Aside type="note" header="Header text">}}

This is a "note" aside.

{{</Aside>}}

{{<Aside type="warning" header="Header text">}}

This is a "warning" aside.

{{</Aside>}}

{{<Aside type="note">}}

This is a `note` aside without a header.

{{</Aside>}}

{{<Aside type="unrecognized">}}

This is an aside with an unrecognized type (*do not use*).

{{</Aside>}}

## Additional information

The aside background color depends on the aside type:

+ Aside with "note" type — blue
+ Aside with "warning" type— orange
+ Unrecognized aside type — grey (should not be used)

The default type is "note", but you should enter a type explicitly as an attribute of the `{{</*Aside*/>}}` element: `type="(warning|note)`".

An aside has an optional header displayed at the top (inside the colored box) in **bold**.

The aside can contain a single sentence or additional content (lists, code blocks, images).

An `{{</*Aside...*/>}}` element, as it appears in Markdown files, is a Hugo shortcode defined in our docs repo, while `<aside>` is a standard HTML element that has no associated default styling.

## When should I use a note/warning?

Use a note to alert a reader to additional useful information that you cannot integrate into the text.

Use a warning to alert a reader to behavior that could impact the security of a users network or break functionality.

## Recommendations

+ **An aside should not contain too much content**, since it breaks the normal text flow. For example, up to 3 paragraphs or bulleted lists up to 3 items. If you need to include more content, consider creating a documentation section "Important notes" or similar.
+ **Use asides sparingly.** Each section should not have more than one aside of the same type. The only exception is a possible availability disclaimer right after the heading.
+ **Asides inside task step instructions should not have a header.** They take too much space and the background color is enough to distinguish the aside content from regular text.
+ **Use a `note` aside to state the restricted availability of a feature** (for example, "Only available for customers on an Enterprise plan.") at the beginning of a page, without a header.
