---
title: BGP and Bidirectional Forwarding Detection
pcx_content_type: tutorial
weight: 3
meta:
  title: Configure the BGP session and Bidirectional Forward Detection
---

# BGP and Bidirectional Forwarding Detection

You can use BGP with classic CNI if you are a Magic Transit customer. You can build a BGP session over your CNI 1.0 connection to signal when Cloudflare should advertise and anycast your IP prefixes for DDoS mitigation. You can also optionally use BFD on this BGP session.

## BGP

### Configure the BGP session

After establishing your connection, the next steps include provisioning the Generic Route Encapsulation (GRE) IPs and configuring the Border Gateway Protocol (BGP) peering information. This process takes approximately one week.

### Provision the IP

Cloudflare sends a set of IPs that you assign to your connection before Cloudflare establishes the BGP connection. The set of IPs will look similar to the example below.

```txt
Cloudflare v4: 192.0.2.10/31
Acme v4: 192.0.2.11/31
Cloudflare v6: 2001:db8:12:3::7ac2:d64a/127
Acme: 2001:db8:12:3::7ac2:d64b/127
```

Assign the set of IPs to your connection. Next, perform a series of ping tests to ensure the connection is established. Although you may see the green connection from [configuring the cross-connect](/network-interconnect/classic-network-interconnect/set-up/configure-cross-connect/), the ping tests confirm packets are flowing over the link.

If you have a virtual link via Megaport, the IP provisioning may fail if you have not configured the VLAN with the VLAN provided by your Customer Success Manager.

### Configure the BGP session

After you provision the IPs and the ping tests confirm the connection, accept the routes from the BGP session Cloudflare configured. Configuring the BGP session on both the Cloudflare and user sides requires a BGP call and an approximately two hour maintenance window that you provide to Cloudflare.

Cloudflare advertises all of its Anycast prefixes including [BYOP](/byoip/) prefixes over CNI, but the process occurs over a private link from Cloudflare to the customer data center.

{{<Aside type="note">}}
Your CNI needs to accept all of Cloudflare's prefixes to ensure it is fully utilized, and traffic routed from the data centers back to the CNI is secure, fast, and reliable.
{{</Aside>}}

After you accept the BGP session, traffic begins flowing over the CNI. To confirm traffic is flowing correctly, contact your solutions engineer who can see whether traffic is flowing.

### Go live

When traffic begins flowing over the connection, you are fully set up with CNI.

## BFD

Bidirectional Forwarding Detection (BFD) is a networking protocol that constantly monitors links and BGP sessions down to the second by sending a constant stream of traffic across the session.

If a small number of packets does not make it to the other side of the session, the session is considered down. This solution is useful for users who cannot tolerate any amount of packet loss during a session.

Bidirectional Forwarding Detection is only supported for users with physical CNI 1.0 connections. To begin using BFD, contact your Implementation Manager.