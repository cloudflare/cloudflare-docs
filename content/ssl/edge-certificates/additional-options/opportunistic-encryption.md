---
pcx_content_type: concept
title: Opportunistic Encryption
---

# Opportunistic Encryption

{{<render file="_opportunistic-encryption-definition.md">}}

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

## Enable Opportunistic Encryption

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable Opportunistic Encryption in the dashboard:
 
1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Navigate to **SSL/TLS** > **Edge Certificates**.
3.  For **Opportunistic Encryption**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your Opportunistic Encryption settings with the API, send a [`PATCH`](https://api.cloudflare.com/#zone-settings-change-opportunistic-encryption-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

You do not need to configure your origin web server to support Opportunistic Encryption.

{{</Aside>}}
