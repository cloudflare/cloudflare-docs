---
title: Protecting ISP and telecommunications networks from DDoS attacks
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Protecting ISP and telecommunications networks from DDoS attacks"
---

# Protecting ISP and telecommunications networks from DDoS attacks

## Introduction

Internet service providers (ISPs) and telecommunications companies (such as T-Mobile or British Telecom) are vulnerable to network DDoS attacks, which are often focused on the end customer - for example, trying to attack a company or remote worker connected to the internet via a broadband internet service provider. Historically to protect these customers, service providers have relied on hosting their own on-premises mitigation systems. This approach necessitates significant investment to effectively combat the constantly evolving attacks, with capacity being finite in the face of escalating attack sizes.

Cloudflare is well known for its DDoS mitigation services protecting public websites and APIs, and the same technologies can also be used to protect entire networks. At Cloudflare, we have [witnessed a surge in hyper-volumetric](https://blog.cloudflare.com/cloudflare-mitigates-record-breaking-71-million-request-per-second-ddos-attack) and highly sophisticated attacks, as highlighted in our quarterly [DDoS attack reports](https://radar.cloudflare.com/reports/ddos/). These attacks, due to their sheer volume, can overwhelm and outmanoeuvre on-premises DDoS mitigation systems. As a result, these on-premises mitigation systems require constant maintenance and upgrades to keep up with larger attacks, leading to ongoing investments and, with the unpredictable attack size, open-ended costs.

[Cloudflare Magic Transit](/magic-transit/) offers cloud-based network DDoS mitigation as a service. Service providers are using [Cloudflare Magic Transit on-demand](/magic-transit/on-demand/), either as a supplementary solution or as a replacement for their existing setup, to safeguard their network infrastructure against this evolving threat.

## Protecting service provider networks from attack

There are two main steps to deploying this solution. Firstly, setting up Cloudflare to [monitor](https://blog.cloudflare.com/flow-based-monitoring-for-magic-transit) and detect DDoS attacks on the network. Then, when a DDoS event is observed, reroute traffic through Cloudflare where DDoS mitigation takes place.

![Figure 1: Overall solution of user access controls to, and the discovery of, sensitive data.](/images/reference-architecture/protecting-sp-networks-from-ddos/protecting-sp-networks-from-ddos-fig1.svg)

The first step is to gain visibility into the attacks taking place against the service provider network. The above diagram shows:

1. Cloudflare is made aware of the networks to be protected. Service providers identify the prefixes (i.e. 203.0.113.0/24) they wish to protect and initiate a one-off task to onboard these prefixes onto the Cloudflare Magic Transit service; this step is a prerequisite and doesn’t affect the actual network traffic flow. Cloudflare recommends onboarding more specific prefixes compared to those the service providers advertise to the Internet. As in this example, if 203.0.113.0/24 is the protected prefix that is onboarded to Cloudflare, then the less specific 203.0.112.0/23 that encompasses both 112.0/24 and 113.0/24 prefixes, can be advertised to your upstream ISP.
2. Service provider network devices send all traffic flow data (Netflow, IPFIX or sFlow) to the [Cloudflare Magic Network Monitoring](/magic-network-monitoring/) service. Cloudflare analyses this flow data to detect DDoS attacks.
3. Cloudflare recommends, when possible, to connect to the Cloudflare network by setting up redundant [Cloudflare Network Interconnect](/network-interconnect/) (CNI) at our [Interconnection facilities](https://www.peeringdb.com/net/4224), this allows adherence to the 1500 Bytes Maximum Transmission Unit (MTU) for routed user traffic. Alternatively you can connect to the Cloudflare network using [Generic Routing Encapsulation (GRE) tunnels](/magic-transit/reference/tunnels/) over the Internet.
4. In peacetime, traffic flows as usual between the ISP network and their upstream transit and peer networks, bypassing the Cloudflare network.

![Figure 1: Overall solution of user access controls to, and the discovery of, sensitive data.](/images/reference-architecture/protecting-sp-networks-from-ddos/protecting-sp-networks-from-ddos-fig2.svg)

The above diagram shows how Cloudflare monitors service provider traffic and, upon detecting a possible volumetric DDoS attack, automatically advertises the most specific protected prefix from the Cloudflare global network to the Internet. This ensures that all traffic to this protected prefix is rerouted through the Cloudflare network, where malicious traffic is mitigated.

1. Upon detecting a possible volumetric DDoS attack, Cloudflare automatically generates an alert. Service providers can receive the alert notifications via email and/or webhook. Additionally, the alert can trigger [automatic prefix announcement](/magic-network-monitoring/magic-transit-integration/#activate-ip-auto-advertisement) from the Cloudflare network to the Internet, as per the Magic Transit configuration by the service provider.
2. Cloudflare advertises the protected prefix from all Cloudflare points-of-presence. Since Cloudflare advertises a more specific prefix, only the traffic destined for the attacked prefix is rerouted through the Cloudflare network.
3. Cloudflare's network mitigates the attack traffic while letting legitimate traffic through to the service provider network. Service providers receive the original packets with an MTU of 1500 Bytes when using [Cloudflare Network Interconnect](/network-interconnect/) (CNI).
4. Outbound traffic of the protected prefix, as well as the traffic of other prefixes, remains unaffected and continues to be routed to the Internet via the service provider's upstream links.
5. Private peering with trusted networks is unaffected and traffic from these content providers (such as Facebook, Netflix, YouTube) will not be rerouted via Cloudflare.

## Related resources

- [Magic Transit Reference Architecture](/reference-architecture/architectures/magic-transit/)
- [Cloudflare Network Interconnect](/reference-architecture/architectures/magic-transit/)
- [Flow-based monitoring for Magic Transit](https://blog.cloudflare.com/flow-based-monitoring-for-magic-transit)