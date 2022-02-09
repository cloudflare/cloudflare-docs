---
order: 1
pcx-content-type: get-started
---

# Get started

The onboarding process, from scoping to going live, typically takes about ten business days, and Cloudflare can significantly accelerate this timeline in active-attack scenarios.

Throughout the onboarding process, Cloudflare partners closely with your organization to accomplish the following tasks:

## 1. Scope your configuration

Starting with an initial kickoff call, Cloudflare engages with your organization to confirm the scope and timeline for setting up Magic Transit.

*Duration:* Less than one business day

After your call with Cloudflare, verify that you meet the [onboarding requirements](/get-started/requirements/).

## 2. [Configure tunnels](/get-started/configure-tunnels)

Cloudflare sets up Anycast tunnels for Magic Transit based on configuration details you supply.

*Duration:* ~4 business days

Provide the information specified in [Specify GRE Tunnel Endpoints](/get-started/configure-tunnels/specify-gre-tunnel-endpoints/) so that Cloudflare can set up your tunnels.

## 3. Run pre-flight checks

After Cloudflare stages the tunnels, Cloudflare validates tunnel connectivity, Letter of Authorization (LOA), Internet Routing Registry (IRR), and maximum segment size (MSS) configurations.

To ensure that the integration is ready to go live the following week, complete this step by close of business Thursday.

*Duration:* ~4 business days

## 4. Configure edge network

Once Cloudflare’s pre-flight checks have passed and your account team verifies the date to complete the change, the process of onboarding your prefixes to Cloudflare’s edge network begins.

To configure the edge network, Cloudflare routes traffic sourced from Cloudflare’s network and attracts traffic from the broader Internet by advertising your customer-owned prefixes.

These routing changes return any traffic generated within the Cloudflare edge network to the GRE tunnels set up for Magic Transit. This can happen if:

- An IP within your Magic Transit prefix accesses a web property proxied by Cloudflare.
- You have a proxied zone set up on Cloudflare with a target IP within a Magic Transit prefix range.

You control the edge router advertisement, which dictates whether Cloudflare’s edge network advertises your prefixes. Advertisement is activated at the go-live call, routing traffic via Cloudflare and the GRE tunnels to your data centers.

*Duration:* ~5 business days

<Aside type='warning' header='Important'>

You must put the appropriate MSS clamps in place before routing changes are made. Failure to apply an MSS clamp can result in dropped packets and hard-to-debug connectivity issues.

When using [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) with Magic Transit, you must set the MSS clamp size to 1332 bytes to accommodate additional overhead from the foo-over-UDP (FOU) protocol and IPv6. These are used to backhaul data from the data center where traffic is ingested (close to the end user) to the facility with the CNI link.

</Aside>

## 5. Go live and announce prefixes

Once edge network configuration is complete, schedule a go-live call. During this call, you announce your prefixes from Cloudflare’s edge network for the first time.

