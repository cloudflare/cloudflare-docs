---
pcx_content_type: how-to
title: Challenge Passage
weight: 7
---

# Challenge Passage

When a visitor solves a [Cloudflare challenge](/fundamentals/get-started/concepts/cloudflare-challenges/) - as part of a [Firewall rule](/firewall/cf-firewall-rules/) or [IP access rule](/waf/tools/ip-access-rules/) - you can set the **Challenge Passage** to prevent them from having to solve future challenges for a specified period of time.

## How it works

When a visitor successfully solves a challenge, Cloudflare sets a [`cf_clearance` cookie](/fundamentals/get-started/reference/cloudflare-cookies/#additional-cookies-used-by-the-challenge-platform) in their browser. This cookie specifies the duration your website is accessible to that visitor.

When that visitor tries to access other parts of your website, Cloudflare evaluates the cookie before presenting another challenge. If the cookie is still valid, no challenges will be shown.

When Cloudflare evaluates a `cf_clearance` cookie, a few extra minutes are included to account for clock skew. For XmlHTTP requests, an extra hour is added to the validation time to prevent breaking XmlHTTP requests for pages that set short lifetimes.

## Customize the Challenge Passage

By default, the `cf_clearance` cookie has a lifetime of 30 minutes. Cloudflare recommends a setting between 15 and 45 minutes.  

To update the Challenge Passage (and the value of the `cf_clearance` cookie):

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and domain.
3. Go to **Security** > **Settings**.
4. For **Challenge Passage**, select a duration.

## Limitations

The Challenge Passage does not apply to challenges issued by WAF managed rules. Also, Challenge Passage does not apply to rate limiting rules unless the rate limit is configured to issue a challenge.