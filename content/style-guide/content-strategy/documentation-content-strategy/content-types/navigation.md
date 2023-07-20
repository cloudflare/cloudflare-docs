---
title: Navigation
pcx_content_type: Content
---

# Navigation

## Purpose

The purpose of a navigation page is to direct users deeper into the doc set and act as a sub-landing page for a specific area of the docs.

## content_type

navigation

## Structure

Use the ```{{</*directory-listing*/>}}``` component

**Title**: Verb or noun phrase that describes the sub-pages in the section.

## Template

```
---
weight: xx
pcx_content_type: navigation
---
 
# Name of section
 
<DirectoryListing path="/<first-level folder within product space>/<second-level folder within product space>/<third-level folder within product space>"/>
```

## Examples

[Logs: Enable destinations](/logs/get-started/enable-destinations/)

[Cloudflare Tunnel: Get Started](/cloudflare-one/connections/connect-apps/install-and-setup/)
