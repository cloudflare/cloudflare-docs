---
title: Cloudflare Tunnel
pcx_content_type: get-started
weight: 1
meta:
  title: Cloudflare Tunnel setup - Keyless SSL
---

# Cloudflare Tunnel setup

Through an integration with [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/), you can send traffic to a key server through a secure channel and avoid exposing your key server to the public Internet.

---

{{<render file="_keyless-prereqs.md">}}

---

## Step 1 - Install `cloudflared` on key server

First, install `cloudflared` on your key server.

{{<render file="_keyless-tunnel-setup.md">}}
<br/>

## Step 2 - Create a Tunnel

Then, create a Cloudflare Tunnel.

{{<render file="_keyless-tunnel-setup.md">}}
<br/>

In these steps, you should choose the option to **Connect a network** and use the private IP address of your key server.

After you create the Tunnel, use the Cloudflare API to [List tunnel routes](https://developers.cloudflare.com/api/operations/tunnel-route-list-tunnel-routes), saving the following values for a future step:

- `"virtual_network_id"`
- `"network"`

## Step 3 - Upload Keyless SSL Certificates

{{<render file="_keyless-upload-preamble.md">}}

To upload a Keyless certificate with the API, send a [`POST`](https://developers.cloudflare.com/api/operations/keyless-ssl-for-a-zone-create-keyless-ssl-configuration) request that includes a `"tunnel"` object.

```json
"tunnel": {
  "vnet_id": "<VIRTUAL_NETWORK_ID>",
  "private_ip": "<NETWORK>"
}
```

## Step 4 - Set up and activate key server

{{<render file="_keyless-key-server-setup.md">}}