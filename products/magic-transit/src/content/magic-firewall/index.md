---
title: Magic Firewall
order: 1
---

# Magic Firewall

Magic Firewall is a network-level firewall delivered through Cloudflare to protect your network. It is
configurable by all Magic Transit customers by making calls to Cloudflare's API. Rules can be crafted in
Wireshark syntax, a domain specific language common in the networking world and the same syntax we use
across our other products. With this syntax, you can easily craft extremely powerful rules to precisely
allow or deny any traffic in or out of your network.

Access to the API is controlled by the `#waf:read` and `#waf:write` permissions.

Start by [adding a rule](/magic-firewall/adding-rules)!

<Aside type='warning' header='Important'>

When you or your end users are using other Cloudflare services (eg. CDN, Spectrum) that proxy traffic, be aware of the following:

- Firewall rules that block traffic based on source IP address may not work as intended, since rules are evaluated after Cloudflare terminates the incoming TCP connections.
- You must allow [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
- When using Magic Firewall, fragmented packets are reassembled into complete packets before they are inspected. As a result, you cannot create firewall rules for fragments.

</Aside>

<Aside type="warning" header="Beta">

The Magic Firewall API is currently in beta; contact your account team if you're interested in early access.

</Aside>
