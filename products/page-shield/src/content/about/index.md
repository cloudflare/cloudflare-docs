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

Based on a percentage of your traffic, Page Shield creates a list of all scripts running on your domain. You can check the list of detected scripts in the [Script Monitor dashboard](/script-monitor). Since the scripts list is based on sampling, there may be a small delay between script deployment and appearance.

Future versions of Page Shield should add the ability to block scripts.

## Learn more

For more background on Page Shield, check out our [blog post](https://blog.cloudflare.com/page-shield-is-now-generally-available/).
