---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360061998911-Disabling-Weak-Cipher-Suites
title: Disabling Weak Cipher Suites
---

# Disabling Weak Cipher Suites



## Problem

Some Cipher Suites are listed as weak in third-party testing tools.

___

## Root Cause

Cipher Suites is a combination of ciphers used to negotiate security settings during the SSL/TLS handshake and not directly related to TLS version.

The _default Cipher Suites_ provided with Universal SSL certificates are meant for a _balance of security and compatibility_. Some of which, are deemed _weak_ by third-party testing tools such as SSL Labs's SSL Server Test. You can find the list of [Cloudflare-supported Cipher Suites](/ssl/reference/cipher-suites/)

___

## Solution

If the Universal SSL _does not meet your business requirements_, we would recommend using our _Advanced Certificate Manager_. For example, use the Advanced Certificate Manager to cover more than one level of subdomain, remove Cloudflare branding from the Universal certificate, or adjust the shortest certificate lifespan.

You could restrict the Cipher Suites used for TLS using our [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager). After you subscribed to Advance Certificate Manager for your domain, you can [restrict Cipher Suites at the Zone-level requests via the API](/api/operations/zone-settings-change-ciphers-setting). Currently, restricting cipher suites could only be done via API and not available via Cloudflare Dashboard. Assuming this is just a one-time change, you could trigger the API call using curl. **Step-by-step guide:**

1.  Get/view Global API Key _(or create Token)_ from: [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2.  Get Zone ID from the bottom right of Overview page for your domain in Cloudflare Dashboard.
3.  Decide which Cipher Suites you would like to allow from [the list](/ssl/reference/cipher-suites/).

Here is an example value (list of cipher suites) which you can use to replace <cipher\_suites> in the commands below:

```json
["ECDHE-ECDSA-AES128-GCM-SHA256","ECDHE-ECDSA-CHACHA20-POLY1305","ECDHE-RSA-AES128-GCM-SHA256","ECDHE-RSA-CHACHA20-POLY1305","ECDHE-ECDSA-AES256-GCM-SHA384","ECDHE-RSA-AES256-GCM-SHA384"]
```

Run the command to do the API call with the appropriate <zone\_id>, <auth\_email>, <auth\_key>, and <cipher\_suites>:

```bash
curl -X PATCH \
  "https://api.cloudflare.com/client/v4/zones/<zone_id>/settings/ciphers" \
  -H "X-Auth-Email: <auth_email>" \
  -H "X-Auth-Key: <auth_key>" \
  -H "Content-Type: application/json" \
  --data '{"value": <cipher_suites>}'
```

If you choose to use a token, you will not need <auth\_email> nor <auth\_key>. You would instead need <api\_token> and the command will look like this:

```bash
curl -X PATCH \
  "https://api.cloudflare.com/client/v4/zones/<zone_id>/settings/ciphers" \
  -H "Authorization: Bearer <api_token>" \
  -H "Content-Type: application/json" \
  --data '{"value": <cipher_suites>}'
```

To revert to the default Cipher Suites, you can send an empty array as the value, like:

```bash
  --data '{"value": []}'
```

Learn more about API Tokens and Keys here: [Managing API Tokens and Keys](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys)

___

## Additional Resources

-   [Understanding Advanced Certificate Manager](https://support.cloudflare.com/hc/en-us/articles/360044797871-Understanding-Advanced-Certificate-Manager)
-   [Cloudflare SSL cipher, browser, and protocol support](https://support.cloudflare.com/hc/en-us/articles/203041594-Cloudflare-SSL-cipher-browser-and-protocol-support)
