---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 7
meta:
  title: Troubleshoot Transform Rules
---

# Troubleshoot Transform Rules

When troubleshooting a rule configuration, review the [Transform Rules evaluation](/rules/transform/#transform-rules-evaluation) section to understand how and when your Transform Rule is evaluated for each request.

For more information on runtime errors related to Transform Rules configuration, refer to [Troubleshooting Cloudflare 1XXX errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/).

## Why do I not see my request header modifications?

Request header modification Transform Rules affect the HTTP headers that are sent by Cloudflare's network to your origin server. As these are sent to your origin by Cloudflare, you will not see them reflected in your browser request or response data, which can make it difficult to tell if the rule is taking effect.

To check whether a request header modification is taking effect, you can check the logs on your origin server or use [Cloudflare Trace](/fundamentals/basic-tasks/trace-request/) to check that the rule is matching traffic correctly.

If you intennded for the headers to be used in the browser, you have to [modify the response headers(/rules/transform/response-header-modification/) instead.
