---
pcx_content_type: reference
title: WAF fields
weight: 124
---

# WAF fields

The Web Application Firewall (WAF) contains rules managed by Cloudflare to block requests that contain malicious content.

## WAF Action

{{<table-wrap>}}

| Value                                      | Action          | Description                                  |
| ------------------------------------------ | --------------- | -------------------------------------------- |
| <span style="font-weight: 400;">`0`</span> | Unknown         | Take no other action.                        |
| <span style="font-weight: 400;">`1`</span> | Allow           | Bypass all subsequent WAF rules.             |
| <span style="font-weight: 400;">`2`</span> | Block           | Block with an HTTP 403 response.             |
| <span style="font-weight: 400;">`3`</span> | Challenge Allow | Issue a Managed Challenge.                   |
| <span style="font-weight: 400;">`4`</span> | Challenge Drop  | Unused.                                      |
| <span style="font-weight: 400;">`5`</span> | Log             | Take no action other than logging the event. |

{{</table-wrap>}}

## Deprecated fields for internal Cloudflare use

The values of these fields are subject to change by Cloudflare at any time and are irrelevant for customer data analysis:

- WAFFlags
- WAFMatchedVar
