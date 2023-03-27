---
pcx_content_type: reference
title: Common issues
weight: 1
---

# Common issues

This section covers the most common issues you might encounter as you deploy the WARP client in your organization, or turn on new features that interact with the client. If you do not see your issue listed below, refer to the [troubleshooting FAQ](/cloudflare-one/faq/teams-troubleshooting/) or contact Cloudflare support.

## Unable to turn on WARP

If WARP is stuck in the `Disconnected` state or frequently changes between `Connected` and `Disconnected`, this indicates that the client cannot establish a connection to Cloudflare's global network.

<div class="medium-img">

![Example of WARP client UI when unable to turn on WARP](/cloudflare-one/static/documentation/connections/warp-stuck-on-disconnected.png)

</div>

In your [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs), `daemon.log` will typically show one or more of the following errors:

- Happy Eyeball checks failing:
    ```txt
    ERROR main_loop: warp::warp::happy_eyeballs: Happy eyeballs error Custom { kind: NotConnected, error: "All Happy Eyeballs checks failed" }
    ```
- Many other checks timing out:
    ```txt
    ERROR warp::warp::connectivity_check: DNS check failed error=ResolveError { kind: Timeout }
    WARN warp::warp::connectivity_check: Tunnel trace failed request::Error { kind: Request, url: Url { scheme: "https", cannot_be_a_base: false, username: "", password: None, host: Some(Domain("connectivity.cloudflareclient.com")), port: None, path: "/cdn-cgi/trace", query: None, fragment: None }, source: TimedOut }
    ```

Here are the most common reasons why this issue occurs:

### A third-party service is blocking WARP

A third-party service (such as a hardware or software firewall, router, MDM/group policy configuration, or other networking interface) may have a security policy in place which blocks WARP from connecting. 

#### Solution

Configure the third-party service to exempt the [IP addresses required by WARP](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).

### A third-party VPN is interfering with WARP

The most common places we see interference with WARP from VPNs are:

- **Control of traffic routing:** In `daemon.log`, you will see a large number of routing table changes. For example,
    ```txt
    DEBUG warp::warp_service: Routes changed:
        Added; Interface: 8; Destination: 10.133.27.201/32; Next hop: 100.64.0.2; 
        Added; Interface: 8; Destination: 10.133.27.202/32; Next hop: 100.64.0.2; 
    DEBUG warp::warp_service: Routes changed:
        Added; Interface: 8; Destination: 10.133.27.203/32; Next hop: 100.64.0.2; 
        Added; Interface: 8; Destination: 10.133.27.204/32; Next hop: 100.64.0.2; 
    DEBUG warp::warp_service: Routes changed:
        Added; Interface: 8; Destination: 10.133.27.205/32; Next hop: 100.64.0.2;
    ```
    This indicates that a third-party VPN is fighting WARP for control over the routing table.

- **Control of DNS:** In `daemon.log`, you will see a large number of DNS changes followed by this warning:

    ```txt
    WARN main_loop: warp::warp_service: Reinforcing DNS settings. Is something else fighting us?
    ```

    The daemon may also note that some other process has already bound to the UDP and TCP sockets:

    ```txt
    WARN warp::warp: Unable to bind local UDP socket error=Os { code: 48, kind: AddrInUse, message: "Address already in use" } sockaddr=127.0.2.2:53
    WARN warp::warp: Unable to bind local TCP socket error=Os { code: 48, kind: AddrInUse, message: "Address already in use" } sockaddr=127.0.2.2:53
    ```

To confirm that the VPN is the source of the issue, temporarily uninstall (not disable or disconnect) the VPN.

#### Solution

1. Disable all DNS enforcement on the VPN. WARP must be the last client to touch the primary and secondary DNS server on the default interface.
2. On the Zero Trust dashboard, create a [Split Tunnel rule](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) to exclude the VPN server you are connecting to (for example, `vpnserver.3rdpartyvpn.example.com`).
3. Configure your VPN to only include routes to your internal resources. Make sure that the VPN routes do not overlap with the routes [included in the WARP tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/).

For more information, refer to our [guide](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) for running VPNs alongside the WARP client.

### Your ISP or country is blocking WARP

Some countries explicitly block the use of VPN or VPN-like software that intentionally encrypts traffic. These blocks are often inconsistently enforced and you may sometimes see successful connections.

If you suspect your country may be blocking WARP traffic, contact your ISP to verify.

### (Mac/Linux) The device's `/etc/resolv.conf` file has an invalid character

WARP cannot parse `resolv.conf` files which contain an invalid hostname. In `daemon.log`, you will see an `unrecognized char` warning:

```txt
WARN main_loop: warp::warp_service: Tunnel connection experienced error error=Custom { kind: Other, error: ProtoError { kind: Msg("unrecognized char:  ") } }
```

#### Solution

1. Open the `/etc/resolv.conf` file on your device.
2. In the `search` directives, check for invalid URL characters such as `!@#$%^&*()<>?`.
3. Remove the invalid lines and rely on WARP and Gateway for DNS services.

## Turned on WARP and can no longer browse the Internet

If WARP shows as `Connected` but you cannot reach any websites or internal resources, this is likely due to one of the following configuration issues.

### A Gateway firewall policy is blocking traffic

A misconfigured Gateway firewall policy can result in traffic to some or all sites being restricted.

#### Solution

{{<render file="gateway/_debugging-policies.md">}}

### The device does not have a root certificate installed

Installing and trusting a [root CA](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) is a necessary step to enable advanced security features such as Browser Isolation, [TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/), AV scanning, and device posture.

If the root CA is not installed on the device, you will see untrusted certificate warnings on every website. Example warnings include `Certificate not trusted`, `Not trusted identity` or `SSL Error`.

#### Solution

[Install the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/) on all of your devices, or [upload your own certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) to Cloudflare.

{{<Aside type="note">}}

More and more applications (including browsers) are relying on their own certificate stores. In addition to ensuring the root certificate is trusted at the device level, you may also need to [add the certificate to individual applications](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications). For example, to use Firefox on Linux, you must install the certificate on both the system and on Firefox.

{{</Aside>}}

### A third-party security product is interfering with Gateway

WARP does not allow third-party DLP or proxy services to perform TLS decryption on traffic sent to Gateway.

To diagnose the issue, go to `https://zero-trust-client.cloudflareclient.com/v0/client_config` and verify the certificate the HTTPS traffic is signed with. If the certificate is issued by your organization or a third-party service, the third-party service is performing TLS decryption on WARP traffic and re-signing with a certificate that we do not trust.

#### Solution

In the third-party security product, disable HTTPS inspection and TLS decryption for the [WARP IP addresses](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).

## Cannot connect to a specific app or website

Below are the most common reasons why turning on WARP blocks a specific application from loading.

### TLS Decryption is enabled and the app or site does certificate pinning

Some applications do not support SSL inspection or are otherwise [incompatible with TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/#limitations). Gateway provides a [list of applications known to perform certificate pinning](/cloudflare-one/policies/filtering/application-app-types/#do-not-inspect-applications).

#### Solution (if the app has a private certificate store)

Applications such as Firefox, Docker, Python, and NPM rely on their own certificate store and the Cloudflare root certificate must be trusted in each.

Refer to [our instructions](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) for adding the root certificate to common applications. For applications not on our list, try searching the Internet for `<app-name> proxy support` or `<app-name> proxy certificate`.

#### Solution (last resort)

If you cannot install the certificate on the application, create a [Do Not Inspect policy](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) to exclude the application from Gateway inspection.

### A Gateway firewall policy is blocking the app or site

You may have a Gateway DNS, Network, or HTTP in place that accidentally blocks a port, IP, or domain that the app or site relies on.

#### Solution

{{<render file="gateway/_debugging-policies.md">}}

### Split Tunnel settings are misconfigured for the app or site

Some applications require traffic to flow either all inside or all outside of the WARP tunnel. For instance, in order to use Airdrop or communicate with a local printer, traffic must be outside the tunnel. For applications like Microsoft Teams to function properly, all Microsoft Teams traffic must be either fully inside the tunnel or fully outside the tunnel.

#### Solution

1. Determine the IP addresses and/or domains required for your application to function. Common Internet search terms include `<app-name> split tunnel list`, `<app-name> allow list`, or `<app-name> firewall ips`.
2. In the Zero Trust dashboard, go to your [Split Tunnel settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/).  
3. Depending on the application, either include or exclude all of the necessary IPs and/or domains. For Microsoft applications, we provide a [one-click action](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#directly-route-office-365-traffic) to exclude all Office 365 IPs.
