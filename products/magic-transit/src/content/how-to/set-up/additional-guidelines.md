---
title: Additional guidelines
weight: 213
---


When working with Magic Transit, see these topics for additional guidelines and best practices:

* [Maximum segment size (MSS)](#maximum-segment-size-(mss))
* [Routing change impacts](#routing-change-impacts)
* [Route prefixes smaller than /24](#route-prefixes-smaller-than-/24)
* [Cloudflare Network Interconnect guidelines](#cloudflare-network-interconnect)

## Maximum segment size (MSS)

Cloudflare uses GRE tunnels to deliver packets from our edge to your data center(s). Cloudflare Magic Transit encapsulates these packets, adding a new IP header and GRE protocol header.

As a consequence, the maximum segment size (MSS) must be adjusted to accommodate the additional header data so that the packet complies with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes. When using Magic Transit, MSS must be set to 1436 bytes:

<table style='border:none'>
	<tr>
		<td></td>
		<td><strong>Standard Internet routable MTU</strong></td>
		<td style='text-align:right'>1500 bytes</td>
	</tr>
	<tr>
		<td><strong>&#45;</strong></td>
		<td><strong>Original IP header</strong></td>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<td><strong>&#45;</strong></td>
		<td><strong>Original protocol header (TCP)</strong></td>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<td><strong>&#45;</strong></td>
		<td><strong>New IP header</strong></td>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<td><strong>&#45;</strong></td>
		<td><strong>New protocol header (GRE)</strong></td>
		<td style='text-align:right'>4 bytes</td>
	</tr>
  <tbody>
	<tr>
		<td><strong>&#61;</strong></td>
		<td><strong>Maximum segment size (MSS)</strong></td>
		<td style='text-align:right'>1436 bytes</td>
	</tr>
  </tbody>
</table>

The value for MSS is encoded in the SYN-ACK packet sent to the client during TCP handshake, and egress packets are routed via your ISP interface not Cloudflare.

Therefore, **you must set this value at your physical egress interfaces (not the GRE tunnel interfaces)**. Unless you make this change at the origin, client machines do not know that they must use an MSS of 1436 bytes when sending packets to your origin.

![Packet flow diagram](../../static/mss-values-and-packet.png)

## Routing change impacts

Once our internal pre-flight checks pass and your account team verifies a date to complete the change, Cloudflare starts onboarding your prefixes to Cloudflare's edge network. As mentioned earlier, this process consists of 2 efforts:

1. Route traffic sourced from Cloudflare's network.

1. Attract traffic from the broader Internet by advertising your customer-owned prefixes.

These routing changes return any traffic generated within the Cloudflare edge network to the GRE tunnels set up for Magic Transit. This can happen under 2 conditions:

* An IP within your Magic Transit prefix accesses a web property proxied by Cloudflare.
* You have a proxied zone set up on Cloudflare with a target IP within a Magic Transit prefix range.

You control the edge router advertisement, which dictates whether Cloudflare’s edge network advertises your prefixes. Advertisement is activated at the go-live call, routing traffic via Cloudflare and the GRE tunnels to your data center(s).

<Aside type="info">

It is critical that you put the appropriate MSS clamps in place before routing changes are made. Failure to apply an MSS clamp may result in dropped packets and hard-to-debug connectivity issues.

When using [Cloudflare Network Interconnect](/network-interconnect/) with Magic Transit, you must set the MSS clamp size to 1332 bytes to accommodate additional overhead from the foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the colocation facility where traffic is ingested (close to the end user) to the facility with the CNI link.

</Aside>

## Route prefixes smaller than /24

Cloudflare routes traffic from the edge to your data center(s) via GRE tunnel. Since we use GRE tunnels as an outer wrapper for your traffic, we can configure prefixes smaller than /24. For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.

## Cloudflare Network Interconnect

### Onboarding

When setting up Magic Transit to work with [Cloudflare Network Interconnect (CNI)](/network-interconnect/about/), the onboarding process includes these additional steps:

1. Cloudflare generates Letters of Authorization (LOAs) for your CNI cross-connects and sends them to your organization.

2. You order the cross-connects that you want to use with CNI. You can use any of these types:
    * **Private network interconnects (PNI)** are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224).
    * **Virtual private network interconnects (vPNI)** allow you to easily connect with Cloudflare at any of our interconnection platform locations.
    * **Internet exchange point (IXP)** interconnects allow you to establish a link with Cloudflare at any of the [more than 200 IXPs](https://bgp.he.net/AS13335#_ix) in which we participate.

3. You send Cloudflare confirmation when the cross-connects are in place.

4. Cloudflare makes routing configuration changes and validates BGP sessions and GRE tunnel routes.

Each of these steps can take 2–7 business days.

For more details on the CNI onboarding process, see [_Set up Cloudflare Network Interconnect: Onboarding_](/network-interconnect/set-up-cni/onboarding).

### Guidelines

When working with Magic Transit and CNI, observe these guidelines:

* Cloudflare Network Interconnect does not support 1500 byte packets, so you still need to implement MSS clamping.

* You must set the MSS clamp size to 1332 bytes to accommodate the additional overhead from the foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the colocation facility where traffic is ingested (close to the end user) to the facility with the CNI link.

* Cloudflare Network Interconnect does not process outgoing traffic from your data centers. Egress traffic returns to end users through direct server return (DSR), not through Cloudflare. For this reason, CNI is not a replacement for your existing transit providers.
