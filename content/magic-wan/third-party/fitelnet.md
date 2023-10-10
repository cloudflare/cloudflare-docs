---
pcx_content_type: integration-guide
title: Furukawa Electric FITELnet
---

# Furukawa Electric FITELnet

This tutorial describes how to configure the Furukawa Electric's FITELnet F220 and F70 devices to connect to Cloudflare Magic WAN via IPsec tunnels. The use cases described in this tutorial are for both east-west (branch to branch) and north-south (Internet-bound).

## Testing environment

These configurations were tested on FITELnet F220 and F70 series with the following firmware versions:
  - **F220 series**: Version 01.11(00)
  - **F70 series**: Version 01.09(00)

## IPsec configuration

### Magic WAN configuration

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration**.
3. From the **Tunnels** tab, select **Create**.
4. For the first IPsec tunnel, ensure the following settings are defined (refer to [Add tunnels](/magic-wan/get-started/configure-tunnels/#add-tunnels) for information on settings not mentioned here):
    - **Tunnel name**: `FITEL-tunnel-1`
    - **Interface address**: Enter `10.0.0.1/31` for your first tunnel.
    - **Customer endpoint**: The global address for your first FITELnet router.
    - **Cloudflare endpoint**: The Cloudflare Anycast IP assigned to you by your account team.
    - **Pre-shared key**: Create a pre-shared key for your first tunnel.
5. For the second IPsec tunnel, make the same changes as you did for the first tunnel, and ensure these additional setting is defined:
    - **Tunnel name**: `FITEL-tunnel-2`
    - **Interface address**: Enter `10.0.0.3/31` for your second tunnel.
    - **Customer endpoint**: The global address for your second FITELnet router.
    - **Cloudflare endpoint**: The Cloudflare Anycast IP assigned to you by your account team.
    - **Pre-shared key**: Create a pre-shared key for your second tunnel.

### FITELnet router configuration

#### Router 1 settings

Use the CLI to configure these settings:

```txt
interface Tunnel 1
 ip address 10.0.0.0 255.255.255.254
 tunnel mode ipsec map MAP1
 link-state sync-sa
exit
!

crypto ipsec policy IPsec_POLICY
 set security-association always-up
 set security-association lifetime seconds 28800
 set security-association transform-keysize aes 256 256 256
 set security-association transform esp-aes esp-sha256-hmac
 set mtu 1460
 set mss 1350
 set ip df-bit 0
 set ip fragment post
 set udp-encapsulation nat-t keepalive interval 30 always-send
exit
!
crypto ipsec selector SELECTOR
 src 1 ipv4 any
 dst 1 ipv4 any
exit
!
crypto isakmp keepalive
crypto isakmp log sa
crypto isakmp log session
crypto isakmp log negotiation-fail
crypto isakmp negotiation always-up-params interval 100 max-initiate 10 max-pending 10 delay 1
crypto ipsec replay-check disable 
!
crypto isakmp policy ISAKMP_POLICY
 authentication pre-share
 encryption aes
 encryption-keysize aes 256 256 256
 group 14
 lifetime 14400
 hash sha sha-256
 initiate-mode main
exit
!
crypto isakmp policy P1-POLICY
 authentication pre-share
 encryption aes
 encryption-keysize aes 256 256 256
 group 14
 lifetime 14400
 hash sha sha-256
 initiate-mode main
exit
!
crypto isakmp profile PROF1
 local-address <ROUTER1_ADDRESS>
 self-identity address <ROUTER1_ADDRESS>
 set isakmp-policy ISAKMP_POLICY
 set ipsec-policy IPsec_POLICY
 set peer anycast-address
 ike-version 2
 local-key <PRE-SHARED-KEY-TUNNEL01>
exit
!
crypto map MAP1 ipsec-isakmp
 match address SELECTOR
 set isakmp-profile PROF1
exit
!
```

#### Router 2 settings

Use the CLI to configure these settings:

```txt
interface Tunnel 2
 ip address 10.0.0.2 255.255.255.254
 tunnel mode ipsec map MAP1
 link-state sync-sa
exit
!

crypto ipsec policy IPsec_POLICY
 set security-association always-up
 set security-association lifetime seconds 28800
 set security-association transform-keysize aes 256 256 256
 set security-association transform esp-aes esp-sha256-hmac
 set mtu 1460
 set mss 1350
 set ip df-bit 0
 set ip fragment post
 set udp-encapsulation nat-t keepalive interval 30 always-send
exit
!
crypto ipsec selector SELECTOR
 src 1 ipv4 any
 dst 1 ipv4 any
exit
!
crypto isakmp keepalive
crypto isakmp log sa
crypto isakmp log session
crypto isakmp log negotiation-fail
crypto isakmp negotiation always-up-params interval 100 max-initiate 10 max-pending 10 delay 1
crypto ipsec replay-check disable 
!
crypto isakmp policy ISAKMP_POLICY
 authentication pre-share
 encryption aes
 encryption-keysize aes 256 256 256
 group 14
 lifetime 14400
 hash sha sha-256
 initiate-mode main
exit
!
crypto isakmp policy P1-POLICY
 authentication pre-share
 encryption aes
 encryption-keysize aes 256 256 256
 group 14
 lifetime 14400
 hash sha sha-256
 initiate-mode main
exit
!
crypto isakmp profile PROF1
 local-address <ROUTER2_ADDRESS>
 self-identity address <ROUTER2_ADDRESS>
 set isakmp-policy ISAKMP_POLICY
 set ipsec-policy IPsec_POLICY
 set peer anycast-address
 ike-version 2
 local-key <PRE-SHARED-KEY-TUNNEL02>
exit
!
crypto map MAP1 ipsec-isakmp
 match address SELECTOR
 set isakmp-profile PROF1
exit
!
```

## Static route configuration 

To configure routes for east-west (branch to branch) connections, refer to the following settings.

### Magic WAN

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration**.
3. From the **Static Routes** tab, select **Create**.
4. For the first route, ensure the following settings are defined (refer to [Configure static routes](/magic-wan/get-started/configure-static-routes/) to learn about settings not mentioned here):
  - **Prefix**: `192.168.0.0/24`
  - **Tunnel/Next hop**: _FITEL-tunnel-1 / 10.0.0.0_
5. For the second route, ensure the following settings are defined:
  - **Prefix**: `192.168.1.0/24`
  - **Tunnel/Next hop**: _FITEL-tunnel-2 / 10.0.0.2_

### FITELnet router configuration

#### Router 1

Use the CLI to configure these settings:

```txt
ip route 192.168.0.0 255.255.255.0 tunnel 1
```

#### Router 2

Use the CLI to configure these settings:

```txt
ip route 192.168.1.0 255.255.255.0 tunnel 2
```

---

## Connection test

### IPsec status

In the FITELnet router CLI, you can run `show crypto sa` to check the status of the IPsec security associations (SAs). `Total number of ISAKMP/IPSEC SA` shows the number of established SAs.  

```txt
show crypto sa

  IKE_SA
    Mode: <I>
    Local IP : <LOCAL_IP>/500
    Local ID : <LOCAL_ID> (ipv4)
    Remote IP : anycast-address/500
    Remote ID : anycast-address (ipv4)
    Local Authentication method : Pre-shared key
    Remote Authentication method : Pre-shared key
    Encryption algorithm : aes256-cbc
    Hash algorithm : hmac-sha256-128
    Diffie-Hellman group : 14 (2048 bits)
    Initiator Cookie : aaaaaaaa bbbbbbbb
    Responder Cookie : cccccccc dddddddd
    Life time : 6852/14400 sec
    DPD : on

  CHILD_SA <I>
    Selector :
      0.0.0.0/0 ALL ALL <---> 0.0.0.0/0 ALL ALL
    Interface : tunnel 1
    Peer IP : anycast-address/500
    Local IP : xxx.xxx.xxx.xxx/500
    Encryption algorithm : AES-CBC/256
    Authentication algorithm : HMAC-SHA2-256
    Life time : 22868/28800 sec
    PFS : off ESN : off
    IN
      SPI : eeeeeeee
      Packets       : 0
      Octets        : 0
      Replay error  : 0
      Auth error    : 0
      Padding error : 0
      Rule error    : 0
    OUT
      SPI : ffffffff
      Packets       : 0
      Octets        : 0
      Seq lapped    : 0

  Total number of ISAKMP SA 1
  Total number of IPSEC SA 1
```

### Route Status 

In the FITELnet router CLI, you can run `show ip route` to check the route information. A `*` in the route information indicates that the route information is valid.

```txt
show ip route

Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
       B - BGP, T - Tunnel, i - IS-IS, V - VRRP track,
       Iu - ISAKMP SA up, It - ISAKMP tunnel route, Ip - ISAKMP l2tpv2-ppp
       Dc - DHCP-client, L - Local Breakout
       > - selected route, * - FIB route, p - stale info

<snip>
S > * 192.168.1.0/24 [100/0] is directly connected, Tunnel1
<snip>
#
```