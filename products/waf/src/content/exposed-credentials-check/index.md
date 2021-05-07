---
order: 3
---

# Automated exposed credentials check (Beta)

<Aside type='warning'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

Many web applications have suffered credential stuffing attacks in the recent past. In these attacks there is a massive number of login attempts using username/password pairs from databases of exposed credentials.

Cloudflare offers you automated checks for exposed credentials using Cloudflare Web Application Firewall (WAF).
 
The WAF provides two mechanisms for this check:

* The **Exposed Credentials Check Managed Ruleset**, which contains predefined rules for popular CMS applications. By enabling this ruleset for a given zone, you immediately enable checks for exposed credentials for these well-known applications.

* The ability to write **custom rules** for a zone that check for exposed credentials according to your criteria for specific applications.

Cloudflare updates the databases of exposed credentials supporting the exposed credentials check feature on a regular basis. The username/password credentials in clear text never leave the Cloudflare network. The WAF only uses an anonymized version of the username when determining if there are previously exposed credentials with that username.

## Available actions

The WAF can perform one of the following actions when it detects exposed credentials:

* _CF-Exposed Credentials Header_ — Adds a new HTTP header to HTTP requests with exposed credentials. Your application at the origin can then force a password reset, start a two-factor authentication process, or perform any other action. The name of the added HTTP header is `Exposed-Credential-Check` and its value is `1`.
* _Log_ — Only available on Enterprise plans. Logs requests with exposed credentials in the Cloudflare Logs. Recommended for validating a rule before committing to a more severe action.
* _Block_ — Blocks HTTP requests containing exposed credentials.
* _JS Challenge_ — Presents a Cloudflare JavaScript Captcha challenge to the clients making HTTP requests with exposed credentials.
* _Challenge (Captcha)_ — Presents a Captcha challenge to the clients making HTTP requests with exposed credentials.

<Aside type='warning' header='Important'>

Cloudflare recommends that you only use the following actions: _CF-Exposed Credentials Header_ (named `rewrite` in the API) or _Log_ (`log`).

</Aside>

## The Exposed Credentials Check Managed Ruleset 

Cloudflare WAF includes an Exposed Credentials Check Managed Ruleset, a set of pre-configured rules for well-known CMS applications that include the following:

* WordPress
* Joomla
* Drupal
* Ghost
* Plone
* Magento

Additionally, this Managed Ruleset also includes generic rules for other common patterns:

* Check forms submitted using a `POST` request containing `username` and `password` arguments
* Check credentials sent as JSON with `email` and `password` keys
* Check credentials sent as JSON with `username` and `password` keys

The default action for the rules in the Exposed Credentials Check Managed Ruleset is _CF-Exposed Credentials Header_ (named `rewrite` in the API).

<Aside type='note' header='Note'>

The Managed Ruleset contains an additional rule that blocks HTTP requests already containing the `Exposed-Credential-Check` HTTP header used by the _CF-Exposed Credentials Header_ action. These requests could be used to trick the origin into believing that a request contained (or did not contain) exposed credentials.

</Aside>

You can turn the Managed Ruleset on/off and customize the action performed by each rule when there is a match. Check [Configure exposed credentials check in the dashboard](/exposed-credentials-check/configure-dashboard) for more information.


## Exposed credentials checks in custom rules

<Aside type='warning'>

Currently, exposed credentials checks in custom rules are only available via API.

</Aside>

You can also check for exposed credentials in custom rules. One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials.

To check for exposed credentials in a custom rule, include the exposed credentials check in the rule definition and specify how to obtain the username and password values from the HTTP request.

Use the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api) to include exposed credentials check in a custom rule. For more information, see [Create a custom rule checking for exposed credentials](/exposed-credentials-check/configure-api#create-a-custom-rule-checking-for-exposed-credentials).

<Aside type='note' header='Note'>

Rules that check for exposed credentials run before Rate Limiting Rules.

</Aside>

## Availability

Exposed credentials checking is available in Beta to customers on an Enterprise plan, where it is enabled by default.
