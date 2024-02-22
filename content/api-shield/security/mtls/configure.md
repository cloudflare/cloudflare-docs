---
title: Configure
pcx_content_type: how-to
weight: 2
meta:
  title: Configure mTLS
---

# Configure mTLS

When you specify API hosts in [mTLS authentication](/api-shield/security/mtls/), Cloudflare will block all requests that do not have a [client certificate](/ssl/client-certificates/) for mTLS authentication.

## Prerequisites

Before you can protect your API or web application with mTLS rules, you need to:

- Check that the certificate installed on your origin server matches the hostname of the client certificate, for example `api.example.com`. Origin server wildcard certificates such as `*.example.com` are not supported.
- [Create a client certificate](/ssl/client-certificates/create-a-client-certificate/).
- [Configure your mobile app or IoT device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device/) to use your Cloudflare-issued client certificate.
- [Enable mutual Transport Layer Security (mTLS) for a host](/ssl/client-certificates/enable-mtls/) in your zone.

{{<render file="_cloudflare-managed-client-cert.md" productFolder="ssl" >}}