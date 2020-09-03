---
title: Onboarding
alwaysopen: true
weight: 211
hidden: false
---

![Onboarding timeline](../../static/mt-onboarding-timeline.png)

The onboarding process, from scoping to going live, typically takes about 10 business days, and Cloudflare can significantly accelerate this timeline in active-attack scenarios.

Throughout the onboarding process, Cloudflare partners closely with your organization to accomplish the following:

* [Scope your configuration](#scope-your-configuration)
* [Configure tunnels](#configure-tunnels)
* [Run pre-flight checks](#run-pre-flight-checks)
* [Configure edge network](#configure-edge-network)
* [Go live and announce prefixes](#go-live-and-announce-prefixes)

## Scope your configuration

Starting with an initial kickoff call, Cloudflare engages your organization to confirm the scope and timeline for setting up Magic Transit.

*Duration:* Less than 1 business day

*Customer requirements:*

* Provide Letters of Authorization (LOA) for subnets to be advertised so that Cloudflare can port the changes. See [LOA Template](/byoip/loa/example-template/) for an example.
* Verify Internet Routing Registry (IRR) entries match corresponding origin autonomous system numbers (ASNs) so that Magic Transit routes traffic to the correct autonomous systems (AS). See [Updating IRR Records](/byoip/irr/updating-irr-records/) for guidelines on this step.

## Configure tunnels

Cloudflare sets up Anycast tunnels for Magic Transit based on configuration details you supply, as outlined below.

*Duration:* ~4 business days

*Customer requirements:* Supply information specified in _[Configuration data](/magic-transit/how-to/set-up/configuration-data/)_ so that Cloudflare can set up your tunnels.

## Run pre-flight checks

Once Cloudflare has staged the tunnels, we validate tunnel connectivity, LOA, IRR, and maximum segment size (MSS) configurations.

To ensure that the integration is ready to go live the following week, complete this step by close of business Friday.

*Duration:* ~4 business days

## Configure edge network
  
Once Cloudflare's pre-flight checks have passed and a date to complete the change has been verified by your account team, engineering will start the process of onboarding your prefixes to Cloudflare's edge network.

To configure the edge network, Cloudflare does the following:

1. Route traffic sourced from Cloudflare's network.
1. Attract traffic from the broader Internet by advertising your customer-owned prefixes.

*Duration:* ~2 business days

## Go live and announce prefixes

Once edge network configuration is complete, the final step is to schedule a go-live call. During this call you announce your prefixes from Cloudflare’s edge network for the first time.
