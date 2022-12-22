---
title: Generic SSO guide
pcx_content_type: how-to
weight: 1
meta:
    title: Generic single sign-on integration guide
---

# Generic single sign-on integration guide

Below is a generic guide to successfully set up an identity provider based SAML. These options might change depending on your identity provider (IDP). However, make sure you set up the following or equivalent options.

{{<render file="_generic-plus-azure-sso.md">}}

## Troubleshooting

If you have trouble connecting your SAML provider to Area 1, make sure that:

- The users you have configured in your SAML provider exist in the Area 1 dashboard.
- You are using email address as an attribute (in step 2, refer to **Name ID format** and **Application username**).
- You are using the SHA-1 algorithm.
- Your encryption is set to 2048 bits.

If all else fails, enable Chrome browser debug logs. Then, log your activity when SSO is initiated, and contact [Cloudflare support](https://support.cloudflare.com/hc/articles/200172476).