---
title: Enable Splunk
pcx-content-type: how-to
weight: 64
meta:
  title: Enable Logpush to Splunk
---

# Enable Logpush to Splunk

Cloudflare Logpush supports pushing logs directly to Splunk via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Splunk via the dashboard.

To enable the Cloudflare Logpush service:

1.  Log in to the Cloudflare dashboard.

2.  Select the Enterprise domain you want to use with Logpush.

3.  Go to **Analytics** > **Logs**.

4.  Click **Connect a service**. A modal window opens where you will need to complete several steps.

5.  Select the dataset you want to push to a storage service.

6.  Select the data fields to include in your logs. Add or remove fields later by modifying your settings in **Logs** > **Logpush**.

7.  Select **Splunk**.

8.  Enter or select the following destination information:

    - **Splunk raw HTTP Event Collector URL**
    - **Channel ID**
    - **Auth Token**
    - **Source Type**
    - **Use insecure skip verify option**

9.  Click **Validate access**.

10. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Splunk as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

To set up a Splunk Logpush job:

1.  Create a job with the appropriate endpoint URL and authentication parameters.
2.  Enable the job to begin pushing logs.

{{<Aside type="note" header="Note">}}

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Splunk.

{{</Aside>}}

{{<render file="_enable-read-permissions.md">}}

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of an endpoint URL, channel id, insecure-skip-verify flag, source type, authorization header in the string format below.

  - **\<SPLUNK_ENDPOINT_URL>**: The Splunk raw HTTP Event Collector URL with port. For example: `splunk.cf-analytics.com:8088/services/collector/raw`.
    - Cloudflare expects the HEC network port to be configured to `:443` or `:8088`.
    - Cloudflare expects the Splunk endpoint to be `/services/collector/raw` while configuring and setting up the Logpush job.
    - Ensure you have enabled HEC in Splunk. Refer to [Splunk Analytics Integrations](/fundamentals/data-products/analytics-integrations/splunk/) for information on how to set up HEC in Splunk.
    - You may notice an API request failed with a 504 error, when adding an incorrect URL. Splunk Cloud endpoint URL usually contains `http-inputs-` or similar text before the hostname. Refer to [Send data to HTTP Event Collector on Splunk Cloud Platform](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector) for more details.
  - **\<SPLUNK_CHANNEL_ID>**: A unique channel ID. This is a random GUID that you can generate by:
    - Using an online tool like the [GUID generator](https://www.guidgenerator.com/).
    - Using the command line. For example: `python -c 'import uuid; print(uuid.uuid4())'`.
  - **\<INSECURE_SKIP_VERIFY>**: Boolean value. Cloudflare recommends setting this value to `false`. Setting this value to `true` is equivalent to using the `-k` option with `curl` as shown in Splunk examples and is **not** recommended. Only set this value to `true` when HEC uses a self-signed certificate.

{{<Aside type="note" header="Note">}}
Cloudflare highly recommends setting this value to <code class="InlineCode">false</code>. Refer to the [Logpush FAQ](/logs/faq/#logpush-faq) for more information.
{{</Aside>}}

- `<SOURCE_TYPE>`: The Splunk source type. For example: `cloudflare:json`.
- `<SPLUNK_AUTH_TOKEN>`: The Splunk authorization token that is URL-encoded. For example: `Splunk%20e6d94e8c-5792-4ad1-be3c-29bcaee0197d`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-string">&quot;splunk://&ltSPLUNK_ENDPOINT_URL&gt?channel=&ltSPLUNK_CHANNEL_ID&gt&amp;insecure-skip-verify=&ltINSECURE_SKIP_VERIFY&gt&amp;sourcetype=&ltSOURCE_TYPE&gt&amp;header_Authorization=&ltSPLUNK_AUTH_TOKEN&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.

- **logpull_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Logpush API options](/logs/reference/logpush-api-configuration/#options). For timestamp, Cloudflare recommends using `timestamps=rfc3339`.

Example request using cURL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s -X POST </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/zones/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">ZONE_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">/logpush/jobs </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: &ltEMAIL&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: &ltAPI_KEY&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-d </span><span class="CodeBlock--token-string">'{&quot;name&quot;:&quot;&ltDOMAIN_NAME&gt&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-string">&quot;destination_conf&quot;:&quot;splunk://&ltSPLUNK_ENDPOINT_URL&gt?channel=&ltSPLUNK_CHANNEL_ID&gt&amp;insecure-skip-verify=&ltINSECURE_SKIP_VERIFY&gt&amp;sourcetype=&ltSOURCE_TYPE&gt&amp;header_Authorization=&ltSPLUNK_AUTH_TOKEN&gt&quot;, &quot;logpull_options&quot;: &quot;fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&amp;timestamps=rfc3339&quot;, &quot;dataset&quot;: &quot;http_requests&quot;}'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> jq </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Response:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;errors&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;messages&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;result&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">100</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;dataset&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;http_requests&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;enabled&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">false</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltDOMAIN_NAME&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;logpull_options&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&amp;timestamps=rfc3339&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;destination_conf&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;splunk://&ltSPLUNK_ENDPOINT_URL&gt?channel=&ltSPLUNK_CHANNEL_ID&gt&amp;insecure-skip-verify=&ltINSECURE_SKIP_VERIFY&gt&amp;sourcetype=&ltSOURCE_TYPE&gt&amp;header_Authorization=&ltSPLUNK_AUTH_TOKEN&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;last_complete&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;last_error&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;error_message&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;success&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### 2. Enable (update) a job

To enable a job, make a `PUT` request to the Logpush jobs endpoint. Use the job ID returned from the previous step in the URL and send `{"enabled":true}` in the request body.

Example request using cURL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -s -X PUT </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/zones/</span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">ZONE_ID</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">/logpush/jobs/100 -d</span><span class="CodeBlock--token-string">'{&quot;enabled&quot;:true}'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> jq </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Response:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;errors&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;messages&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;result&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">100</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;dataset&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;http_requests&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;enabled&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltDOMAIN_NAME&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;logpull_options&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&amp;timestamps=rfc3339&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;destination_conf&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;splunk://&ltSPLUNK_ENDPOINT_URL&gt?channel=&ltSPLUNK_CHANNEL_ID&gt&amp;insecure-skip-verify=&ltINSECURE_SKIP_VERIFY&gt&amp;sourcetype=&ltSOURCE_TYPE&gt&amp;header_Authorization=&ltSPLUNK_AUTH_TOKEN&gt&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;last_complete&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;last_error&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-property">&quot;error_message&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-null CodeBlock--token-keyword">null</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;success&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Refer to the [Logpush FAQ](/logs/faq/#logpush-faq) for troubleshooting information.

### 3. Create firewall rule for Splunk HEC endpoint (optional)

If you have the Cloudflare Web Application Firewall (WAF) turned on, you may see a CAPTCHA challenge when Cloudflare makes a request to Splunk HTTP Event Collector (HEC). To make sure this does not happen, you have to create a firewall rule that allows Cloudflare to bypass the HEC endpoint.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **Security** > **WAF** > **Firewall rules**.
2.  Click **Create firewall rule** and enter a descriptive name for it (for example, Splunk).
3.  Under **When incoming requests match...**, use the **Field**, **Operator**, and **Value** dropdowns to create a rule. After finishing each row, click **And** to create the next row of rules. Refer to the table below for the values you should input:

{{<table-wrap>}}

| Field            | Operator   | Value                                                                 |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| Request Method   | `equals`   | `POST`                                                                |
| Hostname         | `equals`   | Your Splunk endpoint hostname. For example: `splunk.cf-analytics.com` |
| URI Path         | `equals`   | `/services/collector/raw`                                             |
| URI Query String | `contains` | `channel`                                                             |
| AS Num           | `equals`   | `132892`                                                              |
| User Agent       | `equals`   | `Go-http-client/2.0`                                                  |

{{</table-wrap>}}

1.  After inputting the values as shown in the table, you should have an Expression Preview with the values you added for your specific rule. The example below reflects the hostname `splunk.cf-analytics.com`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">(http.request.method eq &quot;POST&quot; and http.host eq &quot;splunk.cf-analytics.com&quot; and http.request.uri.path eq &quot;/services/collector/raw&quot; and http.request.uri.query contains &quot;channel&quot; and ip.geoip.asnum eq 132892 and http.user_agent eq &quot;Go-http-client/2.0&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

1.  Under the **Then...** > **Choose an action** dropdown, select _Bypass_.
2.  In the **Choose a feature** dropdown, select _WAF Managed Rules_.
3.  Click **Deploy**.

The WAF should now ignore requests made to Splunk HEC by Cloudflare.
