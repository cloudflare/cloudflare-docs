---
title: Configure BGP
pcx_content_type: tutorial
weight: 6
meta:
  title: Configure the BGP session
---

# Configure the BGP session

After establishing your connection, the next steps include provisioning the Generic Route Encapsulation (GRE) IPs and configuring the Border Gateway Protocol (BGP) peering information. This process takes approximately one week.

## Provision the IP

Cloudflare sends a set of IPs that you assign to your connection before Cloudflare establishes the BGP connection. The set of IPs will look similar to the example below.

    Cloudflare v4: 192.0.2.10/31
    Acme v4: 192.0.2.11/31
    Cloudflare v6: 2001:db8:12:3::7ac2:d64a/127
    Acme: 2001:db8:12:3::7ac2:d64b/127

Assign the set of IPs to your connection. Next, perform a series of ping tests to ensure the connection is established. Although you may see the green connection from [configuring the cross-connect](/network-interconnect/set-up-cni/configure-cross-connect/), the ping tests confirm packets are flowing over the link.

If you have a virtual link via Megaport, the IP provisioning may fail if you have not configured the VLAN with the VLAN provided by your Customer Success Manager.

## Configure the BGP session

After you provision the IPs and the ping tests confirm the connection, accept the routes from the BGP session Cloudflare configured. Configuring the BGP session on both the Cloudflare and user sides requires a BGP call and an approximately two hour maintenance window that you provide to Cloudflare.

Cloudflare advertises all of its Anycast prefixes including BYOP prefixes over CNI, but the process occurs over a private link from Cloudflare to the customer data center.

{{<Aside type="note">}}

Why does my CNI need to accept all of Cloudflare's prefixes? Accepting all of Cloudflare's prefixes ensures your CNI is fully utilized, and traffic routed from PoPs back to the CNI is secure, fast, and reliable.

{{</Aside>}}

After you accept the BGP session, traffic begins flowing over the CNI. To confirm traffic is flowing correctly, contact your solutions engineer who can see whether traffic is flowing.

## Go live

When traffic begins flowing over the connection, you are fully set up with CNI.
