---
pcx_content_type: reference
title: Tunnel with firewall
weight: 1
---

# Tunnel with firewall

You can implement a positive security model with Cloudflare Tunnel by blocking all ingress traffic and allowing only egress traffic from `cloudflared`. Only the services specified in your tunnel configuration will be exposed to the outside world.

## Ports

The parameters below can be configured for egress traffic inside of a firewall.

### Required for tunnel operation

`cloudflared` connects to Cloudflare's global network on port `7844`. To use Cloudflare Tunnel, your firewall must allow outbound connections to the following destinations on port `7844` (via UDP if using the `quic` protocol or TCP if using the `http2` protocol).

{{<table-wrap style="font-size: 85%">}}
| Domain | IPv4 | IPv6 | Port    | Protocols |
| ----------- | -----| -----|-------- | --------- |
| `region1.v2.argotunnel.com` | `198.41.192.167`<br> `198.41.192.67`<br> `198.41.192.57`<br> `198.41.192.107`<br> `198.41.192.27`<br> `198.41.192.7`<br> `198.41.192.227`<br> `198.41.192.47`<br> `198.41.192.37`<br> `198.41.192.77` |`2606:4700:a0::1`<br> `2606:4700:a0::2`<br> `2606:4700:a0::3`<br> `2606:4700:a0::4`<br> `2606:4700:a0::5`<br> `2606:4700:a0::6`<br> `2606:4700:a0::7`<br> `2606:4700:a0::8`<br> `2606:4700:a0::9`<br> `2606:4700:a0::10` | 7844 | TCP/UDP (`http2`/`quic`) |
| `region2.v2.argotunnel.com` | `198.41.200.13`<br> `198.41.200.193`<br> `198.41.200.33`<br> `198.41.200.233`<br> `198.41.200.53`<br> `198.41.200.63`<br> `198.41.200.113`<br> `198.41.200.73`<br> `198.41.200.43`<br> `198.41.200.23`|`2606:4700:a8::1`<br> `2606:4700:a8::2`<br> `2606:4700:a8::3`<br> `2606:4700:a8::4`<br> `2606:4700:a8::5`<br> `2606:4700:a8::6`<br> `2606:4700:a8::7`<br> `2606:4700:a8::8`<br> `2606:4700:a8::9`<br> `2606:4700:a8::10`| 7844 | TCP/UDP (`http2`/`quic`) |
| `cftunnel.com`<sup>1</sup> | Not applicable | Not applicable  | 7844 | TCP/UDP (`http2`/`quic`) |
| `h2.cftunnel.com`<sup>1</sup> | Not applicable  | Not applicable | 7844 | TCP (`http2`) |
| `quic.cftunnel.com`<sup>1</sup> | Not applicable |Not applicable |7844 | UDP (`quic`) |

{{</table-wrap>}}

<sup>1</sup> This rule is only required for firewalls that enforce SNI.

### Optional

Opening port 443 enables some optional features. Failure to allow these connections may prompt a log error, but `cloudflared` will still run correctly.

{{<table-wrap style="font-size: 85%">}}

| Domain | IPv4 | IPv6 | Port    | Protocols |  Description |
| ----------- | -----| -----|-------- | --------- | ------- |
| `api.cloudflare.com` | `104.19.192.29` <br> `104.19.192.177` <br>`104.19.192.175` <br> `104.19.193.29` <br> `104.19.192.174` <br> `104.19.192.176`| `2606:4700:300a::6813:c0af` <br> `2606:4700:300a::6813:c01d` <br> `2606:4700:300a::6813:c0ae` <br> `2606:4700:300a::6813:c11d` <br> `2606:4700:300a::6813:c0b0` <br> `2606:4700:300a::6813:c0b1`| 443  | TCP (HTTPS) | Allows `cloudflared` to query if software updates are available. |
| `update.argotunnel.com`  |`104.18.25.129` <br> `104.18.24.129` | `2606:4700::6812:1881` <br> `2606:4700::6812:1981` | 443  | TCP (HTTPS) | Allows `cloudflared` to query if software updates are available. |
| `github.com`     | [GitHub's IP addresses](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses) | [GitHub's IP addresses](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses)  | 443  | TCP (HTTPS) | Allows `cloudflared` to download the latest release and perform a software update. |
| `<your-team-name>.`<br>`cloudflareaccess.com` | `104.19.194.29` <br>  `104.19.195.29`| `2606:4700:300a::6813:c31d` <br> `2606:4700:300a::6813:c21d` | 443 | TCP (HTTPS) | Allows `cloudflared` to validate the Access JWT.  Only required if the [`access`](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/#access) setting is enabled. |
| `pqtunnels.`<br>`cloudflareresearch.com` |`104.18.4.64` <br> `104.18.5.64`| `2606:4700::6812:540` <br> `2606:4700::6812:440` | 443 | TCP (HTTPS) | Allows `cloudflared` to report [post-quantum key exchange](https://blog.cloudflare.com/post-quantum-tunnel/) errors to Cloudflare. |

{{</table-wrap>}}

## Firewall configuration

### Cloud VM firewall

If you host your services on a Virtual Machine (VM) instance by a Cloud provider such as Google Cloud Platform (GCP), you may set up instance-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, on GCP, you may delete all ingress rules, leaving only the relevant egress rules. This is because GCP's firewall defaults to “Block” unless a rule explicitly allows certain traffic.

### OS firewall

Alternatively, you may also use operating system (OS)-level firewall rules to disallow all ingress traffic and allow only egress traffic. For example, if your server runs on Linux, you may use `iptables` to set up firewall rules. Most Linux distributions are pre-installed with `iptables`. Note that in the example below, not all ingress traffic is blocked, just in case that the server is hosted on the Cloud and there would be no way to SSH back into the system again if the settings were configured wrongly.

1. Check your current firewall rules.

    ```sh
    $ sudo iptables -L
    ```

1. Allow `localhost` to communicate with itself.

    ```sh
    $ sudo iptables -A INPUT -i lo -j ACCEPT
    ```

1. Allow already established connection and related traffic.

    ```sh
    $ sudo iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
    ```

1. Allow new SSH connections.

    ```sh
    $ sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
    ```

1. Drop all other ingress traffic.

    {{<Aside type="warning" header="Warning">}}
Be very careful with the following command. If you did not preserve the current SSH connection or allow new SSH connections, you would be logged out and unable to SSH back into the system again.
    {{</Aside>}}

    ```sh
    $ sudo iptables -A INPUT -j DROP
    ```

1. After setting the firewall rules, use this command to check the current `iptables` settings:

    ```sh
    $ sudo iptables -L
    ```

Run your tunnel and check that all configured services are still accessible to the outside world via the tunnel, but not via the external IP address of the server.

You can also:

- [Secure your application with Cloudflare Access](/cloudflare-one/applications/configure-apps/self-hosted-apps/)

## Test connectivity

### Test with dig

To test your connectivity to Cloudflare, you can use the `dig` command to query the hostnames listed above. Note that `cloudflared` defaults to connecting with IPv4.

```sh
$ dig A region1.v2.argotunnel.com
...
;; ANSWER SECTION:
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.167
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.67
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.57
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.107
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.27
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.7
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.227
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.47
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.37
region1.v2.argotunnel.com. 86400 IN	A	198.41.192.77
...
```

```sh
$ dig AAAA region1.v2.argotunnel.com
...
;; ANSWER SECTION:
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::1
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::2
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::3
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::4
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::5
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::6
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::7
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::8
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::9
region1.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a0::10
...
```

```sh
$ dig A region2.v2.argotunnel.com
...
;; ANSWER SECTION:
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.13
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.193
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.33
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.233
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.53
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.63
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.113
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.73
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.43
region2.v2.argotunnel.com. 86400 IN	A	198.41.200.23
...
```

```sh
$ dig AAAA region2.v2.argotunnel.com
...
;; ANSWER SECTION:
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::1
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::2
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::3
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::4
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::5
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::6
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::7
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::8
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::9
region2.v2.argotunnel.com. 86400 IN	AAAA	2606:4700:a8::10
...
```

### Test with PowerShell

On Windows, you can use PowerShell commands if `dig` is not available.

To test DNS:

```powershell
PS C:\Windows\system32> Resolve-DnsName -Name _v2-origintunneld._tcp.argotunnel.com SRV

Name                                     Type   TTL   Section    NameTarget                     Priority Weight Port
----                                     ----   ---   -------    ----------                     -------- ------ ----
_v2-origintunneld._tcp.argotunnel.com       SRV    112   Answer     region2.v2.argotunnel.com         2        1      7844
_v2-origintunneld._tcp.argotunnel.com       SRV    112   Answer     region1.v2.argotunnel.com         1        1      7844
```

To test ports:

```powershell
PS C:\Cloudflared\bin> tnc region1.v2.argotunnel.com -port 443

ComputerName     : region1.v2.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 443
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True
```

```powershell
PS C:\Cloudflared\bin> tnc region1.v2.argotunnel.com -port 7844

ComputerName     : region1.v2.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 7844
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True
```
