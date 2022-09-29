---
pcx_content_type: tutorial
title: MikroTik
---

# MikroTik

This tutorial explains how to set up a working IPsec tunnel configuration established between a MikroTik device and Cloudflare’s Magic service.

## 1. Configure the IPsec tunnel

Establish the IPsec tunnel connection between MikroTik and Cloudflare.

```bash
/ip ipsec profile
add dh-group=modp2048 enc-algorithm=aes-256 hash-algorithm=sha256 name=cf1profile prf-algorithm=sha256

/ip ipsec peer
add address=<CF-PEERIP>/32 exchange-mode=ike2 name=cf1 port=500 profile=cf1profile

/ip ipsec proposal
add auth-algorithms=sha256,sha1 enc-algorithms=aes-256-cbc name=cf1prop pfs-group=modp2048

/ip ipsec identity
add my-id=fqdn:<FQDN-TUNNEL-ID-From-CF-Dashboard> notrack-chain=prerouting peer=cf1

# This section routes all traffic via the tunnel.
/ip ipsec policy
add dst-address=0.0.0.0/0 level=unique peer=cf1 proposal=cf1prop src-address=<Local Network>/24 tunnel=yes
```

## 2. Configure IPsec and firewall policies

After setting up your IPsec tunnel, configure the IPsec and firewall policies.

The example below should be used as a reference and should not be directly copied.

```bash
/ip firewall address-list
add address=172.16.192.254 list=vpcLANNet
add address=192.168.101.0/24 list=homeNet
add address=10.192.0.0/24 list=vpcWANNet

/ip firewall nat
add action=accept chain=srcnat dst-address=192.168.101.0/24 src-address=172.16.192.254
add action=masquerade chain=srcnat dst-address=0.0.0.0 src-address=172.16.192.0/24

/ip firewall raw
add action=accept chain=prerouting dst-address=172.16.192.0/24 log=yes src-address=192.168.101.0/24
add action=accept chain=output dst-address=192.168.101.0/24 log=yes src-address=172.16.192.0/24
```

## GUI configuration

Refer to the images below if you are setting up an IPsec tunnel via MikroTik's UI.

### Proposal

![MikroTik interface displaying settings for the Proposal step of the tunnel configuration](/magic-wan/static/mikrotik-proposal.png)

### Peers

![MikroTik interface displaying settings for the Peer step of the tunnel configuration](/magic-wan/static/mikrotik-peers.png)

### Identities

![MikroTik interface displaying settings for the Identity step of the tunnel configuration](/magic-wan/static/mikrotik-identities.png)

### Profiles

![MikroTik interface displaying settings for the Profiles step of the tunnel configuration](/magic-wan/static/mikrotik-profiles.png)

### IPsec policies

![MikroTik interface displaying settings for the IPsec policies step of the tunnel configuration](/magic-wan/static/mikrotik-ipsec-policies.png)

### IP firewall

![MikroTik interface displaying settings for the IP firewall step of the tunnel configuration](/magic-wan/static/mikrotik-firewall.png)
