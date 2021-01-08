---
order: 3
---

# WARP client

You can use Cloudflare WARP client to connect devices to Cloudflare for DNS filtering or Secure Web Gateway filtering. The WARP client can be deployed in the following modes:

|Mode|Description|DNS Filtering|HTTP Filtering|
|---|---|---|---|
|DNS only|DoH-based filtering|Yes|No|
|DNS with WARP+|DoH-based filtering with encrypted WARP+ traffic|Yes|No|
|HTTP filtering|DoH-based filtering, HTTP filtering, and encrypted WARP+ traffic|Yes|Yes|

Cloudflare WARP is [available](/connections/warp/system-requirements) on iOS, Android, Mac, and Windows.

## DNS filtering

The Cloudflare WARP client can be configured to send all DNS queries from roaming devices, on any network, to Cloudflare for DNS filtering. Deploying DNS filtering with WARP does not require your team to configure source or destination IPs. To begin, follow the steps below:

1. Determine which devices can enroll.
2. Create a DNS-over-HTTPS destination.
3. [Deploy](/connections/warp/deployment) Cloudflare WARP to devices.

Alternatively, you can deploy Cloudflare DNS filtering on [networks](/connections/connect-networks) or [devices](connections/connect-devices/agentless) without the WARP client.

## Web proxying

You can proxy all traffic leaving devices through Cloudflare for HTTP inspection and filtering using the Cloudflare WARP client. To begin, follow the steps below:

1. Determine which devices can enroll.
2. [Deploy](/connections/warp/deployment) Cloudflare WARP to devices.
3. [Install](/connections/warp/install-cloudflare-cert) the Cloudflare root certificate on the devices.
4. Enable web inspection in the Cloudflare for Teams dashboard.