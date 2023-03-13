---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360041721872-Billing-for-Spectrum
title: Billing for Spectrum
---

# Billing for Spectrum



## Overview

Cloudflare Spectrum allows proxying TCP/UDP traffic through Cloudflare’s network.  Spectrum protects SSH and RDP traffic from DDoS attacks and improves network performance. 

{{<Aside type="note">}}
Spectrum is available to Cloudflare paid plans (Pro, Business, and
Enterprise).
{{</Aside>}}

Spectrum is charged per domain, with a free allowance of either 5 GB for Pro or 10 GB for Business and Enterprise. Additionally, the number of subdomains used with Spectrum is limited to 10 per domain, but exceptions can be made on a case-by-case basis.

{{<Aside type="note">}}
Enterprise customers using Spectrum also have access to custom limits on
concurrent users and can use any TCP or UDP based protocol. [Contact
Cloudflare Sales](https://www.cloudflare.com/plans/enterprise/) to learn
more.
{{</Aside>}}

___

## Spectrum billing details

Spectrum is free for up to 5 GB or 10 GB of traffic depending on your paid plan type. Once you have used your free allowance, you will be charged $1.00 per gigabyte. This usage will be charged on a monthly basis on the billing cycle after the usage occurred.

{{<Aside type="note">}}
Traffic generated from DDoS attacks do not incur charges.
{{</Aside>}}

Each domain allows you to protect one of each protocol (SSH, Minecraft, or RDP). Business and Enterprise users can protect all three protocols, while Pro users can protect only SSH and Minecraft.  Usage is aggregated across protocols, but you may allocate Spectrum usage any way you choose.

For example, if you are on a Business plan (which allows up to 10GB free of charge) and pass 3GB of SSH, 3GB of RDP, and 5GB of Minecraft traffic using Spectrum (3 + 3 + 5 = 11 GB total), you will owe $1 during that month’s billing cycle (10 free with plan: 11 - 10 = 1 Gigabyte charged at $1).

{{<Aside type="note">}}
To monitor the usage of Cloudflare add-ons or subscriptions, you can
[enable email
notifications](https://support.cloudflare.com/hc/en-us/articles/115004555148/#11aoHZtimmL8WRIrA1jmD0).
When enabled, you will receive a notification to the billing email
address on file when the traffic, queries, requests, or minutes watched
exceed your desired threshold.
{{</Aside>}}

### Pricing per plan

After [enabling Spectrum](/spectrum/get-started), the pricing is as follows:

| Plan | Protocols | Free up to | Charges for overages | Maximum concurrent connections |
| --- | --- | --- | --- | --- |
| Pro | SSH, Minecraft | 5 GB | $1 per gigabyte | 10 |
| Business | SSH, Minecraft, RDP | 10 GB | $1 per gigabyte | 100 |
| Enterprise | SSH, Minecraft, RDP | 10 GB | $1 per gigabyte | 100 |

{{<Aside type="note">}}
Enterprise customers using Spectrum also have access to custom limits on
concurrent users and can use any TCP or UDP based protocol. [Contact
Cloudflare Sales](https://www.cloudflare.com/plans/enterprise/) to learn
more.
{{</Aside>}}

To cancel Spectrum billing, end concurrent connections by removing all Spectrum applications in the **Spectrum app**.

___

## Related Resources

-   [Spectrum developers documentation](/spectrum/get-started)
