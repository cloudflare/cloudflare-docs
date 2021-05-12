---
title: Client API
type: overview
order: 5
---

# Client API

## Overview
This article is intended for Cloudflare users with a Business or Enterprise subscription. Hosting partners must use the Optimized Partner API. All Railgun API requests must either include a Client API token and email address as a request parameter. API keys can be found and managed on the [My Account](https://www.cloudflare.com/my-account) page. All API requests should be directed at https://www.cloudflare.com/.

Multiple Railguns may be added to a Cloudflare account. Only one registered and activated Railgun may be used per domain. Railgun can be load-balanced and multiple Railgun daemons can be used per activated public IP and token. There is no need to register each Railgun daemon.

All API methods may be performed either as `GET` requests that include query string parameters or `POST` requests. The return status of the API request and any relevant errors messages are within the returned JSON response body. The `result` member indicates success or failure and the `msg` member contains further details if applicable.

## Creation, Activation, and Deletion
Creating and activating a Railgun requires two API calls. First, a Railgun must be initialized using the init call. The activation API call is made by Railgun when the daemon is started and does not need to be made by a user.

`POST /api/v2/railgun/init`

Create a Railgun. If request is successful, a new Railgun is added to a user account and placed in initializing status (`INI`).

## Form Parameters:
 	
** email ** – User account email

** tkn ** – User API token

** name ** – Name of Railgun

** pubname ** – Name of Railgun shown to users

