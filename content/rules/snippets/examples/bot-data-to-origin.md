---
type: example
summary: Send [Bots](/bots/) information to your origin. Refer to [Bot Managenent variables](/bots/reference/bot-management-variables/) for a full list of available fields.
goal:
  - Manage headers
operation:
  - Request modification
product:
  - Snippets
pcx_content_type: example
title: Send Bot Management information to origin
layout: example
---

```js
export default {
    async fetch(request) {
        // Clone the original request to construct a new request
        const newRequest = new Request(request);
        // Set Bot Management headers on a new request to the origin: https://developers.cloudflare.com/bots/reference/bot-management-variables/#workers-variables
        newRequest.headers.set("bot-score", request.cf.botManagement.score); // bot score (integer)
        newRequest.headers.set("verified-bot", request.cf.botManagement.verifiedBot); // verified bot (boolean)
        newRequest.headers.set("ja4", request.cf.botManagement.ja4); // JA4 fingerprint hash (string)
        // Serve response to the new request from the origin
        return await fetch(newRequest);
    },
};
```