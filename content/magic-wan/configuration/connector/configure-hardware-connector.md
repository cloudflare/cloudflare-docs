---
pcx_content_type: how-to
title: Configure hardware Connector
weight: 3
---

# Configure Magic WAN Connector

## Prerequisites

1. You need to purchase [Magic WAN](https://www.cloudflare.com/magic-wan/) before you can purchase and use the Magic WAN Connector. The Magic WAN Connector can function as your primary edge device for your network, or be deployed in-line with existing network gear.

2. You also need to purchase Magic WAN Connector before you can start configuring your settings in the Cloudflare dashboard. Contact your account representative to learn more about purchasing options for the Magic WAN Connector device. After buying Magic WAN Connector, the device will be registered with your Cloudflare account and show up in your Cloudflare dashboard.

---

## 1. Configure Cloudflare dashboard settings

### Create a site

{{<render file="connector/_create-site.md" >}}

## 2. Set up your Magic WAN Connector

### Device installation

There are several deployment options for Magic WAN Connector. Connector can act like a DHCP server for your local network, or integrate with your local set up and have static IP addresses assigned to it.

LAN to LAN communication in Magic WAN Connector is not yet supported. If you have a LAN set up on port one of Magic WAN Connector and need to communicate with the LAN set up behind LAN port two, packets will be routed through Cloudflare first before reaching their destination.

#### Firewall settings required

If there is a firewall deployed upstream of the Magic WAN Connector, configure the firewall to allow the following traffic:

- **UDP/53 (DNS destination IP 1.1.1.1)**: Needed to allow DNS traffic to Cloudflare DNS servers. Cloudflare uses this port for DNS lookups of control plane API endpoints.
- **TCP/443**: The Connector will open outbound HTTPS connections over this port for control plane operations.
- **UDP/4500 (destination IP 162.159.64.1)**: Needed for Connector's initialization and discovery traffic through outbound connections.
- **UDP/4500 (destination IP - Cloudflare Anycast IPs)**: Needed for the Cloudflare {{<glossary-tooltip term_id="anycast" link="/magic-wan/configuration/manually/how-to/configure-tunnels/">}}Anycast IPs{{</glossary-tooltip>}} assigned to your account for tunnel outbound connections. This traffic is tunnel traffic.
- **TCP/7844, UDP/7844 Outbound connections**: This is for debugging facilities in the connector.

### Activate connector

{{<render file="connector/_activate-connector.md" >}}

{{<Aside type="note">}}
 If your final network configuration is based on a static IP address without a route to the Internet that has DHCP enabled:

1. Wait 60 seconds.
2. Unplug the physical connection to the Internet-connected device which provides DHCP.
3. Adjust your physical connections as required to match the configuration specified in the [Site configuration](#create-a-site) step (for example, static IP WAN plugged into physical port with no DHCP connection).
4. Power cycle the Connector.

{{</Aside>}}

---

## IP sec tunnels and static routes

{{<render file="connector/_ipsec-static-tunnels.md" >}}

---

## Next steps

Refer to Maintenance to learn about:
  - Changing when your Connector should update its settings
  - Deactivating your Connector

Refer to [Reference](/magic-wan/configuration/connector/reference/) to learn more about:
- [Magic WAN Connector security](/magic-wan/configuration/connector/reference/#security-and-other-information)
- [How to interpret heartbeat information](/magic-wan/configuration/connector/reference/#heartbeat)
- [Device metrics](/magic-wan/configuration/connector/reference/#device-metrics)