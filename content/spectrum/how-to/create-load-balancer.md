---
title: Create Load Balancer & Spectrum application
nav: null
pcx-content-type: how-to
weight: 0
meta:
  title: Create a Load Balancer and Spectrum Application
---

# Create a Load Balancer and Spectrum Application

## Create a Load Balancer

For help creating a Load Balancer from the dashboard or using the API, follow the [Create a load balancer](/load-balancing/how-to/create-load-balancer) workflow.

## Create a Spectrum application

1.  Log in to the Cloudflare dashboard.
2.  Click **Spectrum**.
3.  Click **Create an Application**.
4.  Under **Origin**, select **Load Balancer**.
5.  Select the load balancer from the menu.
6.  Click **Submit**.

### Example Curl using the API

**Example Curl using the API:**

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/spectrum/apps' \
-H "Content-Type: application/json" \
-H "X-Auth-Email: email" \
-H "X-Auth-Key: key" \
--data '{"dns":{"type":"CNAME","name":"spectrum-cname.example.com"},"ip_firewall":false,"protocol":"tcp/22","proxy_protocol":false,"tls":"off","origin_dns": {"name": "cname-to-origin.example.com", "ttl": 1200}, "origin_port": 22}'
```

### Example Data

```json
{
	"dns": {
		"type": "CNAME",
		"name": "spectrum-cname.example.com"
	},
	"ip_firewall": false,
	"protocol": "tcp/22",
	"proxy_protocol": false,
	"tls": "off",
	"origin_dns": {
		"name": "cname-to-origin.example.com",
		"ttl": 1200
	},
	"origin_port": 22
}
```
