---
pcx-content-type: reference
title: Delete variants
weight: 8
---

# Delete variants

You can delete variants via the Images dashboard or via API.

{{<Aside type="warning" header="Warning">}}

Deleting a variant is a global action that will affect other images that contain that variant.

{{</Aside>}}

## Delete a variant using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Click **Images** > **Variants**.
3. Find the variant you want to remove and click **Delete**.

{{<Aside type="note" header="Note">}}

You cannot delete the public variant.

{{</Aside>}}

## Delete a variant using the API

For detailed information on using the API, refer to the [API endpoint](https://api.cloudflare.com/#cloudflare-images-variants-delete-a-variant) documentation.

The following example deletes a variant through an API call:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X DELETE https://api.cloudflare.com/client/v4/account/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">ACCOUNT_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">/images/v1/variants/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">VARIANT_NAME</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">--header </span><span class="CodeBlock--token-string">'Authorization: Bearer :token'</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

You will receive a response similar to this:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;result&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;success&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;errors&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;messages&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}