---
pcx_content_type: integration-guide
title: pfSense
---

# pfSense

This tutorial explains how to set up a policy-based or route-based IPsec VPN with a pfSense device.

## (Policy-based only) LAN interface configuration

1. From the pfSense WebGUI, select **Interfaces** > **LAN**.
2. Choose an interface from the **Available network ports** list.
3. Select **Add**. The **General Configuration** dialog displays.

{{<Aside header="Note">}}

You may need to adjust the MSS on the LAN interface. With the selected IPsec encryption ciphers, 1406 is the idle MSS as pfSense will subtract 40 from the value you specify.

{{</Aside>}}

Refer to the image below for guidance on which values to use.

![General configuration dialog for interface setup for a policy based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Enable**                | ✔️ Enable interface |
| **Description**           | LAN                |
|**IPv4 Configuration Type**| Static IPv4        |
|**IPv6 Configuration Type**| Static IPv6        |
| **MSS**                   | 1446               |

## Phase 1

<details>
<summary>
  Policy-based configuration
</summary>
 <div class="special-class" markdown="1">

![pfSense IPsec phase 1 setting values for a policy based configuration](/images/magic-wan/third-party/pfsense/pfsense-p1-settings.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | Name               |
| **Key Exchange Version**  | IKE v2             |
| **Internet Protocol**     | IPv4               |
| **Interface**             | WAN                |
| **Remote Gateway**        | &lt;Anycast IP provided by Cloudflare> |

![pfSense IPsec phase 1 expiration and replacement values for a policy based configuration](/images/magic-wan/third-party/pfsense/pfsense-p1-expiration-replacement.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Life Time**             | 28800              |
| **Rekey Time**            | 14400              |
| **Reauth Time**           | 0                  |

</div>
</details>

<details>
<summary>
  Route-based configuration
</summary>
 <div class="special-class" markdown="1">

 ![pfSense IPsec phase 1 setting values for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-p1-settings.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | Name               |
| **Key Exchange Version**  | IKE v2             |
| **Internet Protocol**     | IPv4               |
| **Interface**             | WAN                |
| **Remote Gateway**        | &lt;Anycast IP provided by Cloudflare> |

 ![pfSense IPsec phase 1 expiration and replacement values for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-p1-expiration-replacement.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Life Time**             | 28800              |
| **Rekey Time**            | 14400              |
| **Reauth Time**           | 0                  |
</div>
</details>

## Phase 2

<details>
<summary>
  Policy-based configuration
</summary>
 <div class="special-class" markdown="1">
 

![pfSense IPsec phase 2 general information values](/images/magic-wan/third-party/pfsense/pfsense-p2-general-info.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | Name               |
| **Mode**                  | Tunnel IPv4        |
| **Local Network**         | &lt;Local Network to be tunneled> |
| **NAT/BINAT translation** | None               |
| **Remote Network**        | Remote network available via the tunnel |

![pfSense IPsec phase 2 key exchange values](/images/magic-wan/third-party/pfsense/pfsense-p2-key-exchange.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Protocol**              | ESP                |
| **Encryption Algorithm**  | ✔️ AES128-GCM, 128 bits |
| **PFS key group**         | 14 (2048 bit)      |

![pfSense IPsec phase 2 key exchange values](/images/magic-wan/third-party/pfsense/pfsense-p2-expiration-replacement.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Life Time**             | 3600               |
| **Rekey Time**            | 3240               |
| **Rand Time**             | 360                |
| **Automatically ping host**| Specify an IP address available via the tunnel. Refer to the Description field for more information.    |
</div>
</details>

<details>
<summary>
  Route-based configuration
</summary>
 <div class="special-class" markdown="1">

![pfSense IPsec phase 2 general information for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-p2-general-info-route-based.png)

![pfSense IPsec phase 2 network settings for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-p2-networks-route-based.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | Name               |
| **Mode**                  | Routed (VTI)       |
| **Local Network**         | &lt;Local Tunnel Inside IP> |
| **Remote Network**        | &lt;Remote Tunnel Inside IP>|

![pfSense IPsec phase 2 key exchange values for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-p2-key-exchange.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Protocol**              | ESP                |
| **Encryption Algorithm**  | ✔️ AES128-GCM, 128 bits |
| **PFS key group**         | 14 (2048 bit)      |

![pfSense IPsec phase 2 key exchange values](/images/magic-wan/third-party/pfsense/pfsense-p2-expiration-replacement.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Life Time**             | 3600               |
| **Rekey Time**            | 3240               |
| **Rand Time**             | 360                |
| **Automatically ping host**| Specify an IP address available via the tunnel. Refer to the Description field for more information.    |
</div>
</details>

## (Route-based only) Interface assignment

1. From the pfSense WebGUI, select **Interfaces** > **LAN**.
2. Choose an interface from the **Available network ports** list.
3. Select **Add**. The **General Configuration** dialog displays.

{{<Aside header="Note:">}}

You may need to adjust the MSS on the LAN interface. With the selected IPsec encryption ciphers, 1406 is the idle MSS as pfSense will subtract 40 from the value you specify.

{{</Aside>}}

Refer to the image below for guidance on which values to use.

![General configuration dialog for interface setup for a policy based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Enable**                | ✔️ Enable interface |
| **Description**           | LAN                |
|**IPv4 Configuration Type**| Static IPv4        |
|**IPv6 Configuration Type**| Static IPv6        |
| **MSS**                   | 1446               |

4. From the pfSense WebGUI, select **Interfaces** > **Assignments**.

![pfSense interface assignment settings for route based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config-add-ipsec.png)

5. From **Available network ports**, select **+ Add**.

![Adding an interface to a pfSense interface assignment with a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config-opt1.png)

6. Under **Interface**, select **OPT1**.

![pfSense interface general configuration settings for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config-opt1-settings.png)

7. Ensure **Enable interface** is selected.
8. For **Description**, add a description to help you identify the interface.
9. For **MSS**, enter **1446**, which should be the same as the LAN interface.
10. Select **Save** to save your changes when you are done.

### Routing configuration

1. From the pfSense WebGUI, select **System**, **Routing**, **Static Routes**.
2. On the **Static Routes** page, select **Add**.
3. Create static routes for all network that will be routed via the tunnel with Gateway as the IPsec VTI interface.

![pfSense interface routing configuration settings for a route based configuration](/images/magic-wan/third-party/pfsense/pfsense-interface-config-routing-config.png)

### Firewall configuration

1. From the pfSense WebGUI, select **Firewall Rules**.
2. Select **LAN**.
3. Ensure a rule exists that allows traffic from LAN to IPsec.
4. Select **Save** when you are done.

If you need to allow traffic from IPsec to LAN, you will need to create rules that allow this.
