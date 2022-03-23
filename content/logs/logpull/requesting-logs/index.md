---
pcx-content-type: reference
title: Requesting logs
weight: 15
---

# Requesting logs

## Endpoints

The three endpoints supported by the Logpull API are:

- `GET /logs/received` - returns HTTP request log data based on the parameters specified
- `GET /logs/received/fields` - returns the list of all available log fields
- `GET /logs/rayids/<rayid>` - returns HTTP request log data matching `<rayid>`

## Required authentication headers

The following headers are required for all endpoint calls:

- `X-Auth-Email` - the Cloudflare account email address associated with the domain
- `X-Auth-Key` - the Cloudflare API key

Alternatively, API tokens with Logs Edit permissions can also be used for authentication:

- `Authorization: Bearer <API_TOKEN>`

## Parameters

The API expects endpoint parameters in the GET request query string. The following are example formats:

`logs/received`
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/zones/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">ZONE_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">/logs/received?start</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">unix</span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain">rfc333</span><span class="CodeBlock--token-operator CodeBlock--token-file-descriptor CodeBlock--token-important">9</span><span class="CodeBlock--token-operator">&gt&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">end</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">unix</span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain">rfc333</span><span class="CodeBlock--token-operator CodeBlock--token-file-descriptor CodeBlock--token-important">9</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">count</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">int</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">sample</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">float</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">fields</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">FIELDS</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">timestamps</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">string</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-plain">CVE-2021-44228</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">boolean</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

`logs/rayids/<RAY_ID>`
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/zones/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">ZONE_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">/logs/rayids/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">RAY_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">?</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">fields</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">string</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-operator">&amp;</span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">timestamps</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">strings</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The following table describes the parameters available:

{{<table-wrap>}}

| Parameter      | Description                                                                                                                                                                                                                                                                                                                | Applies to                                | Required |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------- |
| start          | <p>- Inclusive</p> <p>- Timestamp formatted as `UNIX` (UTC by definition), `UNIX Nano`, or `rfc3339` (specifies time zone)</p> <p>- Must be no more than 7 days earlier than now</p>                                                                                                                                       | /logs/received                            | Yes      |
| end            | <p>- Exclusive</p> <p>- Same format as <em>start</em></p> <p>- Must be at least 1 minute earlier than now and later than <em>start</em></p>                                                                                                                                                                                | /logs/received                            | Yes      |
| count          | <p>- Return up to that many records</p> <p>- Do not include if returning all records</p> <p>- Results are not sorted; therefore, different data for repeated requests is likely</p> <p></p> <p>- Applies to number of total records returned, not number of sampled records</p>                                            | /logs/received                            | No       |
| sample         | <p>- Return only a sample of records</p> <p>- Do not include if returning all records</p> <p>- Value can range from `0.001` to `1.0` (inclusive)</p> <p>- `sample=0.1` means return 10% (1 in 10) of all records</p> <p>- Results are random; therefore, different numbers of results for repeated requests are likely</p> | /logs/received                            | No       |
| fields         | <p>- Comma-separated list of fields to return</p> <p>- If empty, the default list is returned</p>                                                                                                                                                                                                                          | <p>/logs/received</p> <p>/logs/rayids</p> | No       |
| timestamps     | <p>- Format in which timestamp fields will be returned</p> <p>- Value options are: `unixnano` (default), `unix`, `rfc3339`</p> <p>- Timestamps returned as integers for `unix` and `unixnano` and as strings for `rfc3339`</p>                                                                                             | <p>/logs/received</p> <p>/logs/rayids</p> | No       |
| CVE-2021-44228 | <p>- Optional redaction for [CVE-2021-44228](https://www.cve.org/CVERecord?id=CVE-2021-44228). This option will replace every occurrence of the string `${` with `x{`.</p> <p> For example: `CVE-2021-44228=true` </p>                                                                                                     | <p>/logs/received</p>                     | No       |

{{</table-wrap>}}

{{<Aside type="note" header="Note">}}

The maximum time range from **start** to **end** cannot exceed 1 hour. Because **start** is inclusive and **end** is exclusive, to get all the data for every minute, starting at 10AM, the proper values are:

`start=2018-05-15T10:00:00Z&end=2018-05-15T10:01:00Z`, then `start=2018-05-15T10:01:00Z&end=2018-05-15T10:02:00Z` and so on.

The overlap will be handled correctly.

{{</Aside>}}

## Example API requests using cURL

`logs/received`
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/received?start=2017-07-18T22:00:00Z&amp;end=2017-07-18T22:01:00Z&amp;count=1&amp;fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

`logs/rayids/<RAY_ID>`
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/rayids/47ff6e2c812d3ccb?timestamps=rfc3339&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note" header="Note">}}

The IATA code returned as part of the **Ray ID** does not need to included in the request. For example, if you have a **RayID** such as `49ddb3e70e665831-DFW`, only include `49ddb3e70e665831` in your request.

{{</Aside>}}

## Fields

Unless specified in the **fields** parameter, the API returns a limited set of log fields. This default field set may change at any time. The list of all available fields is at:

`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received/fields`

The order in which fields are specified does not matter, and the order of fields in the response is not specified.

Using bash subshell and `jq`, you can download the logs with all available fields without manually copying and pasting the fields into the request. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/received?start=2017-07-18T22:00:00Z&amp;end=2017-07-18T22:01:00Z&amp;count=1&amp;fields=</span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-variable">$(</span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-function">curl</span><span class="CodeBlock--token-string CodeBlock--token-variable"> -s -H </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-string CodeBlock--token-variable"> -H </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-string CodeBlock--token-variable"> </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/received/fields&quot;</span><span class="CodeBlock--token-string CodeBlock--token-variable"> </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-string CodeBlock--token-variable"> jq </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-string">'. | to_entries[] | .key'</span><span class="CodeBlock--token-string CodeBlock--token-variable"> -r </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-string CodeBlock--token-variable"> </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-function">paste</span><span class="CodeBlock--token-string CodeBlock--token-variable"> -sd </span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-string">&quot;,&quot;</span><span class="CodeBlock--token-string CodeBlock--token-variable"> -</span><span class="CodeBlock--token-string CodeBlock--token-variable CodeBlock--token-variable">)</span><span class="CodeBlock--token-string">&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Refer to [HTTP request fields](/logs/reference/log-fields/#http-requests) for the currently available fields.
