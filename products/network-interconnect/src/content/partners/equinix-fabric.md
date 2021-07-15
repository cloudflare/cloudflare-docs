---
title: Equinix Fabric
order: 2
pcx-content-type: tutorial
---

# Equinix Users

## Order an Equinix Fabric Connection

After you confirm the locations and speed with you account team, order the Equinix Fabric connections to Cloudlfare.

1. Navigate to <https://fabric.equinix.com/>
1. Under **I want to connect to:**, choose **A Service Provider**.
1. Under **Select a Service Provider**, search for **Cloudflare** and click **Select**.
1. Choose **Magic Transit** or **Cloudflare NaaS**. If you're unsure, choose **Cloudflare NaaS** which can can be used to configure any service.
1. Under **Origin** > **Connect Using**, choose your port.
1. Under **Destination**, choose your location. If the location you want is not listed, contact your Cloudflare account team to request a new location under the Interconnect Anywhere program.
1. Under **Connection Information** > **VLAN ID**, enter a VLAN ID. Cloudflare chooses its own VLAN ID and Equinix Fabric maps between the two. To use the same VLAN ID as Cloudflare, ask your account team for Cloudflare's VLAN ID and they will provide it.
1. Click **Next** and then **Submit Order**.

Cloudflare will accept the connection and your account team will contact you to establish the BGP session.