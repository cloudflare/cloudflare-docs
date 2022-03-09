---
pcx-content-type: concept
title: Custom metadata
weight: 2
---

# Custom metadata

You may wish to configure per-hostname (customer) settings beyond the scale of Page Rules or Rate Limiting, which have a maximum of 125 rules each.

To do this, you will first need to reach out to your account team to enable access to [Cloudflare Workers](/workers/) and Custom Metadata. Once you have access, you may use Cloudflare Workers to define per-hostname behavior by reading the metadata JSON from the Worker.

{{<render file="_ssl-for-saas-plan-limitation.md">}}

---

## Examples

- Per-customer URL rewriting, e.g., customers 1-10,000 fetch assets from server A, 10,001-20,000 from server B, etc.
- Adding custom headers, e.g., `X-Customer-ID : $number` based on the metadata provided to us
- Setting HTTP Strict Transport Security (“HSTS”) headers on a per-customer basis

Please speak with your Solutions Engineer to discuss additional logic and requirements.

## Submitting custom metadata

You may add custom metadata to Cloudflare via the Custom Hostnames API. This data can be added via a PATCH request to the specific hostname ID to set metadata for that hostname, for example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -sXPATCH </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/{zone_id} /custom_hostnames/{hostname_id}&quot;</span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: {email}&quot;</span><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: {key}&quot;</span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;Content-Type: application/json&quot;</span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -d </span><span class="CodeBlock--token-string">'{&quot;ssl&quot;:{&quot;method&quot;:&quot;http&quot;,&quot;type&quot;:&quot;dv&quot;},&quot;custom_metadata&quot;:{&quot;customer_id&quot;:&quot;12345&quot;,&quot;redirect_to_https&quot;: true}}'</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Changes to metadata will propagate across Cloudflare’s edge within 30 seconds. Note that this metadata requires a Cloudflare Worker to be deployed before it will be consumed.

---

## Accessing custom metadata from a Cloudflare Worker

The metadata object will be accessible on each request using the request.cf.hostMetadata property. You can then read the data, and customize any behavior on it using the Worker.

In the example below we will user_id in the Worker that was submitted using the API call above `"custom_metadata":{"customer_id":"12345","redirect_to_https": true}}`, and set a request header to send the `customer_id` to the origin:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">fetchAndAddHeader</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">/**</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"> * Fetch and add a X-Customer-Id header to the origin based on hostname</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"> * @param {Request} request</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"> */</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetchAndAddHeader</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> customer_id </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">cf</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">hostMetadata</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">customer_id</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> newHeaders </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Headers</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  newHeaders</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">append</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'X-Customer-Id'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> customer_id</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> init </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-literal-property">headers</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> newHeaders</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-literal-property">method</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">method</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> response </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">url</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> init</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> response</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

---

## Best practices

- Ensure that the JSON schema used is fixed: changes to the schema without corresponding Cloudflare Workers changes will potentially break websites, or fall back to any defined “default” behavior
- Be sure to send the ‘ssl’ section as well, or else SSL will be PATCHED to null, and SSL will not terminate properly for this hostname
- Prefer a flat JSON structure
- Use string keys in snake_case (rather than camelCase or PascalCase)
- Use proper booleans (true/false rather than `true` or `1` or `0`)
- Use numbers to represent integers instead of strings (`1` or `2` instead of `"1"` or `"2"`)
- Define fallback behaviour in the non-presence of metadata
- Define fallback behaviour if a key or value in the metadata are unknown

General guidance is to follow [Google’s JSON Style guide](https://google.github.io/styleguide/jsoncstyleguide.xml) where appropriate.

---

## Limitations

There are some limitations to the metadata that can be provided to Cloudflare:

- It must be valid JSON
- Any origin resolution, e.g., directing requests for a given hostname to a specific backend—must be provided as a hostname that exists within Cloudflare’s DNS (even for non-authoritative setups). Providing an IP address directly will cause requests to error.
- The total payload must not exceed 4 kilobytes
- It requires a Cloudflare Worker that knows how to process the schema and trigger logic based on the contents.
- Custom metadata cannot be set on custom hostnames that contain wildcards

You should not modify the schema—which includes adding/removing keys or changing possible values—without notifying Cloudflare. Changing the shape of the data will typically cause the Cloudflare Worker to either ignore the data or return an error for requests that trigger it.
