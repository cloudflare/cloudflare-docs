---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000224192-Billing-for-Argo
title: Billing for Argo
---

# Billing for Argo

## Overview

Argo analyzes and optimizes web traffic routing decisions to increase the loading speed of your domain.

Argo is charged per domain, so you will be billed for the amount of data transferred (both upload and download bandwidth) between Cloudflare and your visitors on each domain using Argo.

Argo is also usage-based, so each invoice reflects the prior month's usage. For example, your September invoice will include charges for Argo usage in August.

___

## Argo billing details

Argo billing includes charges for cache hits and requests to and responses from the Cloudflare network.

Enabling Argo in the Cloudflare dashboard initiates a USD $5.00 monthly charge. After transferring the first gigabyte of traffic between Cloudflare and your visitors, you are charged an additional USD $0.10 per gigabyte.

Toggling Argo on/off via the **Traffic** app in the dashboard will not cause multiple charges.

However, you will be charged multiple times if you cancel then re-enable your Argo subscription in the _Subscriptions_ section under the **Billing** tab.

Below are some estimated pricing based on the expected amount of traffic:

| Expected Traffic | Expected cost (per domain) |
| --- | --- |
| < 1 GB | $5 |
| 10 GB | $5.90 |
| 100 GB | $14.90 |
| 1 TB (1000GB) | $104.90 |
| 10 TB | $1,004.90 |
