---
title: FAQ
pcx_content_type: faq
weight: 10
---

# WAF FAQ

## Why does a security event display a Cloudflare IP address even though other fields match the client details?

This happens when a request goes through a Cloudflare Worker.

In this case, Cloudflare considers the client details, including its IP address, for triggering security settings. However, the IP displayed in [Security Events](/waf/analytics/security-events/paid-plans/) will be a Cloudflare IP address.

## Do I need to escape certain characters in expressions?

Yes, you may have to escape certain characters in expressions. The exact escaping will depend on the string syntax you use:

* If you use the raw string syntax (for example, `r#"this is a string"#`), you will only need to escape characters that have a special meaning in regular expressions.
* If you use the quoted string syntax (for example, `"this is a string"`), you need to perform additional escaping, such as escaping special characters `"` and `\` using `\"` and `\\`, both in literal strings and in regular expressions.

For more information on string syntaxes and escaping, refer to [String values and regular expressions](/ruleset-engine/rules-language/values/#string-values-and-regular-expressions).

## Why is my regular expression pattern not working?

If you are using a regular expression, it is recommended that you test it with a tool such as [Regular Expressions 101](https://regex101.com/?flavor=rust&regex=) or [Rustexp](https://rustexp.lpil.uk).

## How do I exclude certain requests from being blocked or challenged?

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


## How does the WAF handle traffic from known bots?

### Caution about potentially blocking bots

When you create a WAF custom rule with a _Block_, _Interactive Challenge_, _JS Challenge_, or _Managed Challenge (Recommended)_ action, you might unintentionally block traffic from known bots. Specifically, this might affect search engine optimization (SEO) and website monitoring when trying to enforce a mitigation action based on URI, path, host, ASN, or country.

Refer to [How do I exclude certain requests from being blocked or challenged?](#how-do-i-exclude-certain-requests-from-being-blocked-or-challenged).

### Bots currently detected

[Cloudflare Radar](https://radar.cloudflare.com/verified-bots) lists a **sample** of known bots that the WAF currently detects. When traffic comes from these bots and others not listed, the `cf.client.bot` field is set to `true`.

To submit a friendly bot to be verified, go to the [**Verified bots**](https://radar.cloudflare.com/traffic/verified-bots) page in Cloudflare Radar and select **Add a bot**.

For more information on verified bots, refer to [Bots](/bots/concepts/bot/).

{{<Aside type="note">}}
There is no functional difference between known and verified bots. However, the known bots field (`cf.client.bot`) is available for all customers, while the verified bots field (`cf.bot_management.verified_bot`) is available for Enterprise customers.
{{</Aside>}}
