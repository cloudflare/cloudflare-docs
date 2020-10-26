---
order: 3
title: AJAX session expiration
---

# AJAX session expiration handling

Pages that rely heavily on AJAX or single-page applications can block sub-requests due to an expired Access token without prompting the user to re-authenticate.

You can configure Access to provide a `401` response on sub-requests with an expired session token. We recommend using this response code to either force a page refresh or to display a message to the user that their session has expired.

In order to receive a `401` for expired session, add the following header to all AJAX requests:

```txt
X-Requested-With: XMLHttpRequest
```
