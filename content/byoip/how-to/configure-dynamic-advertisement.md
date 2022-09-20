---
title: Configure dynamic advertisement
pcx_content_type: how-to
---

# Configure dynamic advertisement

{{<Aside>}}

To prevent issues and simplify the advertisement process during an attack scenario, refer to [best practices for managing dynamic advertisement](/byoip/best-practices/dynamic-advertisement/).

{{</Aside>}}

## Before you start (Magic Transit customers only)

If you are advertising a new prefix or enabling the advertisement of an existing IP prefix (changing it from _Withdrawn_ to _Advertised_), make sure you disable [Advanced TCP Protection](/ddos-protection/tcp-protection/) first.

After enabling the prefix advertisement or advertising a new prefix, do the following:

1.  Ensure that the traffic is being successfully routed via the Cloudflare network. Check the Network Analytics dashboard or [use `traceroute`](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) to analyze the path IP packets are taking.
2.  Re-enable Advanced TCP Protection.

## Configure dynamic advertisement via the dashboard

To configure IP prefix assignment from your Cloudflare account home, use the **Status** drop-down list in the **IP Prefixes** dialog, as outlined below.

1.  Log in to your Cloudflare dashboard.
2.  On **Account Home**, select **IP Prefixes**.
3.  To edit a prefix, click the **Edit** at the end of the entry.
4.  From **Edit IP Prefixes**, under **Status**, select _Advertised_ or _Withdrawn_.
5.  Click **Save** to commit your changes.

After saving your changes, it takes between 2 to 7 minutes to enable advertisement and approximately 15 minutes to disable (withdraw) advertisement.

## Configure dynamic advertisement via the API

To configure prefix advertisement with the Cloudflare API, use the [IP Address Management and Dynamic Advertisement](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties) API.

Most dynamic advertisement operations require that you supply the Cloudflare ID for any prefix you want to access with the Cloudflare API. The following section outlines how to obtain Prefix IDs.

## Obtain Prefix IDs

You can obtain Prefix IDs from the **IP Prefixes** page in your Cloudflare Account Home.

1.  Click the expander for the entry whose Prefix ID you want to obtain.
2.  To obtain the Prefix ID, refer to the **API Tag** value. To add the value to your clipboard, click **Copy**.

To obtain Prefix IDs using the API, refer to the [List Prefixes](https://api.cloudflare.com/#ip-address-management-prefixes-list-prefixes) operation in the Cloudflare API.
