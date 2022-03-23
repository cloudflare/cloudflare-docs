---
pcx-content-type: reference
title: Enabling log retention
weight: 13
---

# Enabling log retention

By default, your HTTP request logs are not retained. When using the Logpull API for the first time, you will need to enable retention. You can also turn off retention at any time. Note that after retention is turned off, previously saved logs will be available until the retention period expires (refer to [Data retention period](/logs/logpull/understanding-the-basics/#data-retention-period)).

## Endpoints

There are two endpoints for managing log retention:

- `GET /logs/control/retention/flag` - returns whether retention is on
- `POST /logs/control/retention/flag` - turns retention on or off

{{<Aside type="note" header="Note">}}

To make a `POST` call, you must have a Cloudflare account role with `edit` permissions, such as Super Administrator, Administrator, or Log Share.

{{</Aside>}}

## Example API requests using cURL

### Check whether log retention is turned on:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> GET </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/control/retention/flag&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> jq </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

#### Response:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;errors&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;messages&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;result&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;flag&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">false</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;success&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Turn on log retention:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> POST </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/control/retention/flag&quot;</span><span class="CodeBlock--token-plain"> -d</span><span class="CodeBlock--token-string">'{&quot;flag&quot;:true}'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> jq </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

#### Parameters

- _flag_ - can be either `true` or `false`

#### Response:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;errors&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;messages&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;result&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;flag&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;success&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Audit

Turning log retention on or off is recorded in **Cloudflare Audit Logs**.
