---
title: Create interconnects
pcx_content_type: how-to
---

# Create Express CNI interconnects

1. Log in to the [Cloudflare dashboard](https://developers.cloudflare.com/), and select your account.
2. Select **Interconnects**.
3. In **Types of CNIs** > **Direct**, select **Create new**.
4. In **Enter your location**, search for the location where you have the data centers you want to connect to Cloudflare through Express CNI.
5. From the list of locations, choose the one that suits you with **Select the location**.

    {{<Aside type="note">}}If your location does not come up in the search, that means that Express CNI is not available in your location yet. Refer to [Classic CNI](/network-interconnect/classic-cni/) to learn how you can use the classic version of network interconnect to connect your location to Cloudflare.{{</Aside>}}

6. In **Choose your interconnect speed**, select either **1 Gigabit** or **10 Gigabit**.
7. After choosing a speed, give your interface a name and select **Continue**.

    {{<Aside type="note">}}Contact your account team if you need 100 Gigabit connections.{{</Aside>}}

8. Review the options you have chosen, and select **Confirm order**.
9. Download the Letter of Authorization that Cloudflare created with your settings. You will need this document to contact your data center and provide them the IP addresses for the CNI connection.
10. Select **View Interconnects** to review the CNIs you have ordered.