---
title: Testing in your browser
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

# Change DNS resolver in browser

To configure your browser to send traffic to Gateway:

1. Obtain your DNS over HTTPS (DoH) address:
    1. Go to **Gateway** > **DNS Locations**.
    2. Select the default location.
    3. Copy your **DNS over HTTPS** hostname: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`
2. Follow the configuration instructions for your browser:

    {{<render file="gateway/_doh-instructions.md" productFolder="cloudflare-one">}}

3. Verify that third-party firewall or TLS decryption software does not inspect or block traffic to the DoH endpoint: `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

DNS filtering is now enabled for this browser.

To configure your router or OS, or to add additional DNS endpoints, refer to [DNS locations](/cloudflare-one/connections/connect-devices/agentless/dns/locations/).

The Cloudflare WARP client (known as the Cloudflare One Agent in mobile app stores) allows you to protect corporate devices by securely and privately sending traffic from those devices to Cloudflare’s global network, where Cloudflare Gateway can apply advanced web filtering.

Choose this option if:

- You want to create DNS policies based on user identity.
- You want to apply consistent policies for both remote and on-site users.
- You are interested in progressing from DNS-only security to the advanced protection offered by a Secure Web Gateway.
