---
pcx-content-type: tutorial
title: pfSense
---

# pfSense

This tutorial explains how to set up a Policy Based IPsec VPN.

## Interface configuration

1. From the pfSense WebGUI, click **Interfaces** > **Assignments**.
2. Choose an interface from the **Available network ports** list.
3. Click **Add**. The **General Configuration** dialog displays.

Refer to the image below for which values to use.

{{<Aside header="Note:">}}

You may need to adjust the MSS on the LAN interface. With the selected IPsec encryption ciphers, 1406 is the idle MSS as pfSense will subtract 40 from the value you specify.

{{</Aside>}}

![General configuration dialog for interface setup](/magic-wan/static/pfsense-interface-config.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Enable**                | ✔️ Enable interface |
| **Description**           | LAN                |
|**IPv4 Configuration Type**| Static IPv4        |
|**IPv6 Configuration Type**| Static IPv6        |
| **MSS**                   | 1446               |

## Phase 1 

### Proposal (Authentication)

![pfSense IPsec phase 1 setting values](/magic-wan/static/pfsense-p1-settings.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | IPsecCF1           |
| **Key Exchange Version**  | IKE v2             |
| **Internet Protocol**     | IPv4               |
| **Interface**             | WAN                |
| **Remote Gateway**        | &lt;CF Anycast IP> |


### Expiration and Replacement

![pfSense IPsec phase 1 setting values](/magic-wan/static/pfsense-p1-expiration-replacement.png)

## Phase 2 settings

![pfSense IPsec phase 2 general information values](/magic-wan/static/pfsense-p2-general-info.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Description**           | IPsecCF1-P2        |
| **Mode**                  | Tunnel IPv4        |
| **Local Network**         | Network, &lt;Local Network to be tunneled>, 0 |
| **NAT/BINAT translation** | None               |
| **Remote Network**        | Network, 0.0.0.0, 0 |

### Proposal (SA/Key Exchange)

![pfSense IPsec phase 2 key exchange values](/magic-wan/static/pfsense-p2-key-exchange.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Protocol**              | ESP                |
| **Encryption Algorithm**  | ✔️ AES128-GCM, 128 bits |
| **PFS key group**         | 14 (2048 bit)      |

### Expiration and Replacement

![pfSense IPsec phase 2 key exchange values](/magic-wan/static/pfsense-p2-expiration-replacement.png)

| Field                     | Value              |
|---------------------------|--------------------|
| **Life Time**             | 3600               |
| **Rekey Time**            | 3240               |
| **Rand Time**             | 360                |
| **Automatically ping host**| 10.203.180.0      |
