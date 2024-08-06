---
title: Free
pcx_content_type: get-started
weight: 1
meta:
  title: Get started with Bot Fight Mode
---

# Get started with Bot Fight Mode

{{<render file="_bot-fight-mode-definition.md">}}

## Enable Bot Fight Mode

{{<render file="_bot-fight-mode-enable.md">}}

## Disable Bot Fight Mode

If you find that **Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Bot Fight Mode:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **Bots**.
3. For **Bot Fight Mode**, select **Off**.

## Block AI bots

{{<render file="_ai-bots-definition.md" >}}

{{<render file="_block-ai-bots-enable.md" withParameters="Bot Fight Mode">}}

{{<Aside type="note">}}
You can view blocked AI bot traffic via [Security Analytics](/waf/analytics/security-analytics/).
{{</Aside>}}

## Visibility

You can see bot-related actions by going to **Security** > **Events**. Any requests challenged by this product will be labeled **Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.

## Limitations

You cannot bypass or skip Bot Fight Mode using the _Skip_ action in WAF custom rules or using Page Rules. _Skip_, _Bypass_, and _Allow_ actions apply to rules or rulesets running on the [Ruleset Engine](/ruleset-engine/). While Super Bot Fight Mode rules are implemented in the Ruleset Engine, Bot Fight Mode checks are not. This is why you can skip Super Bot Fight Mode, but not Bot Fight Mode. If you need to skip Bot Fight Mode, consider using [Super Bot Fight Mode](/bots/get-started/pro/).

Bot Fight Mode can still trigger if you have IP Access rules, but it cannot trigger if an IP Access rule matches the request. For example, the IP Access rule matches the connecting IP.