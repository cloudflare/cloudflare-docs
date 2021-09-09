---
order:
pcx-content: reference
---

# Oblivious DNS over HTTPS

Oblivious DNS over HTTPS (or ODoH) is an emerging DNS protocol that separates client IP addresses from their DNS queries. This is done by routing the DNS queries over a proxy, so that the DNS resolver cannot link client IPs with their queries. You can learn more about it in [this blog post](https://blog.cloudflare.com/oblivious-dns/). To follow the progress of ODoH, [check out this IETF draft](https://datatracker.ietf.org/doc/draft-pauly-dprive-oblivious-doh/).

Please note that this protocol and all related implementations are currently **experimental** and subject to change. Use at your own risk.

## Client setup

### Command line tools

Using ODoH with 1.1.1.1 (via odoh.cloudflare-dns.com) is simple. For a quick test, you can use the [odoh-client-rs](https://github.com/cloudflare/odoh-client-rs) and [odoh-client-go](https://github.com/cloudflare/odoh-client-go) tools, which are applications for sending ODoH queries from the terminal. For example, the example below shows how to use the odoh-client-go to send an ODoH query directly to 1.1.1.1 (without a proxy):

```sh
./odoh-client odoh --target odoh.cloudflare-dns.com --domain example.com       
;; opcode: QUERY, status: NOERROR, id: 46957
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;example.com.	IN	 AAAA

;; ANSWER SECTION:
example.com.	72953	IN	AAAA	2606:2800:220:1:248:1893:25c8:1946
```

You can also use this tool to send a query through a proxy with the `--proxy` flag.

### Browser configuration

Firefox Nightly currently supports ODoH. It can be configured with the following `about:config` parameters:

<TableWrap>

Parameters | Description
-----------|------------
`network.trr.odoh.configs_uri` | URI for the ODoH target configuration. e.g., `https://odoh.cloudflare-dns.com/.well-known/odohconfigs`.
`network.trr.odoh.enabled` | Boolean to enable ODoH support, which must be set to true.
`network.trr.odoh.proxy_uri` | URI of the proxy. e.g., `https://example.com/proxy`.
`network.trr.odoh.target_host` | Host of the ODoH target server. e.g., `https://odoh.cloudflare-dns.com`.
`network.trr.odoh.target_path` | Path for the ODoH target queries. e.g., /dns-query

</TableWrap>

Instructions for configuring these parameters can be found on [Mozilla’s website](https://support.mozilla.org/en-US/kb/about-config-editor-firefox). ODoH is not yet currently enabled for other browsers.

### System resolver

If you want to run ODoH on your system, you can use [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy), a client DNS proxy that supports ODoH and other encrypted DNS protocols. Installation and configuration instructions may be found [in GitHub](https://github.com/dnscrypt/dnscrypt-proxy/wiki/installation). A sample dnscrypt-proxy configuration file that uses ODoH is as follows:

```txt
server_names = ['odohtarget', 'odohrelay']
 
[static.'odohtarget']
stamp = 'sdns://BQcAAAAAAAAAF29kb2guY2xvdWRmbGFyZS1kbnMuY29tCi9kbnMtcXVlcnk'
 
[static.'odohrelay']
stamp = 'sdns://<stamp-of-relay-here>'
 
[anonymized_dns]
routes = [
    { server_name='odohtarget', via=['odohrelay'] }
]
```

You may encode the `odohrelay` stamp using [this online DNS stamp calculator](https://dnscrypt.info/stamps). The relay must specify the URI for proxying ODoH requests, including the scheme, host (and port, if applicable), and path.  

Decoding the `odohtarget` stamp above using [the online DNS stamp calculator](https://dnscrypt.info/stamps) yields `https://odoh.cloudflare-dns.com/dns-query` as the target URI.

## Application integration

If you’re an application developer and want to integrate ODoH into your app, you can do so using any of the following core protocol libraries:

* [odoh-rs](https://github.com/cloudflare/odoh-rs) (Rust)
* [odoh-go](https://github.com/cloudflare/odoh-go) (Go)

There are currently no known libraries in Swift or Java.

## Server setup instructions

Running an ODoH server — either a proxy or target - is more involved. A turnkey proxy and target is available in [odoh-server-go](https://github.com/cloudflare/odoh-server-go), a sample server that can be used to run a proxy or a target for ODoH. Up to date deployment instructions on a variety of platforms, including bare metals, are available in the [project’s README](https://github.com/cloudflare/odoh-server-go#deployment).

Dedicated ODoH target is also available in [doh-server](https://github.com/jedisct1/doh-server), a fast and secure DoH (DNS-over-HTTPS) and ODoH (Oblivious DoH) server. Similarly, installation and deployment instructions can be found in the [project’s README](https://github.com/jedisct1/doh-server).