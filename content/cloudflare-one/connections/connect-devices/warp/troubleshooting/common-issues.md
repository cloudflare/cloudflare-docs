---
pcx_content_type: reference
title: Common issues
weight: 1
---

# Common issues

This section covers the most common issues you might encounter as you deploy the WARP client in your organization, or turn on new features that interact with the client. If your issue is not listed below, refer to the [FAQ]() or [contact Support]().

## Unable to turn on WARP

If the WARP client is stuck in the `Disconnected` state, this indicates that the client cannot establish a connection to Cloudflare's edge. In the [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs), `daemon.log` will typically show Happy Eyeball errors or connectivity check errors similar to the following:

```txt
2022-03-23T23:01:22.469Z  WARN warp::warp::happy_eyeballs: Happy eyeballs to [2606:4700:100::a29f:c104]:4500 failed: Os { code: 10051, kind: NetworkUnreachable, message: "A socket operation was attempted to an unreachable network." }
2022-03-23T23:01:22.469Z ERROR warp::warp::happy_eyeballs: Happy eyeballs error Custom { kind: NotConnected, error: "" }
```

```txt
2022-03-29T14:49:38.439Z ERROR warp::warp::connectivity_check: DNS check failed error=ResolveError { kind: Timeout }
2022-03-29T14:49:38.439Z  WARN warp::warp::connectivity_check: Tunnel trace failed request::Error { kind: Request, url: Url { scheme: "https", cannot_be_a_base: false, username: "", password: None, host: Some(Domain("connectivity.cloudflareclient.com")), port: None, path: "/cdn-cgi/trace", query: None, fragment: None }, source: TimedOut }

```

### A third-party firewall is blocking WARP

A hardware or software firewall may have a policy in place which blocks the [IP addresses used by WARP](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/). In particular, Microsoft Intune’s default security policy creates a firewall rule that will block WARP by default.

**To diagnose the issue**:
1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. Inspect `ps.txt` or `process.txt` for the presence of a third-party firewall product.
3. In `daemon.log`:
    1. Find the most recent time the WARP client attempted to connect:
    ```txt
    2023-01-24T20:29:49.262Z  INFO main_loop: warp::warp: Initiate WARP connection
    ```
    2. Review events surrounding the connection event to see if a firewall turned on prior to the connection. For example:
    ```txt
    ?????
    ```
4. In `route.txt`, check if routes to our [client orchestration API IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#client-orchestration-api) show an `en` or `wifi` interface. If you see `utun` or some other adapter, this likely means a third-party firewall is intercepting the connection.

**To resolve the issue:**

Configure your firewall to exempt the [WARP IPs and domains](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).

### A third-party VPN is interfering with WARP

Running VPNs alongside the WARP client may interfere with traffic routing or DNS resolution.

**To diagnose the issue**:

1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. In `daemon.log`, check for a large number of routing table changes:
    ```txt
    [2021-08-12T15:38:52Z DEBUG warp::warp_service] Routes changed:
        Added; Interface: 8; Destination: 10.133.27.201/32; Next hop: 100.64.0.2; 
        Added; Interface: 8; Destination: 10.133.27.202/32; Next hop: 100.64.0.2; 
    [2021-08-12T15:38:53Z DEBUG warp::warp_service] Routes changed:
        Added; Interface: 8; Destination: 10.133.27.203/32; Next hop: 100.64.0.2; 
        Added; Interface: 8; Destination: 10.133.27.204/32; Next hop: 100.64.0.2; 
    [2021-08-12T15:38:54Z DEBUG warp::warp_service] Routes changed:
        Added; Interface: 8; Destination: 10.133.27.205/32; Next hop: 100.64.0.2;
    ```
    This indicates that a third-party service is fighting for control over the WARP routing table.
3. In `dns_check.txt`, check whether the device is using the WARP DNS servers (`127.0.2.2` and `127.0.2.3`) or another third-party DNS tool.
4. Inspect `ps.txt` or `process.txt` for the presence of a third-party VPN product.
5. Temporarily uninstall (not disable or disconnect) the VPN to confirm the root cause.

**To resolve the issue**:

1.
2.

[❯ Use WARP alongside a VPN](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/#use-warp-alongside-a-vpn)

[❯ Exclude traffic from WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/)

The most common places we see interference with WARP from these products are:

- **Control of the routing table:** In the default configuration of WARP where exclude-split tunnel rules are in place, WARP needs control over the default route. Third-party VPNs need to be set to only include routes to your internal resource.

- **Control of DNS:** WARP must be the last client to touch the primary and secondary DNS server on the default interface. Make sure any DNS setting is disabled in third-party VPNs.

- If running alongside a third-party VPN, you must create an exclude [Split Tunnel rule](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) for the VPN server you are connecting to (for example, `vpnserver.3rdpartyvpn.example.com`).

### (Mac/Linux) The device's `/etc/resolv.conf` file has an unsupported character

```txt
2022-06-30T12:58:02.618Z  WARN main_loop: warp::warp_service: Tunnel connection experienced error error=Custom { kind: Other, error: ProtoError { kind: Msg("unrecognized char:  ") } }
```

## Turned on WARP and lost Internet access

