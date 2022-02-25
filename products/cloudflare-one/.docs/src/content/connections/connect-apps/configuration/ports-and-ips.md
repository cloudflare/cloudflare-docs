---
order: 3
pcx-content-type: reference
---

# Ports and IPs

Users can implement a positive security model with Cloudflare Tunnel by restricting traffic originating from `cloudflared`. The parameters below can be configured for egress traffic inside of a firewall.

* TCP/UDP port 7844 (for `h2mux`/`http2` and `quic`)
    * IPs are those behind `region1.argotunnel.com` and `region2.argotunnel.com` \*
* TCP port 443 (HTTPS)
    * IPs are those behind `api.cloudflare.com` and `update.cloudflare.com` \*

<Aside>

Opening port 443 for connections to `update.cloudflare.com` is optional. Failure to do so will prompt a log error, but `cloudflared` will still run correctly.

</Aside>

Below the output of `dig` commands towards the above hostnames:


```bash
$ dig region1.argotunnel.com
...
;; ANSWER SECTION:
region1.argotunnel.com.	86400	IN	A	198.41.192.7
region1.argotunnel.com.	86400	IN	A	198.41.192.47
region1.argotunnel.com.	86400	IN	A	198.41.192.107
region1.argotunnel.com.	86400	IN	A	198.41.192.167
region1.argotunnel.com.	86400	IN	A	198.41.192.227
...
```

```bash
$ dig region2.argotunnel.com
...
;; ANSWER SECTION:
region2.argotunnel.com.	300	IN	A	198.41.200.193
region2.argotunnel.com.	300	IN	A	198.41.200.233
region2.argotunnel.com.	300	IN	A	198.41.200.13
region2.argotunnel.com.	300	IN	A	198.41.200.53
region2.argotunnel.com.	300	IN	A	198.41.200.113
...
```

```bash
$ dig api.cloudflare.com
...
;; ANSWER SECTION:
api.cloudflare.com.     41      IN      A       104.19.193.29
api.cloudflare.com.     41      IN      A       104.19.192.29
...
```

On Windows, you can use PowerShell commands if dig is not available.

To test DNS:

```
PS C:\Windows\system32> Resolve-DnsName -Name _origintunneld._tcp.argotunnel.com SRV

Name                                     Type   TTL   Section    NameTarget                     Priority Weight Port
----                                     ----   ---   -------    ----------                     -------- ------ ----
_origintunneld._tcp.argotunnel.com       SRV    112   Answer     region2.argotunnel.com         2        1      7844
_origintunneld._tcp.argotunnel.com       SRV    112   Answer     region1.argotunnel.com         1        1      7844
```

To test ports:

```
PS C:\Cloudflared\bin> tnc region1.argotunnel.com -port 443

ComputerName     : region1.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 443
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True
```

```
PS C:\Cloudflared\bin> tnc region1.argotunnel.com -port 7844

ComputerName     : region1.argotunnel.com
RemoteAddress    : 198.41.192.227
RemotePort       : 7844
InterfaceAlias   : Ethernet
SourceAddress    : 10.0.2.15
TcpTestSucceeded : True
```

\* *These IP addresses are unlikely to change but in the event that they do, Cloudflare will update the information here.*
