---
order: 0
title: Setup
pcx-content-type: how-to
---

# Set up DNS Firewall

## Prerequisites

Prior to setting up DNS Firewall, you need:

- Account access to DNS Firewall (provided by your Enterprise account team).
- Access to **DNS Administrator** or **Super Administrator** privileges on your account.
- Newly updated IP addresses for your nameservers (protects against previously compromised IP addresses).

## Configure DNS Firewall

### Create a Firewall Cluster

#### Using the dashboard

1. Log in to the [Cloudflare account](https://dash.cloudflare.com) with DNS Firewall.
1. On the account homepage, click **Configurations**.
1. Click **DNS Firewall**.
1. Click **Add Firewall Cluster**.
1. Fill out the required fields, including:
    - **Minimum Cache TTL**: Recommended setting of **30 seconds**.
    - **Maximum Cache TTL**: Recommended setting of **1 hour**. Larger values increase the cache hit ratio, but also increase the time required for DNS changes to propogate.
    - **ANY queries**: Recommended setting is **Off** because these are often used as part of DDoS attacks.
1. Click **Continue**.
1. On the following screen, save the values for **Your new DNS Firewall IP Addresses**.

<Aside type="note" header="Note:">

If you forget to save your new IP addresses, find your cluster and click **IP Addresses**.

</Aside>

#### Using the API

You can also create a Firewall Cluster by sending a [POST request](https://api.cloudflare.com/#dns-firewall-create-dns-firewall-cluster) to the API.

### Update registrar settings

After waiting **an hour**, update the domain NS glue records at your registrar with your DNS Firewall IP Addresses.

### Update DNS servers

At your DNS servers, update your nameserver A records in your DNS zone file with your DNS Firewall IP Addresses.

### Test DNS resolution

Confirm that your nameservers are functioning correctly by running a `dig` command.

### Update security policies

Configure security policy in your DNS servers and Firewall to allow only [Cloudflare IPs](https://cloudflare.com/ips) and TCP/UDP port 53.