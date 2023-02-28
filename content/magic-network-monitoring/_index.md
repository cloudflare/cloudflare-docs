---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Magic Network Monitoring
---

{{<beta>}} Cloudflare Magic Network Monitoring {{</beta>}}

{{<description>}}

Detect and receive notifications about attacks based on traffic flows

{{</description>}}

{{<plan type="all">}}

Magic Network Monitoring provides visibility into your network traffic by analyzing network flow data sent from a customer’s routers. Magic Network Monitoring supports NetFlow v5, NetFlow v9, IPFIX, and sFlow.

Enterprise customers can use Magic Network Monitoring with [Magic Transit on-demand](/magic-transit/on-demand/) to monitor their network, identify volumetric DDoS attacks, and activate Magic Transit on-demand to mitigate those attacks.

---

## Features

{{<feature header="Rules" href="/magic-network-monitoring/rules/">}}

Create rules to configure the threshold for data flowing from your network. 

{{</feature>}}

{{<feature header="Notifications" href="/magic-network-monitoring/notifications/">}}

Set up notifications to learn about an attack. 

{{</feature>}}

---

## Related products

{{<related header="Magic Transit" href="/magic-transit/" product="magic-transit">}}

Mitigates L7, L4, and L3 DDoS attacks with Magic Network Monitoring with Magic Transit on-demand.
{{</related>}}

{{<related header="DDoS Protection" href="/ddos-protection/" product="ddos-protection">}}

Provides HTTP DDoS attack protection for zones onboarded to Cloudflare in addition to L3 and L4 DDoS attack protection.
{{</related>}}

{{<related header="Cloudflare Network Interconnect" href="/network-interconnect/" product="network-interconnect">}}

Connects your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.
{{</related>}}