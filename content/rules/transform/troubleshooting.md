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

Transform Rules performing request header modifications affect the HTTP headers sent by Cloudflare's network to your origin server. You will not find these headers in your browser request or response data, which can make it difficult to tell if the rule is working as intended.

To check if a request header modification is taking effect, you can check the logs on your origin server or use [Cloudflare Trace](/fundamentals/basic-tasks/trace-request/) to check that the rule is matching traffic correctly. Since [Cloudflare Logpush](/logs/about/) only logs original request/response headers, Logpush logs will not include any header transformations done via Transform Rules.

To add HTTP headers that website visitors will receive in their browsers, you must [modify the response headers](/rules/transform/response-header-modification/) instead.
