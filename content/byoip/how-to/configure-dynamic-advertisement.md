---
title: Configure dynamic advertisement
pcx_content_type: how-to
---

# Configure dynamic advertisement

To prevent issues and simplify the advertisement process during an attack scenario, refer to [best practices for managing dynamic advertisement](/byoip/concepts/dynamic-advertisement/best-practices/).

## Configure dynamic advertisement via the dashboard

To configure IP prefix assignment from your Cloudflare account home, use the **Status** drop-down list in the **IP Prefixes** dialog, as outlined below.

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2.  Go to **IP Addresses** > **IP Prefixes**.
3.  To edit a prefix, select **Edit** at the end of the entry.
4.  From **Edit IP Prefixes**, select **Advertised** or **Withdrawn** under **Status**.
5.  Select **Save** to commit your changes.

After saving your changes, it takes between two to seven minutes to enable advertisement and approximately 15 minutes to disable (withdraw) advertisement.

## Configure dynamic advertisement via the API

To configure prefix advertisement with the Cloudflare API, use the [IP Address Management and Dynamic Advertisement](/api/operations/ip-address-management-dynamic-advertisement-get-advertisement-status) API.

Most dynamic advertisement operations require that you supply the Cloudflare ID for any prefix you want to access with the Cloudflare API. The following section outlines how to obtain Prefix IDs.

## Obtain Prefix IDs

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **IP Prefixes**.
3. Find the CIDR for which you want the Prefix ID, and select the arrow next to it.
4. The Prefix ID is the value under **API Tag**. Select **Copy** to add the value to your clipboard.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To obtain Prefix IDs using the API, refer to the [List Prefixes](/api/operations/ip-address-management-prefixes-list-prefixes) operation in the Cloudflare API.

{{</tab>}}
{{</tabs>}}
