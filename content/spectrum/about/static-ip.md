---
pcx_content_type: concept
title: Static IP
weight: 0
---

# Static IP

When you create a Spectrum application, you are assigned an IP. These IPs are normally dynamic, meaning that they will change over time. But, for instance, if you want to set up Firewall rules for specific IPs, you may want to use static IPs. A static IP, like a physical street address can tell other computers or servers on the Internet where a specific computer is located or connected. This makes the device easier to find on the network, since the IP will not change.

With static IPs, Cloudflare commits to never changing the IP address of a client's domain resolved at the Cloudflare edge network. For example, `www.example.com` will always resolve and accept traffic sent to `198.51.100.10`. No other customer will be hosted on that IP.

## Using static IPs with Spectrum

Static IPs are an Enterprise feature that does not come standard with Spectrum. If you would like to start using static IPs, please contact your account team.

Once you get your static IP from Cloudflare, you can use it via API, just like [BYOIP](/byoip/). For the moment, there is still no UI available for this feature.

When creating a Spectrum application through the API, specify the static IPs that you have been provided. See, for instance, the API example bellow that creates an application routing traffic through Cloudflare’s HTTP pipeline.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/spectrum/apps" \
    -H "X-Auth-Email: <USER_EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -H "Content-Type: application/json" \
    --data '{
     "protocol": "tcp/80",
     "dns": {
       "type": "ADDRESS",
       "name": "www.example.com"
     },
     "origin_direct": [
       "tcp://192.0.2.1:80"
     ],
     "tls": "off",
     "traffic_type": "http",
     "edge_ips": {
       "type": "static",
       "ips": [
         "198.51.100.10",
         "2001:DB8::1"
       ]
     }
   }'
```
