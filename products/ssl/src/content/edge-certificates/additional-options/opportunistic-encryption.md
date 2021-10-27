---
pcx-content-type: concept
---

import OpportunisticEncryptionDefinition from "../../_partials/_opportunistic-encryption-definition.md"

# Opportunistic Encryption

<OpportunisticEncryptionDefinition/>

## Overview
Opportunistic Encryption allows browsers to benefit from the improved performance of HTTP/2 by letting them know that your site is available over an encrypted connection (TLS channel). Browsers will continue to show “http” in the address bar, not “https”.

It's not a replacement for HTTPS (and will not show the lock icon in browsers), but Opportunistic Encryption does provide a more secure connection. kjnkjn

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

##  Enable Opportunistic Encryption

To set up Opportunistic Encryption:
1. Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2. Navigate to **SSL/TLS** > **Edge Certificates**.
3. For **Opportunistic Encryption**, switch the toggle t **On**.

<Aside type="note">

You do not need to configure your origin web server to support Opportunistic Encryption.

</Aside>