---
title: WARP
pcx_content_type: tutorial
meta:
  title: Use WARP as an on-ramp
---

# WARP on-ramp to Magic WAN

Use [WARP](/cloudflare-one/connections/connect-devices/warp/) as an {{<glossary-tooltip term_id="on-ramp">}}on-ramp{{</glossary-tooltip>}} to Magic WAN and route traffic from user devices with WARP installed to any network connected with Cloudflare Tunnel or Magic IP-layer tunnels ({{<glossary-tooltip term_id="anycast">}}anycast{{</glossary-tooltip>}} {{<glossary-tooltip term_id="GRE tunnel" link="/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels">}}GRE{{</glossary-tooltip>}}, {{<glossary-tooltip term_id="IPsec tunnel" link="/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels">}}IPsec{{</glossary-tooltip>}}, or [CNI](/network-interconnect/)). Take advantage of the integration between Magic WAN and [Magic Firewall](/magic-firewall/) and enforce policies at Cloudflare’s global network.

## Prerequisites

Before you can begin using WARP as an on-ramp to Magic WAN, you must set up your [Zero Trust account](/cloudflare-one/setup/#create-a-zero-trust-organization).

## IP ranges

When connecting a WARP device to Magic WAN, you will have virtual IP addresses from WARP, in the `100.96.0.0/12` range.

---

## Set up WARP with Magic WAN

### 1. Route packets back to WARP devices

Route packets back to WARP devices from services behind an anycast GRE or other type tunnel. You need to do this before actually installing WARP. Otherwise, your infrastructure will not route packets correctly to Cloudflare global network and connectivity will fail.

Cloudflare will assign IP addresses from the WARP virtual IP (VIP) space to your WARP devices. To view your virtual IP address, open the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/), and select **My Team** > **Devices**.

All packets with a destination IP in the VIP space need to be routed back through the tunnel. For example, with a single GRE tunnel named `gre1`, in Linux, the following command would add a routing rule that would route such packets:

```sh
$ ip route add 100.96.0.0/12 dev gre1
```

{{<Aside type="note" header="Note">}}
After set up, **HTTP** and **Network logs** in Gateway will show the virtual IP address of your WARP device as the **Source IP**. DNS logs will continue to show the original WARP device IP because DNS traffic is sent over the public Internet to Cloudflare’s public-facing resolver.
{{</Aside>}}

### 2. Configure Split Tunnels

Configure [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) from your Zero Trust account to only include traffic from the private IP addresses you want to access.

Optionally, you can configure Split Tunnels to include IP ranges or domains you want to use for connecting to public IP addresses.

### 3. Install the WARP client on your device

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

## Double encapsulation

When a WARP user goes to a location (like an office) with a Magic WAN tunnel already set up, WARP traffic is doubly encapsulated - first by WARP and then by Magic WAN. This is unnecessary, since each on-ramp method provides full Zero Trust protection.

Since WARP traffic is already protected on its own, Cloudflare recommends that you set up Magic WAN to exclude WARP traffic, sending it to the Internet through regular connections.

To learn which IP addresses and UDP ports you should exclude to accomplish this, refer to [WARP ingress IP](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip) and [WARP UDP ports](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip).