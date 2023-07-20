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

Cipher suites has to be disabled when you have [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager) purchased. After you have subscribed to Advanced Certificate Manager for the zone, you can [restrict Cipher Suites at the Zone-level requests via the API](/api/operations/zone-settings-change-ciphers-setting). Currently, restricting cipher suites could only be done via API and not available via Cloudflare Dashboard. Assuming this is just a one-time change, you could trigger the API call using curl. **Step-by-step guide:**

1.  [Get/view Global API Key _(or create Token)_](/fundamentals/api/get-started/keys/)
2.  [Get the Zone ID via Cloudflare Dashboard _(or API)_](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/)
3.  Decide which cipher suites you would like to allow from [the list](/ssl/reference/cipher-suites/supported-cipher-suites/)

Here is an example value (list of cipher suites) which you can use to replace <cipher\_suites> in the commands below:

```json
["ECDHE-ECDSA-AES128-GCM-SHA256","ECDHE-ECDSA-CHACHA20-POLY1305","ECDHE-RSA-AES128-GCM-SHA256","ECDHE-RSA-CHACHA20-POLY1305","ECDHE-ECDSA-AES256-GCM-SHA384","ECDHE-RSA-AES256-GCM-SHA384"]
```

Run the `curl` command to do the API call with the appropriate <zone\_id>, <auth\_email>, <auth\_key>, and <cipher\_suites>:

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

Learn more about API Tokens and Keys here: [Managing API Tokens and Keys](/fundamentals/api/get-started/)

___

## Additional Resources

-   [Understanding Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/)
-   [Browser compatibility](/ssl/reference/browser-compatibility/)
-   [Cipher suites recommendations](/ssl/reference/cipher-suites/recommendations/)
