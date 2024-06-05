---
title: FAQ
pcx_content_type: faq
weight: 10
---

# WAF FAQ

## General questions

{{<faq-item>}}
{{<faq-question level="3" text="Why does a security event display a Cloudflare IP address even though other fields match the client details?">}}
{{<faq-answer>}}

This happens when a request goes through a Cloudflare Worker.

In this case, Cloudflare considers the client details, including its IP address, for triggering security settings. However, the IP displayed in [Security Events](/waf/analytics/security-events/paid-plans/) will be a Cloudflare IP address.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="Do I need to escape certain characters in expressions?">}}
{{<faq-answer>}}

Yes, you may have to escape certain characters in expressions. The exact escaping will depend on the string syntax you use:

* If you use the raw string syntax (for example, `r#"this is a string"#`), you will only need to escape characters that have a special meaning in regular expressions.
* If you use the quoted string syntax (for example, `"this is a string"`), you need to perform additional escaping, such as escaping special characters `"` and `\` using `\"` and `\\`, both in literal strings and in regular expressions.

For more information on string syntaxes and escaping, refer to [String values and regular expressions](/ruleset-engine/rules-language/values/#string-values-and-regular-expressions).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="Why is my regular expression pattern not working?">}}
{{<faq-answer>}}

If you are using a regular expression, it is recommended that you test it with a tool such as [Regular Expressions 101](https://regex101.com/?flavor=rust&regex=) or [Rustexp](https://rustexp.lpil.uk).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="How do I exclude certain requests from being blocked or challenged?">}}
{{<faq-answer>}}

In certain situations you want to enforce a blocking or challenging action but make an exception for specific types of requests.

Cloudflare supports two methods of allowing requests using WAF custom rules:

* Exclude a type of request from being blocked or challenged in a custom rule by updating the rule expression, for example adding an exclusion based on IP address, ASN, or country.
* Create a separate custom rule with a [_Skip_ action](/waf/custom-rules/skip/). This skip rule must appear before the rule with the block/challenge action in the rules list.

The examples below illustrate a few possible approaches.

**Example 1**

Exclude multiple IP addresses from a blocking/challenging rule that assesses Threat Score.

{{<table-wrap>}}

<table style="width: 100%">
  <tbody>
    <tr>
      <td colspan="2">
        <strong>
          Basic rule, with no exclusion
        </strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td>
        <em>Block</em> (or a challenge action)
      </td>
    </tr>
    <tr>
      <td>Expression</td>
      <td>
        <code>(http.host eq "example.com" and cf.threat_score > 5)</code>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <strong>Rule that excludes IP addresses from being blocked/challenged</strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td>
        <em>Block</em> (or a challenge action)
      </td>
    </tr>
    <tr>
      <td>Expression</td>
      <td>
        <code>
          (http.host eq "example.com" and cf.threat_score > 5) and not (ip.src in
          {192.0.2.1 198.51.100.42 203.0.113.0/24})</code>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <strong>Two rules to skip remaining custom rules for specific IPs and block the rest</strong>
      </td>
    </tr>
    <tr>
      <td>Rule 1</td>
      <td>
        Action: <em>Skip</em> > <em>All remaining custom rules</em>
        <br />
        Expression: <code>ip.src in {192.0.2.1 198.51.100.42 203.0.113.0/24}</code>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>Block</em> (or a challenge action)
        <br />
        <code>(http.host eq "example.com" and cf.threat_score > 5)</code>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}

**Example 2**

Block Amazon Web Services (AWS) and Google Cloud Platform (GCP) because of large volumes of undesired traffic, but allow Googlebot and other known bots that Cloudflare validates.

{{<table-wrap>}}

<table style="width: 100%">
  <tbody>
    <tr>
      <td colspan="2">
        <strong>
          Basic rule, with no exclusion
        </strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>Block</em> (or a challenge action)</td>
    </tr>
    <tr>
      <td>Expression</td>
      <td><code>(ip.geoip.asnum in {16509 15169})</code></td>
    </tr>
    <tr>
      <td colspan="2">
        <strong>Rule that excludes known bots that Cloudflare validates</strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>Block</em> (or a challenge action)</td>
    </tr>
    <tr>
      <td>Expression</td>
      <td>
        <code>(ip.geoip.asnum in {16509 15169} and not cf.client.bot)</code>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <strong
          ><strong
            >Two rules to skip remaining custom rules for known bots and block the rest</strong
          ></strong
        >
      </td>
    </tr>
    <tr>
      <td>Rule 1</td>
      <td>
        Action: <em>Skip</em> > <em>All remaining custom rules</em><br />
        Expression: <code>cf.client.bot</code>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>Block</em> (or a challenge action)<br />
        Expression: <code>(ip.geoip.asnum in {16509 15169})</code>
      </td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=3 text="Why are some rules bypassed when I did not create an exception?" >}}

{{<faq-answer>}}

If you have [SSL/TLS certificates](/ssl/) managed by Cloudflare, every time a certificate is issued or renewed, a [domain control validation (DCV)](/ssl/edge-certificates/changing-dcv-method/dcv-flow/) must happen. When a certificate is in `pending_validation` state and there are valid DCV tokens in place, some Cloudflare security features such as [custom rules](/waf/custom-rules/) and [WAF Managed Rules](/waf/managed-rules/) will be automatically disabled on specific DCV paths (for example, `/.well-known/pki-validation/` and `/.well-known/acme-challenge/`).

{{</faq-answer>}}
{{</faq-item>}}

## Bots

{{<faq-item>}}
{{<faq-question level="3" text="How does the WAF handle traffic from known bots?">}}
{{<faq-answer>}}

#### Caution about potentially blocking bots

When you create a WAF custom rule with a _Block_, _Interactive Challenge_, _JS Challenge_, or _Managed Challenge (Recommended)_ action, you might unintentionally block traffic from known bots. Specifically, this might affect search engine optimization (SEO) and website monitoring when trying to enforce a mitigation action based on URI, path, host, ASN, or country.

Refer to [How do I exclude certain requests from being blocked or challenged?](#how-do-i-exclude-certain-requests-from-being-blocked-or-challenged).

#### Bots currently detected

[Cloudflare Radar](https://radar.cloudflare.com/verified-bots) lists a **sample** of known bots that the WAF currently detects. When traffic comes from these bots and others not listed, the `cf.client.bot` field is set to `true`.

To submit a friendly bot to be verified, go to the [**Verified bots**](https://radar.cloudflare.com/traffic/verified-bots) page in Cloudflare Radar and select **Add a bot**.

For more information on verified bots, refer to [Bots](/bots/concepts/bot/).

{{<Aside type="note">}}
There is no functional difference between known and verified bots. However, the known bots field (`cf.client.bot`) is available for all customers, while the verified bots field (`cf.bot_management.verified_bot`) is available for Enterprise customers.
{{</Aside>}}

{{</faq-answer>}}
{{</faq-item>}}

## Challenges

{{<faq-item>}}
{{<faq-question level="3" text="Do the Challenge actions support content types other than HTML (for example, AJAX or XHR requests)?">}}

{{<faq-answer>}}

Previously, unless you customize your front-end application, any AJAX request that is challenged will fail because AJAX calls are not rendered in the DOM.

Now, you can [opt-in to Turnstile’s Pre-Clearance cookies](/turnstile/concepts/pre-clearance-support/). This allows you to issue a challenge early in your web application flow and pre-clear users to interact with sensitive APIs. Clearance cookies issued by a Turnstile widget are automatically applied to the Cloudflare zone that the Turnstile widget is embedded on, with no configuration necessary. The duration of the clearance cookie’s validity is controlled by the zone-specific configurable [Challenge Passage](/waf/tools/challenge-passage/) security setting.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="Does the `challengeFailed` action accurately represent challenges that users did not pass?">}}

{{<faq-answer>}}

No. The `challengeFailed` and `jschallengeFailed` firewall rule actions account for observed requests that, under special circumstances, did not pass a challenge. However, some failed challenges cannot be traced back to a firewall rule. Additionally, Cloudflare Firewall Rules may not have a record of every request with a failed challenge.

Therefore, consider these actions with caution. A reliable indicator is the [Challenge Solve Rate (CSR)](/bots/concepts/challenge-solve-rate/) displayed in **Security** > **WAF** > **Firewall rules**, which is calculated as follows: `number of challenges solved / number of challenges issued`.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="Why would I not find any failed challenges? Why is `ChallengeIssued` not equal to `ChallengeSolved` plus `ChallengeFailed`?">}}

{{<faq-answer>}}

Users do not complete all challenges. Cloudflare issues challenges that are never answered — only 2-3% of all served challenges are usually answered.

There are multiple reasons for this:

- Users give up on a challenge.
- Users try to solve a challenge but cannot provide an answer.
- Users keep refreshing the challenge, but never submit an answer.
- Cloudflare receives a malformed challenge answer.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level="3" text="Why do I have matches for a firewall rule that was not supposed to match the request?">}}

{{<faq-answer>}}

Make sure you are looking at the correct request.

Only requests that triggered a challenge will match the request parameters of the rule. Subsequent requests with a `[js]challengeSolved` or `[js]challengeFailed` action may not match the parameters of the rule — for example, the bot score may have changed because the user solved a challenge.

The "solved" and "failed" actions are informative actions about a previous request that matched a rule. These actions state that "previously a rule had matched a request with the action set to _Interactive Challenge_ or _JS Challenge_ and now that challenge was answered."

{{</faq-answer>}}
{{</faq-item>}}
