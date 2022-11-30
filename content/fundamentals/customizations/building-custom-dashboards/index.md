---
pcx_content_type: how-to
title: Building custom views
weight: 11
---

# Building custom views

The Cloudflare dashboard is built on our APIs, which are available at <https://api.cloudflare.com/>. To build custom views that reflect what appears in the Cloudflare dashboard, review the page source to see how we implemented the API calls.

For example, to see how we implemented the API calls from the **Analytics** tab of the dashboard:

1.  Navigate to the **Analytics** application on the dashboard.
2.  Open the developer tools for your web browser, like [Chrome's developer tools](https://developer.chrome.com/docs/devtools/open/).
3.  Switch to the **Network** tab of the developer tools.
4.  Reload the page to capture the results.
5.  Review the API calls and their responses. All Cloudflare API calls contain `/api/v1`.
