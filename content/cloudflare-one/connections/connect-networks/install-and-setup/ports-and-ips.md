---
pcx_content_type: reference
title: Tunnel with firewall
weight: 3
---

# Tunnel with firewall

Users can implement a positive security model with Cloudflare Tunnel by restricting traffic originating from `cloudflared`. The parameters below can be configured for egress traffic inside of a firewall.

## Destinations and ports

### Global region (default)

| Destination | Port | Protocols |
| ----------- | -------- | --------- |
| `region1.v2.argotunnel.com` | 7844 | TCP/UDP (`http2`/`quic`) |
| `region2.v2.argotunnel.com` | 7844 | TCP/UDP (`http2`/`quic`) |
| `api.cloudflare.com`        | 443  | TCP (HTTPS) |
| `update.argotunnel.com`     | 443  | TCP (HTTPS) |

{{<Aside type="note">}}

Opening port 443 for connections to `update.argotunnel.com` is optional. Failure to do so will prompt a log error, but `cloudflared` will still run correctly.

{{</Aside>}}

### US region

If you set the [`region` parameter](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/arguments/#region) to US, `region1.v2.argotunnel.com` and `region2.v2.argotunnel.com` are replaced with the following:

| Destination | Port | Protocols |
| ----------- | -------- | --------- |
| `us-region1.v2.argotunnel.com` | 7844 | TCP/UDP (`http2`/`quic`) |
| `us-region2.v2.argotunnel.com` | 7844 | TCP/UDP (`http2`/`quic`) |

## Test connectivity with dig

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

```sh
$ dig api.cloudflare.com
...
;; ANSWER SECTION:
api.cloudflare.com.     41      IN      A       104.19.193.29
api.cloudflare.com.     41      IN      A       104.19.192.29
...
```

```sh
$ dig update.argotunnel.com
...
;; ANSWER SECTION:
update.argotunnel.com.	190	IN	A	104.18.32.167
update.argotunnel.com.	190	IN	A	172.64.155.89
...
```

## Test connectivity with PowerShell

On Windows, you can use PowerShell commands if `dig` is not available.

To test DNS:

```bash
PS C:\Windows\system32> Resolve-DnsName -Name _v2-origintunneld._tcp.argotunnel.com SRV

Name                                     Type   TTL   Section    NameTarget                     Priority Weight Port
----                                     ----   ---   -------    ----------                     -------- ------ ----
_v2-origintunneld._tcp.argotunnel.com       SRV    112   Answer     region2.v2.argotunnel.com         2        1      7844
_v2-origintunneld._tcp.argotunnel.com       SRV    112   Answer     region1.v2.argotunnel.com         1        1      7844
```

To test ports:

```bash
PS C:\Cloudflared\bin> tnc region1.v2.argotunnel.com -port 443

ComputerName     : region1.v2.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 443
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True

```

```bash

PS C:\Cloudflared\bin> tnc region1.v2.argotunnel.com -port 7844

ComputerName     : region1.v2.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 7844
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True
```
