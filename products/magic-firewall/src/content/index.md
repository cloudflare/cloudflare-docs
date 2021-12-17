---
title: Overview
order: 1
pcx-content-type: concept
---

# Magic Firewall

Magic Firewall is a firewall-as-a-service (FWaaS) delivered from the Cloudflare global network to protect office networks and cloud infrastructure with advanced, scalable protection. With Magic Firewall, you can apply filter rules on a variety of criteria, such as protocol and packet length, to filter unwanted traffic before it reaches your network. 

Magic Firewall uses Wireshark syntax, a domain-specific language common in the networking world and the same syntax used across our other products. With this syntax, you can easily craft powerful rules to precisely allow or deny any traffic in or out of your network. You can also choose to create rules from your Cloudflare Dashboard under **Firewall Rulesets** > **Magic Firewall**.

<Aside type='warning' header='Important'>

When you or your end users are using other Cloudflare services (for example, CDN and Spectrum) that proxy traffic, be aware of the following:

- Firewall rules that block traffic based on source IP address may not work as intended because rules are evaluated after Cloudflare terminates the incoming TCP connections.
- You must allow [Cloudflare IP addresses](https://www.cloudflare.com/ips/).
- When using Magic Firewall, fragmented packets are reassembled into complete packets before they are inspected. As a result, you cannot create firewall rules for fragments.

</Aside>
