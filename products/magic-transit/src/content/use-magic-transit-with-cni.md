---
title: Use Network Interconnect
order: 4
---

# Use Cloudflare Network Interconnect

## Onboarding

When setting up Magic Transit to work with [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect), the onboarding process includes the following additional steps:

1. Scope your configuration.

2. Cloudflare generates Letters of Authorization (LOAs) for your CNI cross-connects and sends them to your organization.

3. Order the cross-connects that you want to use with CNI. You can use any of the following:
    * **Private network interconnects (PNI)** are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224).
    * **Virtual private network interconnects (vPNI)** allow you to easily connect with Cloudflare at any of our interconnection platform locations.
    * **Internet exchange point (IXP)** interconnects allow you to establish a link with Cloudflare at any of the [more than 200 IXPs](https://bgp.he.net/AS13335#_ix) in which we participate.

4. You send Cloudflare confirmation when the cross-connects are in place.

5. Cloudflare supplies customers with the GRE IPs and BGP Peering info, which is completed after GRE tunnels in CNI links are onboarded.

6. The customer and Cloudflare work to establish the BGP session for the PNI on both sides. A BGP call is needed, and the customer provides a ~2hr maintenance window.

7. The customer configures the GRE tunnel over the PNI.

8. Cloudflare up-prefs the CNI connection and turns Magic Transit back on.

Each of these steps can take 1–7 business days.

For more details on the CNI onboarding process, see [_Set up Cloudflare Network Interconnect: Onboarding_](https://developers.cloudflare.com/network-interconnect/set-up-cni/onboarding).

## Guidelines

When working with Magic Transit and CNI, observe these guidelines:

* Cloudflare Network Interconnect does not support 1500 byte packets, so you still need to implement MSS clamping.

* You must set the MSS clamp size to 1332 bytes to accommodate the additional overhead from the Foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the colocation facility where traffic is ingested (close to the end user) to the facility with the CNI link.

* Cloudflare Network Interconnect does not process outgoing traffic from your data centers. Egress traffic returns to end users through direct server return (DSR), not through Cloudflare. For this reason, CNI is not a replacement for your existing transit providers.
