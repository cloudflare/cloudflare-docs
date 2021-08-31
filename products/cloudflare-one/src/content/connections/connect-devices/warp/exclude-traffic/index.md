---
order: 14
pcx-content-type: concept
---
 
# Exclude or include network traffic with WARP

When the WARP client is deployed, all DNS requests and/or network traffic on the device are processed by Cloudflare by default. However, under certain circumstances, you may need to exclude DNS requests and/or explicitly exclude or include network traffic.

To do that, there are three settings you can configure:

* **Use [Local Domain Fallback](/connections/connect-devices/warp/exclude-traffic/local-domains)** to instruct the WARP client to ignore DNS requests to a given list of domains. These DNS requests will be passed back to other DNS servers configured on existing network interfaces on the device.
 
This is useful when you have defined private hostnames that wouldn’t otherwise resolve on the public internet.


<Aside type="warning">
 
DNS requests to domain names entered here will not be encrypted, managed or monitored by Cloudflare Gateway.
 
</Aside>

* **Use the [Split Tunnels](/connections/connect-devices/warp/exclude-traffic/split-tunnels) Exclude mode** to instruct the WARP client to ignore traffic to a specified set of IP addresses or domains. Any traffic that is destined to an IP address or domain defined in the Split Tunnels Exclude configuration will be ignored by the WARP client and handled by the local machine. Use this mode when you want the majority of your traffic encrypted and processed by Gateway, but need to exclude certain routes due to app compatibility, or if you need WARP to run alongside a VPN.

* **Use the [Split Tunnels](/connections/connect-devices/warp/exclude-traffic/split-tunnels) Include mode** mode to instruct the WARP client to only handle traffic to a specified set of IP addresses or domains. Any traffic that is not included by IP address or domains defined in the Split Tunnel Include configuration will be ignored by the WARP client and handled by the local machine. Use this mode when you only want specific traffic processed by Gateway, such as when using Tunnels for a specific resource.

<Aside type="warning">
 
Traffic excluded from WARP by Split Tunnel configuration will not be encrypted, managed or monitored by Cloudflare Gateway.
 
</Aside>

## Use WARP alongside a VPN
 
You may still be required to run WARP alongside a legacy VPN product, and we're working to make this experience as seamless as possible. When running in this configuration, there are two important considerations with your deployment:
 
* **Start WARP first**. WARP and your legacy VPN are both trying to route traffic and DNS requests over our respective networks. Some legacy VPN clients must be the last client to touch a network configuration or they will fail.
 
* **Turn on Split Tunnel and DNS Fallback in your legacy VPN configuration**. Your legacy VPN may try to route all network traffic and DNS requests through their product by default. For Gateway to function properly, the legacy VPN configuration needs to be set up to only handle the network traffic required for your LOB applications that still require the legacy VPN. All other traffic should fall back to the local machine, so it can be picked up by WARP and protected by Gateway.
 
