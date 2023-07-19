---
pcx_content_type: concept
title: Opportunistic Encryption
---

# Opportunistic Encryption

Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel. It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

## Availability

{{<feature-table id="ssl.opportunistic_encryption">}}

## Enable Opportunistic Encryption

You do not need to configure your origin web server to support Opportunistic Encryption. All it requires is updating your settings in the Cloudflare dashboard.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable Opportunistic Encryption in the dashboard:
 
1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  For **Opportunistic Encryption**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your Opportunistic Encryption settings with the API, send a [`PATCH`](/api/operations/zone-settings-change-opportunistic-encryption-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}