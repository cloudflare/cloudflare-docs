---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 7
meta:
  title: Troubleshooting client certificates
---

# Troubleshooting client certificates

If your query returns an error even after configuring and embedding a client SSL certificate, check the following settings.

---

## Check SSL/TLS handshake

On your terminal, use the following command to check whether an SSL/TLS connection can be established successfully between the client and the API endpoint.

```sh
$ curl -v --cert /path/to/certificate.pem --key /path/to/key.pem  https://your-api-endpoint.com
```

If the SSL/TLS handshake cannot be completed, check whether the certificate and the private key are correct.

---

## Check mTLS hosts

Check whether [mTLS has been enabled](/ssl/client-certificates/enable-mtls/) for the correct host. The host should match the API endpoint that you want to protect.

---

## Review mTLS rules

To review mTLS rules:

1.  Select **Security** > **WAF** > **Firewall rules**.
2.  On a specific rule, select **Edit**.
3.  On that rule, check whether:

    - The Expression Preview is correct.
    - The hostname matches your API endpoint. For example, for the API endpoint `api.trackers.ninja/time`, the rule should look like:

      ```txt
      (http.host in {"api.trackers.ninja"} and not cf.tls_client_auth.cert_verified)
      ```

4.  To edit the rule, either use the user interface or select **Edit expression**.
