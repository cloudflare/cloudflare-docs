---
title: Access to private apps without having to deploy client agents
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Access to private apps without having to deploy client agents"
---

# Access to private apps without having to deploy client agents
## Introduction

Using Cloudflare to access private resources - such as applications, servers, and networks that are not exposed directly to the internet - usually involves deploying an ([agent](/cloudflare-one/connections/connect-devices/warp/)) to devices and then using a server-side agent ([cloudflared](/cloudflare-one/connections/connect-networks/private-net/cloudflared/), [WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/)), to connect the private network or application to Cloudflare. This document describes an alternative approach which removes the need to deploy software to the user's device, making it easier for allowing third party access such as contractors and partners.

Typically, to provide access to internal resources, you use Cloudflare Zero Trust Network Access [ZTNA](https://www.cloudflare.com/learning/access-management/what-is-ztna/) which supports two methods for how the user device accesses a private resource. 

* A CNAME in public DNS, that resolves to a hostname representing the Cloudflare tunnel which proxies the request to the internal application.

* An IP address exposed by Cloudflare tunnel, that again, proxies traffic direct to that IP address.

## Accessing private applications

Some organizations don't like the idea of public DNS records which reference internal services, even though the ZTNA services provide strong access security, sometimes just the existence of a service name in public DNS is not desired. Exposing IP addresses directly to users is also a bad idea, they are hard to remember, and IP addresses can change. Unlike accessing a web application via a public DNS record through our proxy, applications exposed via private IP addresses also require the user to install an agent on their device to capture and route the traffic to Cloudflare which in turn routes it to the application. Installing this agent can be a challenge with third parties like partners or contractors.

So how do you allow access to private resources, without creating public DNS records and without requiring the user install software on their device? Cloudflare solved this challenge with [Resolver Policies](/cloudflare-one/policies/gateway/resolver-policies/) where internal DNS services can be used. When combined with agentless [Remote Browser Isolation](/cloudflare-one/policies/browser-isolation/), it is possible to create Zero Trust access to private web applications with only a modern web browser. Policies to control access to apps are then written in our Secure Web Gateway (SWG) service as [network firewall](/cloudflare-one/policies/gateway/network-policies/) policies. This method supports HTTP based applications, although Cloudflare does provide a browser rendering service for SSH and VNC services. 

Follow this [tutorial](/cloudflare-one/tutorials/clientless-access-private-dns/) for information on how to configure secure access to private web-based resources without having to deploy client agents.

![Figure 1: Remote Access Internal Hostname](/images/reference-architecture/sase-clientless-access-private-dns/diagram1.svg "Figure 1: Remote browser connected to private web service using internal hostname")

1. Users start their access by authenticating to the [Cloudflare Browser Isolation](https://your_team_domain.cloudflareaccess.com/browser) service. Note this is a browser running on Cloudflare’s edge network, therefore all requests will by default be handled by Cloudflare. The contents are rendered back to the users’ browser via secure encrypted vector streams that use HTTPS and WebRTC channels.
2. Once the user has authenticated to the remote browser, they make a request to an internal hostname which is a record in the internal DNS service. e.g. https://app.company.internal
3. Cloudflare looks up the internal hostname using [resolver policies](/cloudflare-one/policies/gateway/resolver-policies/), and gets the private IP address from the internal DNS server. This DNS resolution takes place within the Cloudflare network and requires no DNS client changes on the user's device.
4. Cloudflare evaluates the network firewall policies and verifies if the user has permission to reach the destination addresses.
5. If the request passes the policy, it is sent via secure [QUIC](https://blog.cloudflare.com/getting-cloudflare-tunnels-to-connect-to-the-cloudflare-network-with-quic) tunnels to the Cloudflared connectors which then is reverse proxied to the application servers. All data is transmitted securely through Cloudflare back to the users’ browser via encrypted vector streams.

## Related resources

- [Tutorial: Access a web application via its private hostname without WARP](/cloudflare-one/tutorials/clientless-access-private-dns/)
