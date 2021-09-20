---
title: Megaport
order: 3
pcx-content-type: tutorial
---

# Megaport Users

## Create a VXC with a service key

The Cloudflare account team creates the Service Key and sends it to you via email. After the Service Key is sent, anyone who has the key can use it to create a connection.

1. Log in to the [Megaport Portal](https://portal.megaport.com/).
1. Find the Megaport you want to use for the connection and click **+Connection**.
1. Under **Choose Destination Type**, click **Enter Service Key**.
1. Under **Service Key** > **Megaport Service Key Id**, enter the service key.
 Megaport validates the key and displays basic information about the key.
1.  Click **Next**.
1.  Specify these connection details:

    -   **Name your connection** - The name of your VXC shown in the Megaport Portal.
    -   **Invoice Reference** - Optional. This can be any text, such as a PO number or billing reference number.
    -   **Rate Limit** - The speed of your connection in Mbps up to the maximum limit defined by the key.
    -   **Preferred A-End VLAN** -- Optional. Specifies an unused VLAN ID for the connection. This must be a unique VLAN ID on the Megaport and can range from 2 to 4093. If you don't specify a value, Megaport assigns one.

        (The B-End VLAN for the Cloudflare side termination automatically populates based on the service key.)

1. Click **Next**. A summary page appears that includes the monthly cost.     
1. Click **Back** to make changes or click **Add VXC** to move this configuration to your cart. Once you have finished this configuration, you can configure additional VXCs or proceed through the checkout process.

Cloudflare will accept the connection and your account team will contact you to establish the BGP session.
