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

## Fortigate 

### IPsec Policy Based Configuration

```bash
config vpn ipsec phase1
    edit "<A_NAME_>"
        set interface "port1"
        set ike-version 2
        set keylife 14400
        set peertype any
        set proposal aes128gcm-prfsha256
        set localid "<FQDN_FROM_CF_DASH>"
        set remote-gw <CF_ANYCAST_IP>
        set psksecret <PSK>
end

config vpn ipsec phase2
    edit "<SAME_NAME_AS_PHASE_1>"
        set phase1name "<PHASE1_NAME>"
        set proposal aes128gcm
        set replay disable
        set auto-negotiate enable
        set keylifeseconds 14400
    next
end

config firewall policy
    edit <new unused policy id>
        set srcintf "<LAN_INTERFACE>"
        set dstintf "<INTERNET_INTERFACE>"
        set action ipsec
        set srcaddr "<LOCAL_NETWORK/HOST_TO_BE_TUNNELED>"
        set dstaddr "all"
        set schedule "always"
        set service "ALL"
        set logtraffic all
        set inbound enable
        set vpntunnel "<PHASE_1_NAME>"
    next
```

### Policy Based with NAT on Cloudflare IP (with egress)

```bash
config vpn ipsec phase1
    edit "<A_NAME>"
        set interface "port1"
        set ike-version 2
        set keylife 14400
        set peertype any
        set proposal aes128gcm-prfsha256
        set localid "<FQDN_FROM_CF_DASH>"
        set remote-gw <CF_ANYCAST_IP>
        set psksecret <PSK>
end

config vpn ipsec phase2
    edit "<SAME_NAME_AS_PHASE_1>"
        set phase1name "<PHASE1_NAME>"
        Set use-natip disable
        set proposal aes128gcm
        set replay disable
        set auto-negotiate enable
        set keylifeseconds 14400
    next
end
```

Below is the policy that directs egress traffic through the tunnel and ensures all traffic is has undergone NAT on the Cloudflare IP address.

```bash
config firewall policy
    edit 3
        set srcintf "port2"
        set dstintf "port1"
        set action ipsec
        set srcaddr "<LOCAL_NETWORK_TO_BE_TUNNELED>"
        set dstaddr "all"
        set schedule "always"
        set service "ALL"
        set logtraffic all
        set inbound enable
        set vpntunnel "<PHASE_1_NAME>"
        set natoutbound enable
        set natip <IP_PROVIDED_BY_CF>
    next
```

