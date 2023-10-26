---
title: WARP
pcx_content_type: tutorial
meta:
  title: Use WARP as an on-ramp
---

# WARP on-ramp to Magic WAN

Use [WARP](/cloudflare-one/connections/connect-devices/warp/) as an on-ramp to Magic WAN and route traffic from user devices with WARP installed to any network connected with Cloudflare Tunnel or Magic IP-layer tunnels (Anycast [GRE, IPsec](/magic-wan/get-started/configure-tunnels/#tunnels), or [CNI](/network-interconnect/)). Take advantage of the integration between Magic WAN and [Magic Firewall](/magic-firewall/) and enforce policies at Cloudflare’s global network.

Depending on your use case, you will see the following IP addresses when connecting a WARP device to Magic WAN:
- `100.96.0.0/12`: When connecting a WARP device to an origin behind a GRE or IPsec tunnel.
- [Cloudflare IP addresses](/magic-wan/zero-trust/cloudflare-gateway/): When you are connecting a WARP device, and using Zero Trust policies - for example, you have Gateway set up.

## Prerequisites

Before you can begin using WARP as an on-ramp to Magic WAN, you must set up your [Zero Trust account](/cloudflare-one/setup/#create-a-zero-trust-organization).

## 1. Route packets back to WARP devices

Route packets back to WARP devices from services behind an Anycast GRE or other type tunnel. You need to do this before actually installing WARP. Otherwise, your infrastructure will not route packets correctly to Cloudflare global network and connectivity will fail.

Cloudflare will assign IP addresses from the WARP virtual IP (VIP) space to your WARP devices. To view your virtual IP address, open the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/), and select **My Team** > **Devices**.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

```sh
$ ip route add 100.96.0.0/12 dev gre1
```

{{<Aside type="note" header="Note">}}
After set up, **HTTP** and **Network logs** in Gateway will show the virtual IP address of your WARP device as the **Source IP**. DNS logs will continue to show the original WARP device IP because DNS traffic is sent over the public Internet to Cloudflare’s public-facing resolver.
{{</Aside>}}

## 2. Configure Split Tunnels

Configure [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) from your Zero Trust account to only include traffic from the private IP addresses you want to access.

Optionally, you can configure Split Tunnels to include IP ranges or domains you want to use for connecting to public IP addresses.

## 3. Install the WARP client on your device

Refer to [Deploy WARP to your organization](/cloudflare-one/connections/connect-devices/warp/deployment/) for more information on whether to choose a manual or managed deployment.

You should be able to access Private IP addresses specified in the Split Tunnel configuration.

You must log out and log back in with at least one WARP device to ensure the configuration updates on your device.

{{<render file="_traceroute.md">}}

## Test WARP integration

Before testing, be sure to [configure domain fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/#configure-local-domain-fallback) for the server or service in WARP settings. This is needed because by default Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processing.

If WARP integration has been enabled for the account within the last day, log off and on again in the WARP client before testing.

To check if WARP is working correctly as an on-ramp, you can do a resolution test on a [fully qualified domain name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) for a server or service in the Magic WAN. Test this from a user with a WARP device.

For example:

```sh
$ nslookup <SERVER_BEHIND_MAGIC_WAN>
```

This DNS lookup should return a valid IP address associated with the server or service you are testing for.

Next, test with a browser that you can connect to a service on the WAN by opening a webpage that is only accessible on the WAN. The server can be the same server used in the DNS lookup or another server in the WAN. Connecting using an IP address instead of a domain name should work.