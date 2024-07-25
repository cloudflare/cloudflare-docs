---
title: Prerequisites
pcx_content_type: tutorial
weight: 3
---

# Prerequisites

Before you can begin using Magic Transit, verify that you meet Cloudflare's onboarding requirements.

## Verify router compatibility

Magic Transit relies on {{<glossary-tooltip term_id="anycast">}}anycast{{</glossary-tooltip>}} tunnels to transmit {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}} from Cloudflare’s global network to your origin network.

The routers at your tunnel endpoints must meet the following requirements to ensure compatibility with Magic Transit.

- Support anycast tunneling.
- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support {{<glossary-tooltip term_id="maximum segment size (MSS)">}}maximum segment size (MSS){{</glossary-tooltip>}} clamping.

## Draft Letter of Agency

Draft a [Letter of Agency (LOA)](/byoip/concepts/loa/) - sometimes referred to as a Letter of Authorization - that identifies the prefixes you want to advertise and gives Cloudflare permission to announce them. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on your behalf. See this [LOA template](/byoip/concepts/loa/) for an example.

If you are an Internet service provider (ISP) and advertising {{<glossary-tooltip term_id="prefix">}}prefixes{{</glossary-tooltip>}} on behalf of a customer, an LOA is required for the ISP and for the customer.

If you are using a [Cloudflare IP address](/magic-transit/cloudflare-ips/), you do not need to submit an LOA.

{{<Aside type="note" header="Note">}}

The LOA must be a PDF. Transit providers may reject the LOA if it is a JPG or PNG.

{{</Aside>}}

## Verify IRR entries

Verify your Internet Routing Registry (IRR) entries match corresponding origin autonomous system numbers (ASNs) to ensure Magic Transit routes traffic to the correct autonomous systems (AS). For guidance, refer to [Verify IRR entries](/byoip/concepts/irr-entries/best-practices/#verify-an-irr-entry).

If you are using a Cloudflare IP, you do not need to verify your IRR entries.

### Optional: RPKI check for prefix validation

You can also use the Resource Public Key Infrastructure (RPKI) as an additional option to validate your prefixes. RPKI is a [security framework method](https://blog.cloudflare.com/rpki/) that associates a route with an autonomous system. It uses cryptography to validate the information before being passed onto the routers.

To check your prefixes, you can use [Cloudflare's RPKI Portal](https://rpki.cloudflare.com/?view=validator).

{{<render file="prerequisites/_maximum-segment-size.md" withParameters="Magic Transit;;To accommodate the additional header data, you must set the MSS value to 1436 bytes at your physical egress interfaces — not the tunnel interfaces. For Magic Transit egress traffic, the MSS should be set via the tunnel’s interface for egress traffic.">}}

{{<render file="prerequisites/_clear-dont-fragment.md">}}

{{<render file="prerequisites/_router-vendor-guidelines-mss-settings-origin.md">}}
