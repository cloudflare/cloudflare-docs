---
pcx_content_type: how-to
title: Create ACL
weight: 4
meta:
    title: Create a new Access Control List
---

# Create a new Access Control List

You need to create an Access Control List (ACL) in certain situations:

- If Cloudflare is your [primary DNS provider](/dns/zone-setups/zone-transfers/cloudflare-as-primary/), create an ACL to specify additional IPs Cloudflare should accept zone transfer requests from.
- If Cloudflare is your [secondary DNS provider](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), create an ACL to specify additional NOTIFY IPs that Cloudflare should listen to.

An ACL is configured at the account level, which means that it will apply to every primary and secondary zone in your account.

## Using the dashboard

To create a new ACL using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account.
2. Go to **Manage Account** > **Configurations**.
3. Go to **DNS Zone Transfers**.
4. For **ACL**, click **Create**.
5. Enter the following information:
    - **ACL name**: Provide a descriptive name.
    - **IP range**: Enter a range of IPv4 or IPv6 addresses (limited to a maximum of /24 for IPv4 and /64 for IPv6).
6. Click **Create**.

## Using the API

To create a new ACL using the API, send a [POST](/api/operations/secondary-dns-(-acl)-create-acl) request.