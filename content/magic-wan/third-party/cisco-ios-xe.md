---
pcx_content_type: integration-guide
title: Cisco IOS XE
---

# Cisco IOS XE

This tutorial contains a configuration example for setting up an IPsec tunnel between Cisco IOS XE and Cloudflare. 

**Tested version:**
Cisco IOS XE Software, Version 17.03.07

Replace peer addresses with the Anycast IP addresses assigned to your account:
- Anycast 01: `162.159.###.###`
- Anycast 02: `172.64.###.###`

The following is a Cisco IOS XE example tutorial:

```xml
crypto ikev2 proposal CF_MAGIC_WAN_IKEV2_PROPOSAL
 encryption aes-cbc-256
 integrity sha512 sha384 sha256
 group 14 5
!
crypto ikev2 policy CF_MAGIC_WAN_IKEV2_POLICY
 match fvrf any
 proposal CF_MAGIC_WAN_IKEV2_PROPOSAL
!
crypto ikev2 keyring CF_MAGIC_WAN_KEYRING
 peer GCP_CSR_IPSEC01
  address 162.159.###.###
  pre-shared-key hbGnJzFMqwltb###############BapXCOwsGZz2NMg
 !
 peer GCP_CSR_IPSEC02
  address 172.64.###.###
  pre-shared-key 1VscPp0LPFAcZ###############HOdN-1cUgKVduL4
 !
!
!
crypto ikev2 profile CF_MAGIC_WAN_01
 match identity remote address 162.159.###.### 255.255.255.255
 identity local fqdn ad329f56###############bbe898c0a0.33145236.ipsec.cloudflare.com
 authentication remote pre-share
 authentication local pre-share
 keyring local CF_MAGIC_WAN_KEYRING
 no config-exchange request
!
crypto ikev2 profile CF_MAGIC_WAN_02
 match identity remote address 172.64.###.### 255.255.255.255
 identity local fqdn 83f9c418###############29b3f97049.33145236.ipsec.cloudflare.com
 authentication remote pre-share
 authentication local pre-share
 keyring local CF_MAGIC_WAN_KEYRING
 no config-exchange request
!
!
!
!
crypto ipsec profile CF_MAGIC_WAN_01
 set security-association lifetime kilobytes disable
 set security-association replay disable
 set pfs group14
 set ikev2-profile CF_MAGIC_WAN_01
!
crypto ipsec profile CF_MAGIC_WAN_02
 set security-association lifetime kilobytes disable
 set security-association replay disable
 set pfs group14
 set ikev2-profile CF_MAGIC_WAN_02
!
!
!
!
interface Tunnel101
 ip address 10.252.2.35 255.255.255.254
 ip mtu 1450
 ip tcp adjust-mss 1350
 tunnel source 10.141.0.9
 tunnel mode ipsec ipv4
 tunnel destination 162.159.###.###
 tunnel path-mtu-discovery
 tunnel protection ipsec profile CF_MAGIC_WAN_01
!
interface Tunnel102
 ip address 10.252.2.37 255.255.255.254
 ip mtu 1450
 ip tcp adjust-mss 1350
 tunnel source 10.141.0.9
 tunnel mode ipsec ipv4
 tunnel destination 172.64.###.###
 tunnel path-mtu-discovery
 tunnel protection ipsec profile CF_MAGIC_WAN_02
!
interface GigabitEthernet1
 ip address dhcp
 ip nat outside
 negotiation auto
 no mop enabled
 no mop sysid
!
interface GigabitEthernet2
 ip address 10.10.0.35 255.255.255.0
 negotiation auto
 no mop enabled
 no mop sysid

```

## Diagnostic Output - show crypto session detail

```xml
cisco-csr1000v#show crypto session detail
Crypto session current status

Code: C - IKE Configuration mode, D - Dead Peer Detection
K - Keepalives, N - NAT-traversal, T - cTCP encapsulation
X - IKE Extended Authentication, F - IKE Fragmentation
R - IKE Auto Reconnect, U - IKE Dynamic Route Update
S - SIP VPN

Interface: Tunnel101
Profile: CF_MAGIC_WAN_01
Uptime: 00:15:16
Session status: UP-ACTIVE
Peer: 162.159.###.### port 500 fvrf: (none) ivrf: (none)
      Phase1_id: 162.159.###.###
      Desc: (none)
  Session ID: 6
  IKEv2 SA: local 10.141.0.9/500 remote 162.159.###.###/500 Active
          Capabilities:(none) connid:1 lifetime:23:44:44
  IPSEC FLOW: permit ip 0.0.0.0/0.0.0.0 0.0.0.0/0.0.0.0
        Active SAs: 2, origin: crypto map
        Inbound:  #pkts dec'ed 28110 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2684
        Outbound: #pkts enc'ed 0 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2684

Interface: Tunnel102
Profile: CF_MAGIC_WAN_02
Uptime: 00:14:59
Session status: UP-ACTIVE
Peer: 172.64.###.### port 500 fvrf: (none) ivrf: (none)
      Phase1_id: 172.64.###.###
      Desc: (none)
  Session ID: 7
  IKEv2 SA: local 10.141.0.9/500 remote 172.64.###.###/500 Active
          Capabilities:(none) connid:2 lifetime:23:45:01
  IPSEC FLOW: permit ip 0.0.0.0/0.0.0.0 0.0.0.0/0.0.0.0
        Active SAs: 2, origin: crypto map
        Inbound:  #pkts dec'ed 27586 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2701
        Outbound: #pkts enc'ed 0 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2701
```

## Diagnostic Output: show crypto session remote `<ANYCAST 01>` detail

```xml
cisco-csr1000v#show crypto session remote 162.159.###.### detail
Crypto session current status

Code: C - IKE Configuration mode, D - Dead Peer Detection
K - Keepalives, N - NAT-traversal, T - cTCP encapsulation
X - IKE Extended Authentication, F - IKE Fragmentation
R - IKE Auto Reconnect, U - IKE Dynamic Route Update
S - SIP VPN

Interface: Tunnel101
Profile: CF_MAGIC_WAN_01
Uptime: 00:15:45
Session status: UP-ACTIVE
Peer: 162.159.###.### port 500 fvrf: (none) ivrf: (none)
      Phase1_id: 162.159.###.###
      Desc: (none)
  Session ID: 6
  IKEv2 SA: local 10.141.0.9/500 remote 162.159.###.###/500 Active
          Capabilities:(none) connid:1 lifetime:23:44:15
  IPSEC FLOW: permit ip 0.0.0.0/0.0.0.0 0.0.0.0/0.0.0.0
        Active SAs: 2, origin: crypto map
        Inbound:  #pkts dec'ed 29000 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2655
        Outbound: #pkts enc'ed 0 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2655
```

## Diagnostic Output: show crypto session remote `<ANYCAST 02>` detail

```xml
cisco-csr1000v#show crypto session remote 172.64.###.### detail
Crypto session current status

Code: C - IKE Configuration mode, D - Dead Peer Detection
K - Keepalives, N - NAT-traversal, T - cTCP encapsulation
X - IKE Extended Authentication, F - IKE Fragmentation
R - IKE Auto Reconnect, U - IKE Dynamic Route Update
S - SIP VPN

Interface: Tunnel102
Profile: CF_MAGIC_WAN_02
Uptime: 00:17:10
Session status: UP-ACTIVE
Peer: 172.64.###.### port 500 fvrf: (none) ivrf: (none)
      Phase1_id: 172.64.###.###
      Desc: (none)
  Session ID: 7
  IKEv2 SA: local 10.141.0.9/500 remote 172.64.###.###/500 Active
          Capabilities:(none) connid:2 lifetime:23:42:50
  IPSEC FLOW: permit ip 0.0.0.0/0.0.0.0 0.0.0.0/0.0.0.0
        Active SAs: 2, origin: crypto map
        Inbound:  #pkts dec'ed 31639 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2569
        Outbound: #pkts enc'ed 0 drop 0 life (KB/Sec) KB Vol Rekey Disabled/2569
```