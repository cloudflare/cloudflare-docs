---
pcx_content_type: get-started
title: Get started
weight: 0
layout: single
---

# Get started

Spectrum is available on all paid plans. Pro and Business support selected protocols only, whereas Enterprise supports all TCP and UDP based traffic. Refer to [Configuration options](/spectrum/reference/configuration-options/) for more configuration details.

To create a Spectrum application, you can either use an IP address, a CNAME Record or a Load Balancer. Independently of the method you use, you can create the application through the dashboard or via [API](/api/operations/spectrum-applications-list-spectrum-applications).

## Create a Spectrum application using an IP address

To create a Spectrum application using an IP address, Cloudflare normally assigns you an arbitrary IP from Cloudflare’s IP pool to your application. If you want to use your own IP addresses, you can use [BYOIP](/spectrum/about/byoip/) or you can also use a [Static IP](/spectrum/about/static-ip/). In these two last cases, you need to create your Spectrum application through the API, as these features are not available via dash. When using the API, the field `origin_direct` takes as input the IP address.

<details>
<summary>Add your application via Dashboard</summary>
<div>

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select **Spectrum**.
3.  Select **Create an Application**. If this is your first time using Spectrum, the **Create an Application** modal appears.
4.  Select your **Application Type**.
5.  Under **Domain**, enter the domain that will use Spectrum.
6.  Under **Edge Port**, enter the port Cloudflare should use for your application.
7.  Under **Origin**, enter your application's origin IP and port.
8.  If your application requires the client IP and supports [Proxy Protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol/), enable **Proxy Protocols**. Proxy Protocol is a method for a proxy like Cloudflare to send the client IP to the origin application.
9.  Select **Add**.

</div>
</details>

<details>
<summary>Add your application via API</summary>
<div>

Below is a curl example and the associated data being posted to the API.

**API example:**

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/spectrum/apps" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json" \
     --data '{"protocol":"tcp/22","dns":{"type":"CNAME","name":"ssh.example.com"},"origin_direct":["tcp://192.0.2.1:22"],"proxy_protocol":"off","ip_firewall":true,"tls":"full","edge_ips":{"type":"dynamic","connectivity":"all"},"traffic_type":"direct","argo_smart_routing":true}'
```

**Example data:**

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "protocol": "tcp/22",
    "dns": {
      "type": "CNAME",
      "name": "ssh.example.com"
    },
    "origin_direct": [
      "tcp://192.0.2.1:22"
    ],
    "proxy_protocol": "off",
    "ip_firewall": true,
    "tls": "full",
    "edge_ips": {
      "type": "dynamic",
      "connectivity": "all"
    },
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "created_on": "2014-01-02T02:20:00Z",
    "modified_on": "2014-01-02T02:20:00Z"
  }
}
```

</div>
</details>

## Create a Spectrum application using a CNAME record

To create a Spectrum application using a CNAME record, you will need to create a [CNAME record](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) on your Cloudflare hosted zone that points to your origin's hostname. This is required to resolve to your hostname origin. Refer to [Create DNS records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records), for more information. When using a CNAME as an origin, note that Cloudflare needs to be authoritative for that zone. When using the API, the `origin_dns` field takes as input the CNAME record.

<details>
<summary>Add your application via Dashboard</summary>
<div>

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select **Spectrum**.
3.  Select **Create an Application**. If this is your first time using Spectrum, the **Create an Application** modal appears.
5.  Select your **Application Type**.
6.  Under **Domain**, enter the domain that will use Spectrum.
7.  Under **Edge Port**, enter the port Cloudflare should use for your application.
8.  Under **Origin**, enter your `CNAME` record name.
9.  Select **Add**.

</div>
</details>

<details>
<summary>Add your application via API</summary>
<div>

Below is a curl example and the associated data being posted to the API.

**API example:**

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/spectrum/apps' \
-H "Content-Type: application/json" \
-H "X-Auth-Email: email" \
-H "X-Auth-Key: key" \
--data '{"dns":{"type":"CNAME","name":"spectrum-cname.example.com"},"ip_firewall":false,"protocol":"tcp/22","proxy_protocol":"off","tls":"off","origin_dns": {"name": "cname-to-origin.example.com", "ttl": 1200}, "origin_port": 22}'
```

**Example data:**

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

</div>
</details>

## Create a Spectrum application using a Load Balancer

To create a Spectrum application using a Load Balancer, you will need to generate a Load Balancer from the dashboard or via the API. Refer to the [Create a load balancer](/load-balancing/how-to/create-load-balancer/) workflow for help.

{{<Aside>}}

To prevent issues with DNS resolution for a Spectrum application, do not use the same Spectrum hostname as a current Load Balancing hostname.

{{</Aside>}}

<details>
<summary>Add your application via Dashboard</summary>
<div>

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select **Spectrum**.
3.  Select **Create an Application**. If this is your first time using Spectrum, the **Create an Application** modal appears.
4.  Select your **Application Type**.
5.  Under **Domain**, enter the domain that will use Spectrum.
6.  Under **Edge Port**, enter the port Cloudflare should use for your application.
7.  Under **Origin**, select **Load Balancer**.
8.  Select the load balancer you want to use from the dropdown. Disabled load balancers will not show on the **Load Balancer** menu.
9.  Select **Add**.

</div>
</details>


<details>
<summary>Add your application via API</summary>
<div>

Below is a curl example and the associated data being posted to the API.

**API example:**

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/spectrum/apps' \
-H "Content-Type: application/json" \
-H "X-Auth-Email: email" \
-H "X-Auth-Key: key" \
--data '{"dns":{"type":"CNAME","name":"spectrum-cname.example.com"},"ip_firewall":false,"protocol":"tcp/22","proxy_protocol":false,"tls":"off","origin_dns": {"name": "cname-to-origin.example.com", "ttl": 1200}, "origin_port": 22}'
```

**Example data:**

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

</div>
</details>

## View traffic

You can now proxy traffic through Cloudflare without additional configuration. As you run traffic through Cloudflare, you will see the last minute of traffic from **Spectrum** in the dashboard.

If you have any feedback, please [let us know](https://community.cloudflare.com/c/website-application-performance/spectrum/48).
