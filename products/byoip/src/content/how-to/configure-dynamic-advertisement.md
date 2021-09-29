---
title: Configure dynamic advertisement
pcx-content-type: how-to
---

# Configure dynamic advertisement

<Aside>

To prevent issues and simplify the advertisement process during an attack scenario, refer to [best practices for managing dynamic advertisement](/best-practices/dynamic-advertisement).

</Aside>

## Configure dynamic advertisement via the dashboard

To configure IP prefix assignment from your Cloudflare account home, use the **Status** drop-down list in the **IP Prefixes** dialog, as outlined below.

1. Log in to your Cloudflare dashboard.
1. On **Account Home**, select **IP Prefixes**.
1. To edit a prefix, click the **Edit** at the end of the entry.
1. From **Edit IP Prefixes**, under **Status**, select *Advertised* or *Withdrawn*.
1. Click **Save** to commit your changes.

After saving your changes, it takes between 2 to 7 minutes to enable advertisement and approximately 15 minutes to disable (withdraw) advertisement.

## Configure dynamic advertisement via the API

To configure prefix advertisement with the Cloudflare API, use the [IP Address Management and Dynamic Advertisement](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties) API.

Most dynamic advertisement operations require that you supply the Cloudflare ID for any prefix you want to access with the Cloudflare API. The following section outlines how to obtain Prefix IDs.

## Obtain Prefix IDs

You can obtain Prefix IDs from the **IP Prefixes** page in your Cloudflare Account Home.

1. Click the expander for the entry whose Prefix ID you want to obtain.
1. To obtain the Prefix ID, refer to the **API Tag** value. To add the value to your clipboard, click **Copy**.

To obtain Prefix IDs using the API, refer to the [List Prefixes](https://api.cloudflare.com/#ip-address-management-prefixes-list-prefixes) operation in the Cloudflare API.
