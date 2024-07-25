---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/360061998911-Disabling-Weak-Cipher-Suites
title: Disable weak cipher suites
weight: 7
---

# Disable weak cipher suites

{{<render file="_cipher-suites-definition.md">}}

Refer to the sections below to understand how cipher suites work with the different Cloudflare edge certificates. For more details and reference content, refer to [Cipher suites](/ssl/reference/cipher-suites/).

## Cipher suites and edge certificates

While the default cipher suites provided with [Universal SSL certificates](/ssl/edge-certificates/universal-ssl/) are meant for a balance of security and compatibility, some of them might be considered weak by third-party testing tools, such as the [Qualys SSL Labs test](https://www.ssllabs.com/ssltest/).

If the Universal SSL offering does not meet your business requirements, you can use Cloudflare [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) to restrict the cipher suites used in connections between Cloudflare and your visitor's browser.

After you subscribed to Advanced Certificate Manager for your domain, you can restrict Cipher Suites at the Zone-level requests via the API. Use the [Edit zone setting](/api/operations/zone-settings-edit-single-setting) endpoint, specifying `ciphers` as the setting name in the URI path.

{{<Aside>}}
Currently, restricting cipher suites is only possible via API and is not available via the Cloudflare dashboard.
{{</Aside>}}

## Setup

Assuming this is just a one-time change, you can trigger the API call using curl.

1.  Get/view Global API Key _(or create Token)_ from: [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2.  Get Zone ID from the bottom right of Overview page for your domain in Cloudflare Dashboard.
3.  Decide which cipher suites you would like to allow from [the list](/ssl/reference/cipher-suites/supported-cipher-suites/).

Here is an example value (list of cipher suites) which you can use to replace `<CIPHER_SUITES>` in the commands below:

```json
["ECDHE-ECDSA-AES128-GCM-SHA256","ECDHE-ECDSA-CHACHA20-POLY1305","ECDHE-RSA-AES128-GCM-SHA256","ECDHE-RSA-CHACHA20-POLY1305","ECDHE-ECDSA-AES256-GCM-SHA384","ECDHE-RSA-AES256-GCM-SHA384"]
```

Run the command to make the API call with the appropriate `{zone_id}`, `<EMAIL>`, `<API_KEY>`, and `<CIPHER_SUITES>`:

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value": <CIPHER_SUITES>}'
```

If you choose to use a token, you will not need `<EMAIL>` nor `<API_KEY>`. You would instead need `<API_TOKEN>` and the command will look like this:

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"value": <CIPHER_SUITES>}'
```

To revert to the default cipher suites, you can send an empty array as the value, as in the following example.

```bash
--data '{"value": []}'
```

Refer to [Managing API Tokens and Keys](/fundamentals/api/get-started/) to learn more about API tokens and keys.

___

## Additional Resources

-   [Understanding Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/)
-   [Cloudflare SSL cipher, browser, and protocol support](/ssl/reference/)
