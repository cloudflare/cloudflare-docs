---
title: Prerequisites
pcx_content_type: tutorial
weight: 3
---

# Prerequisites

Before you can begin using Magic Transit, verify that you meet Cloudflare's onboarding requirements.

## Verify router compatibility

Magic Transit relies on Anycast tunnels to transmit packets from Cloudflare’s global network to your origin network.

The routers at your tunnel endpoints must meet the following requirements to ensure compatibility with Magic Transit.

- Support Anycast tunneling.
- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support maximum segment size (MSS) clamping.

## Draft Letter of Authorization

Draft a [Letter of Authorization (LOA)](/byoip/about/loa/) that identifies the prefixes you want to advertise and gives Cloudflare permission to announce them. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on your behalf. See this [LOA template](/byoip/about/loa/) for an example.

If you are an Internet service provider (ISP) and advertising prefixes on behalf of a customer, an LOA is required for the ISP and for the customer.

If you are using a Cloudflare IP, you do not need to submit an LOA. 

{{<Aside type="note" header="Note">}}

The Letter of Authorization must be a PDF. Transit providers may reject the LOA if it is a JPG or PNG.

{{</Aside>}}

## Verify IRR entries

Verify your Internet Routing Registry (IRR) entries match corresponding origin autonomous system numbers (ASNs) to ensure Magic Transit routes traffic to the correct autonomous systems (AS). For guidance, refer to [Verify IRR entries](/byoip/how-to/verify-irr-entries/).

If you are using a Cloudflare IP, you do not need to verify your IRR entries.

### Optional: RPKI check for prefix validation

You can also use the Resource Public Key Infrastructure (RPKI) as an additional option to validate your prefixes.

To check your prefixes, you can use [Cloudflare's RPKI Portal](https://rpki.cloudflare.com/?view=validator).

```mermaid
flowchart LR

subgraph 1
direction LR
a["Protocol (20 bytes)"] & b["IP header (20 bytes)"]
end

subgraph 2
direction LR
c["Protocol (20 bytes)"] & c["IP header (20 bytes)"] & e["GRE header (4 bytes)"] & f["IP header (20 bytes)"]
end

subgraph 3
direction LR
g[IP] & h[Protocol]
end

subgraph 4
direction LR
i[Protocol] & j[IP]
end

subgraph 5
direction LR
k[Protocol] & l[IP] & m[GRE] & n[IP]
end

subgraph 6
direction LR
o{{SYN}}
p{{ACK}}
end

o{{SYN}} --> r{{Client machine}} --> 1 --> s{{Magic Transit}} --> 2 --> t{{Origin router}}


q{{SYN-ACK}} --> 3 --> 6


p{{ACK}} --> r{{Client machine}} --> 4 --> s{{Magic Transit}} --> 5 --> t{{Origin router}}


```

{{<render file="_maximum-segment-size.md" withParameters="/magic-transit/static/mss-values-and-packet.png;;Magic Transit;;To accommodate the additional header data, you must set the MSS value to 1436 bytes at your physical egress interfaces — not the tunnel interfaces. For Magic Transit egress traffic, the MSS should be set via the tunnel’s interface for egress traffic.">}}

{{<render file="_clear-dont-fragment.md">}}

{{<render file="_router-vendor-guidelines-mss-settings-origin.md" withParameters="Run the following command on the servers egressing the prefixes you want to add to Magic Transit to verify that your routers have the correct MSS setting (1436 bytes) at your origin.">}}
