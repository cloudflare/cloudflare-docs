---
order: 3
pcx-content-type: faq
---

[❮ Back to FAQ](/faq)

# Tunnels

## ​Can I create a Tunnel for an apex domain?

Yes. With [Named Tunnels](https://blog.cloudflare.com/argo-tunnels-that-live-forever/) you can create a CNAME at the apex that points to the named tunnel.

## ​Does Cloudflare Tunnel support Websockets?

Yes. Cloudflare Tunnel has full support for Websockets.

## What are the ports and IPs used by `cloudflared`?

Users can implement a positive security model with Cloudflare Tunnel by restricting traffic originating from cloudflared. The parameters below can be configured for egress traffic inside of a firewall.

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

## How can Tunnel be used with Partial DNS (CNAME Setup)?

Cloudflare offers two modes of setup: Full Setup, in which the domain uses Cloudflare DNS name servers, and Partial Setup (also known as CNAME setup) in which the domain uses non-Cloudflare DNS servers.

The best experience with Cloudflare Tunnel is using Full Setup because Cloudflare manages DNS for the domain and can automatically configure DNS records for newly started Tunnels.

You can still use Tunnel with Partial Setup. You will need to create a new DNS record with your current DNS provider for each new hostname connected through Cloudflare Tunnel. The DNS record should be of type CNAME or ALIAS if it is on the root of the domain. The name of the record should be the subdomain it corresponds to (e.g. example.com or tunnel.example.com) and the value of the record should be subdomain.domain.tld.cdn.cloudflare.net. (e.g. example.com.cdn.cloudflare.net or tunnel.example.com.cdn.cloudflare.net)

## How can origin servers be secured when using Tunnel?

Tunnel can expose web applications to the internet that sit behind a NAT or firewall. Thus, you can keep your web server otherwise completely locked down. To double check that your origin web server is not responding to requests outside Cloudflare while Tunnel is running you can run netcat in the command line:

```bash
netcat -zv [your-server’s-ip-address] 80
netcat -zv [your-server’s-ip-address] 443
```

If your server is still responding on those ports, you will see:

```bash
[ip-address] 80 (http) open
```

If your server is correctly locked down, you will see:

```bash
[ip-address] 443 (https): Connection refused
```

## What is the difference between Tunnel creating a CNAME or AAAA record in the hostname's DNS setting?

Tunnels that use Cloudflare's Load Balancer use CNAME records. Tunnels that do not use the Load Balancer product will create AAAA records.

## Does Cloudflare Tunnel send visitor IPs to my origin?

No. When using Cloudflare Tunnel, all requests to the origin are made internally between `cloudflared` and the origin.

To log external visitor IPs, you will need to [configure an alternative method](https://support.cloudflare.com/hc/en-us/articles/200170786-Restoring-original-visitor-IPs-Logging-visitor-IP-addresses-with-mod-cloudflare-).

## Why does the name "warp" appear in some legacy materials?

Cloudflare Tunnel was previously named Warp during the beta phase. As Warp was added to the Argo product family, we changed the name to match.