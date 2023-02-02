---
pcx_content_type: reference
title: Common issues
weight: 1
---

# Common issues

This section covers the most common issues you might encounter as you deploy the WARP client in your organization, or turn on new features that interact with the client. If your issue is not listed below, refer to the [troubleshooting FAQ](/cloudflare-one/faq/teams-troubleshooting/) or [contact Cloudflare support]().

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

A hardware or software firewall may have a policy in place which blocks the [IP addresses required by WARP](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/). In particular, Microsoft Intune’s default security policy creates a firewall rule that will block WARP by default.

**To diagnose the issue**:
1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. Inspect `ps.txt` or `process.txt` for the presence of a third-party firewall product. Examples include ....?
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

[Running VPNs alongside the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) may interfere with traffic routing or DNS resolution. The most common places we see interference with WARP from these products are:

- **Control of the routing table:** In the default WARP configuration where exclude-split tunnel rules are in place, WARP needs control over the default route. Third-party VPNs need to be set to only include routes to your internal resource.

- **Control of DNS:** WARP must be the last client to touch the primary and secondary DNS server on the default interface. Make sure any DNS setting is disabled in third-party VPNs.

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
3. In `dns_check.txt`, check whether DNS resolution is handled by the WARP DNS servers (`127.0.2.2` and `127.0.2.3`).
4. Inspect `ps.txt` or `process.txt` for the presence of a third-party VPN product. Examples include Umbrella, AnyConnect, and Fortinet.
5. Temporarily uninstall (not disable or disconnect) the VPN to confirm the root cause.

**To resolve the issue**:

1. Disable all DNS enforcement on the VPN.
2. On the Zero Trust dashboard, create a [Split Tunnel rule](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) to exclude the VPN server you are connecting to (for example, `vpnserver.3rdpartyvpn.example.com`).
3. On the VPN, configure split tunnel routes so that they do not overlap with the Split Tunnel settings in Zero Trust. For example....?

### Your ISP or country is blocking WARP

Some countries explicitly block the use of VPN or VPN-like software that intentionally encrypts traffic. If you suspect your country may be blocking this traffic, please work with your ISP to verify.

### (Mac/Linux) The device's `/etc/resolv.conf` file has an unsupported character

```txt
2022-06-30T12:58:02.618Z  WARN main_loop: warp::warp_service: Tunnel connection experienced error error=Custom { kind: Other, error: ProtoError { kind: Msg("unrecognized char:  ") } }
```

## Turned on WARP and lost Internet access

## Cannot connect to a specific website or app
