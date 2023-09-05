---
title: IDS
pcx_content_type: concept
---

# Intrusion Detection System (IDS)

Cloudflare's Intrusion Detection System (IDS) is an Advanced Magic Firewall feature you can use to actively monitor for a wide range of known threat signatures in your traffic. An IDS expands the security coverage of a firewall to analyze traffic against a broader threat database, detecting a variety of sophisticated attacks such as ransomware, data exfiltration, and network scanning based on signatures or “fingerprints” in network traffic.

With Cloudflare’s global Anycast network, you get:

- Cloudflare’s entire global network capacity is now the capacity of your IDS.
- Built in redundancy and failover. Every server runs Cloudflare's IDS software, and traffic is automatically attracted to the closest network location to its source.
- Continuous deployment for improvements to Cloudflare’s IDS capabilities.

Refer to [Enable IDS](/magic-firewall/how-to/enable-ids/) for more information on enabling IDS and creating new rulesets. After IDS is enabled, your traffic will be scanned to find malicious traffic. The detections are logged to destinations that can be configured from the dashboard. Refer to [Use Logpush with IDS](/magic-firewall/how-to/use-logpush-with-ids/) for instructions on configuring a destination to receive the detections. Additionally, all traffic that is analyzed can be accessed via [network analytics](/analytics/network-analytics/). Refer to [GraphQL Analytics](/magic-firewall/tutorials/graphql-analytics/) to query the analytics data.