---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360007553512-Cloudflare-analytics-with-Workers
title: Cloudflare analytics with Workers
---

# Cloudflare analytics with Workers



## What is a subrequest?

With a no-op Worker (a Worker that simply proxies traffic by passing on the original client request to the origin and proxying the response) running on a particular route, the request to the origin is counted as a “subrequest”, separate from initial client to edge request. Thus, unless the Worker responds with a static response and never hits an origin, the eyeball → edge request, and edge → origin request will each be counted separately towards the request or bandwidth count in Analytics.  Subrequests are not included in the **Requests** or **Bandwidth** graphs of the Cloudflare **Analytics** app.

___

## Zone analytics

In the dashboard, the numbers in zone analytics reflect visitor traffic. That is, the number of requests shown in zone analytics (under the Analytics tabs in the dashboard) is the number of requests that were served to the client.

Similarly, the bandwidth is counted based on the bandwidth that is sent to the client, and status codes reflect the status codes that were served back to the client (so if a subrequest received a 500, but you respond with a 200, a 200 will be shown in the status codes breakdown).

___

## Worker analytics

For a breakdown of subrequest traffic (origin facing traffic), you may go to the Cloudflare **Analytics** app and click on the **Workers** tab. Under the **Workers** tab, below the Service Workers panel, are a **Subrequests** breakdown by count, **Bandwidth** and **Status Codes**. This will help you spot and debug errors at your origin (such as spikes in 500s), and identify your cache-hit ratio to help you understand traffic going to your origin.

___

## FAQ

**Why don’t I have any analytics for Workers?**

-   If you are not currently using Workers (don’t have Workers deployed on any routes or filters), we will not have any information to show you.
-   If your Worker sends a static response back to the client without ever calling fetch() to an origin, you are not making any subrequests, thus, all traffic will be shown in zone Analytics

**Will this impact billing?** 

No, [billing for Workers](/workers/platform/pricing/) is based on requests that go through a Worker. 

**Why am I seeing such a high cache hit ratio?**

Requests served by a Worker always show as cached. For an accurate cache hit ratio on subrequests, refer to the **Subrequests** graph in the **Analytics** app under the **Workers** analytics tab.
