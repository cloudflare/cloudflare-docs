---
title: Quickstart
pcx-content-type: tutorial
layout: single
weight: 1
meta:
  title: Getting access to the Cloudflare API
---

THIS IS A TEST

# Getting access to the Cloudflare API

Using the Cloudflare API, requires authentication so that Cloudflare knows who is making requests and what permissions they have. An API Token can be created to grant access to the API to perform actions. See [creating an API Token](/api/tokens/create/) for more on this.

Legacy Note: Existing customers may be familiar with API Keys. These allow for less granular access and each user can only have one. For these reasons, we advice customers using API Keys to transition to using API Tokens.

## Making API Calls

Once you have your API Token created, all API requests are authorized in the same way. Cloudflare uses the [RFC standard](https://tools.ietf.org/html/rfc6750#section-2.1) `Authorization: Bearer <Token>` interface. When used in an example Cloudflare API request it looks like this:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/<ACCOUNT_ID>" \
-H "Content-Type:application/json" \
-H "Authorization: Bearer YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T"
```

The above example is just that, an example. Never send anyone or store you API Token secret in plaintext. Also be sure not to check it into code repositories especially public ones like on github.

## Finding your zone and account IDs

When using the Cloudflare API, you will need to know your **Account ID** and **Zone ID**.

For help finding those values, refer to [Finding your zone and account IDs](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

## Using Cloudflare’s APIs

For specific guidance on making API calls, see the following:

*   The specific [Developer Docs section](/) for a service for how to guides.
*   [API schema docs](https://api.cloudflare.com) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare) you can leverage our 1st party libraries to integrate with Cloudflare's API.

## Rate Limits

The global rate limit for our API is 1200 requests per 5 minutes. If you exceed this, all API calls for the next 5 minutes will be blocked, receiving a HTTP 429 response.

Some specific API calls have their own limits and are documented separately, such as the Cache Purge APIs:

* https://api.cloudflare.com/#zone-purge-files-by-url
* https://api.cloudflare.com/#zone-purge-files-by-cache-tags,-host-or-prefix
