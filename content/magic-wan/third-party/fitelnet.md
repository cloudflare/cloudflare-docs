---
pcx_content_type: integration-guide
title: Furukawa Electric　FITELnet
---

# Furukawa Electric　FITELnet

This tutorial describes how to configure the Furukawa Electric's FITELnet F220 and F70 to connect Cloudflare Magic WAN via IPsec tunnels. The use cases described in this tutorial are for both east-west (branch to branch) and north-south (Internet-bound).


<img src="imgs/FITEL-Cloudflare.jpg" width="100%">

--- 

## IPsec Configuration
First, configure the IPsec tunnel.

### MagicWAN Configuration 
In the Cloudflare dashboard, select [Magic WAN] and click [Configure] in Manage Magic WAN Configuration. Under the [Tunnels] tab,
click [+Create] to create an IPsec tunnel.
<p>
<img src="imgs/MagicWan-Potal1.jpg" style="border: 1px black solid;" width="100%">
</p>
Select IPsec tunnel and click [Next].
<p>
<img src="imgs/MagicWan-Potal2.jpg" style="border: 1px black solid;" width="100%">
</p>

| Configuration               | Description                                                                                                             | Router１                                    | Router２                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------- |
| Tunnel name              | -                                                                                                   | FITEL-tunnel-1                          | FITEL-tunnel-2                  |
| Description                 | -                                                                                                    | IPsec tunnel with FITELnet No.1         | IPsec tunnel with FITELnet No.2 |
| Interface address        | IP address of the tunnel interface.<br>A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel.                                          | 10.0.0.1/31                             | 10.0.0.3/31                     |
| Customer endpoint       | FITELnet router's global address                                                                                  | xxx.xxx.xxx.xxx                         | yyy.yyy.yyy.yyy                 |
| Cloudflare endpoint | The Cloudflare Anycast IP is assigned by your account team by email.                                                                                   | anycast-address                         | anycast-address                 |
| Pre-shared key             | The pre-shared key (PSK) is used to authenticate each side of the IPsec tunnel. Enter your own PSK or add the key later to have Cloudflare generate the PSK.| "Use my own pre-shared key"<br>secret-pre-shared-key-1 |      "Use my own pre-shared key"<br>secret-pre-shared-key-2                           |

Create the other IPsec tunnel in the same way.

### FITELnet Router Configuration
Configure the FITELnet router as follows.
```
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
 local-address x.x.x.x
 self-identity address x.x.x.x
 set isakmp-policy ISAKMP_POLICY
 set ipsec-policy IPsec_POLICY
 set peer anycast-address
 ike-version 2
 local-key secret-pre-shared-key-1
exit
!
crypto map MAP1 ipsec-isakmp
 match address SELECTOR
 set isakmp-profile PROF1
exit
! 
```  
  
Configre the other FITLnet router in the same way.  

---

## Statico Route Configuration 
Configure routes for east-west (branch to branch) connections.

## MagicWAN
In the Cloudflare dashboard, create a static route.
Go to [Magic WAN] in the side bar, click [Configure] in Manage Magic WAN Configuration. Click the [Static Routes] tab at the top of the screen.
Click [+Create] to create a static route.
<p>
<img src="imgs/MagicWan-Potal3.jpg" style="border: 1px black solid;" width="100%">
</p>
<p>
<img src="imgs/MagicWan-Potal4.jpg" style="border: 1px black solid;" width="100%">
</p>

| Configuration         | Description                        | Router１                     | Router２                      |
| ------------ | ------------------------- | ------------------------ | ------------------------- |
| Description           | -     | FITEL-route-1            | FITEL-route-2             |
| Prefix      | -         | 192.168.0.0/24           | 192.168.1.0/24            |
| Tunnel/Next hop| -      | FITEL-tunnel-1 / 10.0.0.0 | FITEL-tunnel-2 / 10.0.0.2 |
| Priority        | Assign a route priority to each route. Lower values have greater priority.             | 100                      | 100                       |
| Weight         | Optional weight of the ECMP scope | -                       | -                        |
| Region code    | Steer your traffic by scoping it to specific Cloudflare data regions                | All regions                | All regions                   |


Create the other static route in the same way.

### FITELnet Router Configuration
Configure the FITELnet router as follows.
```
ip route 192.168.1.0 255.255.255.0 tunnel 1 
```
Create the other FITELnet router in the same way.

---

## Connection Test
### IPsec Status
In the FITELnet router CLI, you can run "show crypto sa" to check the IPsec establishment status. <br> "Total number of ISAKMP/IPSEC SA" shows the number of establised SAs.  

```
#show crypto sa

  IKE_SA
    Mode: <I>
    Local IP : xxx.xxx.xxx.xxx/500
    Local ID : xxx.xxx.xxx.xxx (ipv4)
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
In the FITELnet router CLI, you can run "show ip route" to check the route information. <br> A '*' in the route information indicates that the route information is valid.
```
#show ip route

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

## Firmware Version
F220 series：Version 01.11(00)  
F70 series：Version 01.09(00)
