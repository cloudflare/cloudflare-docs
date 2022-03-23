---
pcx-content-type: reference
title: Additional details
weight: 19
---

# Additional details

## Estimating daily data volume

To estimate the amount of data for a zone per day (the number of log lines and the amount of bytes they take up), request a 1% or 10% sample of data for a 1-hour period (use 10% if your volume is low). Note that `start=2018-12-15T00:00:00Z` and `end=2018-12-15T01:00:00Z` span a 1-hour period, and `sample=0.1`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltZONE_ID&gt/logs/received?start=2018-12-15T00:00:00Z&amp;end=2018-12-15T01:00:00Z&amp;sample=0.1&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">sample.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">wc</span><span class="CodeBlock--token-plain"> -l sample.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-number">83</span><span class="CodeBlock--token-plain"> sample.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">..</span><span class="CodeBlock--token-plain">.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">ls</span><span class="CodeBlock--token-plain"> -lh sample.log</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-rw-r--r-- </span><span class="CodeBlock--token-number">1</span><span class="CodeBlock--token-plain"> mik mik 25K Dec </span><span class="CodeBlock--token-number">17</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">15</span><span class="CodeBlock--token-plain">:49 sample.log</span></div></span></span></span></code></pre>{{</raw>}}

Based on this information, the approximate number of messages/day is 19,920 (83*10*24), and the byte size is 6MB (25K*10*24). The size estimate is based on the default response field set. Changing the response field set (refer to [Fields](/logs/logpull/requesting-logs/#fields)) will change the response size.

To get a good estimate of daily traffic, it is best to get at least 30 log lines in your hourly sample. If the response size is too small (or too large), adjust the sample value, not the time range.

## Compression

Responses are compressed by default (gzip). `cURL` decompresses responses transparently, unless called with:

`-H "accept-encoding: gzip"`

In that case, the output remains gzipped. Compressed data is approximately 5-10% of its uncompressed size. This means that a 1GB uncompressed response gets compressed down to 50-100MB.

## Service expectations

### Successful requests

If the response or timeout limit is exceeded or there is any problem fetching the response, a `200` status will be returned and the response will end with the non-JSON text line “Error streaming data.” Because responses are streamed, there is no way to identify the error ahead of time. A response is successful if it does not end with the “Error streaming data" text line.

Once you receive a successful response for a given zone and time range, the following is true for all subsequent requests:

- The number and content of returned records will be same.
- The order of records returned may (and is likely to) be different.

### Response fields

Regarding the inclusion of the **fields** parameter:

- When fields are explicitly included in the request URL, the fields returned will not change.
- When not specified in the URL, the default fields are returned.
- The default fields may change at any time.

### Limits

The following usage restrictions apply:

- **Rate limits:** Exceeding these limit results in a `429` error response:
  - 15 requests/min per zone.
  - 180 requests/min per user (email address).
- **Time range:** The maximum difference between the **start** and **end** parameters can be 1 hour.
- **Response size:** The maximum response size is 10GiB per request, which is equivalent to about 15M records when about 55 fields are selected (more records can be retrieved when less fields are selected because the per record size will be smaller).
- **Timeout:** The response will fail with a terminated connection after 10 minutes.
- **Stream Timeout:** The request will be terminated with a `408` error response if the connection is idle for 30s. This timeout usually means that the request is probably too exhaustive (frequent timeouts (> 12/hr) will result in subsequent queries to be blocked with status code 429 for 1hr) and so:
  - try requesting records using lesser number of fields.
  - try with smaller **start** and **end** parameters.
