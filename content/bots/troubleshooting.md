---
pcx_content_type: faq
title: FAQs
weight: 11

---

# Frequently Asked Questions

## Bots

### How does Cloudflare detect bots?

Cloudflare uses multiple methods to detect bots, but these vary by plan. For more details, refer to [Plans](/bots/plans).

___

### How do I know what's included in my plan?

To know what's included in your plan, refer to our [Plans](/bots/plans).

___

### How do I set up my bot product?

To learn how to set up your bot product, refer to [Get started](/bots/get-started).

___

### Yandex bot unexpectedly blocked by the WAF managed rule with ID `...f6cbb163`

Yandex updates their bots very frequently, you may see more false positives while these changes are propagated. New and recently updated bots will occasionally be blocked by a Cloudflare WAF managed rule, as the IP list of Yandex bots has not yet synced with Yandex's most recent changes.

**Workarounds:**

- Create a [WAF exception](/waf/managed-rules/waf-exceptions/) to temporarily skip the managed rule with ID `...f6cbb163` when a request is coming from the **Yandex IP** and the user-agent contains **Yandex.**
- Create a [WAF custom rule with the _Skip_ action](/waf/custom-rules/skip/) to temporarily bypass WAF Managed Rules when a request is coming from the **Yandex IP** and the user-agent contains **Yandex.**

If you are using the legacy WAF managed rules ([now deprecated](/waf/reference/migration-guides/waf-managed-rules-migration/)), disable the WAF managed rule with ID `100203` temporarily.

**Solution:**

Once the new Yandex IP is propagated to our system, the requests will not be blocked anymore and you can remove any workaround you configured. This can take up to 48 hours. If you see any Yandex bots still being blocked after 48 hours with no change to the bot, contact [Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/).

___

### How does machine learning work?

Supervised machine learning takes certain variables (X) like gender and age and predicts another variable (Y) like income.

In Bot Management and Super Bot Fight Mode, the X variables are request features, while the Y variable represents the probability of solving a challenge based on X values.

Cloudflare uses data from millions of requests and re-train the system on a periodic basis. You can learn about this data from your own request logs such as Cloudflare Logpull and Logpush as well as the Firewall API.

___

### Why am I seeing a Managed Challenge action for WAF rules?

When you choose to challenge different bot categories with Bot Fight Mode or Super Bot Fight Mode, you will see Security Events with an **Action Taken** of **Managed Challenge**.

You may also see Managed Challenge due to a triggered [WAF custom rule](/firewall/cf-firewall-rules/cloudflare-challenges/#managed-challenge-recommended).

This does not mean that your traffic was blocked. It is the challenge sent to your user to determine whether they are likely human or likely bot.

To understand if the result of the challenge was a success or a failure, you can verify using [Logpush](/logs/about/).
___

### What is the difference between the threat score and bot management score?

The difference is significant:

-   Threat score (_cf.threat\_score_) is what Cloudflare uses to determine IP Reputation. It goes from 0 (good) to 100 (bad).
-   Bot management score (_cf.bot\_management.score)_ is what Cloudflare uses in Bot Management to measure if the request is from a human or a script**.** The scores range from 1 (bot) to 99 (human). Lower scores indicate the request came from a script, API service, or an automated agent. Higher scores indicate that the request came from a human using a standard desktop or mobile web browser.

These fields are available via [WAF custom rules](/waf/custom-rules/) and other products based on the Ruleset Engine.

___

### What is cf.bot\_management.verified\_bot?

A request's _cf.bot\_management.verified\_bot_ value is a boolean indicating whether such request comes from a Cloudflare allowed bot.

Cloudflare has built an allowlist of good, automated bots, e.g. Google Search Engine, Pingdom, and more.

This allowlist is large based on reverse DNS verification, meaning that the IPs we allow really match the requesting service. In addition to this, Cloudflare uses multiple validation methods including ASN blocks and public lists. If none of these validation types are available for a customer, we use internal Cloudflare data and machine learning to identify legitimate IP addresses from good bots.

To allow traffic from good bots, use the [Verified Bot](/ruleset-engine/rules-language/fields/#field-cf-bot_management-verified_bot) field in your WAF custom rule.

___

### Why might the ja3hash be empty in HTTP logs?

The JA3 Fingerprint can be null or empty in some cases. The most common case is for HTTP requests, because JA3 is calculated in TLS, but can also be empty due to the following:

- Orange to Orange zones (Cloudflare Zone proxied to another Cloudflare Zone).

- Worker sending requests within the same zone or to a zone that is not proxied (or a 3rd party).

___

### I run a good bot and want for it to be added to the allowlist (cf.bot\_management.verified\_bot). What should I do?

Cloudflare maintains a sample list of verified bots in [Cloudflare Radar](https://radar.cloudflare.com/verified-bots).

As a bot operator, in order to be listed by Cloudflare as a Verified Bot, your bot must conform with our [verified bot public policy](/bots/reference/verified-bots-policy/).  If your bot meets this criteria, submit this [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

___

### What information do I need to troubleshoot my bot issues?

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

___

### What should I do if I am getting False positives caused by Bot Fight Mode (BFM) or Super Bot Fight Mode (SBFM)?

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

___

### Super Bot Fight Mode feature (SBFM) is still blocking requests even though the feature is turned off, why?

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

___

## Challenges

### Do the Challenge actions support content types other than HTML (for example, AJAX or XHR requests)?

No. The Managed Challenge, Interactive Challenge, and JS Challenge actions only support requests that trigger a page refresh.

Challenges presented to users display an intermediate page where they must prove they are not a bot. This concept does not work over XHR or AJAX, such as in Single Page Applications (SPA), since visitors do not trigger a new page load.

When an XHR or AJAX request triggers a Challenge action, the HTTP response will have a `403` status code.

Your application can use this status codes to handle unexpected challenges, optionally using a [Custom Error Response](/rules/custom-error-responses/) for XHR and AJAX requests instead of a Challenge action. The application could capture the custom error response and raise a challenge by, for example, triggering a page refresh.

For an additional layer of security against Credential Stuffing, you could use [Cloudflare Turnstile](/turnstile/) on the most vulnerable parts of your site (such as login or checkout forms).

___

### Does the `challengeFailed` action accurately represent challenges that users did not pass?

No. The `challengeFailed` and `jschallengeFailed` firewall rule actions account for observed requests that, under special circumstances, did not pass a challenge. However, some failed challenges cannot be traced back to a firewall rule. Additionally, Cloudflare Firewall Rules may not have a record of every request with a failed challenge.

Therefore, consider these actions with caution. A reliable indicator is the [Challenge Solve Rate (CSR)](/bots/concepts/challenge-solve-rate/) displayed in **Security** > **WAF** > **Firewall rules**, which is calculated as follows: `number of challenges solved / number of challenges issued`.

___

### Why would I not find any failed challenges? Why is `ChallengeIssued` not equal to `ChallengeSolved` plus `ChallengeFailed`?

Users do not complete all challenges. Cloudflare issues challenges that are never answered — only 2-3% of all served challenges are usually answered.

There are multiple reasons for this:

- Users give up on a challenge.
- Users try to solve a challenge but cannot provide an answer.
- Users keep refreshing the challenge, but never submit an answer.
- Cloudflare receives a malformed challenge answer.

___

### Why do I have matches for a firewall rule that was not supposed to match the request?

Make sure you are looking at the correct request.

Only requests that triggered a challenge will match the request parameters of the rule. Subsequent requests with a `[js]challengeSolved` or `[js]challengeFailed` action may not match the parameters of the rule — for example, the bot score may have changed because the user solved a challenge.

The "solved" and "failed" actions are informative actions about a previous request that matched a rule. These actions state that "previously a rule had matched a request with the action set to _Interactive Challenge_ or _JS Challenge_ and now that challenge was answered."