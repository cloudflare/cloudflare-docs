---
pcx-content-type: how-to
title: Manage custom hostname certificates
weight: 3
---

# Manage custom hostname certificates

## Issue certificates

Once you have [set up your Cloudflare for SaaS application](/cloudflare-for-saas/getting-started/), you can start issuing new certificates for your customers.

{{<render file="_issue-certs-preamble.md">}}

### Via the dashboard

{{<render file="_create-custom-hostname.md">}}

### Via the API

{{<render file="_create-custom-hostname-api.md">}}

---

## Edit certificates

### Via the dashboard

To edit a certificate in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select your Cloudflare for SaaS application.
3. Navigate to **SSL/TLS** > **Custom Hostnames**.
4. On a specific hostname, select **Edit**.
5. Update settings as needed.
6. Select **Save**.

### Via the API

To edit a certificate using the API, send a [PATCH](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) request with updated values for specified fields.

---

## Refresh certificates

When you refresh a certificate, it requests an immediate recheck for validation and certificate issuance (rather than [waiting for the next retry](/ssl/ssl-tls/validation-backoff-schedule/)).

### Via the dashboard

To refresh a certificate in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select your Cloudflare for SaaS application.
3. Navigate to **SSL/TLS** > **Custom Hostnames**.
4. On a specific hostname, select **Refresh**.

### Via the API

To refresh a certificate using the API, send a [PATCH](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) request with the same values as your initial POST request.

---

## Delete certificates

### Via the dashboard

To delete a certificate in the dashboard:

{{<render file="_delete-custom-hostname-dash.md">}}

### Via the API

To delete a certificate using the API, send a [DELETE](https://api.cloudflare.com/#custom-hostname-for-a-zone-delete-custom-hostname-and-any-issued-ssl-certificates-) request.