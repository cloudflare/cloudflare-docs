---
pcx-content-type: concept
---

import OpportunisticEncryptionDefinition from "../../\_partials/\_opportunistic-encryption-definition.md"

# Opportunistic Encryption

<OpportunisticEncryptionDefinition/>

Use HTTPS when both strong encryption and authentication are required. HTTP Opportunistic Encryption provides a means of enabling TLS when needed for other protocols such as HTTP/2. It does not provide the same indications of security as HTTPS (the green lock icon in most browser address bars).

## Enable Opportunistic Encryption

To set up Opportunistic Encryption:

1.  Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Navigate to **SSL/TLS** > **Edge Certificates**.
3.  For **Opportunistic Encryption**, switch the toggle to **On**.

<Aside type="note">

You do not need to configure your origin web server to support Opportunistic Encryption.

</Aside>
