---
pcx_content_type: how-to
title: Bring your own CA for mTLS
weight: 6
meta:
  description: Cloudflare mTLS now supports client certificates that have not been issued by Cloudflare CA. Learn how you can bring your own CA and use it with Cloudflare mTLS.
---

# Bring your own CA for mTLS

This page explains how you can manage mTLS using client certificates that have not been issued by Cloudflare CA.

This is especially useful if you already have mTLS implemented and client certificates are already installed on devices.

## Availability

* Currently, you can only manage your uploaded CA via API, and the hostname associations are **not** reflected on the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates/).
* This process is only available on Enterprise accounts.
* Each Enterprise account can upload up to five CAs. This quota does not apply to CAs uploaded through [Cloudflare Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

## CA certificate requirements

{{<render file="_byo-ca-mtls-cert-requirements.md">}}<br />

## Set up mTLS with your CA

1. Use the [Upload mTLS certificate endpoint](/api/operations/m-tls-certificate-management-upload-m-tls-certificate) to upload the CA root certificate.

  {{<definitions>}}

  - `ca` {{<type>}}boolean{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Set to `true` to indicate that the certificate is a CA certificate.

  - `certificates` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Insert content from the `.pem` file associated with the CA certificate, formatted as a single string with `\n` replacing the line breaks.

  - `name` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
    - Indicate a unique name for your CA certificate.

  {{</definitions>}}

2. Take note of the certificate ID (`id`) that is returned in the API response.
3. Use the [Replace Hostname Associations endpoint](/api/operations/client-certificate-for-a-zone-put-hostname-associations) to enable mTLS in each hostname that should use the CA for mTLS validation. Use the following parameters:

  {{<definitions>}}

  - `hostnames` {{<type>}}array{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - List the hostnames that will be using the CA for client certificate validation.

    - {{<Aside type="warning">}}
  Submitting an empty array will remove all hostnames associations.
  {{</Aside>}}

  - `mtls_certificate_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Indicate the certificate ID obtained from the previous step.

    - {{<Aside type="warning">}}
  If no `mtls_certificate_id` is provided, the action will be performed against a Cloudflare Managed CA.
  {{</Aside>}}

  {{</definitions>}}

4. (Optional) Since this process is API-only, and hostnames that use your uploaded CA certificate **are not** listed on the dashboard, you can make a [GET request](/api/operations/client-certificate-for-a-zone-list-hostname-associations) with the `mtls_certificate_id` as a query parameter to confirm the hostname association.

5. Create a custom rule to enforce client certificate validation.
You can do this [via the dashboard](/api-shield/security/mtls/configure/) or [via API](/waf/custom-rules/create-api/).

```text
  "expression": "(http.host in {\"<HOSTNAME_1>\" \"<HOSTNAME_2>\"} and not cf.tls_client_auth.cert_verified)",
  "action": "block"
```

## Delete an uploaded CA

If you want to remove a CA that you have previously uploaded, you must first remove any hostname associations that it has.

1. Make a request to the [Replace Hostname Associations endpoint](/api/operations/client-certificate-for-a-zone-put-hostname-associations), with an empty array for `hostnames` and specifying your CA certificate ID in `mtls_certificate_id`:

```text
  "hostnames": [],
  "mtls_certificate_id": "<CERTIFICATE_ID>"
```

2. Use the [Delete mTLS certificate endpoint](/api/operations/m-tls-certificate-management-delete-m-tls-certificate) to delete the certificate.
