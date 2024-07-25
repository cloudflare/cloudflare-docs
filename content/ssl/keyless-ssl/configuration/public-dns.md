---
title: Public DNS
pcx_content_type: get-started
weight: 2
meta:
  title: Public DNS setup - Keyless SSL
---

# Public DNS setup

If you cannot use a [Cloudflare Tunnel setup](/ssl/keyless-ssl/configuration/cloudflare-tunnel/), you can also create a public DNS record for your key server.

This setup option is not ideal as the DNS record cannot be [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) and - as a result - will expose the origin IP address of your key server.

---

{{<render file="_keyless-prereqs.md">}}

---

## Step 1 - Create public DNS record


1.  Open a Terminal and run `openssl rand -hex 24` to generate a long, random hostname such as `11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com`.
2.  Add this record via your DNS provider’s interface as an **A** or **AAAA** record pointing to the IP address of your Keyless SSL server.
3.  Use this hostname as the server hostname during initialization of your Keyless SSL server.

{{<Aside type="warning">}}

As a security measure, you should hide the hostname of your key server.

{{</Aside>}}

---

## Step 2 — Upload Keyless SSL Certificates

{{<render file="_keyless-upload-preamble.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a Keyless certificate in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and zone.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  Select **Upload Keyless SSL Certificate**.
4.  Fill in the upload modal with the certificate and other details and select **Add**.

| Label | Description | Example Values |
| --- | --- | --- |
| Key server label | Any unique identifier for your key server. | “test-keyless”, “production-keyless-1” |
| Key server hostname | The hostname of your key server that holds the key for this certificate (such as the random hostname generated earlier). | 11aa40b4a5db06d4889e48e2f738950ddfa50b7349d09b5f.example.com |
| Key server port | Set to 2407 unless you have changed this on the key server. | 2407 |
| SSL Certificate | The valid X509v3 SSL certificate (in PEM form) for which you hold the private key. | (PEM bytes) |
| Bundle method | This should almost always be **Compatible**. Refer to [Uploading Custom Certificates](/ssl/edge-certificates/custom-certificates/uploading/) for more details. | Compatible |

{{</tab>}}
{{<tab label="api" no-code="true">}}

To create a Keyless certificate with the API, send a [`POST`](/api/operations/keyless-ssl-for-a-zone-create-keyless-ssl-configuration) request.

{{</tab>}}
{{</tabs>}}

---

## Step 3 — Set up and activate key server

{{<render file="_keyless-key-server-setup.md" withParameters="11aa40b4a5db06d4889e48e2f.example.com">}}

### Allow incoming connections from Cloudflare

During TLS handshakes, Cloudflare’s keyless client will initiate connections to the key server hostname or IP address you specify during certificate upload. By default, the keyless client will use a destination TCP port of 2407, but this can be changed during certificate upload or by editing the certificate details after upload.

Create WAF custom rules that allow your key server to accept connections from only Cloudflare. We publish our IPv4 and IPv6 addresses [via our API](/api/operations/cloudflare-i-ps-cloudflare-ip-details).
