---
pcx-content-type: get-started
title: Get started
weight: 4
---

# Get started

Before you can begin using Magic Transit, be sure to complete the onboarding steps below. Cloudflare can significantly accelerate this timeline during active-attack scenarios.

## 1. Scope your configuration

The onboarding process begins with an initial kickoff call where Cloudflare engages with your organization to confirm the scope and timeline for setting up Magic Transit.

After your call with Cloudflare, complete the [prerequisites](/magic-transit/prerequisites/).

## 2. Configure tunnels

[Configure your Anycast tunnels](/magic-transit/how-to/configure-tunnels/) to connect Cloudflare to your origin infrastructure.

## 3. Run pre-flight checks

After Cloudflare stages the tunnels, Cloudflare validates tunnel connectivity, Letter of Authorization (LOA), Internet Routing Registry (IRR), and maximum segment size (MSS) configurations.

## 4. Advertise prefixes

Once Cloudflare’s pre-flight checks have passed and your account team verifies the date to complete the change, the process of onboarding your prefixes to Cloudflare’s edge network begins.

To configure the edge network, Cloudflare routes traffic sourced from Cloudflare’s network and attracts traffic from the broader Internet by advertising your customer-owned prefixes.

You control the edge router advertisement, which dictates whether Cloudflare’s edge network advertises your prefixes. Advertisement is activated at the go-live call, routing traffic via Cloudflare and the GRE tunnels to your data centers.

If you are using a Cloudflare IP, you do not need to advertise your prefixes.

*Duration:* ~5 business days

{{<Aside type="warning" header="Important">}}

You must put the appropriate MSS clamps in place before routing changes are made. Failure to apply an MSS clamp can result in dropped packets and hard-to-debug connectivity issues.

When using [Cloudflare Network Interconnect](/network-interconnect/) with Magic Transit, you must set the MSS clamp size to 1332 bytes to accommodate additional overhead from the foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the data center where traffic is ingested (close to the end user) to the facility with the CNI link.

{{</Aside>}}

## 5. Go live and announce prefixes

Once edge network configuration is complete, schedule a go-live call. During this call, you announce your prefixes from Cloudflare’s edge network for the first time.
