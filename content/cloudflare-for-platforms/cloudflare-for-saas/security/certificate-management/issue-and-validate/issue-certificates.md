---
pcx_content_type: how-to
title: Issue
weight: 1
meta:
    title: Issue certificates
---

# Issue certificates

Cloudflare automatically issues certificates when you [create a custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/create-custom-hostnames/).

{{<Aside type="note">}}

There are several required steps before a custom hostname and its certificate can become active. For more details, refer to our [Get started guide](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).

{{</Aside>}}

## Certificate authorities

If you create the custom hostname via API, you can leave the `certificate_authority` parameter empty to set it to “default CA”. With this option, Cloudflare checks the CAA records before requesting the certificates, which helps ensure the certificates can be issued from the CA.

Refer to [this certificate authorities reference page](/ssl/reference/certificate-authorities/) to learn more about the CAs that Cloudflare uses to issue SSL/TLS certificates.

## Certificate details and compatibility

{{<render file="_issue-certs-preamble.md">}}