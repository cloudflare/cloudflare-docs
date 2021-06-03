---
title: Megaport
order: 3
pcx-content-type: tutorial
---


# Megaport Users

## Creating a VXC with a service key

Once the service key is created and shared, anybody with the key can create a connection.

**To create a VXC with a service key**

1.  Log in to the [Megaport Portal](https://portal.megaport.com/).

2.  Find the Megaport that you want to use for the connection and click **+Connection** and click **Enter Service Key**.

    ![Enter Service Key](https://docs.megaport.com/marketplace/img/service-key-enter.png)

3.  Enter the service key in the Megaport Service Key ID field.
 Megaport validates the key and displays basic information about the key.

    ![Service key validation](https://docs.megaport.com/marketplace/img/service-key-valid.png)

4.  Click **Next**.

5.  Specify these connection details:

    -   **Name your connection** -- The name of your VXC to be shown in the Megaport Portal.
    -   **Invoice Reference** - This is an optional field. It can be any text, such as a PO number or billing reference number.
    -   **Rate Limit** -- The speed of your connection in Mbps, up to the maximum limit defined by the key.
    -   **Preferred A-End VLAN** -- Optionally, specify an unused VLAN ID for this connection. This must be a unique VLAN ID on this Megaport and can range from 2 to 4093. If you don't specify a value, Megaport will assign one.

        (The B-End VLAN for the Cloudflare side termination automatically populates based on the service key.)

6.  Click **Next**. A summary page appears that includes the monthly cost. 
    
7. Click **Back** to make changes or click **Add VXC** to move this configuration to your cart. Once you have finished this configuration, you can configure additional VXCs or proceed through the checkout process.

8. Cloudflare will accept the connection and your Account team will provide next steps with respect to network turn up and BGP session establishment.
