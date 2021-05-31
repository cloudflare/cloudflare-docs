---
order: 6
pcx-content-type: faq
---

# Troubleshooting

If your query returns an error even after configuring and embedding a client SSL certificate, check the following settings.

--------

## SSL/TLS handshake
On your terminal, use the following command to check whether an SSL/TLS connection can be established successfully between the client and the API endpoint.
```bash
curl -v --cert /path/to/certificate.pem --key /path/to/key.pem  https://your-api-endpoint.com
```
If the SSL/TLS handshake cannot be completed, check whether the certificate and the private key are correct.

--------

## mTLS host enablement 
On your dashboard, click **SSL/TLS** > **Client Certificates**. Check whether mTLS has been enabled for the correct host. The host should match the API endpoint that you want to protect. For example, if your API endpoint is ``api.trackers.ninja/time``, then you should add ``api.trackers.ninja`` under “Hosts”.
    ![Client Certificates host enablement](../static/client-certificates-host-enablement.png)

--------

## mTLS rules
To review mTLS rules:

1. Click **Firewall** > **Firewall Rules**.
1. On a specific rule, click **Edit**.
1. On that rule, check whether:
    - The Expression Preview is correct
    - The hostname matches your API endpoint. For example, for the API endpoint ``api.trackers.ninja/time``, the rule should look like:
        ```txt
        (http.host in {"api.trackers.ninja"} and not cf.tls_client_auth.cert_verified) 
        ```
1. To edit the rule, either use the user interface or click **Edit expression**.
