---
title: Make API calls
pcx_content_type: how-to
weight: 11
---

# Make API calls

Once you create your API token, all API requests are authorized in the same way. Cloudflare uses the [RFC standard](https://tools.ietf.org/html/rfc6750#section-2.1) `Authorization: Bearer <API_TOKEN>` interface. An example request is shown below.

```bash
$ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>" \
-H "Authorization: Bearer YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T"
```

Never send or store your API token secret in plaintext. Also be sure not to check it into code repositories, especially public ones.


## Using Cloudflare API on Windows CMD or Powershell

In order to use Cloudflare API on Windows CMD or Powershell, you will need to replace the single `'` quote with `"` quote, and add another `"` next to `"` quote in the API endpoints that have `--data payload`. Otherwise, you'll get a JSON formatting error.


On MAC terminal or Unix shell, the correct syntax would be:

```
GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" -d'{"flag":true}'
```

On Windows OS, you need to replace any single-quote `'` with double-quotes `"` and replace any double-quotes `"` with additional double-quote `""`, as demonstrated in the next example:

```
GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" -d"{""flag"":true}"
```


You can also try to install the [Microsoft Visual Studio](https://visualstudio.microsoft.com/) along with the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) will allow for much easier interactions with the Cloudflare API, or use the [the *json* processor jq](https://developers.cloudflare.com/logs/tutorials/parsing-json-log-data/) for Windows to get a formatted output.


## Using Cloudflare’s APIs

Every Cloudflare API element is fixed to a version number. The latest version is Version 4. The stable base URL for all Version 4 HTTPS endpoints is: `https://api.cloudflare.com/client/v4/`

For specific guidance on making API calls, refer to the following resources:

*   The product's [Developer Docs section](/products/) for how-to guides.
*   [API schema docs](/api) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare), use our first-party libraries to integrate with Cloudflare's API.
