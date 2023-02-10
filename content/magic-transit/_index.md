---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Magic Transit
---

# Cloudflare Magic Transit

{{<description>}}Secure your network and improve performance at Cloudflare scale.{{</description>}}

{{<plan type="enterprise">}}

Magic Transit is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

Magic Transit delivers its connectivity, security, and performance benefits by serving as the front door to your IP network. This means it accepts IP packets destined for your network, processes them, and then outputs them to your origin infrastructure.

The Cloudflare network uses Border Gateway Protocol (BGP) to announce your company’s IP address space, extending your network presence globally, and [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) to ingest your traffic. Today, Cloudflare’s Anycast global network spans 275 cities in more than 100 countries around the world.

Once packets hit Cloudflare’s network, traffic is inspected for attacks, filtered, steered, accelerated, and sent onward to your origin. Magic Transit connects to your origin infrastructure using Anycast Generic Routing Encapsulation (GRE) tunnels over the Internet or, with [Cloudflare Network Interconnect (CNI)](/network-interconnect/), via physical or virtual interconnect.

Magic Transit users have two options for their implementation: ingress traffic or ingress and egress traffic. Users with an egress implementation will need to set up policy-based routing (PBR) or ensure default routing on their end forwards traffic to Cloudflare via tunnels.

![Magic Transit deployment diagram showing how traffic moves through the Cloudflare network](/magic-transit/static/egress-diagram.png)

---
 
## Features
 
{{<feature header="Health checks" href="/magic-transit/about/health-checks/">}}
Magic Transit and Magic WAN health checks monitor network status and the health of specific network components.
{{</feature>}}

{{<feature header="Traffic steering" href="/magic-transit/about/traffic-steering/">}}
Magic WAN steers traffic along tunnel routes based on priorities you define during the onboarding process.
{{</feature>}}

---

## Related products
 
{{<related header="Magic Firewall" href="/magic-firewall/" product="magic-firewall">}}
Magic Firewall is a firewall-as-a-service (FWaaS) delivered from the Cloudflare global network to protect office networks and cloud infrastructure with advanced, scalable protection.
{{</related>}}

{{<related header="Cloudflare Network Interconnect" href="/network-interconnect/" product="network-interconnect">}}
Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.
{{</related>}}