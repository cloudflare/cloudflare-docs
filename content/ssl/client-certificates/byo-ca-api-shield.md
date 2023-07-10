---
pcx_content_type: how-to
title: Bring your own CA for API Shield mTLS
weight: 6
meta:
  description: API Shield mTLS now supports client certificates that have not been issued by Cloudflare CA. Learn how you can bring your own CA and use Cloudflare to protect your API.
---

# Bring your own CA for API Shield mTLS

This page explains how you can manage mTLS with [API Shield](/api-shield/) using client certificates that have not been issued by Cloudflare CA.

This is especially useful if you already have mTLS implemented and client certificates issued by your chosen CA are already installed on devices.

## Availability

* Currently, you can only upload your CA via API.
* This process is only available on Enterprise accounts.
* Each Enterprise account can upload up to five CAs. This quota does not apply to CAs uploaded through [Cloudflare Access](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/).

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

4. Create a custom rule to enforce client certificate validation.
You can do this [via the dashboard](/api-shield/security/mtls/configure/) or via API, using the [Create firewall rules endpoint](/api/operations/firewall-rules-create-firewall-rules).

```text
  "expression": "(http.host in {\"<HOSTNAME_1>\" \"<HOSTNAME_2>\"} and not cf.tls_client_auth.cert_verified)", 
  "action": "block"
```

{{<Aside type="warning">}}

Refer to [Firewall Rules API](/firewall/api/cf-firewall-rules/) for more guidance.

Note that, with the [migration of Firewall Rules to WAF Custom Rules](/waf/reference/migration-guides/firewall-rules-to-custom-rules/), some [changes will apply to the API as well](/waf/reference/migration-guides/firewall-rules-to-custom-rules/#relevant-changes-for-api-users).

{{</Aside>}}

## Delete an uploaded CA

If you want to remove a CA that you have previously uploaded, you must first remove any hostname associations that it has.

1. Make a request to the [Replace Hostname Associations endpoint](/api/operations/client-certificate-for-a-zone-put-hostname-associations), with an empty array for `hostnames` and specifying your CA certificate ID in `mtls_certificate_id`:

```text
  "hostnames": [], 
  "mtls_certificate_id": "<CERTIFICATE_ID>"
```

2. Use the [Delete mTLS certificate endpoint](/api/operations/m-tls-certificate-management-delete-m-tls-certificate) to delete the certificate.