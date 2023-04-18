---
pcx_content_type: integration-guide
title: strongSwan
---

# strongSwan

This tutorial explains how to set up strongSwan along with Magic WAN. You will learn how to configure strongSwan, configure an IPsec tunnel and create a Policy Based Routing.

## 1. Health checks configuration

Start by configuring the symmetric health checks target for Magic WAN as explained in [tunnel health checks](/magic-wan/how-to/run-tunnel-health-checks/). For this particular tutorial, we are using `172.64.240.252` as the target IP address, and `type` as the request.

This can be set up [with the API](/api/operations/magic-i-psec-tunnels-update-i-psec-tunnel). For example:

```bash
$ curl --request PUT \
 --url https://api.cloudflare.com/client/v4/accounts/{account_identifier}/magic/ipsec_tunnels/{tunnel_identifier} \
 --header 'Content-Type: application/json' \
 --header 'X-Auth-Email: <YOUR_EMAIL> ' \
 --data '{
   "health_check": {
       "enabled":true,
       "target":"172.64.240.252",
       "type":"request",
       "rate":"mid"
   }
}'
```

## 2. Configure StrongSwan

1. Start by [installing StrongSwan](https://docs.strongswan.org/docs/5.9/install/install.html). For example, open the console and run:

```sh
$ sudo apt-get install strongswan -y
```

2. After StrongSwan finishes installing, go to `/etc/strongswan.conf` to edit the configuration file and add the following settings:

```txt
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

## 3. Configure IPsec file

1. Go to `/etc/ipsec.conf` and add the following settings:

```txt
# ipsec.conf - strongSwan IPsec configuration file
config setup
    charondebug="all"
    uniqueids = yes
 
conn %default
    ikelifetime=4h
    rekey=yes
    reauth=no
    keyexchange=ikev2
    authby=secret
    dpdaction=restart
    closeaction=restart
 
# Sample VPN connections
conn cloudflare-ipsec
    auto=start
    type=tunnel
    fragmentation=no
    leftauth=psk
    # Private IP of the VM
    left=%any
    # Tunnel ID from dashboard, in this example FQDN is used
    leftid=<YOUR_TUNNEL_ID>.ipsec.cloudflare.com
    leftsubnet=0.0.0.0/0
    # Cloudflare anycast IP
    right=162.159.67.88
    rightid=162.159.67.88
    rightsubnet=0.0.0.0/0
    rightauth=psk
    ike=aes256-sha256-modp2048!
    esp=aes256-sha256-modp2048!
    replay_window=0
    mark_in=42
    mark_out=42
    leftupdown=/etc/strongswan.d/ipsec-vti.sh
```

2. Now, you need to create a virtual tunnel interface (VTI) with the IP we configured earlier as the target for Cloudflare’s health checks (`172.64.240.252`) to route IPsec packets. Go to `/etc/strongswan.d/` 

3. Create a script called `ipsec-vti.sh` and add the following:

```txt
#!/bin/bash
 
set -o nounset
set -o errexit
 
VTI_IF="vti0"
 
case "${PLUTO_VERB}" in
    up-client)
        ip tunnel add "${VTI_IF}" local "${PLUTO_ME}" remote "${PLUTO_PEER}" mode vti \
        key "${PLUTO_MARK_OUT%%/*}"
        ip link set "${VTI_IF}" up
        ip addr add 172.64.240.252/32 dev vti0
        sysctl -w "net.ipv4.conf.${VTI_IF}.disable_policy=1"
        sysctl -w "net.ipv4.conf.${VTI_IF}.rp_filter=0"
        sysctl -w "net.ipv4.conf.all.rp_filter=0"
        ip rule add from 172.64.240.252 lookup viatunicmp
        ip route add default dev vti0 table viatunicmp
        ;;
    down-client)
        ip tunnel del "${VTI_IF}"
        ip rule del from 172.64.240.252 lookup viatunicmp
        ip route del default dev vti0 table viatunicmp
        ;;
esac
echo "executed"
```

## 4. Add Policy Based Routing (PBR)

Although the IPsec tunnel is working as is, we need to create Policy Based Routing (PBR) to redirect returning traffic via the IPsec tunnel. Without it, the ICMP replies to the health probes sent by Cloudflare will be returned via the Internet, instead of the same IPsec tunnel. This is required to avoid any potential issues. 

To accomplish this, the tutorial uses [iproute2](https://en.wikipedia.org/wiki/Iproute2) to route IP packets from `172.63.240.252` to the tunnel interface.

1. Go to `/etc/iproute2/`.

2. Edit the `rt_tables` file to add a routing table number and name. In this example, we used `viatunicmp` as the name and `200` as the number for the routing table.

```txt
#
# reserved values
#
255 local
254 main
253 default
0   unspec
200 viatunicmp
#
# local
#
#1  inr.ruhep
```

3. Open the console and add a rule to match the routing table just created. This rule instructs the system to use routing table `viatunicmp` if the packet’s source address is `172.64.240.252`:

```sh
$ ip rule add from 172.64.240.252 lookup viatunicmp
```

4. Add a route to the newly created routing table `viatunicmp`. This is the default route via the interface `vti0`  in the `viatunicmp` table.

```sh
$ ip route add default dev vti0 table viatunicmp
```

5. Now, you can `start` IPsec. You can also `stop`, `restart` and show the `status` for the IPsec connection:

```bash
$ ipsec start
Security Associations (1 up, 0 connecting):
cloudflare-ipsec[1]: ESTABLISHED 96 minutes ago, <IPSEC_TUNNEL_IDENTIFIER>.ipsec.cloudflare.com]...162.159.67.88[162.159.67.88]
cloudflare-ipsec{4}:  INSTALLED, TUNNEL, reqid 1, ESP SPIs: c4e20a95_i c5373d00_o
cloudflare-ipsec{4}:   0.0.0.0/0 === 0.0.0.0/0
```

## 5. Check connection status

After you finish configuring StrongSwan with Magic WAN, you can use tcpdump to investigate the status of health checks originated from Cloudflare.

```sh
$ sudo tcpdump -i eth0 src 173.245.48.0/20 and dst <your-server-ip> and tcp port 80
```

In this example, the outgoing Internet interface shows that the IPsec encrypted packets (ESP) from Cloudflare’s health check probes (both the request and response) are going through the IPsec tunnel we configured.

![tcpdump shows the IPsec encrypted packets from Cloudflare's health probbes](/images/magic-wan/tutorials/strongswan/ipsec.png)

You can also run tcpdump on `vti0` to check the decrypted packets.

![If you run tcpdump on vti0 you can check for decrypted packets](/images/magic-wan/tutorials/strongswan/tcpdump.png)