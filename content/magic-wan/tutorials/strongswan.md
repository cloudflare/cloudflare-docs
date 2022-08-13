---
pcx_content_type: tutorial
title: strongSwan
---

# strongSwan

This tutorial contains a sample template of the `ipsec.conf` file for a working IPsec tunnel configuration established between a Linux machine running strongSwan and Cloudflare’s Magic service.

This `ipsec.conf` file is typically located in the `/etc` directory of the Linux machine.

## Configuration parameters

### Phase 1

- **Encryption**
  - AES-CBC with 256-bit key length
  - AES-GCM with 256-bit key length
- **Integrity**
  - SHA-256
- **Diffie-Hellman group**
  - DH group 14 (2048-bit MODP group)
- **PRF**
  - SHA-512

### Phase 2

- **Encryption**
  - AES with 256-bit key length
- **Integrity**
  - SHA-256
- **Diffie-Hellman group**
  - DH group 14 (2048-bit MODP group)

## Configuration template

```bash
config setup
    charondebug="all"
    uniqueids=yes

conn %default
    ikelifetime=4h
    rekey=yes
    reauth=no
    keyexchange=ikev2
    authby=secret
    dpdaction=restart
    closeaction=restart

conn <tunnel_name>
    auto=start
    mark = 50
    type=tunnel
    fragmentation=no
    leftauth=psk
    left=<IP_ADDR_OF_LINUX_UPLINK_TO_CF>
    leftid=<IPSEC_ID_STRING_IN_RESULT_OF_PSK_KEY-GEN_VIA_CF_API>
    leftsubnet=0.0.0.0/0
    right=<CF_ANYCAST_IP>
    rightid=<CF_ANYCAST_IP>
    rightsubnet=0.0.0.0/0
    rightauth=psk
    ike=aes256gcm16-prfsha512-modp2048
    esp=aes256gcm16-prfsha512-modp2048
    replay_window=0
```

### Dead Peer Detection (DPD)

In the above `ipsec.conf` file in `conn %default` section, setting `dpdaction=restart` enables Dead Peer Detection (DPD) to actively check and re-establish IPsec tunnels in the event of communication timeouts. In addition, `closeaction=restart` is set to actively re-establish the tunnels in the event that the remote peer (usually a Cloudflare Magic service) unexpectedly closes it.

If you do not prefer this behavior, set the above parameters to `none` or remove them from the configuration file.

The `mark` parameter is a user-assigned 32-bit value/mask that marks or labels the xfrm route policy used for the tunnel connection. In the example file, the value is `50`. You can choose any number you prefer within the 0 to 2^32 range, for example, 77, 1234, 888, and etc. When creating the VTI interface for a given IPsec tunnel, the VTI key value must match the mark value for the corresponding IPsec tunnel defined in the `ipsec.conf` file.

{{<Aside type="note" header="Note:">}}

The PSK key string obtained when generating the PSK via the Cloudflare API is stored in the `/etc/ipsec.secrets` file.

{{</Aside>}}

## `strongwan.conf` file

Update the `/etc/strongswan.conf` file with the configuration shown below. Specifically, `install_routes = no` disables strongSwan from installing a default route in route table 220, which strongSwan automatically creates. strongSwan then forces a route lookup in route table 220 via an IP rule policy it automatically configures in the system. This default behavior of strongSwan often interferes with the user's desired routing behavior and should be disabled as the user sees fit.

```bash
# strongswan.conf - strongSwan configuration file
#
# Refer to the strongswan.conf(5) manpage for details
#
# Configuration changes should be made in the included files

charon {
        load_modular = yes
        install_routes = no
        install_virtual_ip = no

        plugins {
                include strongswan.d/charon/*.conf
        }
}

include strongswan.d/*.conf
```
