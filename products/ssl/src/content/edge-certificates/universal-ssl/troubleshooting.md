---
order: 5
pcx-content-type: faq
---

# Troubleshooting

## Resolving a timed out state

If a certificate issuance times out, Cloudflare tell you where in the chain of issuance the timeout occurred: Initializing, Validation, Issuance, Deployment, or Deletion.

To resolve timeout issues:

* Change the **Proxy status** of related DNS records to **DNS only** (gray-clouded) and wait at least a minute. Then, change the **Proxy status** back to **Proxied** (orange-clouded).
* [Disable Universal SSL](/edge-certificates/universal-ssl/enable-universal-ssl#disable-universal-ssl) and wait at least a minute. Then, re-enable Universal SSL.
* Send a PATCH request to the [validation endpoint](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method) using the same DCV method (API only).
* Follow the [APEX validation method](/edge-certificates/universal-ssl/changing-dcv-method#apex-validation).
