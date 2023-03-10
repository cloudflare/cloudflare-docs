---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360050691831-Understanding-Network-Error-Logging
title: Understanding Network Error Logging
---

# Understanding Network Error Logging



## Overview

Cloudflare Network Error Logging (NEL) is available in all Cloudflare data centers.  NEL is a browser-based technology used to quickly identify problems with site visitors connecting to Cloudflare.  NEL is a public component built into browsers.   

Network Error Logging can be used to help triage end-user connectivity issues that our customers’ end users experience.  Some incidents on the internet can be scoped to specific Internet Service Providers (ISPs) in certain locations due to physical activity on the network (maintenance, fiber cuts, sporting events, etc.).  Having the location/ASN data allows engineers to root cause external provider issues and rule out Cloudflare as a root cause.

Connectivity loss can also result from end users changing IP addresses. For example, an end user may connect to a site from a home Wi-Fi and then leave their house.  The change from the home Wi-Fi network to a mobile network changes the end user’s IP address, interrupts any current connections, and could be reported as TCP.abort or TCP.timed\_out failures.  By comparing the last known good client IP with the client IP that reported the failure, Cloudflare determines whether the failures were due to a roaming end user.  The diagram below shows how NEL captures connectivity losses resulting from end user IP changes:

![Diagram showing how Network Error Logging captures connectivity losses resulting from end user IP changes. For more details, continue reading.](/support/static/pasted_image_0__1_.png)

**NEL process**:

1.  User moves from WiFi to mobile.
2.  Customer connects via mobile IP.
3.  All connections made to Cloudflare over WiFi are timed out due to src-dest mismatch.
4.  Connections are re-established over mobile connections and the user reports failures over their mobile connection to the Cloudflare NEL endpoint.

The Report-To header is present in all requests to Cloudflare zones that have NEL enabled:  

`report-to: {"group":"cf-nel","max_age":31536000,"endpoints":[{"url":"`[`https://a.nel.cloudflare.com/report?lkg-colo=lhr&lkg-time=1600338181`](https://gcp.nel.cloudflare.com/report?lkg-colo=lhr&lkg-time=1600338181&lkg-ip=1.1.1.1)`"}]}`

A sample Network Error Report payload appears as follows:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;age&quot;: 20,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;type&quot;: &quot;network-error&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;url&quot;: &quot;https://example.com/previous-page&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;body&quot;: {</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;elapsed_time&quot;: 18,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;method&quot;: &quot;POST&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;phase&quot;: &quot;dns&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;protocol&quot;: &quot;http/1.1&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;referrer&quot;: &quot;https://example.com/previous-page&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;sampling_fraction&quot;: 1,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;server_ip&quot;: &quot;&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;status_code&quot;: 0,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;type&quot;: &quot;dns.name_not_resolved&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    &quot;url&quot;: &quot;https://example-host.com/&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  }</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Cloudflare NEL uses end-user IP address to determine the following:

-   an estimate of the client's location (country, city),
-   the client's Autonomous System Number (ASN), and
-   whether the client changed IP addresses before they experienced a failure.

The client IP address is only stored in volatile memory for the lifetime of the request to Cloudflare’s NEL endpoint (order of milliseconds) and is dropped immediately after the request completes. Cloudflare does not log the client IP address anywhere in the Network Error Logging pipeline. Customers can opt out of having their end users consume the NEL headers by emailing Cloudflare support.

{{<Aside type="note">}}
NEL metrics are not currently available on the Cloudflare dashboard.
{{</Aside>}}

___

## Related resources

-   [W3C specification](https://www.w3.org/TR/network-error-logging/)[](https://developers.google.com/web/updates/2018/09/reportingapi)
-   [Google Chrome integration](https://developers.google.com/web/updates/2018/09/reportingapi)
