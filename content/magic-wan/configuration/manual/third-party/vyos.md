---
pcx_content_type: integration-guide
title: VyOS
---

# VyOS

This tutorial contains configuration information and a sample template for using a VyOS device with an IPsec configuration.

## Notes

- `vti <NAME_OF_VTI_INTERFACE` — Specifies the virtual tunnel interface of the IPsec tunnel.
- `esp-group <NAME_OF_ESP_GROUP>` - Defines the ESP group for encrypted traffic defined by the tunnel or defines a particular ESP policy or profile.
- `ike-group <NAME_OF_IKE_GROUP>` - Defines IKE group to use for key exchanges or defines a particular IKE policy or profile.
- The IP addresses of the IPsec tunnel interfaces on both ends of the tunnel should be a pair of private IP addresses (RFC 1918) on the same /31 or /30 subnet, essentially specifying a point-to-point link.
- The IPsec tunnel endpoint on this VyOS router is the `<IP_ADDR_OF_UPLINK_INTF_TO_INTERNET/WAN>`.
- The IP address of the IPsec tunnel endpoint on the Cloudflare side is the Anycast IP address provided by Cloudflare.
- This router is configured to initiate the IPsec tunnel connection.

## Configuration parameters 

### Phase 1

- **Encryption**
    - AES-GCM with 128-bit or 256-bit key length

- **Integrity**
    - SHA512

### Phase 2

- **Encryption**
    - AES-GCM with 128-bit or 256-bit key length
    
- **Integrity**
    - SHA512

- **PFS group**
    - DH group 14 (2048-bit MODP group)

## Configuration template

```bash
set interfaces vti <name of the vti interface> address
'<PRIVATE_IP_ADDRESS_OF_IPSEC_TUNNEL_INTERFACE>'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> compression 'disable'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> lifetime '14400'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> mode 'tunnel'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> pfs 'enable'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> proposal 1 encryption 'aes256gcm128'
set vpn ipsec esp-group <NAME_OF_ESP_GROUP> proposal 1 hash 'sha512'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> close-action 'none'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> dead-peer-detection action 'restart'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> dead-peer-detection interval '30'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> dead-peer-detection timeout '120'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> ikev2-reauth 'no'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> key-exchange 'ikev2'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> lifetime '14400'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> mobike 'disable'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> proposal 1 dh-group '14'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> proposal 1 encryption 'aes256gcm128'
set vpn ipsec ike-group <NAME_OF_IKE_GROUP> proposal 1 hash 'sha512'
set vpn ipsec ipsec-interfaces interface '<UPLINK_INTF_TO_INTERNET/WAN>'
set vpn ipsec logging log-level '2'
set vpn ipsec options disable-route-autoinstall
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> authentication id '<IPSEC_ID_STRING_IN_RESULT_OF_PSK_KEY-GEN_VIA_CF_API>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> authentication pre-shared-secret '<PSK_KEY_STRING_GENERATED_VIA_CF_API>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> authentication remote-id '<CF_ANYCAST_IP>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> connection-type 'initiate' 
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> ike-group '<NAME_OF_IKE_GROUP>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> ikev2-reauth 'no'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> local-address '<IP_ADDR_OF_UPLINK_INTF_TO_INTERNET/WAN>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> vti bind '<NAME_OF_VTI_INTERFACE>'
set vpn ipsec site-to-site peer <CF_ANYCAST_IP> vti esp-group '<NAME_OF_ESP_GROUP>'
```