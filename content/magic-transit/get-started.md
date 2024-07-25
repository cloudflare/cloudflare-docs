---
pcx_content_type: get-started
title: Get started
weight: 4
---

# Get started

Before you can begin using Magic Transit, be sure to complete the onboarding steps below. Cloudflare can significantly accelerate this timeline during active-attack scenarios.

## ​​1. Scope your configuration

The onboarding process begins with an initial kickoff call where Cloudflare engages with your organization to confirm the scope and timeline for setting up Magic Transit.

After your call with Cloudflare, complete the prerequisites.

## ​​2. Configure tunnels

[Configure the tunnels](/magic-transit/how-to/configure-tunnels/) on both the Cloudflare side and your router side to connect to your origin infrastructure.

## 3. Configure static routes

Configure [static routes](/magic-transit/how-to/configure-static-routes/) to route traffic from Cloudflare’s global network to your locations.

## 4. Run pre-flight checks

After setting up your tunnels and static routes, Cloudflare validates tunnel connectivity, tunnel and endpoint [health checks](/magic-transit/reference/tunnel-health-checks/#tunnel-health-checks), {{<glossary-tooltip term_id="letter of agency">}}Letter of Agency (LOA){{</glossary-tooltip>}}, Internet Routing Registry (IRR), and {{<glossary-tooltip term_id="maximum segment size (MSS)">}}maximum segment size (MSS) configurations{{</glossary-tooltip>}}. Configurations for Cloudflare global network are applied and take around one day to rollout.

## 5. Advertise prefixes

Once pre-flight checks are completed, Cloudflare will unlock your {{<glossary-tooltip term_id="prefix">}}prefixes{{</glossary-tooltip>}} for you to [advertise via the dashboard, API or BGP](/magic-transit/how-to/advertise-prefixes/) at a time of your choosing. Refer to [Dynamic advertisement best practices](/byoip/concepts/dynamic-advertisement/best-practices/) to learn more about advertising prefixes.

If you are using a Cloudflare IP, you do not need to advertise your prefixes.

{{<Aside type="warning" header="Important">}}

You must put the appropriate MSS clamps in place before routing changes are made. Failure to apply an MSS clamp can result in dropped packets and hard-to-debug connectivity issues.

When using [Cloudflare Network Interconnect](/magic-transit/network-interconnect/) with Magic Transit, you must set the following MSS clamp sizes to accommodate additional overhead:

- GRE tunnels over Classic CNI: 1476 bytes
- Express CNI / Classic CNI with a maximum transmission unit (MTU) size of 1500 bytes handoff does not require an MSS clamp.

MSS clamps are used to backhaul data from the data center where traffic is ingested (close to the end user) to the facility with the CNI link.

{{</Aside>}}