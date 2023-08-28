---
pcx_content_type: integration-guide
title: Fortinet
---

# Fortinet

This tutorial provides information and examples of how to configure Cloudflare Magic WAN with IPsec tunnels in conjunction with Fortinet FortiGate firewalls.

The FortiGate configuration settings presented here support [bidirectional health checks](/magic-wan/how-to/run-tunnel-health-checks/) as required by Cloudflare Magic WAN. However, they do not factor in any other traffic flows outside of the tunnel health checks. The configuration may need to be adjusted based on your current FortiGate configuration.

## Testing Environment

The FortiGate configuration was tested on two different FortiGate firewalls:
- FortiGate Virtual Appliance version 7.0.8, running on VMware ESXi 6.5
- FortiGate FG80F, version 7.0.12

## Magic WAN configuration

The first step to setting up Magic WAN is to add Magic WAN IPsec tunnels and Magic static routes to your Cloudflare account via the dashboard or API.

Before proceeding, ensure that you have the Anycast IPs associated with your account. Check with your Cloudflare account team if you do not yet have them.

### Magic IPsec Tunnels

Cloudflare recommends customers configure two Magic IPsec tunnels per firewall/router — one to each of the two Anycast IP addresses.

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to  to **Magic WAN** > **Configurations**.
3. From the **Tunnels** tab, select **Create**.
4. For the first IPsec tunnel, ensure the following settings are defined (refer to [Add tunnels](/magic-wan/get-started/configure-tunnels/#add-tunnels) to learn about settings not mentioned here):
    - **Customer Endpoint**: Enter your external/egress interface of the firewall.
    - **Cloudflare Endpoint**: Enter the first of your two Anycast IPs (typically begins with `162.x.x.x`).
    - **Health check rate**: _Low_.
    - **Health check type**: _Reply_.
    - **Health check target**: _Custom_.
    - **Target address**: The target address for the first tunnel is always `172.64.240.253`.
    - **Pre-shared key**: Enter your own key or allow Cloudflare to define the key. Refer to [Add IPsec tunnel](https://developers.cloudflare.com/magic-wan/get-started/configure-tunnels/#add-tunnels) for more information.

    ![The first IPsec tunnel should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-ipsec-tunnel-01.png)

 5. For the second tunnel, make the same changes as you did for the first tunnel (including creating a pre-shared key), and ensure the following additional settings are defined:
    - **Cloudflare Endpoint**: Enter the second of your two Anycast IPs (typically begins with `172.x.x.x`).
    - **Health check target**: _Custom_.
    - **Target address**: `172.64.240.254`.

    ![The second IPsec tunnel should have all the values mentioned for the first tunnel, as well as the ones mentioned in the step above.](/images/magic-wan/third-party/fortinet/edit-ipsec-tunnel-02.png)

### Magic static routes

Add two Magic static routes to define the IP address space that exists behind the Magic IPsec tunnels — one to each of the two Magic IPsec tunnels defined in the previous section.

By default, the Magic static routes are defined with the priority set to `100`. Cloudflare leverages [Equal Cost Multipath Routing (ECMP)](/magic-wan/reference/traffic-steering/#equal-cost-multi-path-routing) and will load balance the traffic equally across the two tunnels. If you prefer to use an Active/Passive model, you can leave the default value for the first route set to `100`, and set the value for the second tunnel to `150` (higher value is a lower priority).

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configurations**.
3. Go to **Static Routes** > **Create**.
4. For the first route, ensure the following settings are defined (refer to [Configure static routes](/magic-wan/get-started/configure-static-routes/) to learn about settings not mentioned here):
    - **Prefix**: Specify the [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) subnet that exists behind the first Magic IPsec tunnel you have defined in the previous section.
    - **Tunnel/Next hop**: Select your first tunnel (Tunnel 01 of 02).
    - **Priority**: Leave the default value (`100`).
    - **Weight**: Leave empty.
    - **Region code**: Leave this set to `All Regions`.

    ![The first static route should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-static-route-01.png)

5. For the second route, ensure the following settings are defined:
    - **Prefix**: Specify the [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) subnet that exists behind the second Magic IPsec tunnel defined in the previous section.
    - **Tunnel/Next hop**: Select your second tunnel (Tunnel 02 of 02).
    - **Priority**:  Leave the default value (`100`).
    - **Weight**: Leave empty.
    - **Region code**: Leave this set to `All Regions`.

    ![The second static route should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-static-route-02.png)

## Fortinet FortiGate configuration

### Enable asymmetric routing

To ensure health checks work as expected, enable asymmetric routing for ICMP. This option is required. Otherwise, the tunnel health checks which are critical for proper Magic WAN functionality will not work as designed.

Note that enabling asymmetric routing will affect FortiGate behavior. To learn more, refer to [How FortiGate behaves when asymmetric routing is enabled](https://community.fortinet.com/t5/FortiGate/Technical-Note-How-the-FortiGate-behaves-when-asymmetric-routing/ta-p/198575).

```txt
config system settings
    set asymroute-icmp enable
end
```

### Disable anti-replay protection

For route-based IPsec configurations, you will need to disable anti-replay protection. The command below disables anti-replay protection globally, but you can also do this per firewall policy. Refer to Fortinet’s documentation on [anti-replay support per policy](https://community.fortinet.com/t5/FortiGate/Technical-Tip-Anti-Replay-option-support-per-policy/ta-p/191435) to learn more.


```txt
config system global
    set anti-replay disable
end
```

### IPsec tunnels

Magic IPsec tunnels leverage a route-based site-to-site VPN model. This model relies on the use of virtual tunnel interfaces and routing to define the traffic that flows across the IPsec tunnels.

Configure two IPsec tunnels using the `phase1-interface` and `phase2-interface` objects.

{{<Aside type="note">}}
Refer to the Cloudflare Magic WAN dashboard to obtain the FQDN ID value when specifying the `localid` attribute/value pair in the `phase1-interface` configuration. To find this value, go to the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Magic WAN** > **Manage Magic WAN configuration** > **Tunnels**. Then, find your IPsec tunnel and expand it to reveal all the information associated to it.
{{</Aside>}}

The following examples assume `wan1` is the external/egress interface of the FortiGate firewall.

#### Add Phase 1 interfaces

`MWAN_IPsec_Tun1` corresponds to Tunnel 01 of 02 added earlier in the Cloudflare section of the configuration. `MWAN_IPsec_Tun2` corresponds to Tunnel 02 of 02 added earlier in the Cloudflare section of the configuration.

```txt
fortigate # config vpn ipsec phase1-interface
    edit "MWAN_IPsec_Tun1"
        set interface "wan1"
        set ike-version 2
        set keylife 28800
        set peertype any
        set net-device enable
        set proposal aes256gcm-prfsha512 aes256gcm-prfsha384 aes256gcm-prfsha256
        set localid "f1473dXXXXXXX72e33.49561179.ipsec.cloudflare.com"
        set nattraversal disable
        set remote-gw 162.159.67.210
        set add-gw-route enable
        set psksecret <YOUR_PRE-SHARED_KEY>
    next
    edit "MWAN_IPsec_Tun2"
        set interface "wan1"
        set ike-version 2
        set keylife 28800
        set peertype any
        set net-device enable
        set proposal aes256gcm-prfsha512 aes256gcm-prfsha384 aes256gcm-prfsha256
        set localid "de91565XXXXXXXfbbd6632.49561179.ipsec.cloudflare.com"
        set dhgrp 14
        set nattraversal disable
        set remote-gw 172.XX.XX.210
        set add-gw-route enable
        set psksecret ENC <YOUR_PRE-SHARED_KEY>
    next
end
```

#### Add Phase 2 interfaces

Add two `phase2-interfaces` — one for each of the two `phase1-interfaces` as follows:

```txt
fortigate # config vpn ipsec phase2-interface
    edit "MWAN_IPsec_Tun1"
        set phase1name "MWAN_IPsec_Tun1"
        set proposal aes256gcm aes128gcm
        set dhgrp 14
        set replay disable
        set keylifeseconds 3600
    next
    edit "MWAN_IPsec_Tun2"
        set phase1name "MWAN_IPsec_Tun2"
        set proposal aes256gcm aes128gcm
        set dhgrp 14
        set replay disable
        set keylifeseconds 3600
    next
end
```

### Network interfaces

#### Loopback interfaces

Create two loopback interfaces to bind the bidirectional health check Anycast IPs to the FortiGate firewall. This allows you to specify the respective IP addresses when adding the firewall policy and policy-based routing configuration settings.

Add two loopback interfaces one corresponding to each of the two bidirectional health check Anycast IPs (`172.64.240.253` and `172.64.240.254` respectively):

```txt
fortigate # config system interface
    edit "loopback1"
        set vdom "root"
        set ip 172.64.240.253 255.255.255.255
        set allowaccess ping
        set type loopback
        set alias "MWAN_Tun_01"
        set snmp-index 19
    next
    edit "loopback2"
        set vdom "root"
        set ip 172.64.240.254 255.255.255.255
        set allowaccess ping
        set type loopback
        set alias "MWAN_Tun_02"
        set snmp-index 20
end
```

#### Virtual tunnel interfaces

Configure the virtual tunnel interfaces that were automatically added when specifying the `set net-device enable` within the `phase1-interface` settings.

These are the only settings that should need to be added to the virtual tunnel interfaces:
- `ip`: The local IP address (specify with a `/32` netmask — `255.255.255.255`).
- `remote-ip`: The value associated with the interface address specified earlier in the Magic IPsec tunnels section (specify with a `/31` netmask — `255.255.255.254`).
- `alias`: This value is optional.

The following examples assume `wan1` is the external/egress interface of the FortiGate firewall.

```txt
fortigate # config system interface
    edit "MWAN_IPsec_Tun1"
        set vdom "root"
        set ip 10.252.2.91 255.255.255.255
        set allowaccess ping
        set type tunnel
        set remote-ip 10.252.2.90 255.255.255.254
        set alias "MWAN_IPsec_Tun1"
        set snmp-index 17
        set interface "wan1"
    next
    edit "MWAN_IPsec_Tun2"
        set vdom "root"
        set ip 10.252.2.93 255.255.255.255
        set allowaccess ping
        set type tunnel
        set remote-ip 10.252.2.92 255.255.255.254
        set alias "MWAN_IPsec_Tun2"
        set snmp-index 18
        set interface "wan1"
    next
end
```

### Validate communication across virtual tunnel interfaces

Once the virtual tunnel interfaces have been configured, you should be able to ping the IP address associated with the `remote-ip` attribute.

Below you have examples of a successful result from pinging across both of the virtual tunnel interfaces configured in the previous section:

#### MWAN_IPsec_Tun1

```txt
fortigate # execute ping 10.252.2.90
PING 10.252.2.90 (10.252.2.90): 56 data bytes
64 bytes from 10.252.2.90: icmp_seq=0 ttl=64 time=5.8 ms
64 bytes from 10.252.2.90: icmp_seq=1 ttl=64 time=5.8 ms
64 bytes from 10.252.2.90: icmp_seq=2 ttl=64 time=5.8 ms
64 bytes from 10.252.2.90: icmp_seq=3 ttl=64 time=5.8 ms
64 bytes from 10.252.2.90: icmp_seq=4 ttl=64 time=5.7 ms

--- 10.252.2.90 ping statistics ---
5 packets transmitted, 5 packets received, 0% packet loss
round-trip min/avg/max = 5.7/5.7/5.8 ms
```

#### MWAN_IPsec_Tun2

```txt
fortigate # execute ping 10.252.2.92
PING 10.252.2.92 (10.252.2.92): 56 data bytes
64 bytes from 10.252.2.92: icmp_seq=0 ttl=64 time=6.1 ms
64 bytes from 10.252.2.92: icmp_seq=1 ttl=64 time=6.1 ms
64 bytes from 10.252.2.92: icmp_seq=2 ttl=64 time=6.1 ms
64 bytes from 10.252.2.92: icmp_seq=3 ttl=64 time=6.1 ms
64 bytes from 10.252.2.92: icmp_seq=4 ttl=64 time=6.0 ms

--- 10.252.2.92 ping statistics ---
5 packets transmitted, 5 packets received, 0% packet loss
round-trip min/avg/max = 6.0/6.0/6.1 ms
```

### Zone objects (optional)

This sample configuration assumes there are three zones configured on the FortiGate firewall. These zone objects are used in the policies referenced later in this document:
- `Trust_Zone`: Contains the LAN interface(s).
- `Untrust_Zone`: Contains the WAN interface.
- `Cloudflare_Zone`: Contains both IPsec Tunnel interfaces.

```txt
fortigate # config system zone
    edit "Cloudflare_Zone"
        set intrazone allow
        set interface "MWAN_IPsec_Tun1" "MWAN_IPsec_Tun2"
    next
    edit "Trust_Zone"
        set intrazone allow
        set interface "internal"
    next
    edit "Untrust_Zone"
        set intrazone allow
        set interface "wan1"
    next
end
```

### Create Address Objects

Create Address Objects to represent the [Cloudflare IPv4 address space](https://www.cloudflare.com/ips) as well as objects for the bidirectional health check Anycast IPs:

```txt
config firewall address
    edit "Cloudflare_IPv4_01"
        set color 9
        set subnet 173.245.48.0 255.255.240.0
    next
    edit "Cloudflare_IPv4_02"
        set color 9
        set subnet 103.21.244.0 255.255.252.0
    next
    edit "Cloudflare_IPv4_03"
        set color 9
        set subnet 103.22.200.0 255.255.252.0
    next
    edit "Cloudflare_IPv4_04"
        set color 9
        set subnet 103.31.4.0 255.255.252.0
    next
    edit "Cloudflare_IPv4_05"
        set color 9
        set subnet 141.101.64.0 255.255.192.0
    next
    edit "Cloudflare_IPv4_06"
        set color 9
        set subnet 108.162.192.0 255.255.192.0
    next
    edit "Cloudflare_IPv4_07"
        set color 9
        set subnet 190.93.240.0 255.255.240.0
    next
    edit "Cloudflare_IPv4_08"
        set color 9
        set subnet 188.114.96.0 255.255.240.0
    next
    edit "Cloudflare_IPv4_09"
        set color 9
        set subnet 197.234.240.0 255.255.252.0
    next
    edit "Cloudflare_IPv4_10"
        set color 9
        set subnet 198.41.128.0 255.255.128.0
    next
    edit "Cloudflare_IPv4_11"
        set color 9
        set subnet 162.158.0.0 255.254.0.0
    next
    edit "Cloudflare_IPv4_12"
        set color 9
        set subnet 104.16.0.0 255.248.0.0
    next
    edit "Cloudflare_IPv4_13"
        set color 9
        set subnet 104.24.0.0 255.252.0.0
    next
    edit "Cloudflare_IPv4_14"
        set color 9
        set subnet 172.64.0.0 255.248.0.0
    next
    edit "Cloudflare_IPv4_15"
        set color 9
        set subnet 131.0.72.0 255.255.252.0
    next
    edit "Bidirect_HC_Endpoint_01"
        set comment "Bidirectional health check endpoint address"
        set color 9
        set subnet 172.64.240.253 255.255.255.255
    next
    edit "Bidirect_HC_Endpoint_02"
        set comment "Bidirectional health check endpoint address"
        set color 9
        set subnet 172.64.240.254 255.255.255.255
    next
end
```

### Configure Address Group Object

Create an Address Object that contains all of the Cloudflare IPv4 subnets as specified in the previous section.  You can copy/paste the CLI commands below into an SSH terminal and the objects will get created automatically:

```txt
config firewall addrgrp
    edit "Cloudflare_IPv4_Nets"
        set member "Cloudflare_IPv4_01" "Cloudflare_IPv4_02" "Cloudflare_IPv4_03" "Cloudflare_IPv4_04" "Cloudflare_IPv4_05" "Cloudflare_IPv4_06" "Cloudflare_IPv4_07" "Cloudflare_IPv4_08" "Cloudflare_IPv4_09" "Cloudflare_IPv4_10" "Cloudflare_IPv4_11" "Cloudflare_IPv4_12" "Cloudflare_IPv4_13" "Cloudflare_IPv4_14" "Cloudflare_IPv4_15"
        set color 9
    next
end
```

### Add security policy

Add a firewall rule to permit the ICMP traffic associated with the reply style bidirectional health checks.

{{<Aside type="note">}}This example assumes this rule is the second rule in the firewall policy (`edit 2`). If you opt to copy/paste the example into an SSH session, edit the numeric value associated with the rule position accordingly.{{</Aside>}}

```txt
fortigate (policy) # show
config firewall policy
    edit 2
        set name "CF_Magic_Health_Checks"
        set uuid 80eb76ce-3033-51ee-c5e5-d5a670dff3b3
        set srcintf "Cloudflare_Zone"
        set dstintf "loopback1" "loopback2"
        set action accept
        set srcaddr "Cloudflare_IPv4_Nets"
        set dstaddr "Bidirect_HC_Endpoint_01" "Bidirect_HC_Endpoint_02"
        set schedule "always"
        set service "ALL_ICMP"
        set logtraffic all
    next
end

```

### Policy-based routing

Policy-based routing rules are required to ensure the traffic associated with the bidirectional health checks received over a Magic IPsec tunnel is sent back across the same Magic IPsec tunnel.

Add two policy-based routing rules, one for each of the two Magic IPsec tunnels.

{{<Aside type="note">}}This example assumes the rules below are the first and second rules respectively (`edit 1` and `edit 2`). If you opt to copy/paste the example into an SSH session, edit the numeric value associated with the rule position accordingly.{{</Aside>}}

```txt
fortigate # config router policy
    edit 1
        set input-device "MWAN_IPsec_Tun1"
        set srcaddr "all"
        set dstaddr "all"
        set gateway 10.252.2.90
        set output-device "MWAN_IPsec_Tun1"
    next
    edit 2
        set input-device "MWAN_IPsec_Tun2"
        set srcaddr "all"
        set dstaddr "all"
        set gateway 10.252.2.92
        set output-device "MWAN_IPsec_Tun2"
    next
end
```

## Monitor Cloudflare Magic IPsec tunnel health checks

{{<render file="_tunnel-healthchecks-dash.md" withParameters="**Magic WAN** > **Tunnel health**" >}}

## Troubleshooting

### Packet Capture

Packet captures allow you to determine whether or not the policy-based routing rules are working as expected.

{{<Aside type="note">}}Due to the nature of the reply-style tunnel health checks, you will see ICMP Reply packets in both the ingress and egress direction. This is expected behavior.{{</Aside>}}

The expected behavior should look like the examples below — traffic ingressing Tunnel 01 of 02 should egress the same tunnel. 

```txt
fortigate # diagnose sniffer packet any 'host 172.64.240.253' 4
interfaces=[any]
filters=[host 172.64.240.253]
0.601569 MWAN_IPsec_Tun1 in 172.64.240.253 -> 162.158.176.118: icmp: echo reply
0.601585 MWAN_IPsec_Tun1 out 172.64.240.253 -> 162.158.176.118: icmp: echo reply
0.611164 MWAN_IPsec_Tun1 in 172.64.240.253 -> 172.71.87.94: icmp: echo reply
0.611178 MWAN_IPsec_Tun1 out 172.64.240.253 -> 172.71.87.94: icmp: echo reply
0.617562 MWAN_IPsec_Tun1 in 172.64.240.253 -> 172.71.129.214: icmp: echo reply
0.617574 MWAN_IPsec_Tun1 out 172.64.240.253 -> 172.71.129.214: icmp: echo reply
0.622042 MWAN_IPsec_Tun1 in 172.64.240.253 -> 172.69.61.43: icmp: echo reply
0.622056 MWAN_IPsec_Tun1 out 172.64.240.253 -> 172.69.61.43: icmp: echo reply
0.624092 MWAN_IPsec_Tun1 in 172.64.240.253 -> 172.68.9.214: icmp: echo reply
```

Conversely, traffic ingressing Tunnel 02 of 02 should egress the same tunnel:

```txt
fortigate # diagnose sniffer packet any 'host 172.64.240.254' 4
interfaces=[any]
filters=[host 172.64.240.254]
0.912041 MWAN_IPsec_Tun2 in 172.64.240.254 -> 172.70.177.56: icmp: echo reply
0.912057 MWAN_IPsec_Tun2 out 172.64.240.254 -> 172.70.177.56: icmp: echo reply
0.913579 MWAN_IPsec_Tun2 in 172.64.240.254 -> 172.70.221.154: icmp: echo reply
0.913592 MWAN_IPsec_Tun2 out 172.64.240.254 -> 172.70.221.154: icmp: echo reply
0.914247 MWAN_IPsec_Tun2 in 172.64.240.254 -> 162.158.1.85: icmp: echo reply
0.914260 MWAN_IPsec_Tun2 out 172.64.240.254 -> 162.158.1.85: icmp: echo reply
0.918533 MWAN_IPsec_Tun2 in 172.64.240.254 -> 172.71.125.75: icmp: echo reply
0.918550 MWAN_IPsec_Tun2 out 172.64.240.254 -> 172.71.125.75: icmp: echo reply
0.924465 MWAN_IPsec_Tun2 in 172.64.240.254 -> 172.69.21.134: icmp: echo reply
```

### Flow Debugging

Flow debugging can be helpful when it comes to determining whether or not traffic is ingressing/egressing the firewall via the expected path. It takes steps much further than the sniffer packet captures in the previous section, but it creates a tremendous amount of logging and should only be enabled when absolutely necessary.

Additionally, customers will likely need to contact Fortinet technical support for assistance with interpreting the flow debug logs, as well as to obtain recommendations in terms of how to configure FortiGate to ensure flows are routed correctly based on the application’s requirements.

```txt
fortigate # diagnose debug disable 
fortigate # diagnose debug flow filter clear 
fortigate # diagnose debug reset 
fortigate # diagnose debug flow filter addr 172.64.240.253
fortigate # diagnose debug show flow show function-name enable 
fortigate # diagnose debug config-error-log timestamps enable 
fortigate # diagnose debug flow trace start 999
fortigate # diagnose debug enable 


fortigate # 2023-08-01 09:27:26 id=20085 trace_id=2871 func=print_pkt_detail line=5844 msg="vd-root:0 received a packet(proto=1, 172.64.240.253:56968->172.70.121.28:0) tun_id=162.159.67.210 from MWAN_IPsec_Tun1. type=0, code=0, id=56968, seq=0."
2023-08-01 09:27:26 id=20085 trace_id=2871 func=rpdb_srv_match_input line=1036 msg="Match policy routing id=1: to 10.252.2.90 via ifindex-34"
2023-08-01 09:27:26 id=20085 trace_id=2871 func=vf_ip_route_input_common line=2605 msg="find a route: flag=00000000 gw-162.159.67.210 via MWAN_IPsec_Tun1"
2023-08-01 09:27:26 id=20085 trace_id=2871 func=ipsecdev_hard_start_xmit line=669 msg="enter IPSec interface MWAN_IPsec_Tun1, tun_id=0.0.0.0"
2023-08-01 09:27:26 id=20085 trace_id=2871 func=_do_ipsecdev_hard_start_xmit line=229 msg="output to IPSec tunnel MWAN_IPsec_Tun1"
2023-08-01 09:27:26 id=20085 trace_id=2871 func=esp_output4 line=844 msg="IPsec encrypt/auth"
2023-08-01 09:27:26 id=20085 trace_id=2871 func=ipsec_output_finish line=544 msg="send to 172.71.91.34 via intf-wan1"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=print_pkt_detail line=5844 msg="vd-root:0 received a packet(proto=1, 172.64.240.253:18685->162.158.209.64:0) tun_id=162.159.67.210 from MWAN_IPsec_Tun1. type=0, code=0, id=18685, seq=0."
2023-08-01 09:27:26 id=20085 trace_id=2872 func=rpdb_srv_match_input line=1036 msg="Match policy routing id=1: to 10.252.2.90 via ifindex-34"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=vf_ip_route_input_common line=2605 msg="find a route: flag=00000000 gw-162.159.67.210 via MWAN_IPsec_Tun1"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=ipsecdev_hard_start_xmit line=669 msg="enter IPSec interface MWAN_IPsec_Tun1, tun_id=0.0.0.0"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=_do_ipsecdev_hard_start_xmit line=229 msg="output to IPSec tunnel MWAN_IPsec_Tun1"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=esp_output4 line=844 msg="IPsec encrypt/auth"
2023-08-01 09:27:26 id=20085 trace_id=2872 func=ipsec_output_finish line=544 msg="send to 172.71.91.34 via intf-wan1"
```

### Disable Flow Debugging

The typical use of <kbd>CTRL</kbd> <kbd>C</kbd> will not stop Flow Debugging.

You can disable Flow Debugging simply by typing the following at any point while the debug logs are scrolling by:

```txt
fortigate # diagnose debug disable 
```