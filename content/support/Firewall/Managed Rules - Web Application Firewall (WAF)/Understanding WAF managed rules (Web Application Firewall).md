---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-WAF-managed-rules-Web-Application-Firewall-
title: Understanding WAF managed rules (previous version)
---

# Understanding WAF managed rules (previous version)



## Overview

Managed rules, a feature of Cloudflare WAF (Web Application Firewall), identifies and removes suspicious activity for HTTP GET and POST requests.

{{<Aside type="note">}}
-   This page contains documentation about the previous implementation
    of WAF managed rules. For more information on the new version, refer
    to [WAF Managed
    Rules](/waf/managed-rules/) in the
    developer documentation.
-   All customers with access to the previous version of WAF managed
    rules (described in this page) can now [migrate to the new version
    of WAF Managed
    Rules](https://support.cloudflare.com/hc/articles/5995821690637).
-   The new WAF Managed Rules provide the [Cloudflare Free Managed
    Ruleset](/waf/managed-rules/) to
    all customers, including customers on a Free plan. Refer to the
    [announcement blog
    post](https://blog.cloudflare.com/waf-for-everyone/) for details.
{{</Aside>}}

Examples of [malicious content](https://www.cloudflare.com/learning/security/what-is-web-application-security/) that managed rules identify include: 

-   Common keywords used in comment spam (_XX_, _Rolex_, _Viagra_, etc.), 
-   cross-site scripting attacks (XSS), and 
-   SQL injections (SQLi).

Managed rules are available to Pro, Business, and Enterprise plans for any [subdomains proxied to Cloudflare](https://support.cloudflare.com/hc/articles/200169626). Control managed rules settings in **Security** > **WAF** > **Managed rules**. Managed rules includes three packages: 

-   **Cloudflare Managed Ruleset** 
-   **Package: OWASP ModSecurity Core Rule Set**
-   **Customer Requested Rules** 

Review threats blocked via the [Security Events](/waf/security-events/)' **Activity log** available in **Security** > **Events**.

### Important considerations

-   Managed rules introduce a limited amount of latency. 
-   Changes to WAF managed rules take about 30 seconds to update globally.
-   Cloudflare uses proprietary rules to filter traffic. 
-   Established Websockets do not trigger managed rules for subsequent requests.
-   Managed rules parse JSON responses to identify vulnerabilities targeted at APIs. JSON payload parsing is limited to 128 KB.
-   Managed rules mitigate padding techniques. We recommend the following:
    1.  Turn on rule _100048_. This rule now protects against padding type attacks, but it is not deployed by default as it causes many false positives in customer environments. It is, however, important that customers tune their managed rules configuration. Cloudflare is working on a better long term solution.
    2.  Create a firewall rule using the [Expression Editor](/firewall/cf-dashboard/edit-expressions/#expression-editor) depending on the need to check headers and/or body to block larger payload (> 128 KB). Make sure to test your firewall rule in _Log_ mode first as it could be prone to generating false positives.
        -   _http.request.body.truncated_
        -   _http.request.headers.truncated_
-   There are a handful of managed rules that Cloudflare does not disable even if **Managed rules** is turned _Off_ in the Cloudflare dashboard, such as rule IDs _WP0025B_, _100043A_, and _100030._

___

## A note about false positives and false negatives

By default, WAF managed rules are fully managed via the Cloudflare dashboard and are compatible with most websites and web applications. However, false positives and false negatives are possible considering the immense Internet:

-   **False positives**: Legitimate requests detected and filtered as malicious.
-   **False negatives**: Malicious requests not filtered.

### Troubleshoot WAF managed rules false positives

The definition of suspicious content is subjective for each website.  For example, PHP code posted to your website is suspicious unless your website teaches how to code and requires PHP code submissions from visitors.  Therefore, such a website must disable related managed rules that interfere with normal operation.

To test for false positives, set WAF managed rules to **Simulate** mode, to record the response to possible attacks without challenging or blocking. Also, use the Firewall Analytics [**Activity log**](/waf/security-events/paid-plans#activity-log) to determine which managed rules caused false positives.

If you encounter a false positive due to the [legacy WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-the-Cloudflare-Web-Application-Firewall-WAF-), there are several potential resolutions:

-   **Add the client’s IP addresses to the** [**IP Access Rules**](https://support.cloudflare.com/hc/articles/217074967) **allowlist:** If the browser or client visits from the same IP addresses, allowing is recommended. 
-   **Disable the corresponding** [**managed rule(s**](https://support.cloudflare.com/hc/articles/200172016)): Stops blocking or challenging false positives, but reduces overall site security. A request blocked by Rule ID _981176_ refers to OWASP rules. Decrease OWASP sensitivity to resolve the issue.
-   **Bypass WAF managed rules with a firewall rule:** Create a Firewall Rule with the **bypass** action to deactivate WAF managed rules for a specific combination of parameters. For example, [bypass managed rules](/firewall/cf-firewall-rules/actions/) for a specific URL and a specific IP address or user agent.
-   **(not recommended) Disable WAF managed rules for traffic to a URL:**  Lowers security on the particular URL endpoint.  Configured via [Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-).

If you encounter a false positive due to the [new WAF](https://blog.cloudflare.com/new-cloudflare-waf/), there are several potential resolutions:

1.  **Add WAF Exception:** You can define WAF exceptions in the [Cloudflare dashboard](/waf/managed-rules//waf-exceptions/define-dashboard) or using the [Rulesets API](/waf/managed-rules/waf-exceptions/define-api).
2.  **Disable the corresponding** [**managed rule(s**](https://support.cloudflare.com/hc/articles/200172016)): Stops blocking or challenging false positives, but reduces overall site security. A request blocked by Rule ID _949110_ refers to the [new OWASP rules](https://blog.cloudflare.com/new-cloudflare-waf/). Decrease OWASP sensitivity to resolve the issue.

**Note:** If [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) to verify whether a WAF managed rule triggers as expected, [provide a HAR file](https://support.cloudflare.com/hc/articles/203118044#h_8c9c815c-0933-49c0-ac00-b700700efce7) captured while sending the specific request of concern.

Additional guidelines are as follows:

-   If one specific rule causes false positives, set rule’s **Mode** to _Disable_ rather than turning _Off_ the entire rule **Group**.
-   For false positives with the administrator content on your website, create a [**Page Rule**](https://support.cloudflare.com/hc/articles/218411427) to **Disable Security** for the _admin_ section of your site resources, i.e. _yoursite.com/admin_.

### Troubleshoot WAF managed rules false negatives

To identify false negatives, review the HTTP logs on your origin web server. To reduce false negatives, use the following checklist:

-   Are WAF managed rules _enabled_ in **Security** > **WAF** > **Managed rules**?
-   Are WAF managed rules being _disabled_ via [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)?
-   Not all managed rules are enabled by default, so review individual managed rule default actions.
    -   For example, Cloudflare allows requests with empty user agents by default. To block requests with an empty user agent, change the rule **Mode** to **Block**
    -   Another example, if you are looking to block unmitigated SQL injection attacks, make sure the relevant SQLi rules are enabled and set to **Block** under the **Cloudflare Specials** group.
-   Are DNS records that serve HTTP traffic proxied through Cloudflare?
-   Is a [**firewall rule** bypassing](/firewall/cf-firewall-rules/actions/#supported-actions) managed rules? 
-   Does an allowed country, ASN, IP range, or IP in [**IP access rules**](https://support.cloudflare.com/hc/articles/217074967) or [**firewall rules**](/firewall/cf-firewall-rules/) match the attack traffic?
-   Is the malicious traffic directed at your origin IP addresses to bypass Cloudflare protection? Block all traffic except from [Cloudflare's IP addresses](https://www.cloudflare.com/ips/) at your origin web server.

___

## Cloudflare Managed Ruleset

The **Cloudflare Managed Ruleset** contains security rules written and curated by Cloudflare. Click on a ruleset name under **Group** to reveal the rule descriptions. 

**Cloudflare Specials** is a **Group** that provides core firewall security against [common attacks](https://www.cloudflare.com/learning/security/what-is-web-application-security/).   

{{<Aside type="tip">}}
Cloudflare recommends that you always leave **Cloudflare Specials**
enabled. Additionally, only enable rule groups that correspond to your
technology stack. For example, if you use WordPress, enable the
**Cloudflare WordPress** group.
{{</Aside>}} 

When viewing a ruleset, Cloudflare shows default actions for each rule listed under **Default mode**. The **Mode** available for individual rules within a specific **Cloudflare** **Managed Ruleset** are:

-   _Default - takes the default action listed under_ _**Default mode**_ _when viewing a specific rule._
-   _Disable -_ turns off the specific rule within the group**.**
-   _Block_ - the request is discarded. 
-   _Interactive Challenge_ - the visitor receives a challenge page that requires interaction.
-   _Simulate_ - the request is allowed through but is logged in the [**Activity log**](/waf/security-events/paid-plans#activity-log).

Cloudflare’s [WAF changelog](/waf/change-log/scheduled-changes/) allows customers to monitor ongoing changes to the **Cloudflare Managed Ruleset.**

___

## Package: OWASP ModSecurity Core Rule Set

### Understand Cloudflare’s OWASP package

**Package: OWASP ModSecurity Core Rule Set** assigns a score to each request based on how many OWASP rules trigger. Some OWASP rules have a higher sensitivity score than others. After OWASP evaluates a request, Cloudflare compares the final score to the **Sensitivity** configured for the domain.  If the score exceeds the **Sensitivity**, the request is actioned based on the **Action** configured within **Package: OWASP ModSecurity Core Rule Set**:

-   _Block_ - the request is discarded.
-   _Challenge_ - the visitor receives an interactive challenge page.
-   _Simulate_ - the request is allowed through but is logged in the [**Activity log**](/waf/security-events/paid-plans#activity-log).

The sensitivity score required to trigger the WAF for a specific **Sensitivity** is as follows:

-   _Low_ - 60 and higher
-   _Medium_ - 40 and higher
-   _High_ - 25 and higher

For Ajax requests, the following scores are applied instead:

-   _Low_ - 120 and higher
-   _Medium_ - 80 and higher
-   _High_ - 65 and higher

Review the [Activity log](/waf/security-events/paid-plans#activity-log) for the final score as well as the individual triggered rules.

### Control Cloudflare’s OWASP package

**Package: OWASP ModSecurity Core Rule Set** contains several rules from the [OWASP project](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project). Cloudflare does not write or curate OWASP rules.  Click on a ruleset name under **Group** to reveal the rule descriptions.  Unlike the **Cloudflare Managed Ruleset**, specific OWASP rules are either turned _On_ or _Off._

To manage OWASP thresholds, set the **Sensitivity** to _Low_, _Medium_, or _High_ under **Package: OWASP ModSecurity Core Rule Set**. Setting the **Sensitivity** to _Off_ will disable the entire OWASP package including all its rules. Determining the appropriate **Sensitivity** depends on your business industry and operations. For instance, a _Low_ setting is appropriate for:

-   Certain business industries more likely to trigger the WAF, and
-   large file uploads. 

{{<Aside type="tip">}}
With a *High* **Sensitivity**, large file uploads trigger the WAF.
{{</Aside>}}

Cloudflare recommends initially setting the **Sensitivity** to _Low_ and reviewing for false positives before further increasing the **Sensitivity**.

{{<Aside type="note">}}
The Activity log displays **Rule ID** *981176* (legacy OWASP) or
*949110* ([new OWASP](https://blog.cloudflare.com/new-cloudflare-waf/))
when a request is blocked by OWASP. Also, some OWASP rules listed in the
Activity log do not appear in the list of rules under **Package: OWASP
ModSecurity Core Rule Set** because disabling those rules is not
recommended.
{{</Aside>}}

___

## Related resources

-   [Security Events](/waf/security-events/)
-   [Cloudflare Firewall Rules](/firewall/cf-firewall-rules/)
-   [Cloudflare’s WAF changelog](/waf/change-log/scheduled-changes/)
