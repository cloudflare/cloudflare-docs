---
pcx_content_type: how-to
title: Deploy custom certificate
weight: 3
meta:
  description: Configure WARP to use a custom root certificate instead of the Cloudflare certificate.
---

# Deploy a custom certificate

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

Enterprise customers who do not wish to install the [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/) have the option to upload their own root certificate to Cloudflare. Gateway will use your uploaded certificate to encrypt all sessions between the end user and Gateway, enabling all HTTPS inspection features that previously required the Cloudflare certificate. You can upload multiple certificates to your account, but only one can be active at any given time.

When preparing your certificate and private key for upload, be sure to remove any unwanted characters, such as mismatching subdomains in the certificate's common name.

To deploy a custom root certificate:

1. Verify that the certificate is installed on your devices.

2. Upload the certificate and private key to Cloudflare. The certificate must be a root CA.

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/mtls_certificates" \
   --header "X-Auth-Email: <EMAIL>" \
   --header "X-Auth-Key: <API_KEY>" \
   --header "Content-Type: application/json" \
   --data '{
     "name": "example_ca_cert",
     "certificates": "<ROOT_CERTIFICATE>",
     "private_key": "<PRIVATE_KEY>",
     "ca": true
   }'
   ```

   The response will return a UUID for the certificate:

   ```json
   ---
   highlight: [6]
   ---
   {
   "success": true,
   "errors": [],
   "messages": [],
   "result": {
       "id": "2458ce5a-0c35-4c7f-82c7-8e9487d3ff60",
       "name": "example_ca_cert",
       "issuer": "O=Example Inc.,L=California,ST=San Francisco,C=US",
       "signature": "SHA256WithRSA"
       ...
   }
   ```

3. Enable the certificate in Gateway:

   ```bash
   ---
   highlight: [10]
   ---
   curl --request PATCH \
   "https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/configuration" \
   --header "X-Auth-Email: <EMAIL>" \
   --header "X-Auth-Key: <API_KEY>" \
   --header "Content-Type: application/json" \
   --data '{
     "settings": {
       "custom_certificate": {
         "enabled": true,
         "id": "2458ce5a-0c35-4c7f-82c7-8e9487d3ff60"
       }
     }
   }'
   ```

   The response will show the current status of the certificate:

   ```json
   ---
   highlight: [13]
   ---
   {
   "success": true,
   "errors": [],
   "messages": [],
   "result": {
         "settings": {
               "antivirus": {...},
               "block_page": {...},
               "custom_certificate":
               {
                   "enabled": true,
                   "id": "2458ce5a-0c35-4c7f-82c7-8e9487d3ff60",
                   "binding_status": "pending_deployment",
                   "qs_pack_id": "50a78g31-a5b5-4k58d-a6ed-b0ac17da9k05"
               },
               "tls_decrypt": {...},
               "activity_log": {...},
               "browser_isolation": {...},
               "fips": {...},
           },
       },
       "created_at": "2014-01-01T05:20:00.12345Z",
       "updated_at": "2014-01-01T05:20:00.12345Z"
   }
   ```

Once `binding_status` changes to `active`, Gateway will sign your traffic using the custom root certificate and private key. If you disable the custom certificate, Gateway will revert to the default Cloudflare certificate.

{{<Aside type="note" header="Troubleshooting">}}

If Gateway presents an **HTTP Response Code: 526** after deploying a custom certificate, you can [troubleshoot errors with our FAQ](/cloudflare-one/faq/teams-troubleshooting/#i-see-error-526-when-browsing-to-a-website).

{{</Aside>}}
