---
pcx_content_type: configuration
title: Browser close reasons
weight: 30
---

# Browser close reasons

When using the Browser Rendering API, browser sessions may close for a variety of reasons. When Cloudflare begins charging for this API, we will not charge when errors occur on our end.

| Reasons a session may end                            |
| ---------------------------------------------------- |
| User opens and closes browser normally.              |
| Browser is idle for 60 seconds.                      |
| Chromium instance crashes.                           |
| Error connecting with the client, server, or Worker. |
| Browser session is evicted.                          |
