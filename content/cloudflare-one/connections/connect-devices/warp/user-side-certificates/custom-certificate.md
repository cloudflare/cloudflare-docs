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

To deploy a custom root certificate:

1. Verify that the certificate is installed on your devices.

2. Upload the certificate and private key to Cloudflare. The certificate must be a root CA.

    ```bash
    curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/mtls_certificates"\
        -H "X-Auth-Email: <EMAIL>" \
        -H "X-Auth-Key: <API_KEY>" \
        -H "Content-Type: application/json" \
        --data '{
            "name":"example_ca_cert",
            "certificates":"<ROOT_CERTIFICATE>",
            "private_key":"<PRIVATE_KEY>",
            "ca":true
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
    highlight: [10, 11, 12, 13, 14]
    ---
    curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/gateway/configuration"\
        -H "X-Auth-Email: <EMAIL>" \
        -H "X-Auth-Key: <API_KEY>" \
        -H "Content-Type: application/json" \
        --data '{
            "settings":
            {
                "antivirus": {...},
                "block_page": {...},
                "custom_certificate":
                {
                    "enabled": true,
                    "id": "2458ce5a-0c35-4c7f-82c7-8e9487d3ff60"
                }
                "tls_decrypt": {...},
                "activity_log": {...},
                "browser_isolation": {...},
                "fips": {...},
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

Once `binding_status` changes to `active`, Gateway will sign your traffic using the custom root certificate and private key.  If you disable the custom certificate, Gateway will revert to the default Cloudflare certificate.
