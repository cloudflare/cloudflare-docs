---
title: Testing
pcx_content_type: reference
weight: 1
---

# Testing

## Dummy sitekeys and secret keys

The following {{<glossary-tooltip term_id="sitekey">}}sitekeys{{</glossary-tooltip>}} and {{<glossary-tooltip term_id="secret key">}}secret keys{{</glossary-tooltip>}} are available for testing. It is recommended that you use these keys in your development environment to ensure the challenges running in Turnstile do not conflict with your developer tools.

To test locally with real keys, you need to add your testing hostnames (like `localhost`) to your [domain allowlist](/turnstile/concepts/domain-management/).

Dummy sitekeys can be used from any domain, including on `localhost`.

Cloudflare recommends that sitekeys used in production do not allow local domains (`localhost`, `127.0.0.1`), but users can choose to add local domains to the list of allowed domains.

| Sitekey | Description | Visibility |
| --- | --- | --- |
| `1x00000000000000000000AA` | Always passes | visible |
| `2x00000000000000000000AB` | Always blocks | visible |
| `1x00000000000000000000BB` | Always passes | invisible |
| `2x00000000000000000000BB` | Always blocks | invisible |
| `3x00000000000000000000FF` | Forces an interactive challenge | visible |

These dummy sitekeys will produce the `XXXX.DUMMY.TOKEN.XXXX` dummy response token.

Production secret keys will reject this token. You must also use a dummy secret key for testing purposes.

| Secret key | Description |
| --- | --- |
| `1x0000000000000000000000000000000AA` | Always passes |
| `2x0000000000000000000000000000000AA` | Always fails |
| `3x0000000000000000000000000000000AA` | Yields a "token already spent" error |

Dummy secret keys should never be used in production as it will accept any response token as valid. 