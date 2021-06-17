---
order: 3
pcx-content-type: reference
---

# Ports and IPs

Users can implement a positive security model with Cloudflare Tunnel by restricting traffic originating from `cloudflared`. The parameters below can be configured for egress traffic inside of a firewall.

**Edge connections**
- TCP port 7844 (HTTPS)
- IPs are those behind **region1.argotunnel.com** and **region2.argotunnel.com** \*

**API requests**
- TCP port 443 (HTTPS)
- IPs are those behind **api.cloudflare.com** \*

Below the output of `dig` commands towards the above hostnames:

```bash
$ dig region1.argotunnel.com
...

;; ANSWER SECTION:
region1.argotunnel.com.	86400	IN	A	198.41.192.7
region1.argotunnel.com.	86400	IN	A	198.41.192.47
region1.argotunnel.com.	86400	IN	A	198.41.192.107
region1.argotunnel.com.	86400	IN	A	198.41.192.167
region1.argotunnel.com.	86400	IN	A	198.41.192.227

...

$ dig region2.argotunnel.com

...

;; ANSWER SECTION:
region2.argotunnel.com.	300	IN	A	198.41.200.193
region2.argotunnel.com.	300	IN	A	198.41.200.233
region2.argotunnel.com.	300	IN	A	198.41.200.13
region2.argotunnel.com.	300	IN	A	198.41.200.53
region2.argotunnel.com.	300	IN	A	198.41.200.113

...

$ dig api.cloudflare.com

...

;; ANSWER SECTION:
api.cloudflare.com.     41      IN      A       104.19.193.29
api.cloudflare.com.     41      IN      A       104.19.192.29

...
```

\* *These IP addresses are unlikely to change but in the event that they do, Cloudflare will update the information here.*
