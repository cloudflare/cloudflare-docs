---
pcx-content-type: how-to
title: Create ACL
weight: 4
meta:
    title: Create a new Access Control List
---

# Create a new Access Control List

Beyond the [default values](/dns/zone-setups/zone-transfers/access-control-lists/default-values/) used for Cloudflare ACLs, you can also create a new ACL.

You might want to specify additional NOTIFY IPs for Cloudflare as secondary zones or Allow ranges for Cloudflare as primary zones.

Once you create a new ACL, you may need to update the configuration at your other DNS provider.

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

To create a new ACL using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-acl--create-acl) request.