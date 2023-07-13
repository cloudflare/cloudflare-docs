---
pcx_content_type: concept
title: Changelog

---

# Changelog

<table>
    <tr>
        <th style="width:15%">Purpose</th>
        <td>The purpose of a changelog is to log or record notable changes.</td>
    </tr>
    <tr>
        <th>Tone</th>
        <td>instructional, straightforward</td>
    </tr>
    <tr>
        <th>content_type</th>
        <td>changelog</td>
    </tr>
    <tr>
        <th>Required components</th>
        <td>Title - Date of change<br/>Description of change</td>
    </tr>
    <tr>
        <th>Optional components</th>
        <td>IDs<br/>Actions (previous or new)<br/>Version<br/>Related links</td>
    </tr>
</table>

## Structure

### Required components

+ Metadata title - Changelog
+ [Title](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/) - If the changelog is listed on one page, title should be "Changelog." If the changes are split into multiple pages, top-level navigation page should be titled "Changelog" and titles of the nested pages should be date of change listed in year-month-day.
+ Description of change - What changed?

### Optional components

+ IDs - Rule ID, Legacy Rule ID
+ Actions (previous or new) - What action changed? What was the previous action?
+ Version - previous version → new version
+ Related links - Links to related examples, tutorials, code
+ RSS feed → More details.

## Examples

https://developers.cloudflare.com/waf/change-log

https://developers.cloudflare.com/analytics/web-analytics/change-log

## Additional information

Developers and engineers maintain changelogs manually or via an automated process that their team owns. PCX provides a review but should not own creating or writing changelogs.

The structure of the page can differ depending on the frequency or type of page.

{{<Aside type="note">}}Do not use the following terms: change log (two words), release notes, what's new, or README. What's New is a specific content type Product uses for marketing communication. Refer to "What's New" page: Owners, process, and how to update for more information. {{</Aside>}}

## RSS feeds
GitHub already maintains an RSS feed for commits affecting a specific file or all files within a folder.

If you want to make this RSS feed visible on your page – both through a link in the HTML head and an RSS feed icon in the top toolbar – add one of the following key-value pairs to the frontmatter of your changelog page.

{{<Aside type="note">}}Be careful with moving around changelog pages that have RSS feeds. You'll break anyone's integration who's watching the page, as well as the automated Discord channels that could be referencing the page. {{</Aside>}}

## File RSS feed

For changes pertaining just to the current file, which means a new entry is created any time a PR is merged that involves changes to the file.

You would use this with a single-page changelog.

```
{
---
pcx_content_type: changelog
title: Test page
weight: 3
rss: file
---
}
```
For initial implementation reasons, this will not work if the file is named _index.md


## Folder RSS feed

For changes pertaining to all files within the current folder, which means a new entry is created any time a PR is merged that involves changes to any files in the folder.

You would use this with a changelog that creates new pages for each change.

```
{
---
pcx_content_type: tutorial
title: Test page
weight: 3
rss: folder
---
}
```

## PR title and commit standards

Since these RSS feeds are updated with any update to the file (link fixes, formatting), we should be very diligent about our PR titles when making changelog updates.

Those should likely be structured as following:

```
[Product] - [Changelog] - [Date] - [Summary of change]
```
