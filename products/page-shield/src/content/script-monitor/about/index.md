---
title: About
order: 1
pcx-content-type: concept
---

import ScriptMDefinition from "../../_partials/_script-monitor-definition.md"

# About Cloudflare Script Monitor

## Why Script Monitor?

Your application runs a lot of code, much of it that you did not write yourself. You might use internal libraries or third-party scripts to add functionality like chatbots or marketing analytics.

But, more code brings greater security risks. Attackers can add or change existing scripts to steal payment or personal information. When you have a lot of code on your website — particularly code you did not write yourself — it is difficult to prevent [these attacks](https://sansec.io/what-is-magecart).

## How Script Monitor works

<ScriptMDefinition/>

Based on a percentage of your traffic, Script Monitor creates a list of all scripts running on your domain.

Since lists are based on sampling, there may be a small delay between script deployment and appearance.

Future versions of Script Monitor should improve notification and detection capabilities and add the ability to block scripts.

## Who has access to Script Monitor?

Script Monitor is currently available to customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

## Learn more

For more background on Script Monitor, check out our [introductory blog post](https://blog.cloudflare.com/introducing-page-shield/).

## Get started

To get started with Script Monitor, refer to the Script Monitor [setup guide](../get-started).

To manage Script Monitor using an API, refer to the [Script Monitor API](/reference/script-monitor-api).