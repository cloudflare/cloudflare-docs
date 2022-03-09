---
pcx-content-type: reference
title: Ports and IPs
weight: 4
---

# Ports and IPs

Users can implement a positive security model with Cloudflare Tunnel by restricting traffic originating from `cloudflared`. The parameters below can be configured for egress traffic inside of a firewall.

- TCP/UDP port 7844 (for `h2mux`/`http2` and `quic`)
  - IPs are those behind `region1.argotunnel.com` and `region2.argotunnel.com` \*
- TCP port 443 (HTTPS)
  - IPs are those behind `api.cloudflare.com` and `update.cloudflare.com` \*

{{<Aside>}}

Opening port 443 for connections to `update.cloudflare.com` is optional. Failure to do so will prompt a log error, but `cloudflared` will still run correctly.

{{</Aside>}}

Below the output of `dig` commands towards the above hostnames:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">dig</span><span class="CodeBlock--token-plain"> region1.argotunnel.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> ANSWER SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region1.argotunnel.com.	</span><span class="CodeBlock--token-number">86400</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.192.7</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region1.argotunnel.com.	</span><span class="CodeBlock--token-number">86400</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.192.47</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region1.argotunnel.com.	</span><span class="CodeBlock--token-number">86400</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.192.107</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region1.argotunnel.com.	</span><span class="CodeBlock--token-number">86400</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.192.167</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region1.argotunnel.com.	</span><span class="CodeBlock--token-number">86400</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.192.227</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">dig</span><span class="CodeBlock--token-plain"> region2.argotunnel.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> ANSWER SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region2.argotunnel.com.	</span><span class="CodeBlock--token-number">300</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.200.193</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region2.argotunnel.com.	</span><span class="CodeBlock--token-number">300</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.200.233</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region2.argotunnel.com.	</span><span class="CodeBlock--token-number">300</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.200.13</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region2.argotunnel.com.	</span><span class="CodeBlock--token-number">300</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.200.53</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">region2.argotunnel.com.	</span><span class="CodeBlock--token-number">300</span><span class="CodeBlock--token-plain">	IN	A	</span><span class="CodeBlock--token-number">198.41</span><span class="CodeBlock--token-plain">.200.113</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">dig</span><span class="CodeBlock--token-plain"> api.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> ANSWER SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">api.cloudflare.com.     </span><span class="CodeBlock--token-number">41</span><span class="CodeBlock--token-plain">      IN      A       </span><span class="CodeBlock--token-number">104.19</span><span class="CodeBlock--token-plain">.193.29</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">api.cloudflare.com.     </span><span class="CodeBlock--token-number">41</span><span class="CodeBlock--token-plain">      IN      A       </span><span class="CodeBlock--token-number">104.19</span><span class="CodeBlock--token-plain">.192.29</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span></span></span></code></pre>{{</raw>}}

On Windows, you can use PowerShell commands if dig is not available.

To test DNS:

    PS C:\Windows\system32> Resolve-DnsName -Name _origintunneld._tcp.argotunnel.com SRV

    Name                                     Type   TTL   Section    NameTarget                     Priority Weight Port
    ----                                     ----   ---   -------    ----------                     -------- ------ ----
    _origintunneld._tcp.argotunnel.com       SRV    112   Answer     region2.argotunnel.com         2        1      7844
    _origintunneld._tcp.argotunnel.com       SRV    112   Answer     region1.argotunnel.com         1        1      7844

To test ports:

    PS C:\Cloudflared\bin> tnc region1.argotunnel.com -port 443

    ComputerName     : region1.argotunnel.com
    RemoteAddress    : 198.41.192.227
    RemotePort       : 443
    InterfaceAlias   : Ethernet
    SourceAddress    : 10.0.2.15
    TcpTestSucceeded : True

<!---->

    PS C:\Cloudflared\bin> tnc region1.argotunnel.com -port 7844

    ComputerName     : region1.argotunnel.com
    RemoteAddress    : 198.41.192.227
    RemotePort       : 7844
    InterfaceAlias   : Ethernet
    SourceAddress    : 10.0.2.15
    TcpTestSucceeded : True

\* _These IP addresses are unlikely to change but in the event that they do, Cloudflare will update the information here._
