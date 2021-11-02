---
title: Create Load Balancer & Spectrum application
nav:
order:
pcx-content-type: how to
---

# Create a Load Balancer and Spectrum Application

## Create a Load Balancer

To create a Load Balancer from the dashboard, follow the [Create a load balancer](https://developers.cloudflare.com/load-balancing/create-load-balancer-ui#workflow) workflow.

To create a load balancer using the API, follow the [Create a Cloudflare load balancer via the API](https://developers.cloudflare.com/load-balancing/create-load-balancer-api) workflow.

## Create a Spectrum application

1. Log in to the Cloudflare dashboard.
1. Click **Spectrum**.
1. Click **Create an Application**.
1. Under **Origin**, select **Load Balancer**.
1. Select the load balancer from the menu.
1. Click **Submit**.

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
