---
pcx-content-type: tutorial
title: Create CNAME records
weight: 0
---

# Create CNAME records

The API supports specifying an origin by hostname, which is useful when setting up Spectrum in front of a load balancer, like an AWS ELB that offers a hostname instead of a static IP.

{{<Aside type="note" header="Note">}}

This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.

{{</Aside>}}

## 1. Create a CNAME record

You will need to create a [CNAME record](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) on your Cloudflare hosted zone that points to your origin's hostname. This is required to resolve to your hostname origin.

**API Example:**

```bash
curl 'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records'  \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
-X POST --data '{"type":"CNAME", "name":"cname-to-origin.example.com", "content":"origin.domain.com", "proxied":true}'
```

**Example Data:**

```json
{
  "type": "CNAME",
  "name": "cname-to-origin.example.com",
  "content": "origin.domain.com",
  "proxied": true
}
```

## 2. Create the Spectrum application

Next, create the Spectrum application that will point to the domain name. Below is an example curl and the associated data being posted to the API.

{{<Aside type="note" header="Note">}}

The `origin_dns` field takes as input CNAMEs and the field `origin_direct` takes IP addresses. To create a Spectrum application, you can use one or the other, but not both at the same time. In case you use CNAME, Cloudflare needs to be authoritative for that zone.

{{</Aside>}}

**API Example:**

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/spectrum/apps' \
-H "Content-Type: application/json" \
-H "X-Auth-Email: email" \
-H "X-Auth-Key: key" \
--data '{"dns":{"type":"CNAME","name":"spectrum-cname.example.com"},"ip_firewall":false,"protocol":"tcp/22","proxy_protocol":"off","tls":"off","origin_dns": {"name": "cname-to-origin.example.com", "ttl": 1200}, "origin_port": 22}'
```

**Example Data:**

```json
{
  "dns": {
    "type": "CNAME",
    "name": "spectrum-cname.example.com"
  },
  "ip_firewall": false,
  "protocol": "tcp/22",
  "proxy_protocol": "off",
  "tls": "off",
  "origin_dns": {
    "name": "cname-to-origin.example.com",
    "ttl": 1200
  },
  "origin_port": 22
}
```
