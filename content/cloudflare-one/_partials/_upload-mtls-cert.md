---
_build:
  publishResources: false
  render: never
  list: never
---

Use the [Upload mTLS certificate endpoint](/api/operations/m-tls-certificate-management-upload-m-tls-certificate) to upload the certificate and private key to Cloudflare. The certificate must be a root CA, formatted as a single string with `\n` replacing the line breaks.

   ```bash
   curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/mtls_certificates" \
   --header "X-Auth-Email: <EMAIL>" \
   --header "X-Auth-Key: <API_KEY>" \
   --header "Content-Type: application/json" \
   --data '{
     "name": "example_ca_cert",
     "certificates": "-----BEGIN CERTIFICATE-----\nXXXXX\n-----END CERTIFICATE-----",
     "private_key": "-----BEGIN PRIVATE KEY-----\nXXXXX\n-----END PRIVATE KEY-----",
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
