---
pcx_content_type: reference
title: Reference
weight: 9
---

# Magic WAN Connector device information

Magic WAN Connector software is certified for use on the [Dell Networking Virtual Edge Platform](https://www.dell.com/support/home/en-us/product-support/product/dell-emc-networking-vep1445-vep1485/docs). It can be purchased with software pre-installed through our partner network for plug-and-play connectivity to Cloudflare One.

## Security and other information

- Cloudflare ensures the Magic WAN Connector device is secure and is not altered via TPM/Secure boot (does not apply to Virtual Connector).
- Connectivity to the Cloudflare global network is secure and all traffic is encrypted through {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunneling.
- The Magic WAN Connector does not support fail open.
- Customers have the ability to layer on additional security features/policies that are enforced at the Cloudflare network.

---

## ICMP traffic

{{<glossary-tooltip term_id="ICMP">}}ICMP traffic{{</glossary-tooltip>}} is routed through the Internet and bypasses [Cloudflare Gateway](/cloudflare-one/policies/gateway/). This enables you to ping resources on the Internet from the Magic WAN connector directly, which can be useful for debugging.

---

## VLAN ID

This feature allows you to have multiple [virtual LANs](https://www.cloudflare.com/learning/network-layer/what-is-a-lan/) (VLANs) configured over the same physical port on your Magic WAN Connector. VLAN tagging adds an extra header to packets in order to identify which VLAN the packet belongs to and to route it appropriately. This effectively allows you to run multiple networks over the same physical port.

A non-zero value set up for the VLAN ID field in your WAN/LAN is used to handle VLAN-tagged traffic. Cloudflare uses the VLAN ID to handle traffic coming into your Magic WAN Connector device, and applies a VLAN tag with the configured VLAN ID for traffic going out of your Connector through WAN/LAN.

You can setup VLAN IDs both for WAN and LAN. Refer to [Configure hardware connector](/magic-wan/configuration/connector/configure-hardware-connector/) or [Configure software connector](/magic-wan/configuration/connector/configure-virtual-connector/) to learn where you can set up VLAN IDs.