---
weight: 0
pcx-content-type: tutorial
title: DNS over Tor
---

# DNS over Tor

{{<Aside type="warning">}}

The hidden resolver is still an experimental service and should not be used in production or for other critical uses.

{{</Aside>}}

If you do not want to disclose your IP address to the resolver, you can use our Tor onion service. Resolving DNS queries through the Tor network guarantees a significantly higher level of anonymity than making the requests directly. Not only does doing so prevent the resolver from ever seeing your IP address, but it also prevents your ISP from knowing that you attempted to resolve a domain name.

Read more about this service in [this blog post](https://blog.cloudflare.com/welcome-hidden-resolver/).

## Setting up a Tor client

The important difference between using all other modes of DNS and this one is that packet routing no longer uses IP addresses, and therefore all connections must be routed through a Tor client.

Before you start, head to the [Tor Project website](https://www.torproject.org/download/download.html.en) to download and install a Tor client. If you use the Tor Browser, it will automatically start a [SOCKS proxy](https://en.wikipedia.org/wiki/SOCKS) at `127.0.0.1:9150`.

If you use Tor from the command line, create the following configuration file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ SOCKSPort 9150</span></div></span></span></span></code></pre>{{</raw>}}

Then you can run tor with:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">tor -f tor.conf</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Also, if you use the Tor Browser, you can head to the resolver's address to see the usual 1.1.1.1 page:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note" header="Note">}}

The HTTPS certificate indicator should say "Cloudflare, Inc. (US)."

{{</Aside>}}

If you ever forget 1.1.1.1's address, use cURL to retrieve it:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl -sI https://tor.cloudflare-dns.com | grep -i alt-svc</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">alt-svc: h2=&quot;dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443&quot;; ma=315360000; persist=1</span></div></span></span></span></code></pre>{{</raw>}}

## Setting up a local DNS proxy using socat

Of course, not all DNS clients support connecting to the Tor client, so the easiest way to connect any DNS-speaking software to the hidden resolver is by forwarding ports locally, for instance [using `socat`](http://www.dest-unreach.org/socat/).

### DNS over TCP, TLS, and HTTPS

The hidden resolver is set up to listen on TCP ports 53 and 853 for DNS over TCP and TLS. After setting up a Tor proxy, run the following `socat` command as a privileged user, replacing the port number appropriately:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">PORT=853; socat TCP4-LISTEN:${PORT},reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:${PORT},socksport=9150</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

From here, you can follow the regular guide for [setting up 1.1.1.1](/1.1.1.1/setup/), except you should always use `127.0.0.1` instead of `1.1.1.1`. If you need to access the proxy from another device, simply replace `127.0.0.1` in `socat` commands with your local IP address.

### DNS over UDP

Note that the Tor network does not support UDP connections, which is why some hacking is needed. If your client only supports UDP connections, the solution is to encapsulate packets to port `UDP:53` on localhost as TCP packets, using the following `socat` command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">socat UDP4-LISTEN:53,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:253,socksport=9150</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### DNS over HTTPS

[As explained in the blog post](https://blog.cloudflare.com/welcome-hidden-resolver/), our favorite way of using the hidden resolver is using DNS over HTTPS (DoH). To set it up:

1. Download `cloudflared` by following the guide for [connecting to 1.1.1.1 using DNS over HTTPS clients](/1.1.1.1/encryption/dns-over-https/dns-over-https-client/).

2. Start a Tor SOCKS proxy and use `socat` to forward port TCP:443 to localhost:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">socat TCP4-LISTEN:443,reuseaddr,fork SOCKS4A:127.0.0.1:dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion:443,socksport=9150</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

3. Instruct your machine to treat the `.onion` address as localhost:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">cat</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">&lt&lt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">EOF</span><span class="CodeBlock--token-string CodeBlock--token-bash CodeBlock--token-punctuation"> </span><span class="CodeBlock--token-string CodeBlock--token-bash CodeBlock--token-punctuation CodeBlock--token-operator">&gt&gt</span><span class="CodeBlock--token-string CodeBlock--token-bash CodeBlock--token-punctuation"> /etc/hosts</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-string">127.0.0.1 dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-string">EOF</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4. Finally, start a local DNS over UDP daemon:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared proxy-dns --upstream &quot;https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">INFO[0000] Adding DNS upstream                           url=&quot;https://dns4torpnlfs2ifuz2s2yf3fc7rdmsbhm6rw75euj35pac6ap25zgqad.onion/dns-query&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">INFO[0000] Starting DNS over HTTPS proxy server          addr=&quot;dns://localhost:53&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">INFO[0000] Starting metrics server                       addr=&quot;127.0.0.1:35659&quot;</span></div></span></span></span></code></pre>{{</raw>}}