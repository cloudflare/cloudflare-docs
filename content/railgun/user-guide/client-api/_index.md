---
pcx-content-type: reference
title: Client API
weight: 11
---

# Client API

## Overview

This article is intended for Cloudflare users with a Business or Enterprise subscription. Hosting partners must use the Optimized Partner API. All Railgun API requests must either include a Client API token and email address as a request parameter. API keys can be found and managed on the [My Account](https://www.cloudflare.com/my-account) page. All API requests should be directed at `https://www.cloudflare.com/`.

Multiple Railguns may be added to a Cloudflare account. Only one registered and activated Railgun may be used per domain. Railgun can be load-balanced and multiple Railgun daemons can be used per activated public IP and token. There is no need to register each Railgun daemon.

All API methods may be performed either as `GET` requests that include query string parameters or `POST` requests. The return status of the API request and any relevant errors messages are within the returned JSON response body. The `result` member indicates success or failure and the `msg` member contains further details if applicable.
