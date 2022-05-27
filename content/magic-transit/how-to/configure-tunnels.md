---
pcx-content-type: how-to
title: Configure tunnel endpoints
weight: 1
---

# Configure tunnel endpoints

Cloudflare recommends two tunnels for each ISP and data center router combination, one per Cloudflare endpoint. Cloudflare will assign two Cloudflare endpoint addresses shortly after your onboarding kickoff call that you can use as the tunnel destinations on your data center routers/endpoints.

To configure the tunnel(s) between Cloudflare and your data centers, you must provide the following data for each tunnel:

- **Tunnel name** — A valid Linux interface name with 15 or less characters. The tunnel name cannot contain spaces or special characters, and the name cannot be shared with other tunnels.
- **Customer endpoint** — A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](/network-interconnect/), you do not need to provide endpoints because Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
  - 169.254.244.0/20
- **TTL** — Time to Live (TTL) in number of hops for the GRE tunnel. The default value is 64.
- **MTU** — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.

<details>
  <summary>Edge routing configuration example</summary>
  
| Tunnel          | Customer endpoint       | Interface address      |
| --------------- | ----------------------- | ---------------------- |
| TUNNEL_1_IAD       | 104.18.112.75           | 10.10.10.100/31        |
| TUNNEL_2_IAD       | 104.18.112.75           | 10.10.10.102/31        |
| TUNNEL_3_ATL       | 104.40.112.125          | 10.10.10.104/31        |
| TUNNEL_4_ATL       | 104.40.112.125          | 10.10.10.106/31        |

</details>

### Add tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  From **Manage Magic Transit configuration**, click **Configure**.

{{<render file="_tunnel-configuration.md">}}

## Network Address Translation

After adding your tunnels, you can use Network Address Translation (NAT) to translate your private IP to your server’s IP address. NAT works by modifying network address information in a packet’s IP header as it moves across a router, which can help with load balancing and connecting private IP networks with non-registered IP addresses to the Internet.

### Configure Network Address Translation

1.  On the router, configure NAT from your private IP address to your server’s current IP address.

```txt
Router(config)# ip nat inside source static <LOCAL_IP> <GLOBAL_IP>
```

2.  On the router, specify which interfaces connect inside and outside of the network.

```txt
Router(config)# interface Tunnel A
Router(config)# ip nat outside
Router(config)# interface 0/0  /* WAN interface */
Router(config)# ip nat outside
Router(config)# interface 0/0  /* LAN interface - to the server */
Router(config)# ip nat inside
```

3.  When you are finished, end the configuration.

```txt
Router(config)# end
```
