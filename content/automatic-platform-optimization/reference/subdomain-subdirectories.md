---
title: Subdomains and subdirectories
pcx-content-type: how-to
weight: 14
---

# Subdomains and subdirectories

## Run APO on a subdomain

After you enable APO, you configure it to run on the subdomain that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdomain running WordPress called `shop.mysite.com`, you would configure APO to run on the `shop.mysite.com` subdomain.

1.  Install version 4.4.0 or later of the Cloudflare WordPress plugin.
2.  Log in using Cloudflare **API token** or **Global key**.
3.  Enable APO. The subdomain displays in the list of hostnames in the card.
4.  Repeat the process for each subdomain to enable APO.

By default, APO runs on the root domain. If you choose to run APO on a subdomain, the root domain is automatically disabled. To run APO on a subdomain and root domain, upgrade the WordPress plugin to version 4.4.0 or later on the root domain and re-enable APO.

## Run APO on a subdirectory

After you enable APO, you configure it to run on the subdirectory that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdirectory running WordPress called `mysite.com/shop`, you would configure APO to run on the `mysite.com` domain.

1.  Install the Cloudflare WordPress plugin.
2.  Add your Cloudflare API Token.
3.  Activate APO.

Repeat steps 1 and 2 for each subdirectory to activate the WordPress plugin for automatic cache purging.

## Run APO only on a subdirectory

If you choose to run APO only on a subdirectory, the rest of the domain should be configured to bypass APO. You can bypass APO in one of two ways.

### Use the `cf-edge-cache` response header

The `cf-edge-cache: no-cache` instructs the APO service to bypass caching for non-WordPress parts of the site. You can implement this option with Cloudflare Workers using the example below.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">handleRequest</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">handleRequest</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">/**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">   * Response properties are immutable. To change them, construct a new</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">   * Response object. Response headers can be modified through the headers `set` method.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">   */</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> originalResponse </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> response </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Response</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">originalResponse</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">body</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> originalResponse</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// Add a header using set method</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  response</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">set</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'cf-edge-cache'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'no-cache'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> response</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Use Page Rules

Use Page Rules to exclude non-WordPress portions of the site from caching using **Cache Level: Bypass**. This option disables all caching, including static assets for those paths. As a result, we recommend disabling APO via the response header.
