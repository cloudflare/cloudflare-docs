---
pcx_content_type: reference
title: How we do it
weight: 1
meta:
    title: Metadata | How we do it
---

# How we do it

At Cloudflare, we track the following information about each page:

| Value | Description | Examples |
| --- | --- | --- |
| **Product** | The top-level subfolder of the page. | `dns`, `bots` |
| **Product Group** | The primary area that each product falls into. | `Application Performance`, `Developer Platform` |
| **Content type** | The primary purpose of the page, which corresponds to our listed [content types](/style-guide/documentation-content-strategy/content-types/). | `how-to`, `faq` |
| **Last modified** | How many days ago was this page last updated? | `63` |
| **Last reviewed** | How many days ago was this page last reviewed? | `100` |
| **Word count** | How many words does the page contain (rounded to the nearest hundred)? | `100` |

Of all of these values, there is a bit of nuance to our **Last reviewed** metadata. **Last reviewed** differs from **Last modified** because a review is more thorough than an update. A review implies that all contents of the page have been vetted for accuracy.

Because of this extra effort, we only track **Last reviewed** for content types that are particularly important to the user journey and require an additional level of maintenance. At the moment, those content types are [tutorials](/style-guide/documentation-content-strategy/content-types/tutorial/) and specific types of [configurations](/style-guide/documentation-content-strategy/content-types/configuration/).

---

## Implementation

There are two aspects to our metadata implementation: how we set these values and how we make them available.

### Setting values

In setting values, we automate what we can and manually set the rest:

| Value | Method |
| --- | --- |
| **Product** | Set automatically by using the subfolder. | 
| **Product Group** | Defined at the product level and then automatically applied to each page in the subfolder. |
| **Content type** | Manually set for each page. | 
| **Last modified** | Automatically pulled from the Git history. | 
| **Last reviewed** |  Manually set for some pages. | 
| **Word count** | Automatically generated during build time. |

### Making values available

We choose to render all of these values as specific `meta` properties for each page.

This decision - combined with the multiple web scrapers that crawl our pages - means that our metadata is available for reporting and search improvements (ranking and faceting).

It also means that our GitHub repo is always the source of truth and we do not have to keep a spreadsheet or mapping updated elsewhere.