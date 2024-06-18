---
pcx_content_type: get-started
title: FAQ
weight: 20
---

# Frequently Asked Questions

## General

### What is Cloudflare Calls TURN pricing? How exactly is it calculated?

Cloudflare TURN pricing is based on the data sent from the Cloudflare edge to the TURN client, as described in [RFC 8656 Figure 1](https://datatracker.ietf.org/doc/html/rfc8656#fig-turn-model). This means data sent from the TURN server to the TURN client.

Pricing for Cloudflare Calls Serverless SFU and TURN services is $0.05 per GB of data used.

There is a free tier of 1,000 GB before any charges start. This free tier includes both Serverless SFU and TURN services. Cloudflare Calls billing appears as a single line item on your Cloudflare bill, covering both SFU and TURN.

Traffic between Cloudflare Calls TURN and Cloudflare Calls SFU or Cloudflare Stream (WHIP/WHEP) does not incur any charges.

### Is Calls TURN HIPAA/GDPR/FedRAMP compliant? 

Please view Cloudflare's [certifications and compliance resources](https://www.cloudflare.com/trust-hub/compliance-resources/) and contact your Cloudflare enterprise account manager for more information.

### Is Calls TURN end-to-end encrypted?

TURN protocol, [RFC 8656](https://datatracker.ietf.org/doc/html/rfc8656), does not discuss encryption beyond wrapper protocols such as TURN over TLS. If you are using TURN with WebRTC will encrypt data at the WebRTC level.

### What regions does Cloudflare Calls TURN operate at?

Cloudflare Calls TURN server runs on [Cloudflare's global network](https://www.cloudflare.com/network) - a growing global network of thousands of machines distributed across hundreds of locations, with the notable exception of the Cloudflare's [China Network](/china-network/).

### What is the difference between Cloudflare Calls TURN with a enterprise plan vs self-serve (pay with your credit card) plans?

There is no performance or feature level difference for Cloudflare Calls TURN service in enterprise or self-serve plans, however those on [enterprise plans](https://www.cloudflare.com/enterprise/) will get the benefit of priority support, predictable flat-rate pricing and SLA guarantees.

## Technical

### I need to allowlist (whitelist) Cloudflare TURN IP addresses which IP addresses should I use?

Please allowlist Cloudflare's published [IP address ranges](https://www.cloudflare.com/ips/). Cloudflare's TURN service will use an IP address from this list. For more details about static IPs, guarantees and other arrangements please discuss with your enterprise account team.

### I would like to hardcode IP addresses used for TURN in my application to save a DNS lookup

Although this is not recommended, we understand there is a very small set of circumstances where hardcoding IP addresses might be useful. In this case, you must set up alerting that detects changes the DNS response from `turn.cloudflare.com` (A and AAAA records) and update the hardcoded IP address(es) accordingly. Note that this DNS response could return more than one IP address. In addition, you must set up a failover to a DNS query if there is a problem connecting to the hardcoded IP address. Cloudflare tries to, but cannot guarantee that the IP address used for the TURN service won't change without a specific discussion. For more details about static IPs, guarantees and other arrangements please discuss with your enterprise account team.

### Does Cloudflare Calls TURN support the expired IETF RFC draft "draft-uberti-behave-turn-rest-00"?

The Cloudflare Calls credential generation function returns a JSON structure similar to the [expired RFC draft "draft-uberti-behave-turn-rest-00"](https://datatracker.ietf.org/doc/html/draft-uberti-behave-turn-rest-00), but it does not include the TTL value. If you need a response in this format, you can modify the JSON from the Cloudflare Calls credential generation endpoint to the required format in your backend server or Cloudflare Workers.

### I am observing packet loss when using Cloudflare Calls TURN - how can I debug this?

Packet loss is normal in UDP and can happen occasionally even on reliable connections. However, if you observe systematic packet loss, consider the following:

- Are you sending or receiving data at a high rate (>50-100Mbps) from a single TURN client? Calls TURN might be dropping packets to signal you to slow down.
- Are you sending or receiving large amounts of data with very small packet sizes (high packet rate > 5-10kpps) from a single TURN client? Cloudflare Calls might be dropping packets.
- Are you sending packets to new unique addresses at a high rate resembling to [port scanning](https://en.wikipedia.org/wiki/Port_scanner) behavior?

### I plan to use Calls TURN at scale. What is the rate at which I can issue credentials?

There is no defined limit for credential issuance. Start at 500 credentials/sec and scale up linearly. Ensure you use more than 50% of the issued credentials.

### Does Calls TURN support IPv6?

Yes. Cloudflare Calls is available over both IPv4 and IPv6 for TURN Client to TURN server communication, however it does not issue relay addresses in IPv6 as described in [RFC 6156](https://datatracker.ietf.org/doc/html/rfc6156).

### Does Calls TURN issue IPv6 relay addresses?

No. Calls TURN will not respect `REQUESTED-ADDRESS-FAMILY` STUN attribute if specified and will issue IPv4 addresses only.

### Does Calls TURN support TCP relaying?

No. Calls does not implement [RFC6062](https://datatracker.ietf.org/doc/html/rfc6062) and will not respect `REQUESTED-TRANSPORT` STUN attribute.