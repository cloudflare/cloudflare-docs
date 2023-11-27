---
pcx_content_type: reference
title: Internal search
weight: 2
layout: list
meta:
    title: Signals | Internal search
---

# Internal search

Internal search data measures the queries, clicks, and other search events that happen within your docs.

## Why we like it

This data tells you what folks are looking for in your docs, as well as where they were looking for it.

## How we track it

We track this data using the built-in analytics included with our [Algolia DocSearch implementation](https://docsearch.algolia.com/).

## How we use it

We use internal search data to evaluate the findability of content and identify content gaps or restructuring opportunities.

| Question | Look at | Ask yourself |
| --- | --- | --- |
| Can users find the content they are looking for? | Searches without results and searches without clicks | Is there significant traffic for specific terms?<br/><br/>Do these terms need search ranking rules or different content treatments (new pages, clearer headings) to make them visible on a page? |
| Are certain areas of your documentation more searchable than others? | Group all search metrics by the page that triggered the search.<br/><br/>Then, segment all metrics - searches, clicks, clickthroughs, click rank - by top-level URL path. | Do certain areas have significantly higher or lower values for various metrics?<br/><br/>Are there specific terms leading to these trends? |