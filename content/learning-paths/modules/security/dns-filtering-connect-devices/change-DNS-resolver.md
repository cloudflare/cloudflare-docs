---
title: Connect without an agent
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

The fastest way to start filtering DNS queries is to change your DNS resolver to use a specific Gateway endpoint. You can make this change at the browser, OS, or router level.

Choose this option if:

- You want to try out DNS filtering without installing software.
- You do not need to filter by user identity.
- You want to apply blanket DNS policies to all devices in a physical location, such as a retail store or office.

## Change DNS resolver in browser

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
