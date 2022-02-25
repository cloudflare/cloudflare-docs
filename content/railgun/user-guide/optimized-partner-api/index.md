---
order: 14
pcx-content-type: reference
---

# Optimized partner API

## Overview

This article is intended for Cloudflare Optimized Hosting Partners. End-users must utilize the Client API. All Railgun API requests must include a [Host API](http://www.cloudflare.com/docs/host-api.html) token as a request parameter. You can apply for an API key or read more about Cloudflare Hosting Partner programs [in our Partnerships page](https://www.cloudflare.com/partner-programs). All API requests should be directed at `https://www.cloudflare.com/`.

Multiple Railguns may be added to a Cloudflare host account. Only one registered and activated Railgun may be used per domain. Railgun can be load-balanced and multiple Railgun daemons can be used per activated public IP and token. There is no need to register each Railgun daemon if they share a public IP.

All API methods may be performed either as `GET` requests that include query string parameters or `POST` requests. The return status of the API request and any relevant errors messages are within the returned JSON response body. The `result` member indicates success or failure and the `msg` member contains further details if applicable.
