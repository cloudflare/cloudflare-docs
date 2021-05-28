---
title: Equinix Fabric
order: 2
pcx-content-type: tutorial
---

# Equinix Users

## Ordering an Equinix Fabric Connection

After confirming locations and speeds with their account teams, customers should order Equinix Fabric connections to Cloudlfare as follows

1.  Navigate to <https://fabric.equinix.com/>
2.  Choose I want to connect to **A Service Provider**

![A Service Provider](../static/equinix-connect.png)


3. Search for **Cloudflare** and click **Select**

![Search for Cloudflare](../static/equinix-search.png)


4. Choose **Magic Transit** or **Cloudflare NaaS** (if you are not sure, choose Cloudflare NaaS, we can configure any service using this) and click **Create Connection**

![Search for Cloudflare](../static/equinix-create.png)


6. Select your **Origin Port** and your desired Cloudflare **Destination Location** (_Note: if the location you want is not listed, contact your Cloudflare Account team to request a new location under the "Interconnect Anywhere" program_)

![Search for Cloudflare](../static/equinix-source-and-destination.png)

7. Select **Speed** and **VLAN ID**

You can choose your own VLAN ID. Cloudlare will choose our own and Equinix Fabric will map between the two. If you'd like to use the same us, simply ask your account team for Cloudflare's VLAN ID and we will provide it.

![Search for Cloudflare](../static/equinix-details.png)

8. Click **Next** and then **Submit Order**

9. Cloudflare will accept the connection and your Account team will provide next steps with respect to BGP session establishment.