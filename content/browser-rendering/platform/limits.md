---
pcx_content_type: configuration
title: Limits
weight: 30
---

# Limits

{{<plan type="all">}}

{{<Aside>}}
Workers Browser Rendering API is now in open Beta. During this period we offer this service to customers for free.
{{</Aside>}}

These are the limits during the open Beta period:

- Two new browsers per minute per account
- Two concurrent browsers per account
- A browser instance gets killed if it doesn't get any command for 60 seconds, freeing one instance
- `browser.close()` or disconnecting from the API WebSocket releases the browser instance
