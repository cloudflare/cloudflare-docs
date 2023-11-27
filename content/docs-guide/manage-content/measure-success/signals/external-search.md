---
pcx_content_type: reference
title: External search
weight: 1
meta:
    title: Signals | External search
---

# External search

External search data measures the queries and clicks that happen in an external search engine (Google, Bing, DuckDuckGo) and send users into your docs.

## Why we like it

Compared to other signals, external search clearly indicates user intent. You know what a user was looking for (their query) and what they chose to answer it (your docs).

## How we track it

We track this data using [Google Search console](https://search.google.com/search-console/about).

Though there are other vendors, Google accounts for the vast majority of searches and helps us simplify this dataset.

## How we use it

We use external search data at a macro and micro level to help us measure success and identify content gaps.

| Question | Look at | Ask yourself |
| --- | --- | --- |
| Are you providing accurate, authoritative content? | Group landing pages by property, then look at clicks per page. | Is SEO traffic increasing over time?<br/><br/>How does SEO traffic to your docs compare to traffic going to other company properties (Support KB, Community)? |
| Do you have any glaring content gaps? | Filter landing page to a non-documentation property, then look at clicks per query. | Is there significant traffic from use-phase queries (`Redirect a domain`, `DNS_PROBE_FINISHED_NXDOMAIN cloudflare`)? |
| Are certain areas of your documentation more valuable than others? | Group landing pages by folder, then look at clicks per page. | Which URL paths or sub-folders receive significantly more SEO traffic? |
| Are your error messages effective? | Filter queries to those over a certain character limit, then review the queries.<br/>(we use 32) | Are any of these queries just copy and pasted versions of your error messages?<br/><br/>If so, can you reword for clarity and appropriate cross-linking?<br/><br/>If those queries are sending traffic to other properties, do you need to create pages to authoritatively provide guidance? |


{{<Aside type="note">}}

If you have a federated search within your docs, you can use that data similarly to external search data.

{{</Aside>}}