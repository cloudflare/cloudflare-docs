# CNAME origins

The API supports specifying an origin by hostname. This is useful for cases where you might setup Spectrum in front of a load balancer like an AWS ELB that offers a hostname instead of a static IP.

<Aside>

This feature requires an Enterprise plan.  If you would like to upgrade, please contact your customer success manager or the [Customer Success Team](mailto:success@cloudflare.com).

</Aside>

## Step 1: Create a CNAME Record

You will need to create a record on your Cloudflare hosted zone that points to your origin's hostname. This is required to resolve to your hostname origin.

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
	"proxied": true,
}
```

## Step 2: Create the Spectrum Application

You will then need to create the Spectrum application that will point to the domain name. Below is an example curl and the associated data being posted to the API.

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
