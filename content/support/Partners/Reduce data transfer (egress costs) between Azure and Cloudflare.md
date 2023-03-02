---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4407207972109-Reduce-data-transfer-egress-costs-between-Azure-and-Cloudflare
title: Reduce data transfer (egress costs) between Azure and Cloudflare
---

# Reduce data transfer (egress costs) between Azure and Cloudflare



## Overview

Cloudflare launched Bandwidth Alliance in 2018 – a group of forward-looking cloud and storage providers who have agreed to waive or steeply discount egress costs for mutual customers. 

Cloudflare customers using Azure can lower their egress bills between Cloudflare and Azure via [Microsoft Routing Preference](https://docs.microsoft.com/en-us/azure/virtual-network/routing-preference-overview).

___

## How to

To lower your data transfer costs from Azure and Cloudflare: 

1.  In the Azure portal, go to your storage account. 
2.  Navigate to **Network Routing > Firewalls and virtual networks**.
3.  For **Routing preference**, choose **Internet routing**.
4.  Publish route-specific endpoint to **Internet routing**.
5.  Navigate to **Properties**.
6.  Locate the endpoint values for **Internet Routing**.
7.  Enter these endpoint values in your Cloudflare Dashboard.

![Example of where to enter endpoint URLs from Microsoft Azure into your Cloudflare dashboard.](/support/static/Screen_Shot_2021-08-16_at_1.11.27_PM.png)

For additional details, refer to [Configure network routing preference for Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/configure-network-routing-preference?tabs=azure-portal) and [Microsoft Routing Preference](https://docs.microsoft.com/en-us/azure/storage/common/network-routing-preference).

___

## Related resources

-   [Microsoft Azure data transfer announcement](https://blog.cloudflare.com/discounted-egress-for-cloudflare-customers-from-microsoft-azure-is-now-available/) (blog)
-   [Bandwidth Alliance](https://www.cloudflare.com/bandwidth-alliance/)
