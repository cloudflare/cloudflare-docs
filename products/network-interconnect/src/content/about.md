---
title: About
order: 1
---

# About Cloudflare Network Interconnect

## Advantages

Cloudflare Network Interconnect (CNI) provides faster, more reliable, and more private connectivity between your infrastructure and Cloudflare.

This table outlines some of the benefits CNI provides across the Cloudflare product suite:

<TableWrap>

<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Value</th>
      <th>With CNI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span style="white-space: nowrap"><a href="https://www.cloudflare.com/teams-access/">Access</a></span></td>
      <td><p>Replaces corporate VPNs with the Cloudflare network.</p></td>
      <td><p>Bring your Multiprotocol Label Switching (MPLS) network to meet Cloudflare's so your employees can connect to your network securely no matter where they are.</p></td>
    </tr>
    <tr>
      <td><span style="white-space: nowrap"><a href="https://www.cloudflare.com/cdn/">CDN</a></span></td>
      <td><p>Places content closer to visitors, improving site performance.</p></td>
      <td><p>Adding CNI improves cache fill performance and reduces cost.</p></td>
    </tr>
    <tr>
      <td><span style="white-space: nowrap"><a href='https://www.cloudflare.com/magic-transit/'>Magic Transit</a></span></td>
      <td><p>Protects data center and branch networks from unwanted and malicious traffic.</p></td>
      <td><p>Decreases jitter, drives throughput improvements, and hardens infrastructure to attack.</p></td>
    </tr>
    <tr>
      <td><span style="white-space: nowrap"><a href='https://workers.cloudflare.com/'>Workers</a></span></td>
      <td><p>Serverless compute platform.</p></td>
      <td><p>Provides a secure connection to serverless cloud compute that does not traverse the public Internet.</p></td>
    </tr>
  </tbody>
</table>

</TableWrap>

For more detail on how CNI delivers these benefits, see [_Introducing Cloudflare Network Interconnect_](https://blog.cloudflare.com/cloudflare-network-interconnect/#:~:text=Today%20we're%20excited%20to,to%20their%20physical%20network%20edge.).

## Types of interconnect

Cloudflare supports three types of network interconnect, which is the link between your infrastructure and Cloudflare's network.

### Private network interconnect

Private network interconnects (PNI) are available at any of our [private peering facilities](https://www.peeringdb.com/net/4224).

Choose PNI when you want higher throughput than a virtual connection or connection over an IXP can support, or when you want to eliminate as many intermediaries from an interconnect as possible.

To establish a physical connection to Cloudflare's network, specify the colocation facility where you want to connect, at what port speeds, and how many target VLANs. Cloudflare authorizes the PNI, you place the order, and Cloudflare does the rest.

### Virtual private network interconnect

Cloudflare is partnering with Equinix, Megaport, PCCW ConsoleConnect, PacketFabric, and Zayo to provide virtual private network interconnects (vPNI) so that you can easily connect with Cloudflare at any of our interconnection platform locations.

Choose vPNI when you are already using our partner providers or when you want a quick and easy way to onboard a secure cloud experience.

To establish a vPNI, use one of our partner's dashboards to place an order, and the interconnect platform will establish the connection.

### Internet exchange point

Depending on your organization's traffic volume, you can interconnect with Cloudflare at any of the [more than 200 Internet exchange points (IXPs)](https://bgp.he.net/AS13335#_ix) in which we participate.

Choose an IXP interconnect when you are already peered an IXP or when you want to interconnect at a location where an interconnection platform is not present.

To interconnect using an IXP, follow the exchange's instructions to establish the interconnect, and Cloudflare will enable its side.

## Limitations

Supported connection size depends on the type of interconnect:

* Private network interconnections can range from 10G to 100G. Customers with less than 10G traffic can use part of a 10G link.

* Virtual private network interconnection size depends on the interconnection platform partner.

* When using an existing IXP for an interconnection, size is bound by available bandwidth on the port.
