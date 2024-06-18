---
title: Setup
pcx_content_type: how-to
weight: 1
meta:
  title: Set up DNS Firewall
  description: Set up DNS Firewall to protect upstream nameservers from DDoS attacks and reduce load by caching DNS responses.
---

# Set up DNS Firewall

## Prerequisites

Prior to setting up DNS Firewall, you need:

- Account access to DNS Firewall (provided by your Enterprise account team).
- Access to **DNS Administrator** or **Super Administrator** privileges on your account.
- Newly updated IP addresses for your nameservers (protects against previously compromised IP addresses).

## Configure DNS Firewall

### Create a DNS Firewall cluster

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1.  Log in to the [Cloudflare account](https://dash.cloudflare.com) with DNS Firewall.
2.  On the account homepage, click **DNS Firewall**.
3.  Click **Add Firewall Cluster**.
4.  Fill out the required fields, including:
    - **IP Addresses**: The upstream IPv4 and/or IPv6 addresses of your authoritative nameservers.
    - **Minimum Cache TTL**: Recommended setting of **30 seconds**.
    - **Maximum Cache TTL**: Recommended setting of **1 hour**. Larger values increase the cache hit ratio, but also increase the time required for DNS changes to propagate.
    - **ANY queries**: Recommended setting is **Off** because these are often used as part of DDoS attacks. Also refer to this [blog post](https://blog.cloudflare.com/rfc8482-saying-goodbye-to-any/).
5.  Click **Continue**.
6.  On the following screen, save the values for **Your new DNS Firewall IP Addresses**.

{{<Aside type="note" header="Note:">}}

If you forget to save your new IP addresses, find your cluster and click **IP Addresses**.

{{</Aside>}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

You can also create a DNS Firewall cluster by sending a [POST request](/api/operations/dns-firewall-create-dns-firewall-cluster) to the API.

{{</tab>}}
{{</tabs>}}

### Update registrar settings

Update the `A/AAAA` glue records for your nameserver hostnames at your registrar with your DNS Firewall cluster IP addresses.

### Update DNS servers

At your DNS servers, update the `A/AAAA` records for your nameserver hostnames in your DNS zone file with your DNS Firewall cluster IP addresses.

### Test DNS resolution

Confirm that your nameservers are functioning correctly by running a `dig` command.

### Update security policies

Configure security policy in your DNS servers and Firewall to allow only [Cloudflare IPs](https://cloudflare.com/ips) and TCP/UDP port 53.

## Additional options

When you use the API, you can also specify other parameters, such as rate limit (in queries per second per data center). You can find the parameters descriptions and examples in the [API documentation](/api/operations/dns-firewall-create-dns-firewall-cluster).

To configure rate limiting and other options for already existing clusters, use the [Update DNS Firewall Cluster](/api/operations/dns-firewall-update-dns-firewall-cluster) endpoint.