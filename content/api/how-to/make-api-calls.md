---
title: Make API calls
pcx_content_type: how-to
weight: 11
---

# Make API calls

Once you create your API token, all API requests are authorized in the same way. Cloudflare uses the [RFC standard](https://tools.ietf.org/html/rfc6750#section-2.1) `Authorization: Bearer <Token>` interface. An example request is shown below.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/<ACCOUNT_ID>" \
-H "Content-Type:application/json" \
-H "Authorization: Bearer YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T"
```

Never send or store your API Token secret in plaintext. Also be sure not to check it into code repositories, especially public ones.


## Using Cloudflare’s APIs

Every Cloudflare API element is fixed to a version number. The latest version is Version 4. The stable base URL for all Version 4 HTTPS endpoints is: https://api.cloudflare.com/client/v4/

For specific guidance on making API calls, see the following:

*   The specific [Developer Docs section](/) for a service for how to guides.
*   [API schema docs](https://api.cloudflare.com) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare) you can leverage our 1st party libraries to integrate with Cloudflare's API.