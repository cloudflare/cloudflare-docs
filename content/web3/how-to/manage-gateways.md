---
pcx-content-type: how-to
title: Manage gateways
weight: 1
---

# Manage gateways

A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.

## Create a gateway

When you successfully create a gateway, Cloudflare automatically:
- Creates and adds [records to your Cloudflare DNS](/web3/reference/gateway-dns-records/) so your gateway can receive and route traffic appropriately.
- [Proxies](/dns/manage-dns-records/reference/proxied-dns-records/) traffic to that hostname so you can customize [caching, security, and other Cloudflare settings](/web3/how-to/customize-cloudflare-settings/).
- Issues an SSL/TLS certificate to cover the specified hostname.

### Via the dashboard

To create a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. Click **Create Web3 Gateway**.
5. Enter the following information:
  - **Hostname**: Enter a hostname to use as your gateway, which has to be a subdomain of the current Cloudflare zone.
  - **Gateway Description**: Enter a description to help distinguish between different gateways.
  - **Gateway Type**: Select a gateway target of [IPFS]((/web3/ipfs-gateway/) or [Ethereum](/web3/ethereum-gateway/).
  - **DNSLink**: Only applicable to IPFS gateways, more details at [DNSLink](/web3/ipfs-gateway/concepts/dnslink/).
6. Click **Deploy**.

### Via the API

For a full list of gateway properties, refer to [Create Web3 Hostname](https://api.cloudflare.com/#web3-hostname-create-web3-hostname). If you need help with API authentication, refer to [Cloudflare API Quickstart](/api/).

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/web3/hostnames" \
-H "Content-Type: application/json" \
-d '{
      "name": "gateway.example.com",
      "description":"This is my IPFS gateway.",
      "target":"ipfs",
      "dnslink":"/ipns/onboarding.ipfs.cloudflare.com"
  }'
```

The response contains the complete definition of the new gateway.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "<WEB3_GATEWAY_ID>",
    "name": "gateway.example.com",
    "description": "This is my IPFS gateway.",
    "status": "active",
    "target": "ipfs",
    "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
    "created_on": "<CREATED_ON_DATE>",
    "modified_on": "<MODIFIED_ON_DATE>"
  }
}
```

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
4. On a specific gateway, click **...** > **Refresh**.

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
4. On a specific gateway, click **...** > **Remove**.
5. Click **Delete hostname**.

### Via the API

To delete a gateway using the API, send a [DELETE](https://api.cloudflare.com/#web3-hostname-delete-web3-hostname) request.
