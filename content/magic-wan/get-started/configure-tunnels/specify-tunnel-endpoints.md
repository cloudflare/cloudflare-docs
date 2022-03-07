---
title: Specify tunnel endpoints
pcx-content-type: how-to
weight: 0
---

# Specify tunnel endpoints

## Anycast edge IP addresses

Cloudflare assigns two Anycast IP addresses shortly after your onboarding kickoff call. Use these Anycast edge addresses as the Anycast GRE or IPsec tunnel destinations on your location's routers/endpoints.

## Generic Routing Encapsulation (GRE)

Cloudflare recommends two Anycast GRE or IPsec tunnels for each ISP and location router combination, one per Anycast IP.

To configure the Anycast GRE or IPsec tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Customer edge IP address** — A public Internet routable IP address that is outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection ([Cloudflare Network Interconnect](/network-interconnect/)), you do not need to provide edge addresses. Cloudflare will provide them.
- **Private subnet** — A 31-bit subnet (/31 in CIDR notation) supporting 2 hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - 10.0.0.0–10.255.255.255
  - 172.16.0.0–172.31.255.255
  - 192.168.0.0–192.168.255.255
- **Private IP addresses** — The private IP address assigned to the **Cloudflare** and **customer** sides of the tunnel

For an example Anycast GRE or IPsec tunnel configuration, see [Anycast GRE configuration example](/magic-wan/reference/configuration-examples/#gre-tunnel-configuration-example).

### Add GRE tunnels

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **GRE tunnels and static routes configuration**, click **Configure**.
3.  From **GRE tunnels**, click **Create**.
4.  On the **Add GRE tunnels** page, fill out the information for your GRE tunnel.
5.  _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels**.
6.  To add multiple tunnels, click **Add GRE tunnel** for each new tunnel.
7.  After adding your tunnel information, click **Add tunnels** to save your changes.

### Edit GRE tunnels

1.  From **GRE tunnels**, locate the GRE tunnel you want to modify and click **Edit**. To edit multiple tunnels, select the checkboxes for each tunnel and then click **Edit selected tunnels**.
2.  On the **Edit GRE tunnels** page, fill out the fields you want to modify.
3.  _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels**.
4.  After adding your information, click **Edit tunnels** to save your changes.

Note that you cannot edit the Cloudflare GRE endpoint associated with your GRE tunnel.

## Scoped routes for Anycast GRE or IPsec tunnels

To reduce latency for your Anycast GRE or IPsec tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions.

Valid Cloudflare regions include AFR, APAC, EEUR, ENAM, ME, OC, SAM, WEUR, and WNAM.

To configure scoping for your traffic, you must provide Cloudflare with Anycast GRE or IPsec tunnel data for each Cloudflare region.

For an example of scoping configuration data, see [scoping configuration data example](/magic-wan/reference/configuration-examples/#scoping-configuration-data-example).

For a list of Cloudflare's geographic regions across the world and their codes, see [regions and region codes](/magic-wan/reference/configuration-examples/#regions-and-region-codes).