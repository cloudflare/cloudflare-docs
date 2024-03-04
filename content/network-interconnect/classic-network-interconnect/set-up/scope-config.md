---
title: Scope your configuration
pcx_content_type: tutorial
weight: 1
---

# Scope your configuration

Cloudflare engages with your organization in an initial kickoff call to confirm the scope and timeline for the Classic CNI setup. To prepare for the initial kickoff call, have the configuration data for the type of cross-connect you want to use (direct physical or partner virtual) ready to provide to your Customer Success Manager.

## Physical Classic CNI setup

To set up a Classic CNI connection, provide the following information:
- Colocation facility where you want to connect. The location must be accessible from one of [Cloudflare's peering locations](https://www.peeringdb.com/net/4224).
- Port speeds

Cloudflare will issue you a Letter of Authorization for you to order a cross connect to fulfill your CNI.

{{<Aside type="warning" header="Important">}}
To set up a cross-connect in a metropolitan area network (MAN) that does not have a physical Cloudflare location, you must purchase an Equinix Metro Connect or a similar product to interconnect locations. For example, if Cloudflare has a peering facility in NY5 and you are in NY1, you must use Metro Connect to cross-connect from NY1 to NY5.
{{</Aside>}}

## Virtual (partner) Classic CNI

To establish a virtual CNI, provide the following information:
- Locations to interconnect. You must choose locations supported by our [Network Interconnect Partner Program](https://www.cloudflare.com/network-interconnect-partnerships/).
- Preferred link size
- Number of VLANs
- Rate Limit

Use one of our partner's dashboards to place the order, and the interconnect platform will establish the connection.