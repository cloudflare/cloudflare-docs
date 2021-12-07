---
title: About
order: 2
pcx-content-type: concept
---

# About Cloudflare Page Shield

Your application runs a lot of code, much of it that you did not write yourself. You might use internal libraries or third-party scripts to add functionality like chatbots or marketing analytics.

But, more code brings greater security risks. Attackers can add or change existing scripts to steal payment or personal information. When you have a lot of code on your website — particularly code you did not write yourself — it is difficult to prevent [these attacks](https://sansec.io/what-is-magecart).

## How Page Shield works

Page Shield simplifies external script management by tracking existing dependencies and providing alerts when new ones are added or when malicious code is detected.

When turned on, Page Shield uses a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) deployed with a [report-only directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) to collect information from the browser. This allows Cloudflare to provide you with a list of all scripts running on your application.

You can check the list of detected scripts in the Script Monitor dashboard. Since the scripts list is based on sampling, there may be a small delay between script deployment and appearance.

If you are a customer with an add-on to your Enterprise plan, Cloudflare will apply additional mechanisms to detect and report any malicious scripts in your zone. For more information, refer to [Detecting malicious scripts](/about/malicious-script-detection).

## Learn more

For more background on Page Shield, refer to the [introductory blog post](https://blog.cloudflare.com/introducing-page-shield/).
