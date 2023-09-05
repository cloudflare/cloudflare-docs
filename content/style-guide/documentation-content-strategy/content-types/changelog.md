---
pcx_content_type: concept
title: Changelog

---

# Changelog

## Purpose

The purpose of a changelog is to log or record notable changes.

## Tone

instructional, straightforward

## content_type

`changelog`

## Structure

### Required components

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): If the changelog is listed on one page, the title should be "Changelog." If the changes are split into multiple pages, the top-level navigation page should be titled "Changelog" and titles of the nested pages should be the date of change listed in year-month-day.

**Description of change**: What changed?

### Optional components

**IDs**: Rule ID, Legacy Rule ID

**Actions (previous or new)**: What action changed? What was the previous action?

**Version**: previous version → new version

**Related links**: Links to related examples, tutorials, code

**RSS feed** → More details.

## Examples

[WAF Changelog](/waf/change-log)

[Web Analytics Changelog](/analytics/web-analytics/changelog/)

## Additional information

Developers and engineers maintain changelogs manually or via an automated process that their team owns. PCX provides a review but should not own creating or writing changelogs.

The structure of the page can differ depending on the frequency or type of page.

{{<Aside type="note">}}
Do not use the following terms: change log (two words), release notes, what's new, or README.

"What's New" is a specific [content type](https://www.cloudflare.com/whats-new/) for marketing communication.
{{</Aside>}}

## RSS feeds

GitHub already maintains an RSS feed for commits affecting a specific file or all files within a folder.

If you want to make this RSS feed visible on your page – both through a link in the HTML `head` and an RSS feed icon in the top toolbar – add one of the following key-value pairs to the frontmatter of your changelog page.

{{<Aside type="note">}}
Be careful with moving around changelog pages that have RSS feeds. You will break anyone's integration who is watching the page, as well as the automated Discord channels that could be referencing the page.
{{</Aside>}}

## File RSS feed

For changes pertaining just to the current file, which means a new entry is created any time a PR is merged that involves changes to the file.

You would use this with a single-page changelog.

```

---
pcx_content_type: changelog
title: Test page
weight: 3
rss: file
---
```

For initial implementation reasons, this will not work if the file is named `_index.md`.

## Folder RSS feed

For changes pertaining to all files within the current folder, which means a new entry is created any time a PR is merged that involves changes to any files in the folder.

You would use this with a changelog that creates new pages for each change.

```

---
pcx_content_type: tutorial
title: Test page
weight: 3
rss: folder
---
```

## PR title and commit standards

Since these RSS feeds are updated with any update to the file (link fixes, formatting), we should be very diligent about our PR titles when making changelog updates.

Those should likely be structured as following:

```
[Product] - [Changelog] - [Date] - [Summary of change]
```
