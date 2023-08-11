---
pcx_content_type: how-to
title: Manage gateways
weight: 1
---

# Manage gateways

A Cloudflare Web3 gateway provides HTTP-accessible interfaces to various Web3 networks. You can interact with a gateway in several ways.

## Create a gateway

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
{{<render file="_create-gateway-dashboard.md">}}
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
{{<render file="_create-gateway-api.md">}}
 
{{</tab>}}
{{</tabs>}}

{{<render file="_post-creation-steps.md">}}

---

## Edit a gateway

Once you have [created a gateway](#create-a-gateway), you can only edit the **Gateway Description** and — if it is an **IPFS** gateway — also edit the value for the [DNSLink](/web3/ipfs-gateway/concepts/dnslink/) field.

If you need to edit other fields, [delete the gateway](#delete-a-gateway) and create a new one.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To edit a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click **Edit**.
5. Update the **Gateway Description** and — if editing an **IPFS** gateway — the value for the [DNSLink](/web3/ipfs-gateway/concepts/dnslink/).
6. Click **Reapply**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To edit specific settings for a gateway, use a [`PATCH`](/api/operations/web3-hostname-edit-web3-hostname) request.
 
{{</tab>}}
{{</tabs>}}

---

## Refresh a gateway

When your gateway is stuck in an **Error** [status](/web3/reference/gateway-status/), you should try refreshing the gateway, which attempts to re-create the associated DNS records for the hostname.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To refresh a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a gateway, click the dropdown then **Refresh**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To refresh a gateway using the API, send a [`PATCH`](/api/operations/web3-hostname-edit-web3-hostname) request with an empty request body.
 
{{</tab>}}
{{</tabs>}}

---

## Update blocklist

When you set up a [IPFS Universal Path gateway](/web3/ipfs-gateway/concepts/universal-gateway/), you may want to add items to the gateway blocklist, which allows you to block access to specific content.

You have the ability to block access to one or more:

- CIDs (`QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB`)
- IPFS content paths (`/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
- IPNS content paths (`/ipns/example.com`)
 
{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To add an item to the blocklist using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click the dropdown then **Blocklist**.
5. Click **Add entry**.
6. Enter the following information:

    - **Blocklist entry type**: Choose **CID** or **Content path**.
    - **Blocklist entry content**: Add a CID or content path to block, meaning either a valid CIDv0 or CIDv1 string (CID) or the entry should start with `/ipfs/` or `/ipns/` (content path).
    - **Blocklist entry description**: Add a description to help you identify the blocklist entry.

7. Click **Add**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To add a blocklist item using the API, send a [`POST`](/api/operations/web3-hostname-create-ipfs-universal-path-gateway-content-list-entry) request. 

{{</tab>}}
{{</tabs>}}

---

## Delete a gateway

When you delete a gateway, Cloudflare will automatically remove all associated hostname DNS records. This action will impact your traffic and cannot be undone.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To delete a gateway using the dashboard: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. On a specific gateway, click the dropdown then **Remove**.
5. Click **Delete hostname**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete a gateway using the API, send a [`DELETE`](/api/operations/web3-hostname-delete-web3-hostname) request.
 
{{</tab>}}
{{</tabs>}}