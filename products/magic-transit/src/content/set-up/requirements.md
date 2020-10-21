---
title: Requirements
alwaysopen: true
order: 1
hidden: false
---

# Requirements

Cloudflare requires that you meet the following Magic Transit onboarding requirements:

* [Use compatible tunnel endpoint routers](#use-compatible-tunnel-endpoint-routers)
* [Draft Letter of Authorization](#draft-letter-of-authorization)
* [Verify Internet Routing Registry entries](#verify-internet-routing-registry-entries)
* [Set Maximum segment size](#set-maximum-segment-size)

## Use compatible tunnel endpoint routers

Magic Transit relies on Generic Routing Encapsulation (GRE) tunnels to transmit packets from Cloudflare's edge to your origin network. To ensure compatibility with Magic Transit, the routers at your GRE tunnel endpoints must meet these requirements:

* Support GRE tunneling.
* Allow configuration of at least 1 tunnel per Internet service provider (ISP).
* Support maximum segment size (MSS) clamping.

## Draft Letter of Authorization

Draft a [Letter of Authorization (LOA)](/byoip/loa) that identifies the prefixes you want to advertise and gives Cloudflare permission to announce them. See this [LOA template](/byoip/loa/example-template/) for an example.

## Verify Internet Routing Registry entries

To ensure that Magic Transit routes traffic to the correct autonomous systems (AS), verify that your Internet Routing Registry (IRR) entries match corresponding origin autonomous system numbers (ASNs). For guidance, see [_Verify IRR entries_](/byoip/irr/verify-irr-entries).

## Set maximum segment size

![Packet flow diagram](../static/mss-values-and-packet.png)

The SYN-ACK packet sent to the client during TCP handshake encodes the value for maximum segment size (MSS). Egress packets are routed via your ISP interface, and each packet must comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.  

Cloudflare uses GRE tunnels to deliver packets from our edge to your data center(s), while Cloudflare Magic Transit encapsulates these packets, adding a new IP header and GRE protocol header.

To accommodate the additional header data, **you must set the MSS value to 1436 bytes at your physical egress interfaces** (not the GRE tunnel interfaces):

<table style='border:none'>
 <thead>
	<tr>
		<th></th>
		<th>Standard Internet routable MTU</th>
		<th style='text-align:right'>1500 bytes</th>
	</tr>
</thead>
	<tr>
		<th>&#45;</th>
		<th>Original IP header</th>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<th>&#45;</th>
		<th>Original protocol header (TCP)</th>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<th>&#45;</th>
		<th>New IP header</th>
		<td style='text-align:right'>20 bytes</td>
	</tr>
	<tr>
		<th>&#45;</th>
		<th>New protocol header (GRE)</th>
		<td style='text-align:right'>4 bytes</td>
	</tr>
  <tbody>
	<tr>
		<th>&#61;</th>
		<th>Maximum segment size (MSS)</th>
		<td style='text-align:right'>1436 bytes</td>
	</tr>
  </tbody>
</table>

Unless you apply these MSS settings at the origin, client machines do not know that they must use an MSS of 1436 bytes when sending packets to your origin.

### Follow router vendor guidelines

Instructions to adjust MSS by applying MSS clamps vary depending on the vendor of your router.  

The following table lists several commonly used router vendors with links to MSS clamping instructions:

<table>
 <thead>
  <tr>
   <th>Router device</th>
   <th>URL</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>Cisco
   </td>
   <td><a href="https://www.cisco.com/en/US/docs/ios-xml/ios/ipapp/command/ip_tcp_adjust-mss_through_ip_wccp_web-cache_accelerated.html#GUID-68044D35-A53E-42C1-A7AB-9236333DA8C4">TC IP Adjust MSS</a>
   </td>
  </tr>
  <tr>
   <td>Juniper
   </td>
   <td><a href="https://www.juniper.net/documentation/en_US/junos/topics/reference/configuration-statement/tcp-mss-edit-system.html">TCP MSS - Edit System</a>
   </td>
  </tr>
  <tr>
   <td>Oracle
   </td>
   <td><a href="https://docs.cloud.oracle.com/en-us/iaas/Content/Network/Reference/ciscoasaCPEpolicybased.htm#:~:text=You%20can%20configure%20the%20Cisco,value%20to%20the%20configured%20value">TCP MSS adjustment</a>
   </td>
  </tr>
  </tbody>
</table>

### Verify MSS settings at your origin

To verify that your routers have the correct MSS setting (1436 bytes) at your origin, run the following command on the servers egressing the prefixes you want to add to Magic Transit:

```
curl 167.71.125.57:8080
```

You should see the following result:

```
Local: 167.71.125.57:8080
Remote: 172.68.141.62:44108
Local MSS: 1436
Remote MSS: 1436
```

<Aside>

When you do not have a publicly available TCP endpoint for which Cloudflare can verify your MSS settings, you must provide a screenshot of the cURL command results, similar to the one above.

</Aside>
