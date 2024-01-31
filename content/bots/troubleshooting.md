---
pcx_content_type: faq
title: FAQ
weight: 11
structured_data: true

---

# Frequently Asked Questions

## Bots

{{<faq-item>}}
{{<faq-question level=2 text="How does Cloudflare detect bots?" >}}

{{<faq-answer>}}

Cloudflare uses multiple methods to detect bots, but these vary by plan. For more details, refer to [Plans](/bots/plans).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="How do I know what's included in my plan?" >}}

{{<faq-answer>}}

To know what's included in your plan, refer to our [Plans](/bots/plans).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="How do I set up my bot product?" >}}

{{<faq-answer>}}

To learn how to set up your bot product, refer to [Get started](/bots/get-started).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="Yandex bot unexpectedly blocked by the WAF managed rule with ID `...f6cbb163`" >}}

{{<faq-answer>}}

Yandex updates their bots very frequently, you may see more false positives while these changes are propagated. New and recently updated bots will occasionally be blocked by a Cloudflare WAF managed rule, as the IP list of Yandex bots has not yet synced with Yandex's most recent changes.

**Workarounds:**

- Create a [WAF exception](/waf/managed-rules/waf-exceptions/) to temporarily skip the managed rule with ID `...f6cbb163` when a request is coming from the **Yandex IP** and the user-agent contains **Yandex.**
- Create a [WAF custom rule with the _Skip_ action](/waf/custom-rules/skip/) to temporarily bypass WAF Managed Rules when a request is coming from the **Yandex IP** and the user-agent contains **Yandex.**

If you are using the legacy WAF managed rules ([now deprecated](/waf/reference/migration-guides/waf-managed-rules-migration/)), disable the WAF managed rule with ID `100203` temporarily.

**Solution:**

Once the new Yandex IP is propagated to our system, the requests will not be blocked anymore and you can remove any workaround you configured. This can take up to 48 hours. If you see any Yandex bots still being blocked after 48 hours with no change to the bot, contact [Cloudflare Support](/support/contacting-cloudflare-support/).

{{</faq-answer>}}
{{</faq-item>}}

___

{{<faq-item>}}
{{<faq-question level=2 text="How does machine learning work?" >}}

{{<faq-answer>}}

Supervised machine learning takes certain variables (X) like gender and age and predicts another variable (Y) like income.

In Bot Management and Super Bot Fight Mode, the X variables are request features, while the Y variable represents the probability of solving a challenge based on X values.

Cloudflare uses data from millions of requests and re-train the system on a periodic basis. You can learn about this data from your own request logs such as Cloudflare Logpull and Logpush as well as the Firewall API.

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="Why am I seeing a Managed Challenge action for WAF rules?" >}}

{{<faq-answer>}}

When you choose to challenge different bot categories with Bot Fight Mode or Super Bot Fight Mode, you will see Security Events with an **Action Taken** of **Managed Challenge**.

You may also see Managed Challenge due to a triggered [WAF custom rule](/waf/reference/cloudflare-challenges/#managed-challenge-recommended).

This does not mean that your traffic was blocked. It is the challenge sent to your user to determine whether they are likely human or likely bot.

To understand if the result of the challenge was a success or a failure, you can verify using [Logpush](/logs/about/).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="What is the difference between the threat score and bot management score?" >}}

{{<faq-answer>}}

The difference is significant:

-   Threat score (_cf.threat\_score_) is what Cloudflare uses to determine IP Reputation. It goes from 0 (good) to 100 (bad).
-   Bot management score (_cf.bot\_management.score)_ is what Cloudflare uses in Bot Management to measure if the request is from a human or a script**.** The scores range from 1 (bot) to 99 (human). Lower scores indicate the request came from a script, API service, or an automated agent. Higher scores indicate that the request came from a human using a standard desktop or mobile web browser.

These fields are available via [WAF custom rules](/waf/custom-rules/) and other products based on the Ruleset Engine.

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="What is cf.bot_management.verified_bot?" >}}

{{<faq-answer>}}

A request's _cf.bot\_management.verified\_bot_ value is a boolean indicating whether such request comes from a Cloudflare allowed bot.

Cloudflare has built an allowlist of good, automated bots, e.g. Google Search Engine, Pingdom, and more.

This allowlist is large based on reverse DNS verification, meaning that the IPs we allow really match the requesting service. In addition to this, Cloudflare uses multiple validation methods including ASN blocks and public lists. If none of these validation types are available for a customer, we use internal Cloudflare data and machine learning to identify legitimate IP addresses from good bots.

To allow traffic from good bots, use the [Verified Bot](/ruleset-engine/rules-language/fields/#field-cf-bot_management-verified_bot) field in your WAF custom rule.

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="Why might the ja3hash be empty in HTTP logs?" >}}

{{<faq-answer>}}

The JA3 Fingerprint can be null or empty in some cases. The most common case is for HTTP requests, because JA3 is calculated in TLS, but can also be empty due to the following:

- Orange to Orange zones (Cloudflare Zone proxied to another Cloudflare Zone).

- Worker sending requests within the same zone or to a zone that is not proxied (or a 3rd party).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="I run a good bot and want for it to be added to the allowlist (cf.bot_management.verified_bot). What should I do?" >}}

{{<faq-answer>}}

Cloudflare maintains a sample list of verified bots in [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

As a bot operator, in order to be listed by Cloudflare as a Verified Bot, your bot must conform with our [verified bot public policy](/bots/reference/verified-bots-policy/).  If your bot meets this criteria, submit this [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="What information do I need to troubleshoot my bot issues?" >}}

{{<faq-answer>}}

If you are experiencing errors with your bot solution and need to submit a Support request, include the following information:

{{<Aside type="warning">}}
The following information gathering are required when you are experiencing issues (e.g. false positives) with Enterprise Bot Management only (Enterprise plan).

Because Bot Fight Mode (BFM) and Super Bot Fight Mode (SBFM) are set at a domain level, we often find that disabling these features is the best solution to false positives.

Please follow instructions in the following questions on how to disable BFM and SBFM features. We conduct more thorough investigations for Enterprise Bot Management.
{{</Aside>}}

-   RayIDs
-   IP addresses
-   WAF custom rule IDs, rule expression, Challenge solve rates
-   Common user-agents among false positives
-   Common ASNs among false positives
-   Screenshots of strange activity from the WAF, such as a huge spike in challenged traffic on the graph
-   Problematic URIs or paths
-   Rough description of how your domain is configured.
    -   Is one zone Cloudflare for SaaS while the others are not?
    -   Is most API traffic sent to a particular URI?
    -   How much mobile traffic do you expect?

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="What should I do if I am getting False positives caused by Bot Fight Mode (BFM) or Super Bot Fight Mode (SBFM)?" >}}

{{<faq-answer>}}

{{<Aside type="warning" header="Important considerations you need to be aware of before turning on BFM or SBFM">}}

-   BFM and SBFM are high security features intended to quickly help customers under active attack stop as many bots as possible. Due to the high security threshold, false positives do sometimes happen.

-   BFM has limited control. You cannot bypass or skip BFM using the _Skip_ action in WAF custom rules or using Page Rules. BFM will be disabled if there are any IP Access rules present. If you turned on BFM during an attack, and the attack has subsided, we recommend either disabling the feature using IP Access rules to bypass BFM, or looking at [Bot Management for Enterprise](/bots/plans/bm-subscription/), which gives you the ability to precisely customize your security threshold and create exception rules as needed.

-   SBFM can be bypassed with IP Access _Allow_ action rules. You can use the _Skip_ action in [WAF custom rules](/waf/custom-rules/skip/) to specify where Super Bot Fight Mode should not run.

{{</Aside>}}

**How to disable BFM/SBFM feature?**

If you encounter any issues with BFM/SBFM feature (e.g. false positive), you can disable it under **Security** > **Bots**.

-   For **Free** plans, toggle the **Bot Fight Mode** option to **Off**
-   For **Pro** plans, click the **Configure Super Bot Fight Mode** link and set each of **Definitely automated** and **Verified bots** features to **Allow**, and toggle the **Static resource protection** and **JavaScript Detections** options to **Off**
-   For **Business** and **Enterprise** (with no Bot Management add-on) plans, click the **Configure Super Bot Fight Mode** link and set each of **Definitely automated**, **Likely automated** and **Verified bots** features to **Allow**, and toggle the **Static resource protection** and **JavaScript Detections** options to **Off**

{{<render file="_flexible-sbfm.md">}}

You cannot bypass or skip Bot Fight Mode using the _Skip_ action in WAF custom rules or using Page Rules. _Skip_, _Bypass_, and _Allow_ actions apply to rules or rulesets running on the [Ruleset Engine](/ruleset-engine/). While Super Bot Fight Mode rules are implemented in the Ruleset Engine, Bot Fight Mode checks are not. This is why you can skip Super Bot Fight Mode, but not Bot Fight Mode. If you need to skip Bot Fight Mode, consider using [Super Bot Fight Mode](/bots/get-started/pro/).

Bot Fight Mode can still trigger if you have IP Access rules, but it cannot trigger if an IP Access rule matches the request. For example, the IP Access rule matches the connecting IP. 

{{</faq-answer>}}
{{</faq-item>}}
___

{{<faq-item>}}
{{<faq-question level=2 text="Super Bot Fight Mode feature (SBFM) is still blocking requests even though the feature is turned off, why?" >}}

{{<faq-answer>}}

This is a known issue the Bots team is working to resolve in the near future. In the meantime, there is a workaround to resolve such issue. You will need to run the following API command to check and remove the SBFM ruleset:

1. List the existing Rulesets at the zone level

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/zone_id/rulesets" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -H Content-Type: application/json
```

2. From the output in step 1, find the ruleset ID that is associated with the zone's SBFM configuration. You should be able to see `"kind": "zone"` and `"phase": "http_request_sbfm"` for that ruleset.

3. Use the ruleset ID you found to delete the SBFM ruleset

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/zone_id/rulesets/rulesets_id" \
    -H "X-Auth-Email: <EMAIL>" \
    -H "X-Auth-Key: <API_KEY>" \
    -H "Content-Type: application/json"
```

Note that you need to replace <key> with your own [API key](/fundamentals/api/get-started/keys/).

{{</faq-answer>}}
{{</faq-item>}}
