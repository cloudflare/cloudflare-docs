---
title: Magic Transit
pcx_content_type: reference-architecture
---
# Magic Transit Use Cases and Reference Architecture

## 1 Introduction

The purpose of this document is to describe the key architecture, functionalities, and network deployment options of [Cloudflare Magic Transit](/magic-transit/) — a BGP-based DDoS protection and traffic acceleration service for Internet-facing network infrastructure. 

## 2 What Is Magic Transit?
Protecting network infrastructure from DDoS attacks demands a unique combination of strength and speed. Volumetric attacks can easily overwhelm hardware boxes and their bandwidth-constrained Internet links. And most cloud-based solutions redirect traffic to centralized scrubbing centers, which impacts network performance significantly. 

Cloudflare Magic Transit provides DDoS protection and traffic acceleration for on-premise, cloud, and hybrid networks. With data centers spanning 250 cities and with over 100 Tbps in mitigation capacity, Magic Transit can detect and mitigate attacks close to their source of origin in under 3 seconds globally on average — all while routing traffic faster than the public Internet.

![Figure 1: Magic transit overview](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-1.png)

At a high level, Magic Transit works as follows:
* **Connect:** Using Border Gateway Protocol (BGP) route announcements to the Internet, and the Cloudflare Anycast network, customer traffic is ingested at a Cloudflare data center closest to the source.


* **Protect and Process:** All customer traffic is inspected for attacks. Advanced and automated mitigation techniques are applied immediately upon detecting an attack. Additional functions such as load balancing, next-generation firewall, content caching, and serverless compute are also available as a service.


* **Accelerate:** Clean traffic is routed over Cloudflare’s low-latency network links for optimal throughput and handed off over IP tunnels (either GRE or IPsec) or private network interconnects (PNI) to the origin network. Magic Transit uses Anycast IP addresses for Cloudflare’s tunnel endpoints, meaning that any server in any data center is capable of encapsulating and decapsulating packets for the same tunnel. More details specifically on tunnels and encapsulation can be found [here](/magic-transit/reference/tunnels-and-encapsulation/).

### Baking resilience into our network using Anycast

Magic Transit uses Anycast IP addresses for its end of the network tunnel endpoints — so a single tunnel configured from a customer’s network to Cloudflare connects to all Cloudflare global data centers (excluding the [China Network](/china-network/)). This does not add strain on the router; from the router’s perspective, it is a single tunnel to a single IP endpoint.

This works because while the tunnel endpoint is technically bound to an IP address, it need not be bound to a specific device. Any device that can strip off the outer headers and then route the inner packet can handle any packet sent over the tunnel.

In the event of a network outage or other issues, tunnels fail over automatically — with no impact to a customer’s network performance.

## 3 Deployment Architectures for Magic Transit

### 3.1 Default Configuration (Ingress Only, Direct Server Return)

By default, Magic Transit processes traffic in the ingress direction only (from the Internet to the customer network). The server return traffic back to the clients is routed by the customer’s DC edge router via its uplinks to the Internet/ISP based on the edge router’s default routing table. This server return traffic will not transit through Cloudflare via tunnels. This is referred to as Direct Server Return (DSR).

The network diagram in Figure 2 illustrates such a Magic Transit setup, and the end-to-end packet flow of Magic Transit-protected traffic. The tunnel in this setup uses GRE for encapsulation.


![Figure 2: Reference Configuration of Magic Transit Anycast Tunnel (GRE) With Default DSR Option](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-2.png)

* Cloudflare provides the customer with a pair of Anycast IP addresses for the Cloudflare end of the tunnel endpoints. These are publicly routable IP addresses from Cloudflare-owned address space. The pair of Anycast IP addresses can be used to configure two tunnels for network redundancy, although only one is required for a basic configuration. The above configuration shows a single tunnel, with the Cloudflare end of the tunnel endpoint address being 192.0.2.1. 

* The customer end of the Anycast GRE tunnel needs to be a publicly routable address. It is typically the IP address of the WAN interface on the customer edge router. In this example it is 192.0.2.153.

* The IP addresses of the tunnel interfaces are RFC 1918 private addresses. These addresses are only “locally significant” within the particular Magic Transit service instance that they are part of. Therefore, the customer can select any RFC 1918 addresses they desire, as long as they do not overlap with those of other tunnels configured within the same Magic Transit service instance.

* As best practice, given the tunnels are point-to-point connections, a /31 subnet is sufficient for allocating the 2 IP addresses required for a given tunnel. In the above example, the 10.10.10.0/31 subnet is chosen, with the Cloudflare end of the tunnel interface being 10.10.10.0/31 and the customer’s DC edge router side being 10.10.10.1/31.

* Once the tunnel is configured, a route is configured in the Magic Transit service instance to forward traffic destined to a given customer prefix onto the correct tunnel.

* Traffic destined to customer prefix 203.0.113.0/24 is routed onto the tunnel whose remote end (i.e. the customer’s end, from the Cloudflare network’s perspective) of the tunnel interface is 10.10.10.1.

* Given this is a Direct Server Return (DSR) setup, the server return traffic follows the default route (ip route 0/0) configured on the customer edge router and is sent to its uplink peer (i.e. customer’s ISP’s router), en route back to the clients over the Internet. This return traffic does not traverse Cloudflare network.

**Note:** The smallest IP prefix size (i.e. with the longest IP subnet mask) that most ISPs accept in each other’s BGP advertisements is /24; e.g. x.x.x.0/24 or y.y.y.0/23 are okay, but z.z.z.0/25 is not. Therefore, the smallest IP prefix size Cloudflare Magic Transit can advertise on behalf of the customers is /24.

### 3.2 Magic Transit With Egress Option Enabled
When Magic Transit is deployed with the Egress option enabled, egress traffic from the customer’s network flows over the Cloudflare network as well. This deployment option provides symmetry to the traffic flow, where both client-to-server and server-return traffic flow through the Cloudflare network. This implementation provides added security and reliability to the server-return traffic, as afforded by the Cloudflare network.

The following network diagram illustrates the end-to-end packet flow between the end client and customer network when the Magic Transit Egress option is enabled. 


![Figure 3: Magic Transit With Egress Option Enabled](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-3.png)

* The ingress traffic flow is the same as in use case 3.1. 


* For egress traffic to be received and processed by Magic Transit, the source IP addresses of the traffic need to be in the range of the Magic Transit-protected IP prefixes, and the destination IP addresses need to be public Internet routable, i.e. non-RFC 1918 addresses.

It is worth noting that for customers who bring their own public IP addresses ([BYOIP](/byoip/)) for cloud-hosted services, the Magic Transit Egress option can provide additional value by eliminating the need for them to purchase and implement BYOIP services with their cloud providers, reducing their cloud bill and lowering operational costs.

To accomplish this, the IP tunnels that on-ramps to Magic Transit are configured between the cloud providers’ VPCs and the Cloudflare network. With the Magic Transit Egress option, both directions of client-server traffic would flow through these tunnels. The BYOIP addresses in the tunneled packets are hidden behind the outer tunnel endpoint IP addresses and the tunnel header, making them “invisible” to the underlying cloud provider network elements between the VPCs and the Cloudflare network.

### 3.3 Magic Transit Over Cloudflare Network Interconnect (CNI)

[Cloudflare Network Interconnect (CNI)](/network-interconnect/) allows customers to connect their network infrastructure directly to Cloudflare – bypassing the public Internet – for a more reliable, performant, and secure experience.

* CNI is provisioned by the cross-connect providers as a set of layer 2 connections, and Cloudflare allocates a pair of IP addresses from Cloudflare’s own Internet-routable IP address block for each connection.


* Cloudflare coordinates with the customer to configure these links and to establish a BGP peering session over the links during CNI onboarding.


* Once the BGP session is up between the Cloudflare network and the customer edge router that are connected via CNI, Cloudflare-owned prefixes will be advertised over this CNI link to the customer edge router.

Figure 4 illustrates a reference configuration for Magic Transit over CNI, and its associated packet flow. 

**Note:** The example demonstrated here is for the default Magic Transit service without the Egress option enabled. As described in earlier sections, in Magic Transit Direct Server Return mode (i.e. Ingress only), the server return traffic will be routed by the customer edge router to the clients via their ISP through the public Internet.



![Figure 4: Reference Configuration of Magic Transit Over CNI (Default DSR Option)](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-4.png)

When the Magic Transit Egress option is enabled and utilized, the server return traffic can be sent back to the clients through the Cloudflare network, via the IP tunnels that are configured over the CNI connections. Figure 5 illustrates one such example.


![Figure 5: Reference Configuration of Magic Transit Over CNI with Egress Option Enabled](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-5.png)

### 3.4 Magic Transit Protecting Public Cloud-Hosted Services

Magic Transit protects services hosted on-premise and in the cloud. This use case illustrates the configuration for a cloud-hosted deployment.

![Figure 6: Protect Multi-Cloud-Based Services With Magic Transit (Egress Option Enabled)](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-6.png)

* In this example, a given customer has two cloud VPC deployments spread across two different cloud providers, and in two different geographical regions.


* In this example, the customer’s /24 or larger prefix is split into multiple smaller (i.e. longer subnet mask length) prefixes (e.g. /26) and assigned to the various VPCs in different locations. Upon establishing the tunnels from the Cloudflare network to each of the VPCs, the customer can configure routes centrally in the Magic Transit configuration to route traffic to the respective VPCs. Such configuration can be made via API or UI dashboard.

Note that with the Magic Transit Egress option, the customer can bypass each cloud provider’s BYOIP services, its associated fees, and the configuration and operations complexity, by sending egress traffic (i.e. server return or server-to-Internet traffic from the protected prefix) through the Cloudflare global network via the Magic Transit tunnels. 

### 3.5 Magic Transit and Magic WAN

In addition to protecting and routing traffic for external-facing services of an enterprise (i.e. north-south Internet-routable traffic) with the Cloudflare Magic Transit service, customers can protect east-west “intra-enterprise” internal traffic (e.g. RFC 1918 private addresses), interconnecting all the sites of an enterprise, using [Cloudflare Magic WAN](/magic-wan/).

Magic WAN replaces legacy WAN architectures with the Cloudflare network, providing global connectivity, cloud-based security, performance, and control through one simple user interface.

The Cloudflare Magic Transit and Magic WAN services combined provide a holistic, secure, reliable, and performant global network-as-a-service solution for an entire enterprise, protecting and accelerating north-south as well as east-west traffic. 

Both services can either be deployed in the same service instance, or, for customers who prefer to keep the administration and traffic flow of external, Internet-facing networks and internal corporate networks completely separate, different service instances can be deployed for Magic Transit and Magic WAN.

Figure 7 illustrates an example of deploying Magic Transit and Magic WAN services in separate service instances.


![Figure 7: Magic Transit + Magic WAN Provide Network-as-a-Service for the Entire Enterprise](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-7.png)

* In the example, GRE tunnels are used to connect the customer’s various sites over the Cloudflare global Anycast network. The Cloudflare Anycast IP address for the Magic Transit service instance is 192.0.2.1, while the one for the Magic WAN service instance is 192.0.2.2. The Magic Transit service is enabled with the Egress option.


* The Magic Transit service protects and routes external-facing front-end client-server traffic. The Magic WAN service protects and routes enterprise internal traffic such as that of internal applications, back-end database sync, and branch-to-DC and branch-to-branch traffic.

### 3.6 Magic Firewall: Control and Filter Unwanted Traffic Before It Reaches the Enterprise Network
While Magic Transit protects customers’ services from DDoS attacks, many network administrators want to be able to control and block other unwanted or potentially malicious traffic. [Cloudflare Magic Firewall](/magic-firewall/) enforces consistent network security policies across the entire customer WAN, including headquarters, branch offices, and virtual private clouds, and allows customers to deploy fine-grained filtering rules globally in under 500 ms — all from a common dashboard. 

Magic Firewall is deployed and configured as part of Magic Transit. All ingress traffic flowing through Cloudflare edge data centers, whose destination prefixes are protected by Magic Transit, can be filtered by Magic Firewall.


![Figure 8: Magic Firewall Blocks Unwanted and Malicious Traffic at the Internet Edge](/reference-architecture/static/magic-transit-ref-arch-diagrams/magic-transit-ref-arch-8.png)

In Magic Firewall rules, administrators can match and filter network traffic not only based on the typical 5-tuple (source/destination IP, source/destination port, protocol) information carried in the IP packet header but also other packet information such as IP packet length, IP header length, TTL, etc. In addition, geographical information such as the name of the Cloudflare data center/colo, the region, and the country the data centers are located in can also be used in configuring Magic Firewall rules (geo-blocking).

For further details on Magic Firewall and its configuration, please refer to this [blog post](https://blog.cloudflare.com/introducing-magic-firewall/) and our [developer docs](/magic-firewall/).

## 4 A Note on Always-On and On-Demand Deployments
A cloud DDoS mitigation service provider can monitor traffic for threats at all times (the always-on deployment model) or reroute traffic only when an attack is detected (on-demand). This decision affects response time and time-to-mitigation. In some cases, it also has repercussions for latency.

In an on-demand deployment model, inbound traffic is monitored and measured at the network edge to detect volumetric attacks. During normal operations, or “peacetime,” all traffic directly reaches applications and infrastructure without any delay or redirection. Traffic is diverted to the cloud scrubbing provider only in the case of an active DDoS attack. In many cases, a customer is required to call the service provider to redirect traffic, thereby increasing the response time. 

The always-on mode is a hands-off approach to DDoS mitigation that does not require the customer to do anything in the event of an attack. The organization’s traffic is always routed through the cloud provider’s data centers for threat inspection, even during peacetime. This minimizes the time from detection to mitigation, and there is no service interruption. 

Of all approaches and deployment options, the always-on method provides the most comprehensive protection. 

However, depending on the provider, diverting all traffic through the DDoS mitigation provider’s cloud might add latency that is suboptimal for business-critical applications. Cloudflare is architected so that customers do not incur a latency penalty as a result of attacks — even for always-on deployments. Analyzing traffic at the edge is the only way to mitigate at scale without impacting performance. 

This is because ingesting traffic via Anycast ensures that traffic travels only to the nearest Cloudflare data center for inspection. With data centers in hundreds of cities across more than 100 countries, it is likely to be a short distance. This eliminates the trombone effect. 

In many cases, [traffic is faster when routed over Cloudflare](https://www.cloudflare.com/static/360e550c8890054d5e5835efb9fb8dd1/Magic_Transit_protects_networks_while_also_improving_performance__1_.pdf) than over the public Internet. We believe customers should not have to sacrifice performance to achieve comprehensive security.

## 5 Summary

Cloudflare offers comprehensive network services to connect and protect on-premise, cloud-hosted, and hybrid enterprise networks. Cloudflare provides various connectivity and deployment options to suit customers' unique architectures. 


* Cloudflare Magic Transit is a cloud-native network security solution that uses the power of the Cloudflare global network to protect organizations against DDoS attacks.


* Magic Transit comes with a built-in network firewall that helps customers phase out on-premise firewalls and deploy network security as-a-service that scales.


* In addition to protecting and routing traffic for external-facing services of an enterprise (i.e. north-south Internet-routable traffic), customers can connect and protect east-west “intra-enterprise” internal traffic using Cloudflare Magic WAN.

If you would like to learn more about Magic Transit, Magic WAN, or Magic Firewall, please [reach out](https://www.cloudflare.com/magic-transit/) to us for a demo.
