---
order: 4
---
 
# Exclude network traffic from WARP

 <Aside>
 
In order for the WARP client to pick up any changes you make to Split Tunnels or Local Domain Fallback, you will need to restart it. To do that, you can either restart the computer or quit the application and relaunch it. This behavior will be improved in a future release.
 
</Aside>

When the WARP Client is deployed, all DNS requests and/or network traffic on the device are processed by Cloudflare Gateway by default. However, under certain circumstances, you may need to exclude DNS requests and/or network traffic from being processed by Gateway.
 
To do that, there are two settings you can use depending on your needs:

* **Use [Local Domain Fallback](/connections/connect-devices/warp/exclude-traffic/local-domains)** to instruct the WARP Client to ignore DNS requests to a given list of domains. These DNS requests will be passed back to other DNS servers configured on existing network interfaces on the device.
 
This is useful when you have defined private hostnames that wouldn’t otherwise resolve on the public internet.


<Aside type="warning">
 
DNS requests to domain names entered here will not be encrypted, managed or monitored by Cloudflare Gateway.
 
</Aside>

* **Use the [Split Tunnels](/connections/connect-devices/warp/exclude-traffic/split-tunnels) mode** to instruct the WARP client to ignore traffic to a specified set of IP addresses. Any traffic that is destined to an IP address defined in the split tunnel configuration will be ignored by the WARP client and handled by the local machine.
 
This is useful when you want to run another VPN alongside WARP or when you need traffic to flow over the open Internet.

<Aside type="warning">
 
Any traffic to IP addresses defined in the Split Tunnel configuration will not be encrypted, managed or monitored by Cloudflare Gateway.
 
</Aside>

## Use WARP alongside a VPN
 
You may still be required to run WARP alongside a legacy VPN product, and we're working to make this experience as seamless as possible. When running in this configuration, there are two important considerations with your deployment:
 
* **Start WARP first**. WARP and your legacy VPN are both trying to route traffic and DNS requests over our respective networks. Some legacy VPN clients must be the last client to touch a network configuration or they will fail.
 
* **Turn on Split Tunnel and DNS Fallback in your legacy VPN configuration**. Your legacy VPN may try to route all network traffic and DNS requests through their product by default. For Gateway to function properly, the legacy VPN configuration needs to be set up to only handle the network traffic required for your LOB applications that still require the legacy VPN. All other traffic should fall back to the local machine, so it can be picked up by WARP and protected by Gateway.
 
