---
pcx_content_type: how-to
title: Add locations
weight: 1
---

# Add locations

{{<render file="gateway/_add-locations.md">}}

10. Change the DNS resolvers on your router, browser, or OS by following the setup instructions in the UI.

11. Select **Go to DNS Location**. Your location will appear in your list of locations.

You can now apply [DNS policies](/cloudflare-one/policies/gateway/dns-policies/) to your location using the [Location selector](/cloudflare-one/policies/gateway/dns-policies/#location).

{{<render file="gateway/_add-locations-static-ip-warning.md">}}

## DNS endpoints

### IPv4 and IPv6 DNS

Cloudflare will prefill the [**Source IPv4 Address**](/cloudflare-one/connections/connect-devices/agentless/dns/locations/dns-resolver-ips/#source-ip) based on the network you are on. Enterprise users have the option of using [dedicated DNS resolver IP addresses](/cloudflare-one/connections/connect-devices/agentless/dns/locations/dns-resolver-ips/#dns-resolver-ip) assigned to their account.

You do not need to configure the IPv4 DNS endpoint if:

- Your network only uses IPv6.
- Your users will send all DNS requests from this location using [DNS over HTTPS](#dns-over-https-doh) via a browser.
- You will deploy the [WARP client](/cloudflare-one/connections/connect-devices/warp/).

{{<Aside type="note" header="Your IPv4 address is taken">}}

When you try to configure a DNS location over IPv4, Gateway may display a **Your source IPv4 address is taken** error. This may mean someone else in the same network configured Gateway before you did. If your network supports IPv6, you can still use Gateway's DNS filtering by sending DNS queries over IPv6. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

If you think someone else is wrongfully using this IPv4 address, [contact Cloudflare support](/support/contacting-cloudflare-support/#getting-help-with-an-issue).

{{</Aside>}}

### DNS over TLS (DoT)

{{<glossary-definition term_id="DNS over TLS">}}

For more information, refer to [DNS over TLS](/cloudflare-one/connections/connect-devices/agentless/dns/dns-over-tls/).

### DNS over HTTPS (DoH)

{{<glossary-definition term_id="DNS over HTTPS">}}

Gateway requires a DoH endpoint for default DNS locations. For more information, refer to [DNS over HTTPS](/cloudflare-one/connections/connect-devices/agentless/dns/dns-over-https/).
