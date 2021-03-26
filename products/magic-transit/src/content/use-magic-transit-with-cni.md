---
title: Use Network Interconnect
order: 4
---

# Use Cloudflare Network Interconnect

## Onboarding

The onboarding process to set up Magic Transit with [Cloudflare Network Interconnect (CNI)](https://developers.cloudflare.com/network-interconnect) includes the steps below.

1. Scope your configuration.

2. Cloudflare generates Letters of Authorization (LOAs) for your CNI cross-connects and sends them to your organization.

3. Order the cross-connects you want to use with CNI. You can use any of the following:
    * **Private network interconnects (PNI)** - Available at any of our [private peering facilities](https://www.peeringdb.com/net/4224).
    * **Virtual private network interconnects (vPNI)** - Allows you to easily connect with Cloudflare at any of our interconnection platform locations.
    * **Internet exchange point (IXP)** interconnects - Allow you to establish a link with Cloudflare at any of the [more than 200 IXPs](https://bgp.he.net/AS13335#_ix) in which we participate.

4. Send Cloudflare confirmation after the cross-connects are set up.

5. Cloudflare provides the GRE IPs and BGP Peering info after onboarding the GRE tunnels in CNI links.

6. Work with Cloudflare to establish the BGP session for the PNI on both sides. This requires a BGP call and a ~2 hour maintenance window provided by the customer.

7. Configure the GRE tunnel over the PNI.

8. Cloudflare up-prefs the CNI connection and turns Magic Transit back on.

Each step can take 1–7 business days.

For more details on the CNI onboarding process, see [_Set up Cloudflare Network Interconnect: Onboarding_](https://developers.cloudflare.com/network-interconnect/set-up-cni/onboarding).

## Guidelines

When working with Magic Transit and CNI, observe these guidelines:

* Because Cloudflare Network Interconnect does not support 1500 byte packets, you must implement MSS clamping.

* Set the MSS clamp size to 1332 bytes to accommodate the additional overhead from the Foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the colocation facility where traffic is ingested—close to the end user—to the facility with the CNI link.

* Cloudflare Network Interconnect does not process outgoing traffic from your data centers. Egress traffic returns to end users through direct server return (DSR), not through Cloudflare. For this reason, CNI cannot replace your existing transit providers.
