---
title: FAQ
order: 9
pcx-content-type: faq
---

# FAQ — Bulk Redirects

Below you will find answers to the most commonly asked questions regarding Bulk Redirects. 

## What happens if the same source URL appears in two different Bulk Redirect Lists?

In this situation, Cloudflare will use the URL Redirect it finds first. This will be determined by the order of the Bulk Redirect Rules enabling each Bulk Redirect List in the `http_request_redirect` phase entry point ruleset.

## How many URL Redirects can I have in a single Bulk Redirect List?

Each Bulk Redirect List can have as many URL Redirects as you are entitled to, according to your Cloudflare plan. Refer to [Availability](/bulk-redirects#availability) for details.

## How can I redirect the non-normalized versions of a URL?

Use the `raw.http.request.full_uri` field in the rule expression and key instead of the default field `http.request.full_uri`. This will take the raw version of the URL into account, that is, the URL that Cloudflare received at the edge before applying any normalization. Refer to [Concepts: Bulk Redirect Rules](/bulk-redirects/concepts#bulk-redirect-rules) for more information on using a custom rule expression and key.

## Do Bulk Redirects take precedence over Page Rules?

Yes. Bulk Redirects take precedence over Page Rules redirects.
