---
pcx_content_type: tutorial
title: Cisco IOS XE
---

# Cisco IOS XE

This tutorial contains a configuration example for setting up an IPsec tunnel between Cisco IOS XE and Cloudflare.

```bash
crypto ikev2 proposal default
 encryption aes-gcm-256
 integrity sha512 sha384 sha256 sha1
 group 14 19 20
 !
crypto ikev2 keyring CLOUDFLARE_KEY
 peer CLOUDFLARE_1
  address $cf_anycastIP_1
  pre-shared-key $tunnel_passphrase
 peer CLOUDFLARE_2
  address $cf_anycastIP_2
  pre-shared-key $tunnel_passphrase
!
crypto ipsec transform-set CF_TSET esp-gcm 256
!
crypto ipsec fragmentation after-encryption
!
crypto ikev2 profile CLOUDFLARE_1
 match identity remote address $cf_anycastIP_1
 identity local fqdn $cf_tunnel_acc_id
 authentication remote pre-share
 authentication local pre-share
 keyring local CLOUDFLARE_KEY
 lifetime 86400
 no config-exchange request
 !
crypto ikev2 profile CLOUDFLARE_2
 match identity remote address $cf_anycastIP_2
 identity local email $cf_tunnel_acc_id
 authentication remote pre-share
 authentication local pre-share
 keyring local CLOUDFLARE_KEY
 lifetime 86400
 no config-exchange request
!
crypto ipsec profile CLOUDFLARE_1
 set security-association lifetime kilobytes disable
 set security-association replay disable
 set pfs group14
 set security-policy limit 1
 set transform-set CF_TSET
 set ikev2-profile CLOUDFLARE_1
 !
crypto ipsec profile CLOUDFLARE_2
 set security-association lifetime kilobytes disable
 set security-association replay disable
 set pfs group14
 set security-policy limit 1
 set transform-set CF_TSET
 set ikev2-profile CLOUDFLARE_2
!
interface Tunnel101
 ip address $tun_src_ip_1 $tun_mask
 ip mtu <MTU>
 ip tcp adjust-mss 1360
 tunnel path-mtu-discovery
 tunnel source $wan_ip_1
 tunnel mode ipsec ipv4
 tunnel destination $cf_anycastIP_1
 tunnel protection ipsec profile CLOUDFLARE_1
!
interface Tunnel102
 ip address $tun_src_ip_2 $tun_mask
 ip mtu <MTU>
 ip tcp adjust-mss 1360
 tunnel path-mtu-discovery
 tunnel source $wan_ip_2
 tunnel mode ipsec ipv4
 tunnel destination $cf_anycastIP_2
 tunnel protection ipsec profile CLOUDFLARE_2
!

ip route 10.0.0.0 255.0.0.0 tunnel101
ip route 10.0.0.0 255.0.0.0 tunnel102 100
!
end

show crypto session detail
show crypto session remote $cf_anycastIP_2 detail
```
