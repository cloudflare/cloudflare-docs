---
pcx_content_type: how-to
title: Zone-level
weight: 1
meta:
    title: Zone-level Authenticated Origin Pulls
---

# Zone-level Authenticated Origin Pulls

{{<render file="_aop-setup-intro.md" withParameters="zone-level;;your zone">}} <br />

## Before you begin

* Make sure your zone is using an [SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/) of **Full** or higher.
* Decide between using the Cloudflare certificate or a custom certificate (recommended).

{{<Aside type="warning">}}

Although Cloudflare provides you a certificate to easily configure zone-level authenticated origin pulls, this certificate is not exclusive to your account and only guarantees that a request is coming from the Cloudflare network. If you want more strict security, you should upload your own certificate.

Using a custom certificate is required if you need your domain to be [FIPS](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standards) compliant.

{{</Aside>}}

## 1. Place the certificates

First, upload a certificate to your origin and, if it is a custom certificate, also upload it to Cloudflare. This is the client certificate that Cloudflare will present when sending outbound requests to your origin server.


{{<tabs labels="Custom certificate (recommended) | Cloudflare certificate">}}
{{<tab label="custom certificate (recommended)" no-code="true">}}

To use a custom certificate:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and select your domain.

2. Go to **SSL/TLS** > **Origin Server**.

3. Under **Authenticated Origin Pulls**, select **Upload Certificate**.

4. Copy and paste relevant values into **SSL Certificate** and **Private key** text areas (or select **Paste from file**).

{{<Aside type="note">}}
If doing this manually, include the `---BEGIN CERTIFICATE---` and `---END CERTIFICATE---`, as shown on the placeholder text.
{{</Aside>}}

5. Select **Upload Custom Certificate**. If you upload multiple certificates, the most recently uploaded is the one that will be used.

{{<Aside type="note">}}
To upload a custom certificate via API, follow the API instructions to [upload a custom certificate to Cloudflare](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate), but use the [`origin_tls_client_auth` endpoint](/api/operations/zone-level-authenticated-origin-pulls-upload-certificate).
{{</Aside>}}

6. Upload the certificate to your origin.

{{</tab>}}
{{<tab label="cloudflare certificate" no-code="true">}}

To use a Cloudflare certificate:

1. [Download the .PEM file](/ssl/static/authenticated_origin_pull_ca.pem). This certificate is available by default on Cloudflare and will be used if you do not upload a custom certificate.
2. Upload the certificate to your origin.

{{<Aside type="warning">}}
This certificate is **not** the same as the Cloudflare Origin CA certificate and will not appear on your Dashboard.
{{</Aside>}}

{{</tab>}}
{{</tabs>}}

## 2. Configure origin to accept client certificates

{{<render file="_aop-configure-origin.md">}}

## 3. Enable zone-level Authenticated Origin Pulls

Then, enable the Authenticated Origin Pulls feature as an option for your Cloudflare zone.

This step sets the TLS Client Auth to require Cloudflare to use a client certificate when connecting to your origin server.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Authenticated Origin Pulls** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and select your domain.
2.  Go to **SSL/TLS** > **Origin Server**.
3.  For **Authenticated Origin Pulls**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Authenticated Origin Pulls** with the API

1. Send a [`PATCH`](/api/operations/zone-settings-change-tls-client-auth-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`) - This step means Authenticated Origin Pulls will be available, but you still have to go through the following step to complete the configuration.
2. Send a [`PUT`](/api/operations/zone-level-authenticated-origin-pulls-set-enablement-for-zone) request to enable zone-level authenticated origin pulls.

{{</tab>}}
{{</tabs>}}

If you had set up logging on your origin during [step 2](#2-configure-origin-to-accept-client-certificates), test and confirm that Authenticated Origin Pulls is working.

##  4. Enforce validation check on your origin

{{<render file="_aop-enforce-validation.md">}}