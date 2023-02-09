---
pcx_content_type: reference
title: Common issues
weight: 1
---

# Common issues

This section covers the most common issues you might encounter as you deploy the WARP client in your organization, or turn on new features that interact with the client. If you do not see your issue listed below, refer to the [troubleshooting FAQ](/cloudflare-one/faq/teams-troubleshooting/) or contact Cloudflare support.

## Unable to turn on WARP

If the WARP client is stuck in the `Disconnected` state, this indicates that the client cannot establish a connection to Cloudflare's edge. In your [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs), `daemon.log` will typically show Happy Eyeball errors or connectivity check errors similar to the following:

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

**To diagnose the issue:**
1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. In `daemon.log`:
    1. Find the most recent time the WARP client attempted to connect:
    ```txt
    2023-01-24T20:29:49.262Z  INFO main_loop: warp::warp: Initiate WARP connection
    ```
    2. Review events surrounding the connection event to see if a firewall turned on prior to the connection. For example:
    ```txt
    ?????
    ```
3. In `route.txt`, check if routes to our [client orchestration API IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#client-orchestration-api) show an `en` or `wifi` interface. If you see `utun` or some other adapter, this likely means a third-party firewall is intercepting the connection.
4. Inspect `ps.txt` or `process.txt` for the presence of a third-party firewall product. Examples include ....? If you do not see a third-party firewall, your [ISP or country may be blocking WARP](#your-isp-or-country-is-blocking-warp).

**To resolve the issue:**

Configure your firewall to exempt the [WARP IPs and domains](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).

### A third-party VPN is interfering with WARP

[Running VPNs alongside the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) may interfere with traffic routing or DNS resolution. The most common places we see interference with WARP from these products are:

- **Control of the routing table:** In the default WARP configuration where exclude-split tunnel rules are in place, WARP needs control over the default route. Third-party VPNs need to be set to only include routes to your internal resource.

- **Control of DNS:** WARP must be the last client to touch the primary and secondary DNS server on the default interface. Make sure any DNS setting is disabled in third-party VPNs.

**To diagnose the issue:**

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

**To resolve the issue:**

1. Disable all DNS enforcement on the VPN.
2. On the Zero Trust dashboard, create a [Split Tunnel rule](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) to exclude the VPN server you are connecting to (for example, `vpnserver.3rdpartyvpn.example.com`).
3. On the VPN, configure split tunnel routes so that they do not overlap with the Split Tunnel settings in Zero Trust. For example....?

### Your ISP or country is blocking WARP

Some countries explicitly block the use of VPN or VPN-like software that intentionally encrypts traffic.

**To diagnose the issue:**
Country blocks show up in daemon logs in the same way as a [misconfigured third-party firewall](#a-third-party-firewall-is-blocking-warp). These blocks are often inconsistent and you may sometimes see successful connections.

**To resolve the issue:**
If you suspect your country may be blocking WARP traffic, contact your ISP to verify.

### (Mac/Linux) The device's `/etc/resolv.conf` file has an invalid character

**To diagnose the issue:**

1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. In `daemon.log`, look for an `unrecognized char` warning:
    ```txt
    2022-06-30T12:58:02.618Z  WARN main_loop: warp::warp_service: Tunnel connection experienced error error=Custom { kind: Other, error: ProtoError { kind: Msg("unrecognized char:  ") } }
    ```

**To resolve the issue:**

1. Open the `/etc/resolv.conf` file on your device.
2. In the `search` directives, check for invalid URL characters such as `!@#$%^&*()<>?`.
3. ??
Why would there be an invalid char in the first place? How do you remove it without breaking functionality?

## Turned on WARP and can no longer browse the Internet

If WARP shows as `Connected` but you cannot reach any websites or internal resources, this is likely due to one of the following configuration issues.

### A Gateway firewall policy is blocking all traffic

**To diagnose the issue:**

1. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
2. In `connectivity.txt`, verify Internet connectivity by reviewing the `Outside Tunnel` check. A successful `Outside Tunnel` trace looks something like:
    ```txt
    fl=15f347
    h=engage.cloudflareclient.com
    ip=8.20.123.53
    ts=1648765767.54
    visit_scheme=https
    uag=
    colo=DFW
    http=http/2
    loc=US
    tls=TLSv1.3
    sni=plaintext
    warp=off
    gateway=off
    ```
3. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
4. Disable all DNS, Network, and HTTP policies.
5. Confirm that Internet access is restored.

**To resolve the issue:**

Slowly re-enable your firewall policies. Once you have narrowed down the issue, modify the policies or their [order of enforcement](/cloudflare-one/policies/filtering/order-of-enforcement/).

### The device does not have a root certificate installed

Installing and trusting a [root CA](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) is a necessary step to enable advanced security features such as Browser Isolation, [TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/), AV scanning, and device posture.

**To diagnose the issue:**

You see untrusted certificate warnings on every website. Example warnings include `Certificate not trusted`, `Not trusted identity` or `SSL Error`.

best way to check if the root CA is installed?


**To resolve the issue:**

[Install the root CA](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on all of your devices.

### A third-party security product is interfering with Gateway

WARP does not allow third-party products to perform TLS decryption on traffic sent to Gateway.

**To diagnose the issue:**

1. Go to `https://zero-trust-client.cloudflareclient.com/v0/client_config` and verify the certificate the HTTPS traffic is signed with. If it is not a common root certificate (such as ??????), a third-party product is performing TLS decryption on WARP traffic and re-signing with a certificate that we do not trust.
2. Retrieve [debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs).
3. In `ps.txt` or `process.txt`, check for the presence of a third-party VPN or firewall product.
4. Temporarily uninstall (not disable or disconnect) the third-party product. ????

**To resolve the issue:**

??
In the third-party security product, disable TLS decryption for all traffic included in the WARP Split Tunnel.

## Cannot connect to a specific app or website

### TLS Decryption is enabled and the app or site does certificate pinning

Some applications do not support SSL inspection or are otherwise [incompatible with TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/#limitations).

**To diagnose the issue:**
?

**To resolve the issue:**

Create a Do Not Inspect policy to exclude the application from Gateway inspection. For more information, refer to our documentation on [Do Not Inspect applications](/cloudflare-one/policies/filtering/application-app-types/#do-not-inspect-applications).

### TLS Decryption is enabled and the application has its own private certificate store

In addition to ensuring the root certificate is trusted at the device level, many applications also rely on their own certificate store. Applications like Firefox, Docker, Python, and NPM all rely on their own certificate store and the Cloudflare root certificate must be trusted in each.

**To diagnose the issue:**
?

**To resolve the issue:**

Refer to [our instructions](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) for adding a root certificate to common applications. For applications not on our list, try searching the Internet for `<app-name> proxy support` or `<app-name> proxy certificate`. As a last resort, add the application to a **Do Not Inspect** policy in Gateway.

### A Gateway Network or HTTP policy is blocking the app or site

You may have a Gateway Network or HTTP in place that accidentally blocks a port, IP, or domain that the app or site relies on.

**To diagnose the issue:**

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
2. Disable all Network and HTTP policies.
3. Confirm that access is restored.

**To resolve the issue:**

Slowly re-enable your Network and HTTP policies. Once you have narrowed down the issue, modify the policies or their [order of enforcement](/cloudflare-one/policies/filtering/order-of-enforcement/).

### Split Tunnel settings are misconfigured

Can we be more specific about what "misconfigured" means? Like what should be inside or outside of the tunnel?

An app relies on a route to specific DNS entries, like localhost in order to function (like Apple's AirDrop)

**To diagnose the issue:**
...notes from wiki...
Inspect split tunnel settings and ensure all of the sites traffic is either inside/outside the tunnel.  Have the customer save their custom DNS records for Exclude mode, and then advise the customer to restore the default set of IPs for Exclude mode.  Note here, that any entry you have manually added to the Split Tunnels list will be permanently deleted. The change will take effect immediately.  

**To resolve the issue:**

add the custom DNS entries for Exclude mode
