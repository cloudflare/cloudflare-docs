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

Magic WAN supports a variety of {{<glossary-tooltip term_id="on-ramp">}}on-ramps{{</glossary-tooltip>}} including {{<glossary-tooltip term_id="anycast">}}Anycast{{</glossary-tooltip>}} {{<glossary-tooltip term_id="GRE tunnel">}}GRE{{</glossary-tooltip>}} or {{<glossary-tooltip term_id="IPsec tunnel">}}IPsec{{</glossary-tooltip>}} tunnels, [Cloudflare Network Interconnect](/network-interconnect/), [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/), [WARP](/cloudflare-one/connections/connect-devices/warp/), and a variety of Network On-ramp Partners. If you prefer to set up your sites automatically, you can purchase [Magic WAN Connector](/magic-wan/configuration/connector/), a lightweight software package you can install in corporate network locations to automatically connect, steer, and shape any IP traffic.

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

{{<feature header="Traffic steering" href="/magic-wan/reference/traffic-steering/" cta="Learn about traffic steering">}}
Magic WAN steers traffic along tunnel routes based on priorities you define during the onboarding process.
{{</feature>}}

{{<feature header="Network analytics" href="/magic-wan/configuration/manually/how-to/view-analytics/">}}
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

{{<related header="Cloudflare Network Interconnect" href="/network-interconnect/" product="network-interconnect">}}
Cloudflare Network Interconnect (CNI) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.
{{</related>}}