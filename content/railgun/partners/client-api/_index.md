---
pcx_content_type: reference
title: Client API
weight: 1
---

# Client API

{{<render file="_railgun-deprecation-notice.md">}}

This article is intended for Cloudflare users with a Business or Enterprise subscription. All Railgun API requests must include a [Client API key](/fundamentals/api/get-started/keys/) and email address as a request parameter. All API requests should be directed at `https://www.cloudflare.com/`.

Multiple Railguns may be added to a Cloudflare account. Only one registered and activated Railgun may be used per domain. Railgun can be load-balanced and multiple Railgun daemons can be used per activated public IP and token. There is no need to register each Railgun daemon.

All API methods may be performed either as `GET` requests that include query string parameters or `POST` requests. The return status of the API request and any relevant errors messages are within the returned JSON response body. The `result` member indicates success or failure and the `msg` member contains further details if applicable.
