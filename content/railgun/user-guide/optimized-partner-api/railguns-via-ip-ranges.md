---
pcx-content-type: configuration
title: Railguns via IP ranges
weight: 19
---

# Railguns via IP ranges

It is possible to make a Railgun available to domains via IP ranges. This can be done by setting one or more IP range(s) that a Railgun will use. Once the Railgun IP Range(s) have been set, any domains that have origin IP(s) that fall within a Railgun’s IP Range(s) will have the ability to select and enable the Railgun.

## POST ipr\_set

`POST /api/v2/railgun/ipr_set`

Set the IP range(s) for a Railgun. This will expose the railgun to domains whose origin IP(s) are contained within the Railgun’s IP range.

The `ipr` holds IPv4 or IPv6 host addresses, and optionally their subnet, all in one field. The subnet is represented by the number of network address bits present in the host address (the “netmask”). If the netmask is 32 AND the address is IPv4, then the value does not indicate a subnet, only a single host. In IPv6, the address length is 128 bits, so 128 bits specify a unique host address.

The input format for this type is address/y where address is an IPv4 or IPv6 address and y is the number of bits in the netmask. If the /y portion is missing, the netmask is 32 for IPv4 and 128 for IPv6, so the value represents just a single host. On display, the /y portion is suppressed if the netmask specifies a single host.

For internal reasons, Cloudflare restricts the netmask range of 8 < netmask < 32 for IPv4 and 112 < netmask < 128 for IPv6.

### Form parameters

*   **rtkn** – Railgun token
*   **ipr** – One or more Railgun IP addresses/ranges. Use JSON array format.

<details>
<summary>Example request</summary>
<div>
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">POST /api/v2/railgun/ipr_set HTTP/1.1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Host: www.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Accept: */*</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Content-Type: application/x-www-form-urlencoded</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Example form parameters:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rtkn=7h8i9j0k1l2m3n4o5p6q7r8id9h0j1l</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">ipr=[&quot;203.0.0.0/8&quot;,&quot;208.0.0.0/8&quot;,&quot;207.0.0.7&quot;,&quot;BE81::02C3:B44F:FE1E:8329/112&quot;]</span></div></span></span></span></code></pre>{{</raw>}}

</div>
</details>

<details>
<summary>Example response</summary>
<div>
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">HTTP/</span><span class="CodeBlock--token-number">1.1</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">200</span><span class="CodeBlock--token-plain"> OK</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Content-Type</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> application/json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     </span><span class="CodeBlock--token-property">&quot;msg&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     </span><span class="CodeBlock--token-property">&quot;response&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        </span><span class="CodeBlock--token-property">&quot;act&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;railgun_ipr_set&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">        </span><span class="CodeBlock--token-property">&quot;railgun_id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;1079&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;result&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;success&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

</div>
</details>
