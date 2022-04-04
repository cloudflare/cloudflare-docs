---
title: About
pcx-content-type: concept
weight: 3
meta:
  title: About Cloudflare Page Shield
---

# About Cloudflare Page Shield

Your application runs a lot of code, much of it that you did not write yourself. You might use internal libraries or third-party scripts to add functionality like chatbots or marketing analytics.

But, more code brings greater security risks. Attackers can add or change existing scripts to steal payment or personal information. When you have a lot of code on your website — particularly code you did not write yourself — it is difficult to prevent [these attacks](https://sansec.io/what-is-magecart).

## How Page Shield works

Page Shield simplifies external script management by tracking existing dependencies and providing alerts when new ones are added or when malicious scripts are detected.

When turned on, Page Shield uses a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) deployed with a [report-only directive](/page-shield/reference/csp-header/) to collect information from the browser. This allows Cloudflare to provide you with a list of all scripts running on your application.

Page Shield provides two dashboards for reviewing the scripts loaded in your domain:

* The **Active Scripts** dashboard displays a list of [active scripts](/page-shield/reference/script-statuses/) in your domain.
* The **All Reported Scripts** dashboard displays the complete list of detected scripts in your domain, including infrequent and inactive scripts.

Since the scripts lists are based on sampling, there may be a small delay between script deployment and appearance.

If you are a customer with an add-on to your Enterprise plan, Cloudflare will apply additional mechanisms to detect and report any potentially malicious scripts in your domain. Any scripts considered malicious will appear at the top of the Active Scripts dashboard. For more information on add-on features, refer to [Detecting malicious scripts](/page-shield/about/malicious-script-detection/) and [Review changed scripts](/page-shield/use-dashboard/review-changed-scripts/).

## Learn more

For more background on Page Shield, refer to the [Page Shield is generally available](https://blog.cloudflare.com/page-shield-generally-available/) blog post.
