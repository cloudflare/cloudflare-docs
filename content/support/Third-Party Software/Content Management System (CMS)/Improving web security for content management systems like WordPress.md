---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169526-Improving-web-security-for-content-management-systems-like-WordPress
title: Improving web security for content management systems like WordPress
---

# Improving web security for content management systems like WordPress



## Overview

Content Management Systems make it easy to create, update, and manage content. However, they can also introduce vulnerabilities that may lead to server compromise and data theft.

There are many Cloudflare features that can be used for preventing such attacks, but they can also disrupt normal administrative processes such as logging in or uploading images. With proper configuration, you can protect your site from attacks without losing important functionality.

___

## Stage One: Improve Site Security

In this stage, you are reinforcing the zone’s security features, which may cause additional disruption to admin features until exceptions can be applied. For that reason, it’s recommended to make these changes with expected administrative downtime. 

The following should be considered an overview of some recommended security actions, and not a comprehensive guide. Refer to the developer documentation for specific products or features for more information.

### Cloudflare Managed Rulesets

The [WAF Managed Rulesets](/waf/managed-rules/) are pre-configured rulesets that provide immediate protection against a variety of attacks, and are regularly updated. Many rules are turned on by default, but not all. It is recommended that you browse the Cloudflare Managed Ruleset to find any additional rules tagged for your content management system not enabled, and enable them:

![Dashboard screenshot filtering for WordPress](/support/static/Wordpress-configure-deployment.png)

### Managed Rulesets on the Free Plan

While the feature to customize these managed rulesets required a paid plan, the [Free Cloudflare Managed Ruleset](https://blog.cloudflare.com/waf-for-everyone/#the-free-cloudflare-managed-ruleset) is automatically deployed on any new Cloudflare zone. This ruleset is specially designed to reduce false positives to a minimum across a very broad range of traffic types. As of today, the ruleset contains the following rules:

-   Log4J rules matching payloads in the URI and HTTP headers;
-   Shellshock rules;
-   Rules matching very common WordPress exploits;

Additionally, you can configure many aspects of the [OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/), including the anomaly threshold, paranoia level, and individual rules. One good practice is to ensure any rules related to XSS and SQL injection are enabled.

___

## Stage Two: Restore Administrative Functions

Using the principle of least privilege, you can run some test actions from the admin panel to audit what is blocked and what is allowed. With this information, you can create precise exceptions. If the behavior doesn’t match your expectations, make sure to check that:

1.  The DNS record is proxied
2.  You don’t have any Rules that would interfere with the WAF (like a Page Rule that is set to Disable Security)

After generating enough requests to have a good sample logged in your Firewall Events, observe the actions that were taken in the Managed rules section:

![](/support/static/Screenshot_2022-12-23_at_16.40.29.png)

Next, you can use this information to create a Skip Rule that excludes only the rules that prevent administrative actions:

![](/support/static/Screenshot_2022-12-22_at_13.49.18.png)

### When incoming requests match…

It is recommended to make this rule as tightly defined as possible, particularly without the additional protections listed below. While the exact content will be site-specific, some possible fields to use are:

-   IP Source Address
-   AS Num
-   Cookie
-   User Agent

Make sure to apply the rule _only_ to the admin portion of your CMS. With WordPress for example, you can set a condition like '_URI Path contains /wp-admin/_'.

Any of these fields can be spoofed, so this is not a security measure on its own. The purpose is to restore administrative functions only to conditions that may need them, while using other tools and features (including strong passwords on your CMS logins!) to secure access.

### Skip specific rules from a Managed Ruleset

Next, you want to use the information from your Firewall logs to select which rules to skip by [adding an exception](/waf/custom-rules/skip/). For WordPress, I’ve chosen the following:

![](/support/static/Screenshot_2022-12-23_at_17.08.37.png)

After this is complete, you will want to create a similar rule for any rulesets that prevent you from logging in. In my use case, I only needed to skip “OWASP Core Ruleset 949110.”

**Note:** You may also want to consider adding a rule to skip the CMS-specific rules you enabled for non-CMS sections of your site if they cause any issues. Just follow the steps above, and set it to skip any of the Cloudflare Managed Ruleset rules that were enabled above. You can set this based on hostname, URI, or cookie, using the operators **does not equal, does not match,** or **does not contain**.

Make sure to set your Skip rules to be at a higher priority than the Execute rules.

___

## Stage Three: Restrict Access

Now that you’ve elevated your security to protect the publicly accessible parts of your site against attacks and restored necessary administrative capabilities, you can further restrict who can access your admin panel in case of weak or exposed login credentials.

### Zero Trust

[Zero Trust](https://www.cloudflare.com/plans/zero-trust-services/) Web Applications is the best way to limit access to your admin panel. You can restrict access based on user instead of device, and it allows for very granular control. Setup of a Self-hosted web application is very easy, for more information refer to the [Self-hosted applications](/cloudflare-one/applications/configure-apps/self-hosted-apps/) section of the Zero Trust developer documentation.

After configuring a web application, users will be required to authenticate in some way before they can access the restricted content. The default method is through email multifactor authentication:

![](/support/static/Screenshot_2022-12-22_at_14.39.21.png)

### Advanced Firewall Rules with mTLS

While designed for authenticating appliances that can’t perform a log in, you can use mTLS as another method of multifactor authentication (what you know and what you have) to authenticate based on device certificate. To do this, you need to:

1.  [Create a Client Certificate](/ssl/client-certificates/create-a-client-certificate/) and save both the certificate and key to your device
2.  Import the certificate to your computer’s key storage. With macOS Keychain, you can use the steps listed here: [mTLS - Test in the Browser](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-in-the-browser).
3.  [Enable mTLS](/ssl/client-certificates/enable-mtls/) by adding the correct host
4.  Under Firewall rules, Create mTLS Rule
5.  Select **Use firewall rule builder** to narrow the scope of this rule to the admin section, otherwise you will block your visitors from accessing the public content.
6.  Set the rule to Block any requests made to your admin panel if the Client Certificate is not verified.

**Note:** if you have issues getting your certificate to verify, try accessing the page in a private window. If it works, the previous successful TLS state may be cached in your browser.

### Rate Limiting

Rate limiting rules can help protect your login page from an attacker trying to guess your account password with a [brute force attack](https://www.cloudflare.com/learning/bots/brute-force-attack/). You can define rate limits for requests matching an expression, as well as the action to perform when those rate limits are reached. 

Rate Limiting Rules are now available unmetered, on all plans. For more information, refer to the [developer documentation](/waf/rate-limiting-rules/).

___

## Resources

-   [WAF Managed Rules](/waf/managed-rules/)
-   [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/)
-   [Configure a custom rule with the Skip action](/waf/custom-rules/skip/)
-   [Zero Trust Services](https://www.cloudflare.com/plans/zero-trust-services/)
-   [Client certificates](/ssl/client-certificates/)
-   [Rate limiting rules](/waf/rate-limiting-rules/)
