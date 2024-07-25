---
pcx_content_type: configuration
title: Allow traffic from search engine bots
meta:
  title: Allow traffic from search engine bots and other verified bots
---

# Allow traffic from search engine bots and other verified bots

This example challenges requests from a list of countries, but allows traffic from search engine bots — such as Googlebot and Bingbot — and from other [verified bots](/bots/concepts/bot/#verified-bots).

The rule expression uses the [`cf.client.bot`](/ruleset-engine/rules-language/fields/#field-cf-client-bot) field to determine if the request originated from a known good bot or crawler.

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (ip.geoip.country in {"US" "MX"} and not cf.client.bot)
        </code>
      </td>
      <td>
        <em>Managed Challenge</em>
      </td>
    </tr>
  </tbody>
</table>

## Other resources

* [Use case: Challenge bad bots](/waf/custom-rules/use-cases/challenge-bad-bots/)
* [Cloudflare bot solutions](/bots/)
* [Troubleshooting: Bing’s Site Scan blocked by a WAF managed rule](/waf/troubleshooting/blocked-bing-site-scans/)
* [Learning Center: What is a web crawler?](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/)
