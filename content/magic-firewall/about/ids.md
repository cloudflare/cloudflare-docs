---
title: IDS
pcx_content_type: concept
---

# Intrusion Detection Systems (IDS)

Cloudflare's Intrusion Detection System (IDS) is an Advanced Magic Firewall feature you can use to actively monitor for a wide range of known threat signatures in your traffic. An IDS expands the security coverage of a firewall to analyze traffic against a broader threat database, detecting a variety of sophisticated attacks such as ransomware, data exfiltration, and network scanning based on signatures or “fingerprints” in network traffic.

With Cloudflare’s global Anycast network, you get:

- Cloudflare’s entire global network capacity is now the capacity of your IDS.
- Built in redundancy and failover. Every server runs Cloudflare's IDS software, and traffic is automatically attracted to the closest network location to its source.
- Continuous deployment for improvements to Cloudflare’s IDS capabilities.

Refer to [Enable IDS](/magic-firewall/how-to/enable-ids/) for more information on enabling IDS and creating new rulesets.