---
pcx_content_type: integration-guide
title: Fortinet
---

# Fortinet

This tutorial provides a configuration example for using FortiOS (ver 6.x) along with Magic WAN. You can choose to configure Magic WAN with Fortigate using Policy Based IPsec, Route Based IPsec, or GRE, and all three options are listed below.

## IPsec – Route based configuration

To ensure health checks work as expected, enable asymmetric routing for ICMP. Note that enabling asymmetric routing will affect FortiGate behavior. To learn more, refer to [How FortiGate behaves when asymmetric routing is enabled](https://community.fortinet.com/t5/FortiGate/Technical-Note-How-the-FortiGate-behaves-when-asymmetric-routing/ta-p/198575).

### Enable asymmetric routing

```bash
---
header: FortiOS ICMP asymmetric
---
config system settings
    set asymroute-icmp enable
end
```

### Disable anti-replay protection

For route based IPsec configurations, you will need to disable anti-replay protection. The command below disables anti-replay protection globally, but you can also do this per firewall policy as documented in [Fortinet's documentation on anti-replay support per policy](https://community.fortinet.com/t5/FortiGate/Technical-Tip-Anti-Replay-option-support-per-policy/ta-p/191435).

```bash
---
header: FortiOS ICMP asymmetric
---
config system global
    set anti-replay disable
end
```

### IPsec Phase 1

```bash

config vpn ipsec phase1
    edit "<A-NAME>"
        set interface "port1"
        set ike-version 2
        set keylife 14400
        set peertype any
        set proposal aes128gcm-prfsha256
        set localid "<FQDN-FROM-CF-DASH>"
        set remote-gw <CF-ANYCAST-IP>
        set psksecret <PSK>
end
```

### IPsec Phase 2

```bash
config vpn ipsec phase2-interface
    edit "<SAME-NAME-AS-PHASE1>"
        set phase1name "<PHASE1-NAME>"
        set proposal aes128gcm
        set replay disable
        set auto-negotiate enable
        set keylifeseconds 14400
    next
end
```

### Static routes

Now you can use Policy Based Routing (PBR) to redirect traffic via the tunnel. To ensure the policy based route works, insert a static default route via the tunnel that is less preferred than the actual default route, most likely via the WAN/Internet interface.

The example below creates a default route with distance of 5 (the same as the actual default route) and priority as 10 (higher, i.e. less preferred than the actual default route).

```bash
---
header: Static route configuration
---

   config router static
## Do not copy the following config block. ################################################################
## This examples shows the default route is a static route with a distance of 5 and default priority of 0 (i.e. most preferred) ##
    edit 1
        set distance 5
        set device "port1"
    next
###################################################################################################
    edit 2 # The policy ID will vary. Check with "sh router static" to determine where to insert the rule
        set distance 5
        set priority 10
        set device "<PHASE1-NAME>"
    next
end
```

### Policy based route

The example below redirects interesting traffic from certain endpoints via the tunnel.

```bash
---
header: Policy based route
---
   config router policy
    edit 6 # The policy ID will vary, check with "sh router policy" to see where to insert the rule
        set input-device "port2"
        set srcaddr "<selected endpoints - use CIDR/Firewall Objects/etc"
        set dstaddr "all"
        set gateway <Tunnel inside IP - CF side>
        set output-device "<PHASE1-name>"
    next
end
```

Fortigate is firewall first, and you will need to create Firewall Policies to ensure traffic is allowed between LAN and IPsec.


## IPsec - Policy based configuration

To ensure health checks work as expected, enable asymmetric routing for ICMP. Note that enabling asymmetric routing will affect FortiGate behavior. To learn more, refer to [How FortiGate behaves when asymmetric routing is enabled](https://community.fortinet.com/t5/FortiGate/Technical-Note-How-the-FortiGate-behaves-when-asymmetric-routing/ta-p/198575).

### Enable asymmetric routing

```bash
---
header: FortiOS ICMP asymmetric
---
config system settings
    set asymroute-icmp enable
end
```

### Disable anti-replay protection

For route based IPsec configurations, you will need to disable anti-replay protection. The command below disables anti-replay protection globally, but you can also do this per firewall policy as documented in [Fortinet's documentation on anti-replay support per policy](https://community.fortinet.com/t5/FortiGate/Technical-Tip-Anti-Replay-option-support-per-policy/ta-p/191435).

```bash
---
header: FortiOS ICMP asymmetric
---
config system global
    set anti-replay disable
end
```

### IPsec Phase 1

```bash

config vpn ipsec phase1
    edit "<A-NAME>"
        set interface "port1"
        set ike-version 2
        set keylife 14400
        set peertype any
        set proposal aes128gcm-prfsha256
        set localid "<FQDN-FROM-CF-DASH>"
        set remote-gw <CF-ANYCAST-IP>
        set psksecret <PSK>
end
```

### IPsec Phase 2

```bash
config vpn ipsec phase2-interface
    edit "<SAME-NAME-AS-PHASE1>"
        set phase1name "<PHASE1-NAME>"
        set proposal aes128gcm
        set replay disable
        set auto-negotiate enable
        set keylifeseconds 14400
    next
end
```

### Route traffic via the IPsec tunnel

The following firewall policy will match the interesting traffic that should be routed via the IPsec tunnel, and you can adjust the policy to meet your requirements. The following example policy will route all traffic from the "LAN" to anywhere via the IPsec tunnel.  

```bash
---
header: IPsec policy
---
   config firewall policy
   edit <new unused policy id> # The policy ID will vary, check with "sh firewall policy" to see where to insert the rule
       set srcintf "<LAN INTERFACE>"
       set dstintf "<INTERNET INTERFACE>"
       set action ipsec
       set srcaddr "<Local NETWORK /HOST TO BE TUNNELED>"
       set dstaddr "all"
       set schedule "always"
       set service "ALL"
       set logtraffic all
       set inbound enable
       set vpntunnel "<Phase 1 name>"
   next
```

## GRE configuration

To ensure health checks work as expected, enable asymmetric routing for ICMP. Note that enabling asymmetric routing will affect FortiGate behavior. To learn more, refer to [How FortiGate behaves when asymmetric routing is enabled](https://community.fortinet.com/t5/FortiGate/Technical-Note-How-the-FortiGate-behaves-when-asymmetric-routing/ta-p/198575).

### Enable asymmetric routing

```bash
---
header: FortiOS ICMP asymmetric
---
config system settings
    set asymroute-icmp enable
end
```

### Configure GRE and WAN interface

Next, configure the GRE and the WAN (Internet) interface. The example below uses the following attributes:

- **WAN/Internet Interface (Customer GRE Endpoint IP)**: `WAN1`
- **GRE Interface name**: `toCF`
- **Tunnel Inside IP Subnet**: `10.10.10.0/31`

```bash
---
header: GRE tunnel config
---
config system gre-tunnel
    edit "toCF"
        set interface "wan1"
        set remote-gw x.x.x.x  # CF ANYCAST IP
        set local-gw y.y.y.y      # Customer WAN IP aka Customer GRE Endpoint IP
    next
end
 
config system interface
    edit "toCF"
        set ip b.b.b.b 255.255.255.255 # Yes, the mask here is /32
        set allowaccess ping
        set type tunnel
        set remote-ip a.a.a.a 255.255.255.254 # And Yes, it is /31 here
        set interface "wan1"
    next
end
```

### Adjust TCP MSS

Generally, configuring the TCP MSS on the WAN interface is recommended, which is true for Magic Transit as a primarily ingress service. However, in the case of Magic WAN, you need to adjust MSS for egress traffic, and as a result, it needs to be adjusted at the interface which receives the user/site traffic.

```bash
---
header: Adjust TCP MSS
---
edit "lan" # Change to LAN interface name
        set tcp-mss 1436
    next
end
```

### Create a policy based route

Next, create a Policy Based Route to route desired traffic down the tunnel. The example below tunnels all RFC 1918 address spaces.

```bash
---
header: Policy Based Route
---
    edit 1 # The policy ID will vary, check with "sh router policy" to see where to insert the PBR
        set input-device "lan"
        set srcaddr x.x.x.x # Specify what network/hosts will this PBR apply to
        set dstaddr "all"
        set gateway a.a.a.a
        set output-device "toCF1"
    next
end
```
Fortigate is firewall first, and you will need to create Firewall Policies to ensure traffic is allowed between LAN and GRE.
