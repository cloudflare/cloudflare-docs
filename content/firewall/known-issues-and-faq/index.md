---
title: FAQ
pcx-content-type: faq
weight: 700
meta:
  title: Firewall Rules FAQ
---

# Firewall Rules FAQ

## How many rules can I have on my site?

You can create a large number of rules. However, the number of active rules at any given time is limited. Refer to [Entitlements](/firewall/cf-firewall-rules/#entitlements) for details on what is allowed per customer plan.

## Can I purchase additional active rules?

No. The number of active rules is fixed based on customer plan. Refer to [Entitlements](/firewall/cf-firewall-rules/#entitlements).

## How are certain special and escaped characters handled?

When used as literals in an expression, the backslash `\` and double quote `"` characters require proper escaping.

An expression built using the **Visual Expression Editor** does not require you to manually escape those special characters. Conveniently, the **Expression Builder** takes care of any necessary escaping in the final expression by automatically prepending a backslash such that `\` and `"` become `\\` and `\"`, respectively.

The following image illustrates how double quotes are automatically escaped to `\"` once they appear in the plain text expression generated in the **Expression Editor**:

![Escaped characters](/firewall/static/cf-firewall-rules-character-escaping-ann.png)

## Why isn't my regular expression pattern matching working?

If you are using a regular expression, we recommend you test it against a testing tool like [Regular Expressions 101](https://regex101.com/?flavor=golang) or [Rustexp](https://rustexp.lpil.uk).

Also, note that `http.request.method` fields requires all-caps for method names.

## How can I use the Threat Score effectively?

The *Cloudflare Threat Score* is a key item behind the **Security Level** functionality in the Cloudflare dashboard.

*Threat Score* as configured by **Security Level** is based on:

*   High - for scores greater than 0
*   Medium - for scores greater than 14
*   Low - for scores greater than 24
*   Essentially off - for scores greater than 49

Enabling a high threat score for sensitive areas, like comment form pages or login forms, can add an effective level of protection. Integrating *Threat Score* with Firewall Rules is advantageous because you can specify a Captcha vs. a JS Challenge, or even a block. You can also exclude IP addresses using *and not* logic.

## How does Firewall Rules handle traffic from known bots?

### Caution about potentially blocking bots

When you create a Firewall rule with a *Block*, *Legacy CAPTCHA*, *JS Challenge*, or *Managed Challenge (Recommended)* action, you might unintentionally block traffic from known bots. Specifically, this might affect search engine optimization (SEO) and website monitoring when trying to enforce a mitigation action based on URI, path, host, ASN, or country.

Refer to [How do I create an exception to exclude certain requests from being blocked or challenged?](#how-do-i-create-an-exception-to-exclude-certain-requests-from-being-blocked-or-challenged).

### Bots currently detected

The table below lists a **sample** of known bots that Firewall Rules currently detects. When traffic comes from these bots and others not listed, the *cf.client.bot* field is set to true.

<TableWrap>
<table style="width: 100%">
    <thead>
        <tr>
            <th>Bot</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>ahrefs</p>
            </td>
            <td>
                <p>Ahrefs SEO bot</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>apple</p>
            </td>
            <td>
                <p>Applebot is the web crawler for Apple, for products like Siri and Spotlight Suggestions</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>archive.org</p>
            </td>
            <td>
                <p>Archive.org bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>baidu</p>
            </td>
            <td>
                <p>Baidu search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>better uptime</p>
            </td>
            <td>
                <p>Bot for monitoring website uptime</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>bing</p>
            </td>
            <td>
                <p>Bing search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>feedbin</p>
            </td>
            <td>
                <p>Feedbin.com bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>google</p>
            </td>
            <td>
                <p>Google search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>grapeshot</p>
            </td>
            <td>
                <p>Grapeshot (Oracle) SEO bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>linkedin</p>
            </td>
            <td>
                <p>LinkedIn bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>mail.ru</p>
            </td>
            <td>
                <p>Mail.ru bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>naver</p>
            </td>
            <td>
                <p>Naver (South Korean) search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>pingdom</p>
            </td>
            <td>
                <p>Pingdom.com monitoring bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>pinterest</p>
            </td>
            <td>
                <p>Pinterest bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>seznam</p>
            </td>
            <td>
                <p>Seznam search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>sogou</p>
            </td>
            <td>
                <p>Sogou search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>uptimerobot</p>
            </td>
            <td>
                <p>Uptime Robot monitoring bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>yahoo</p>
            </td>
            <td>
                <p>Yahoo! search engine bots</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>yandex</p>
            </td>
            <td>
                <p>Yandex search engine bots</p>
            </td>
        </tr>
    </tbody>
</table>
</TableWrap>

## How do I create an exception to exclude certain requests from being blocked or challenged?

There may be situations in which you want to enforce a blocking or challenging action but make exceptions for specific types of requests.

Cloudflare supports two methods to permit requests through Firewall Rules expressions:

1.  Exclude a type of request from being blocked or challenged, for example based on IP address, ASN, or country
2.  Create an independent Firewall rule with an *Allow* action

<Aside type='note' header='Note'>

Cloudflare Firewall Rules does not bypass security measures defined in other **Firewall** app features.

</Aside>

If you wish to permit certain exclusions, the examples below illustrate a few possible approaches.

### Example 1

Exclude multiple IP addresses from a blocking/challenging rule that assesses Threat Score

<TableWrap>
<table style="width: 100%">
  <tbody>
    <tr>
      <td colspan="2">
        <strong>Basic rule, with no <em>exclusion</em></strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>block (or challenge)</em></td>
    </tr>
    <tr>
      <td>Expression</td>
      <td><em>(http.host eq "example.com" and cf.threat_score &gt; 5)</em></td>
    </tr>
    <tr>
      <td colspan="2">
        <strong
          >Rule that excludes IP addresses from being blocked/challenged</strong
        >
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>block (or challenge)</em></td>
    </tr>
    <tr>
      <td>Expression</td>
      <td>
        <em
          >(http.host eq "example.com" and cf.threat_score &gt; 5) and not
          (ip.src in {'{192.0.2.1 198.51.100.42 203.0.113.0/24}'})</em
        >
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
        Action: <em>allow</em><br />
        Expression: <em>ip.src in {'{192.0.2.1 198.51.100.42 203.0.113.0/24}'}</em>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>block (or challenge)</em><br />
        <em>(http.host eq "example.com" and cf.threat_score &gt; 5)</em>
      </td>
    </tr>
  </tbody>
</table>

</TableWrap>

### Example 2

Block Amazon Web Services (AWS) and Google Cloud Platform (GCP) because of large volumes of undesired traffic, but allow Googlebot and other known bots that Cloudflare validates

<TableWrap>
<table style="width: 100%">
  <tbody>
    <tr>
      <td colspan="2">
        <strong>Basic rule, with no <em>exclusion</em></strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>block (or challenge)</em></td>
    </tr>
    <tr>
      <td>Expression</td>
      <td><em>(ip.geoip.asnum in {'{7224 15169}'})</em></td>
    </tr>
    <tr>
      <td colspan="2">
        <strong>Rule that excludes known bots that Cloudflare validates</strong>
      </td>
    </tr>
    <tr>
      <td>Action</td>
      <td><em>block (or challenge)</em></td>
    </tr>
    <tr>
      <td>Expression</td>
      <td>
        <em>(ip.geoip.asnum in {'{7224 15169}'}) and not cf.client.bot)</em>
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
        Action: <em>allow</em><br />
        Expression: <em>cf.client.bot</em>
      </td>
    </tr>
    <tr>
      <td>Rule 2</td>
      <td>
        Action: <em>block (or challenge)</em><br />
        Expression: <em>(ip.geoip.asnum in {'{7224 15169}'})</em>
      </td>
    </tr>
  </tbody>
</table>
</TableWrap>

## Why does a Firewall Event display a Cloudflare IP address even though other fields match the client details?

This happens when a request goes through a Cloudflare Worker.

In this case, Cloudflare considers the client details, including its IP address, for triggering security settings. However, the IP displayed in the Firewall Events will be a Cloudflare IP address.

## Do the Challenge actions support content types other than HTML (for example, AJAX or XHR requests)?

No. The *Legacy CAPTCHA* and *JS Challenge* actions only support HTML requests.

Challenges presented to users display an intermediate page where they must prove they are not a bot. This concept does not work over XHR or AJAX.

When an XHR or AJAX request triggers one of the *Legacy CAPTCHA* actions, the resulting request will have the following status code:

*   HTTP status code 403 for *Legacy CAPTCHA*
*   HTTP status code 503 for *JS Challenge*

Your application can use these status codes to handle unexpected challenges.

## Does the 'challengeFailed' action accurately represent challenges that users did not pass?

No. The `challengeFailed` and `jschallengeFailed` Firewall actions account for observed requests that, under special circumstances, did not pass a challenge. However, some failed challenges cannot be traced back to a Firewall rule. Additionally, the Firewall may not have a record of every request with a failed challenge.

Therefore, consider these actions with caution. A reliable indicator is the [CSR (Challenge Solve Rate)](/firewall/cf-firewall-rules/#challenge-solve-rate-csr) displayed in **Firewall Rules**, which is calculated as follows: `number of challenges solved / number of challenges issued`.

## Why would I not find any failed challenges? Why is 'ChallengeIssued' not equal to 'ChallengeSolved' plus 'ChallengeFailed'?

Users do not complete all challenges. Cloudflare issues challenges that are never answered — only 2-3% of all served challenges are usually answered.

There are multiple reasons for this:

*   Users give up on a challenge.
*   Users try to solve a challenge but cannot provide an answer.
*   Users keep refreshing the challenge but never submit an answer.
*   Users keep retrying hCaptcha (CAPTCHA failures in hCaptcha are not registered as failed and represent interim failures).
*   Cloudflare receives a malformed challenge answer.

## Why do I have matches for a Firewall Rule that was not supposed to match the request?

Make sure you are looking at the correct request.

Only requests that triggered a challenge will match the request parameters of the rule. Subsequent requests with a `[js]challengeSolved` or `[js]challengeFailed` action may not match the parameters of the rule — for example, the bot score may have changed because the user solved a CAPTCHA.

The "solved" and "failed" actions are informative actions about a previous request that matched a rule. These actions state that "previously a rule had matched a request with the action set to *Legacy CAPTCHA* or *JS Challenge* and now that challenge was answered".
