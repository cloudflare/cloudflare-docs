---
pcx-content-type: reference
title: Additional information
weight: 11
---

# Additional information

## Validation checks

Cloudflare performs a validation check for every request. The Validation component executes prior to all other WAF features like custom rules or Managed Rulesets. The validation check blocks malformed requests like Shellshock attacks and requests with certain attack patterns in their HTTP headers before any allowlist logic occurs. Actions performed by the Validation component appear in the **Activity log** associated with the `Validation` service and without a rule ID. Firewall events downloaded from the API show source as `Validation` and action as `drop` when this behavior occurs.

The following example shows a request blocked by the Validation component due to a malformed `User-Agent` HTTP request header:

![Event from a validation check](/waf/static/analytics-validation.png)

In the downloaded JSON file for the event, the `ruleId` value indicates the detected issue — in this case, it was a Shellshock attack.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;action&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;drop&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row CodeBlock--row-is-highlighted"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;ruleId&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;sanity-shellshock&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;source&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;sanitycheck&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;userAgent&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;() { :;}; printf \\\\\&quot;detection[%s]string\\\\\&quot; \\\\\&quot;TjcLLwVzBtLzvbN\\\\&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">//...</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}

Currently, you cannot disable validation checks. They run early in Cloudflare's infrastructure before the configuration for domains has been loaded.

{{</Aside>}}
