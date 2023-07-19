---
pcx_content_type: reference
title: Simulating test DDoS attacks
weight: 7
---

# Simulating test DDoS attacks

After onboarding to Cloudflare, you may want to simulate DDoS attacks against your Internet properties to test the protection, [reporting](/ddos-protection/reference/reports/), and [alerting](/ddos-protection/reference/alerts/) mechanisms. Follow the guidelines in this section to simulate a DDoS attack.

You can only launch DDoS attacks against your own Internet properties — your zone, Spectrum application, or IP range (depending on your Cloudflare services) — and provided that:

- The Internet properties are not shared with other organizations or individuals.
- The Internet properties have been onboarded to Cloudflare in an account under your name or ownership.

## Before you start

You do not have to obtain permission from Cloudflare to launch a DDoS attack simulation against your own Internet properties. However, before launching the simulated attack, you must [open a Support ticket](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) and provide the information below. All fields are mandatory.

### For WAF/CDN customers

- Attack origin region
- Attack duration
- Attack date & timeframe
- Attack method
- Bandwidth size or range
- Target IPs/range/zones
- Contact in case of emergency

### For Magic Transit and Spectrum customers

- Attack origin region
- Attack duration
- Attack date & timeframe
- Attack method
- Bandwidth size or range
- Target IPs/range/zones
- Target Ports
- Protocol
- Max packet/bit rate
- Contact in case of emergency
