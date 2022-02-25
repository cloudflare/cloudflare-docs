---
order: 
pcx-content-type: how-to
---

# Specify tunnel endpoints

## Generic Routing Encapsulation (GRE)

Cloudflare recommends two GRE tunnels for each ISP and data center router combination, one per Cloudflare GRE endpoint. Cloudflare will assign two Cloudflare GRE endpoint addresses shortly after your onboarding kickoff call that you can use as the GRE tunnel destinations on your data center routers/endpoints.

To configure the GRE tunnel(s) between Cloudflare and your data centers, you must provide the following data for each tunnel:

*   **GRE tunnel name** — A valid Linux interface name with 15 or less characters. The tunnel name cannot contain spaces or special characters, and the name cannot be shared with other GRE tunnels.
*   **Customer GRE endpoint** — A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/), you do not need to provide GRE endpoints because Cloudflare will provide them.
*   **Interface address** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
    *   10.0.0.0–10.255.255.255
    *   172.16.0.0–172.31.255.255
    *   192.168.0.0–192.168.255.255
*   **TTL** — Time to Live (TTL) in number of hops for the GRE tunnel. The default value is 64.
*   **MTU** — Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.

<details>
<summary>
  Edge routing configuration example
</summary>
<table>
  <thead>
    <tr>
      <th style='min-width:140px'>GRE tunnel</th>
      <th style='min-width:125px'>Customer GRE endpoint</th>
      <th style='min-width:150px'>Interface address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td>104.18.112.75</td>
      <td>10.10.10.100/31</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>104.18.112.75</td>
      <td>10.10.10.102/31</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>104.40.112.125</td>
      <td>10.10.10.104/31</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>104.40.112.125</td>
      <td>10.10.10.106/31</td>
    </tr>
  </tbody>
</table>
</details>

### Add GRE tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **GRE tunnels and static routes configuration**, click **Configure**.
3.  From **GRE tunnels**, click **Create**.
4.  On the **Add GRE tunnels** page, fill out the information for your GRE tunnel.
5.  *(Optional)* We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**
6.  To add multiple tunnels, click **Add GRE tunnel** for each new tunnel.
7.  After adding your tunnel information, click **Add tunnels** to save your changes.

### Edit GRE tunnels

1.  From **GRE tunnels**, locate the GRE tunnel you want to modify and click **Edit**. To edit multiple tunnels, select the checkboxes for each tunnel and then click **Edit selected tunnels**.
2.  On the **Edit GRE tunnels** page, fill out the fields you want to modify.
3.  *(Optional)* We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**
4.  After adding your information, click **Edit tunnels** to save your changes.

Note that you cannot edit the Cloudflare GRE endpoint associated with your GRE tunnel.

### Delete GRE tunnels

1.  From **GRE tunnels**, locate the GRE tunnel you want to modify and click **Delete**.
2.  Confirm the action by selecting the checkbox and clicking **Delete**.

## Network Address Translation

After adding your GRE tunnels, you can use Network Address Translation (NAT) to translate your private IP to your server’s IP address. NAT works by modifying network address information in a packet’s IP header as it moves across a router, which can help with load balancing and connecting private IP networks with non-registered IP addresses to the Internet.

### Configure Network Address Translation

1.  On the router, configure NAT from your private IP address to your server’s current IP address.

```txt
Router(config)# ip nat inside source static <LOCAL_IP> <GLOBAL_IP>
```

1.  On the router, specify which interfaces connect inside and outside of the network.

```txt
Router(config)# interface Tunnel A
Router(config)# ip nat outside
Router(config)# interface 0/0  /* WAN interface */ 
Router(config)# ip nat outside
Router(config)# interface 0/0  /* LAN interface - to the server */
Router(config)# ip nat inside
```

1.  When you are finished, end the configuration.

```txt
Router(config)# end
```
