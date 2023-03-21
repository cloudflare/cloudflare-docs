---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169806-Troubleshooting-crawl-errors
title: Troubleshooting crawl errors
---

# Troubleshooting crawl errors



## Overview

Cloudflare allows search engine crawlers and bots. If you observe crawl issues or Cloudflare challenges presented to the search engine crawler or bot, [contact Cloudflare support](https://support.cloudflare.com/hc/articles/200172476) with the information you gather when troubleshooting the crawl errors via the methods outlined in this guide.

___

## Adjust Google and Bing crawl rates

To optimize CDN performance, Google and Bing assign special crawl rates to websites that use CDN services in order. Special crawl rates do not negatively affect Search Engine Optimization (SEO) and Search Engine Results Pages (SERPs). To change your crawl rates for Bing and Google, follow the guides below:

-   Change the Google crawl rate by [reviewing Google’s documentation](https://support.google.com/webmasters/answer/48620?hl=en).
-   Change your Bing crawl rate via guidance from Bing’s documentation:
    -   [Bing Crawl Control](https://www.bing.com/webmasters/help/?topicid=55a30303)
    -   [Crawl Delay and the Bing Crawler](https://blogs.bing.com/webmaster/2009/08/10/crawl-delay-and-the-bing-crawler-msnbot)

___

## Prevent crawl errors

Review the following recommendations to prevent crawler errors:

-   Monitor the performance and availability of your website using a third-party tool:
    -   [StatusCake](http://www.statuscake.com/)
    -   [Pingdom](http://www.pingdom.com/)
    -   [Monitor.Us](http://www.monitor.us/)
    -   [Updown](https://updown.io/)

-   Do not block Google crawler IP addresses via **firewall rules** or **IP Access Rules** within the **Security** app. If you are using [rate limiting rules](/waf/rate-limiting-rules/) (new version), make sure they do not apply to the Google crawler.

Confirm an IP address belongs to Google by consulting Google’s documentation on [verifying googlebot IP addresses](https://support.google.com/webmasters/bin/answer.py?answer=80553).

-   Do not block the United States via **firewall rules** or **IP Access Rules** within the **Security** app.
-   Do not block or User-Agents in your .htaccess, server configuration, [robots.txt](http://support.google.com/webmasters/bin/answer.py?answer=35303), or web application.

Google uses a [variety of User-Agents](https://support.google.com/webmasters/answer/1061943) to crawl your website. You can [test your robots.txt via Google](https://support.google.com/webmasters/answer/6062598?hl=en).

-   Do not allow crawling of files in the /cdn-cgi/ directory. This path is used internally by Cloudflare and Google encounters errors when crawling it. Disallow crawls of cdn-cgi via robots.txt:

`Disallow: /cdn-cgi/`

{{<Aside type="note">}}
Errors for cdn-cgi do not impact site rankings.
{{</Aside>}}

-   Ensure your [robots.txt file allows the AdSense crawler](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=1061943).
-   [Restore original visitor IP addresses](https://support.cloudflare.com/hc/articles/200170786) in your server logs.

___

## Troubleshoot crawl errors

Troubleshooting steps for the most commonly reported crawl errors are mentioned below.

### HTTP 4XX Errors

[HTTP 4XX errors](https://support.cloudflare.com/hc/articles/115003014512) are the most common type of crawl error. Cloudflare delivers these errors from your web server to Google. These errors are caused for various reasons such as a missing page on your web server or a malformed link in your HTML. The solution depends upon the problem encountered.

### HTTP 5XX Errors

[HTTP 5XX errors](https://support.cloudflare.com/hc/articles/115003011431) indicate that either Cloudflare or your origin web server experienced an internal error. To correlate occurrences of crawl errors with site outages, monitor your origin web server’s health. Monitoring your website health both through Cloudflare and directly to your origin web server IPs determines whether errors occurred due to Cloudflare or your origin web server.

### DNS Errors

Troubleshooting steps vary depending on whether your domain is on Cloudflare via a Full or CNAME setup. To verify which setup your domain uses, open a terminal and execute the following command (replace _www.example.com_ with your Cloudflare domain):

`dig +short SOA` `_www.example.com_`

For domains on a CNAME setup, the result response contains cdn.cloudflare.net. For example:

`example.com.cdn.cloudflare.net.`

For domains on a Full setup, the result response contains the cloudflare.com domain in the nameservers listed. For example:

`josh.ns.cloudflare.com. dns.cloudflare.com. 2013050901 10000 2400 604800 3600`

Once you’ve confirmed how your domain was setup with Cloudflare, proceed with the troubleshooting steps appropriate to your domain setup.

**CNAME**

Contact your hosting provider to investigate DNS errors and provide the date Google encountered DNS errors. Additionally, review the [Cloudflare System Status](http://www.cloudflare.com/system-status) page for any network outages on the date the errors were encountered by Google.

**Full**

[Contact Cloudflare support](https://support.cloudflare.com/hc/articles/200172476) and provide the date and time that Google observed the errors.

### Requesting troubleshooting assistance

If the above troubleshooting steps do not resolve your crawl errors, follow the steps below to export crawler errors as a .csv file from your Google Webmaster Tools Dashboard. Include this .csv file when [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476).

1.  Log in to your Google Webmaster Tools account and navigate to the **Health** section of the affected domain.
2.  Click **Crawl Errors** in the left hand navigation.
3.  Click **Download** to export the list of errors as a .csv file.
4.  Provide the downloaded .csv file to Cloudflare support.

___

## Related resources

[Google’s documentation on crawl errors and troubleshooting](https://support.google.com/webmasters/answer/7440203#not_found_404)
