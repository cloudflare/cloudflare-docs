---
pcx_content_type: configuration
title: Limits
weight: 30
---

# Limits

- Two new browsers per minute per account.
- Two concurrent browsers per account.
- A browser instance gets killed if it does not get any command for 60 seconds, freeing one instance.
- `browser.close()` or disconnecting from the API WebSocket releases the browser instance.
