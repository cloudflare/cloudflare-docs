---
pcx_content_type: configuration
title: Limits
weight: 30
---

# Limits

{{<Aside type="warning" header="Join the waitlist">}}

The Workers Browser Rendering API is currently in beta. [Add yourself to the waitlist](https://www.cloudflare.com/lp/workers-browser-rendering-api/) to reserve your spot, and as we expand availability, we will reach out to you and grant access.

{{</Aside>}}

These are the limits during the open Beta period:

- Two new browsers per minute per account.
- Two concurrent browsers per account.
- A browser instance gets killed if it does not get any command for 60 seconds, freeing one instance.
- `browser.close()` or disconnecting from the API WebSocket releases the browser instance.
