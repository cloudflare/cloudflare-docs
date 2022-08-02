---
pcx_content_type: how-to
title: Manage gateways
weight: 1
---

# Manage gateways

A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.

## Create a gateway

{{<render file="_post-creation-steps.md">}}

### Via the dashboard

{{<render file="_create-gateway-dashboard.md">}}

### Via the API

{{<render file="_create-gateway-api.md">}}

---

## Edit a gateway

Once you have [created a gateway](#create-a-gateway), you can only edit the **Gateway Description** and — if it is an **IPFS** gateway — also edit the value for the [DNSLink](/web3/ipfs-gateway/concepts/dnslink/) field.

If you need to edit other fields, [delete the gateway](#delete-a-gateway) and create a new one.

### Via the dashboard

To edit a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click **Edit**.
5. Update the **Gateway Description** and — if editing an **IPFS** gateway — the value for the [DNSLink](/web3/ipfs-gateway/concepts/dnslink/).
6. Click **Reapply**.

### Via the API

To edit specific settings for a gateway, use a [PATCH](https://api.cloudflare.com/#web3-hostname-edit-web3-hostname) request.

---

## Refresh a gateway

When your gateway is stuck in an **Error** [status](/web3/reference/gateway-status/), you should try refreshing the gateway, which attempts to re-create the associated DNS records for the hostname.

### Via the dashboard

To refresh a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click the dropdown then **Refresh**.

### Via the API

To refresh a gateway using the API, send a [PATCH](https://api.cloudflare.com/#web3-hostname-edit-web3-hostname) request with an empty request body.

---

## Delete a gateway

When you delete a gateway, Cloudflare will automatically remove all associated hostname DNS records. This action will impact your traffic and cannot be undone.

### Via the dashboard

To delete a gateway using the dashboard: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click the dropdown then **Remove**.
5. Click **Delete hostname**.

### Via the API

To delete a gateway using the API, send a [DELETE](https://api.cloudflare.com/#web3-hostname-delete-web3-hostname) request.
