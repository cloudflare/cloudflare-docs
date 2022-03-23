---
pcx-content-type: how-to
title: Configure tunnel endpoints
weight: 1
---

# Configure tunnel endpoints

Cloudflare recommends two GRE tunnels for each ISP and data center router combination, one per Cloudflare GRE endpoint. Cloudflare will assign two Cloudflare GRE endpoint addresses shortly after your onboarding kickoff call that you can use as the GRE tunnel destinations on your data center routers/endpoints.

To configure the GRE tunnel(s) between Cloudflare and your data centers, you must provide the following data for each tunnel:

- **GRE tunnel name** — A valid Linux interface name with 15 or less characters. The tunnel name cannot contain spaces or special characters, and the name cannot be shared with other GRE tunnels.
- **Customer GRE endpoint** — A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](/network-interconnect/), you do not need to provide GRE endpoints because Cloudflare will provide them.
- **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
- **TTL** — Time to Live (TTL) in number of hops for the GRE tunnel. The default value is 64.
- **MTU** — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.

<details>
  <summary>Edge routing configuration example</summary>
  
| GRE tunnel      | Customer GRE endpoint   | Interface address      |
| --------------- | ----------------------- | ---------------------- |
| GRE_1_IAD       | 104.18.112.75           | 10.10.10.100/31        |
| GRE_2_IAD       | 104.18.112.75           | 10.10.10.102/31        |
| GRE_3_ATL       | 104.40.112.125          | 10.10.10.104/31        |
| GRE_4_ATL       | 104.40.112.125          | 10.10.10.106/31        |

</details>

### Add GRE tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **GRE tunnels and static routes configuration**, click **Configure**.
3.  From **GRE tunnels**, click **Create**.
4.  On the **Add GRE tunnels** page, fill out the information for your GRE tunnel.
5.  _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**
6.  To add multiple tunnels, click **Add GRE tunnel** for each new tunnel.
7.  After adding your tunnel information, click **Add tunnels** to save your changes.

### Edit GRE tunnels

1.  From **GRE tunnels**, locate the GRE tunnel you want to modify and click **Edit**. To edit multiple tunnels, select the checkboxes for each tunnel and then click **Edit selected tunnels**.
2.  On the **Edit GRE tunnels** page, fill out the fields you want to modify.
3.  _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**
4.  After adding your information, click **Edit tunnels** to save your changes.

Note that you cannot edit the Cloudflare GRE endpoint associated with your GRE tunnel.

### Delete GRE tunnels

1.  From **GRE tunnels**, locate the GRE tunnel you want to modify and click **Delete**.
2.  Confirm the action by selecting the checkbox and clicking **Delete**.

## Network Address Translation

After adding your GRE tunnels, you can use Network Address Translation (NAT) to translate your private IP to your server’s IP address. NAT works by modifying network address information in a packet’s IP header as it moves across a router, which can help with load balancing and connecting private IP networks with non-registered IP addresses to the Internet.

### Configure Network Address Translation

1.  On the router, configure NAT from your private IP address to your server’s current IP address.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# ip nat inside source static &ltLOCAL_IP&gt &ltGLOBAL_IP&gt</span></div></span></span></span></code></pre>{{</raw>}}

2.  On the router, specify which interfaces connect inside and outside of the network.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# interface Tunnel A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# ip nat outside</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# interface 0/0  /* WAN interface */</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# ip nat outside</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# interface 0/0  /* LAN interface - to the server */</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# ip nat inside</span></div></span></span></span></code></pre>{{</raw>}}

3.  When you are finished, end the configuration.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Router(config)# end</span></div></span></span></span></code></pre>{{</raw>}}
