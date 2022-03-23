---
title: Troubleshooting
pcx-content-type: faq
weight: 7
meta:
  title: Troubleshooting client certificates
---

# Troubleshooting client certificates

If your query returns an error even after configuring and embedding a client SSL certificate, check the following settings.

---

## Check SSL/TLS handshake

On your terminal, use the following command to check whether an SSL/TLS connection can be established successfully between the client and the API endpoint.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -v --cert /path/to/certificate.pem --key /path/to/key.pem  https://your-api-endpoint.com</span></div></span></span></span></code></pre>{{</raw>}}

If the SSL/TLS handshake cannot be completed, check whether the certificate and the private key are correct.

---

## Check mTLS hosts

Check whether [mTLS has been enabled](/ssl/client-certificates/enable-mtls/) for the correct host. The host should match the API endpoint that you want to protect.

---

## Review mTLS rules

To review mTLS rules:

1.  Click **Security** > **WAF** > **Firewall rules**.
2.  On a specific rule, click **Edit**.
3.  On that rule, check whether:

    - The Expression Preview is correct.
    - The hostname matches your API endpoint. For example, for the API endpoint `api.trackers.ninja/time`, the rule should look like:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(http.host in {&quot;api.trackers.ninja&quot;} and not cf.tls_client_auth.cert_verified)</span></div></span></span></span></code></pre>{{</raw>}}

4.  To edit the rule, either use the user interface or click **Edit expression**.
