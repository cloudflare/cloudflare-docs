---
pcx-content-type: how-to
title: DNS over TLS
weight: 3
---

# DNS over TLS

By default, DNS is sent over a plaintext connection. DNS over TLS (DoT) is a standard for encrypting DNS queries to keep them secure and private. DoT uses the same security protocol, TLS, that HTTPS websites use to encrypt and authenticate communications.

Cloudflare supports DoT on standard port `853` and is compliant with [RFC7858](https://tools.ietf.org/html/rfc7858).

## Configuration

### Obtain your DoT hostname

Each Gateway location has a unique DoT hostname. Locations and corresponding DoT hostnames have policies associated with them.

1. Visit your [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
1. Navigate to the **Locations** page to visualize your location.
1. If you have more than one location set up, you will see a list of all your locations.
1. Expand the location card for the location whose DoT hostname you'd like to retrieve.

![Expand location card](/cloudflare-one/static/documentation/connections/expand-locations-card.png)

1. Get the **DoT hostname** for the location.

In the example below, the DoT hostname is: `9y65g5srsm.cloudflare-gateway.com`.

![Get unique subdomain](/cloudflare-one/static/documentation/connections/get-unique-subdomain.png)

1. Take note of the **DoT hostname**.

### Configure your DoT client

Depending on your operating system, you can choose from a variety of standalone DoT clients.

To configure your DoT client, use the following IP address and hostname:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Hostname: DoT hostname for a chosen location (above this is 9y65g5srsm.cloudflare-gateway.com)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">IP address: 162.159.36.5</span></div></span></span></span></code></pre>{{</raw>}}

Alternatively, stub resolvers (e.g., Unbound) support DoT natively.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># Unbound TLS Config</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">tls-cert-bundle: &quot;/etc/ssl/cert.pem&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"># Forwarding Config</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">forward-zone:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	name: &quot;.&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	forward-tls-upstream: yes</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	forward-addr: 172.64.36.1@853#xxxxxxxxx.cloudflare-gateway.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	forward-addr: 172.64.36.2@853#xxxxxxxxx.cloudflare-gateway.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">	forward-addr: 2a06:98c1:54::xxxx#xxxxxxxxx.cloudflare-gateway.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside>}}
Each location has a unique DoT hostname and IPv6 address. Remember to enter your location's values when applying the config above.
{{</Aside>}}

## Supported TLS versions

Cloudflare's DNS over TLS supports TLS 1.3 and TLS 1.2.
