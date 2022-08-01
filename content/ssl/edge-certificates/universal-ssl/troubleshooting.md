---
title: Troubleshooting
pcx_content_type: faq
weight: 6
meta:
  title: Troubleshooting Universal SSL
---

# Troubleshooting Universal SSL

## Resolve a timed out state

If a certificate issuance times out, Cloudflare tells you where in the chain of issuance the timeout occurred: Initializing, Validation, Issuance, Deployment, or Deletion.

To resolve timeout issues, try one or more of the following options:

- Change the **Proxy status** of related DNS records to **DNS only** (gray-clouded) and wait at least a minute. Then, change the **Proxy status** back to **Proxied** (orange-clouded).
- [Disable Universal SSL](/ssl/edge-certificates/universal-ssl/disable-universal-ssl/) and wait at least a minute. Then, re-enable Universal SSL.
- Send a PATCH request to the [validation endpoint](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method) using the same DCV method (API only).
- Follow the [APEX validation method](/ssl/edge-certificates/changing-dcv-method/methods/#perform-dcv).

## Other issues

For additional troubleshooting help, refer to [Troubleshooting SSL errors](https://support.cloudflare.com/hc/articles/200170566).
