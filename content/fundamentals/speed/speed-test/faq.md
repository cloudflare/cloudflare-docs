---
pcx_content_type: faq
title: FAQ
weight: 3
---

# FAQ

Below you will find answers to our most commonly asked questions. If you cannot find the answer you are looking for, refer to the community page to explore more resources.

## How long does it take for a test to load?

It can vary from about 25 seconds to over a minute.
If you leave your speed tab open, your test is still going to run. You can leave and return and still see your test results.

## I get a `500` response when running the tests at `cfwebpagetest.com`.

Make sure you do not have [Content Security Policy (CSP) rules](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) setup for your zone. Cloudflare tests customer zones by proxying them through a special purpose `cfpreviewproxy.com` zone. CSP rules prevent Cloudflare Speed from successfully proxying this zone, and the test will fail.

## I get a `403` response when rerunning the website analysis.
Check your firewall rules to make sure that you allow traffic from the Speed test to request your site.
