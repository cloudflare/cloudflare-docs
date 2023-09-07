---
title: Testing
pcx_content_type: reference
weight: 12
layout: single
---

# Testing

## Dummy sitekeys and secret keys

The following sitekeys and secret keys are available for testing. It is recommended that you use these keys in your development environment to ensure the challenges running in Turnstile do not conflict with your developer tools.

| Sitekey | Description | Visibility |
| --- | --- | --- |
| `1x00000000000000000000AA` | Always passes | visible |
| `2x00000000000000000000AB` | Always blocks | visible |
| `1x00000000000000000000BB` | Always passes | invisible |
| `2x00000000000000000000BB` | Always blocks | invisible |
| `3x00000000000000000000FF` | Forces an interactive challenge | visible |

| Secret key | Description |
| --- | --- |
| `1x0000000000000000000000000000000AA` | Always passes |
| `2x0000000000000000000000000000000AA` | Always fails | 
| `3x0000000000000000000000000000000AA` | Yields a "token already spent" error | 


## Testing locally

To test locally with real keys, you need to add your testing hostnames (like `localhost`) to your [domain whitelist](/turnstile/reference/domain-management/).
