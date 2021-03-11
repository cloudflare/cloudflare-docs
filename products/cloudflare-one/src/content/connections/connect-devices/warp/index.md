---
order: 0
---

# WARP client

You can use Cloudflare WARP client to connect devices to Cloudflare for DNS filtering or Secure Web Gateway filtering. The WARP client can be deployed in the following modes:

|Mode|Description|DNS Filtering|HTTP Filtering|
|---|---|---|---|
|DNS only|DoH-based filtering|Yes|No|
|DNS with WARP+|DoH-based filtering with encrypted WARP+ traffic|Yes|No|
|HTTP filtering|DoH-based filtering, HTTP filtering, and encrypted WARP+ traffic|Yes|Yes|

Cloudflare WARP is [available](/connections/connect-devices/warp/download-warp) on iOS, Android, Mac, and Windows.

## DNS filtering

The Cloudflare WARP client can be configured to send all DNS queries from roaming devices, on any network, to Cloudflare for DNS filtering. Deploying DNS filtering with WARP does not require your team to configure source or destination IPs. To begin, follow the steps below:

1. Determine which devices can enroll.
2. Create a DNS-over-HTTPS destination.
3. [Deploy](/connections/connect-devices/warp/deployment) Cloudflare WARP to devices.

Alternatively, you can deploy Cloudflare DNS filtering on [networks](/connections/connect-networks) or [devices](/connections/connect-devices/agentless) without the WARP client.

## Web proxying

You can proxy all traffic leaving devices through Cloudflare for HTTP inspection and filtering using the Cloudflare WARP client. To begin, follow the steps below:

1. [Determine which devices](/connections/connect-devices/warp/device-enrollment) can enroll or deploy the agent [with an MDM provider](/connections/connect-devices/warp/deployment).
2. [Enroll a device](/connections/connect-devices/warp/device-enrollment).
3. [Install](/connections/connect-devices/warp/install-cloudflare-cert) the Cloudflare root certificate on the devices.
4. [Enable web inspection](/connections/connect-devices/warp/control-proxy) in the Cloudflare for Teams dashboard.