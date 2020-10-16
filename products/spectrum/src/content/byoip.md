# BYOIP

When creating a Spectrum application, Cloudflare normally assigns an arbitrary IP from Cloudflare’s IP pool to your application. This may not always be what you want: you may want to be explicit in your network setup, or use your own IP addresses. BYOIP with Spectrum allows you to do just that.

## What is BYOIP

BYOIP stands for Bring Your Own IP, which allows you to do just that. If you own an IP prefix you can migrate it to Cloudflare. Once migrated, Cloudflare will start broadcasting your IP prefix and traffic will get routed to the global Cloudflare network. However, without configuration Cloudflare will not know how to handle this traffic. The last step is to add Spectrum applications for all applications that you wish to protect with the IP addresses you want associated with them.

The smallest prefixes that Cloudflare currently supports is /24 for IPv4 and /48 for IPv6.

To get onboarded with BYOIP, contact your customer representative.

## How can I assign an IP address in Spectrum?

To use an IP, it must be assigned to a Spectrum app. This will result in the appropriate A (IPv4) or AAAA (IPv6) records being created. This is done by specifying one or more IP addresses when creating an application through the API:

```json
{
  "id": "4590376cf2994d72cee36828ec4eff19",
  "protocol": "tcp/22",
  "dns": {
    "type": "ADDRESS",
    "name": "ssh.example.com"
  },
  "origin_direct": [
    "tcp://192.0.2.1:22"
  ],
  "ip_firewall": true,
  "proxy_protocol": false,
  "spp": false,
  "tls": "off",
  "traffic_type": "direct",
  "edge_ips": {
    "type": "static",
    "ips": [
      "198.51.100.10",
      "2001:DB8::1"
    ]
  }
}
```

Full example of creating an application that routes traffic through Cloudflare’s HTTP pipeline, including WAF, Workers and CDN functionality:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONEID/spectrum/apps" \
     -H "X-Auth-Email: USER_EMAIL" \
     -H "X-Auth-Key: API_KEY" \
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

(replace ZONEID, USER_EMAIL and API_KEY with your actual values)

## What if I don’t have BYOIP enabled on my account?

BYOIP does not come standard with Spectrum. To enable it, contact your customer representative.
