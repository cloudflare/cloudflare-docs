---
order: 1
---

# Configure a Location

The only requirement for a location is its name. All other fields are optional if the location you are sending requests from is only using IPv6 or sending all DNS requests using DNS over HTTPS.

## IPv4
Gateway uses the public source IPv4 address of your network to identify your location, apply policies and log the DNS requests. When you go through onboarding or in our location tab, the dashboard automatically identifies the public source IP address.

If you are using Gateway's paid plans, you can manually enter the IP address and netmask of your location. You can find out what public IP address you are using by connecting to the network of the location and then googling “What’s my IP address”.

On your router or if you are using a device or a daemon, forward DNS queries to the following IP addresses:

* **172.64.36.1**
* **172.64.36.2**

See how you can start sending DNS queries by visiting the [setup instructions](/locations/setup-instructions/)

## IPv6
When you create a location, your location will receive a unique IPv6 address. Cloudflare Gateway will identify your location based on this unique IPv6 address.

On your router/device/forwarder/daemon forward DNS queries to the corresponding IPv6 address for the location.

See how you can start sending DNS queries by visiting the [setup instructions](/locations/setup-instructions/)

## DNS over HTTPS
Each location has a unique hostname for DNS over HTTPS.

Cloudflare Gateway will identify your location based on the DNS over HTTPS hostname.

![DNS over HTTPS hostname](../static/location-with-dns-over-https-hostname.png)

See how you can start sending DNS queries over HTTPS using [Firefox.](/locations/setup-instructions/firefox).
