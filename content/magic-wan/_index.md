---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Magic WAN
---

# Cloudflare Magic WAN

{{<description>}}Improve security and performance for your entire corporate networking, reducing cost and operation complexity.{{</description>}}

{{<plan type="enterprise">}}

Magic WAN provides secure, performant connectivity and routing for your entire corporate networking, reducing cost and operation complexity. [Magic Firewall](/magic-firewall/) integrates smoothly with Magic WAN, enabling you to enforce network firewall policies at Cloudflare's global network, across traffic from any entity within your network.

With Magic WAN, you can securely connect any traffic source — data centers, offices, devices, cloud properties — to Cloudflare’s network and configure routing policies to get the bits where they need to go, all within one SaaS solution.

Magic WAN supports a variety of {{<glossary-tooltip term_id="on-ramp">}}on-ramps{{</glossary-tooltip>}} including any device that supports {{<glossary-tooltip term_id="anycast">}}anycast{{</glossary-tooltip>}} {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels. To make it easier to onboard your cloud properties, you can use [Magic Cloud Networking](/magic-wan/configuration/magic-cloud-networking/), which automates the process of creating on-ramps from your cloud networks.

Refer to [On-ramps](/magic-wan/on-ramps/) for a full list of supported on-ramps.

---

## Features

{{<feature header="Magic WAN Connector" href="/magic-wan/configuration/connector/" cta="Use Magic WAN Connector">}}
Use Magic WAN Connector to automatically connect, steer, and shape any IP traffic.
{{</feature>}}

{{<feature header="Connect with third-party device" href="/magic-wan/configuration/manually/" cta="Use a third-party device">}}
Magic WAN is compatible with a host of third-party devices. If you do not have Magic WAN Connector, start here to learn how to set up Magic WAN manually.
{{</feature>}}

{{<feature header="Tunnel health checks" href="/magic-wan/reference/tunnel-health-checks/" cta="Learn about health checks">}}
Magic WAN sends health check probes to monitor network status and the health of specific network components.
{{</feature>}}

{{<feature header="Automatic cloud on-ramps" href="/magic-wan/configuration/magic-cloud-networking/" cta="Automate your cloud on-ramps">}}
Automate resource discovery, and reduce management burden when connecting to your public cloud.
{{</feature>}}

{{<feature header="Network analytics" href="/magic-wan/analytics/">}}
Network analytics allows you to check traffic patterns and DDoS attacks in near real-time, to troubleshoot IP traffic issues.
{{</feature>}}

---

## Related products

{{<related header="Cloudflare Zero Trust" href="/cloudflare-one/" product="cloudflare-one">}}
Cloudflare Zero Trust replaces legacy security perimeters with our global edge, making the Internet faster and safer for teams around the world.
{{</related>}}

{{<related header="Magic Firewall" href="/magic-firewall/" product="magic-firewall">}}
Magic Firewall is a firewall-as-a-service (FWaaS) delivered from the Cloudflare global network to protect office networks and cloud infrastructure with advanced, and scalable protection.
{{</related>}}

{{<related header="Magic Cloud Networking" href="/magic-cloud-networking/" product="magic-cloud-networking">}}
Simplify and automate cloud resource discovery, and reduce your management burden when connecting to your public cloud.
{{</related>}}

{{<related header="Cloudflare Network Interconnect" href="/network-interconnect/" product="network-interconnect">}}
Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.
{{</related>}}

{{<related header="Load Balancing" href="/load-balancing/" product="load-balancing">}}
Cloudflare Load Balancing distributes traffic across your endpoints, which reduces endpoint strain and latency and improves the experience for end users.
{{</related>}}