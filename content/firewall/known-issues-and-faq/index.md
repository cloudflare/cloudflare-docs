---
title: FAQ
pcx_content_type: faq
weight: 6
meta:
  title: Firewall Rules FAQ
layout: single
---

# Firewall Rules FAQ

## General

### How many rules can I have on my site?

You can create a large number of rules. However, the number of active rules at any given time is limited. Refer to [Availability](/firewall/#availability) for details on what is allowed per customer plan.

### Can I purchase additional active rules?

No. The number of active rules is fixed based on customer plan. Refer to [Availability](/firewall/#availability).

### Why does a firewall event display a Cloudflare IP address even though other fields match the client details?

This happens when a request goes through a Cloudflare Worker.

In this case, Cloudflare considers the client details, including its IP address, for triggering security settings. However, the IP displayed in Security Events will be a Cloudflare IP address.

## Rule configuration

### How are certain special and escaped characters handled?

When used as literals in an expression, the backslash `\` and double quote `"` characters require proper escaping.

An expression built using the visual [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) does not require you to manually escape those special characters. Conveniently, the [Expression Builder](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) takes care of any necessary escaping in the final expression by automatically prepending a backslash such that `\` and `"` become `\\` and `\"`, respectively.

The following image illustrates how double quotes are automatically escaped to `\"` once they appear in the plain text expression generated in the Expression Editor:

![The Expression Editor displays rule values with special characters escaped using a backslash character](/images/firewall/cf-firewall-rules-escaping.png)

### Why isn't my regular expression pattern matching working?

If you are using a regular expression, it is recommended that you test it with a tool like [Regular Expressions 101](https://regex101.com/?flavor=rust) or [Rustexp](https://rustexp.lpil.uk).

Also, note that the `http.request.method` field requires all-caps for method names (for example, `POST`).

### How can I use the Threat Score effectively?

The _Cloudflare Threat Score_ is a key item behind the **Security Level** functionality in the Cloudflare dashboard.

_Threat Score_ as configured by **Security Level** is based on:

- _High_ - for scores greater than 0
- _Medium_ - for scores greater than 14
- _Low_ - for scores greater than 24
- _Essentially off_ - for scores greater than 49

Enabling a high threat score for sensitive areas - like comment form pages or login forms - can add an effective level of protection. Integrating _Threat Score_ with firewall rules is advantageous because you can specify an Interactive Challenge vs. a JS Challenge, or even a block. You can also exclude IP addresses using _and not_ logic.

### How do I create an exception to exclude certain requests from being blocked or challenged?

There may be situations in which you want to enforce a blocking or challenging action but make exceptions for specific types of requests.

Cloudflare supports two methods to allow requests through firewall rules expressions:

* Exclude a type of request from being blocked or challenged, for example based on IP address, ASN, or country.
* Create an independent firewall rule with an _Allow_ action.

{{<Aside type="note" header="Note">}}

Cloudflare Firewall Rules does not bypass other security measures configured under **Security**.

{{</Aside>}}

If you wish to permit certain exclusions, the examples below illustrate a few possible approaches.

**Example 1**

Exclude multiple IP addresses from a blocking/challenging rule that assesses Threat Score.

{{<table-wrap>}}

<table style="width: 100%">
  <tbody>
    <tr>
      <td colspan="2">
        <strong>
          Basic rule, with no <em>exclusion</em>
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
        <code class="InlineCode">(http.host eq "example.com" and cf.threat_score > 5)</code>
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
        <code class="InlineCode">
          (http.host eq "example.com" and cf.threat_score > 5) and not (ip.src in
          {192.0.2.1 198.51.100.42 203.0.113.0/24})</code>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <strong>Two rules to allow exceptions and block the rest</strong>
      </td>
    </tr>
    <tr>
      <td>Rule 1</td>
      <td>
        Action: <em>Allow</em>
        <br />
        Expression: <code class="InlineCode">ip.src in {192.0.2.1 198.51.100.42 203.0.113.0/24}</code>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>Block</em> (or a challenge action)
        <br />
        <code class="InlineCode">(http.host eq "example.com" and cf.threat_score > 5)</code>
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
        <strong>Basic rule, with no <em>exclusion</em></strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>Block</em> (or a challenge action)</td>
    </tr>
    <tr>
      <td>Expression</td>
      <td><code class="InlineCode">(ip.geoip.asnum in {16509 15169})</code></td>
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
        <code class="InlineCode">(ip.geoip.asnum in {16509 15169} and not cf.client.bot)</code>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <strong
          ><strong
            >Two rules to allow exceptions and block the rest</strong
          ></strong
        >
      </td>
    </tr>
    <tr>
      <td>Rule 1</td>
      <td>
        Action: <em>Allow</em><br />
        Expression: <code class="InlineCode">cf.client.bot</code>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>Block</em> (or a challenge action)<br />
        Expression: <code class="InlineCode">(ip.geoip.asnum in {16509 15169})</code>
      </td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}

## Bots

### How does Firewall Rules handle traffic from known bots?

#### Caution about potentially blocking bots

When you create a firewall rule with a _Block_, _Interactive Challenge_, _JS Challenge_, or _Managed Challenge (Recommended)_ action, you might unintentionally block traffic from known bots. Specifically, this might affect search engine optimization (SEO) and website monitoring when trying to enforce a mitigation action based on URI, path, host, ASN, or country.

Refer to [How do I create an exception to exclude certain requests from being blocked or challenged?](#how-do-i-create-an-exception-to-exclude-certain-requests-from-being-blocked-or-challenged).

#### Bots currently detected

[Cloudflare Radar](https://radar.cloudflare.com/verified-bots) lists a **sample** of known bots that Cloudflare Firewall Rules currently detects. When traffic comes from these bots and others not listed, the `cf.client.bot` field is set to true.

{{<Aside type="note">}}

There is no functional difference between known and verified bots. However, the known bots field is available for all customers, while the verified bots field is available for Enterprise customers.

{{</Aside>}}

If you need to submit a friendly bot to be verified, use [our online form](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

## Challenges

### Do the Challenge actions support content types other than HTML (for example, AJAX or XHR requests)?

No. The Managed Challenge, Interactive Challenge, and JS Challenge actions only support requests that trigger a page refresh.

Challenges presented to users display an intermediate page where they must prove they are not a bot. This concept does not work over XHR or AJAX, such as in Single Page Applications (SPA), since visitors do not trigger a new page load.

When an XHR or AJAX request triggers a Challenge action, the HTTP response will have a `403` status code.

Your application can use this status codes to handle unexpected challenges, optionally using a [Custom Error Response](/rules/custom-error-responses/) for XHR and AJAX requests instead of a Challenge action. The application could capture the custom error response and raise a challenge by, for example, triggering a page refresh.

For an additional layer of security against Credential Stuffing, you could use [Cloudflare Turnstile](/turnstile/) on the most vulnerable parts of your site (such as login or checkout forms).

### Does the 'challengeFailed' action accurately represent challenges that users did not pass?

No. The `challengeFailed` and `jschallengeFailed` firewall rule actions account for observed requests that, under special circumstances, did not pass a challenge. However, some failed challenges cannot be traced back to a firewall rule. Additionally, Cloudflare Firewall Rules may not have a record of every request with a failed challenge.

Therefore, consider these actions with caution. A reliable indicator is the [Challenge Solve Rate (CSR)](/bots/concepts/challenge-solve-rate/) displayed in **Security** > **WAF** > **Firewall rules**, which is calculated as follows: `number of challenges solved / number of challenges issued`.

### Why would I not find any failed challenges? Why is 'ChallengeIssued' not equal to 'ChallengeSolved' plus 'ChallengeFailed'?

Users do not complete all challenges. Cloudflare issues challenges that are never answered — only 2-3% of all served challenges are usually answered.

There are multiple reasons for this:

- Users give up on a challenge.
- Users try to solve a challenge but cannot provide an answer.
- Users keep refreshing the challenge, but never submit an answer.
- Cloudflare receives a malformed challenge answer.

### Why do I have matches for a firewall rule that was not supposed to match the request?

Make sure you are looking at the correct request.

Only requests that triggered a challenge will match the request parameters of the rule. Subsequent requests with a `[js]challengeSolved` or `[js]challengeFailed` action may not match the parameters of the rule — for example, the bot score may have changed because the user solved a challenge.

The "solved" and "failed" actions are informative actions about a previous request that matched a rule. These actions state that "previously a rule had matched a request with the action set to _Interactive Challenge_ or _JS Challenge_ and now that challenge was answered."
