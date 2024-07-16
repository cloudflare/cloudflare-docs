---
title: Load balancing
pcx_content_type: reference
weight: 5
meta:
  title: Use Aegis with Load Balancing
---

# Use Aegis with Load Balancing

[Cloudflare Load Balancing](/load-balancing/) allows you to intelligently distribute traffic across your origins by issuing regular monitors (that assess origin health) and following the traffic steering policies you define.

By default, the Load Balancing monitors will use public Cloudflare IP addresses.

To avoid inconsistencies between what the Load Balancing monitors report and what you observe in service traffic with Aegis, make sure to turn on the **Simulate Zone** option in the [monitor settings](/load-balancing/monitors/create-monitor/#create-a-monitor).