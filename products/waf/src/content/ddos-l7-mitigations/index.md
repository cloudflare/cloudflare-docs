---
pcx-content-type: concept
order: 4
---

# DDoS L7 Attack Mitigation (Beta)

<Aside type='warning'>

This feature is available for all customers, but only selected customers on an Enterprise plan may override the Managed Ruleset.

</Aside>

Cloudflare systems work 24/7 around the clock to mitigate attacks of all types against millions of websites.

Traditionally, mitigation methods and attack vectors have not been shared with customers publicly, but we have created the `ddos_l7` Managed Ruleset and populated it with a subset of our mitigation rules in order to provide customers with more control over both the action taken when an attack is detected and the sensitivity to be used when looking for attacks. The phase also provides more observability into the types of attacks seen against a specific zone in the firewall dashbaord.
 
By default Cloudflare mitigation systems and the WAF will apply the actions from this Managed Ruleset for all customers, regardless of plan level, but only certain customers may override the rules in the Managed Ruleset.

Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

## Available actions

The WAF can perform one of the following actions when an L7 DDoS attack is detected:

* _Log_ — Only available on Enterprise plans. Logs requests that match a respective rule; recommended for validating a rule before committing to a more severe action.
* _Block_ — Blocks HTTP requests that match a respective rule.
* _Challenge (Captcha)_ — Presents a Captcha challenge to the clients making HTTP requests that match a respective rule.
* _Force Connection Close_ - Used to close ongoing HTTP connections. The exact actions taken is based on the HTTP version is shown below...
    * HTTP/1: set the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#directives">Connection header</a> to `close`.
    * HTTP/2: send a <a href="https://datatracker.ietf.org/doc/html/rfc7540#section-6.8">GOAWAY frame</a> to the client
    * HTTP/3: not supported
* _DDoS Dynamic_ - Used as a sort of "Chef's Choice" by the DOS team. This action on the backend may use any of the above mitigation methods plus some not published to the ruleset.

<Aside type='warning' header='Important'>

While the _Log_ action can be used as the action for overriding most rules, it cannot be used as the action for overrides of the `gatebot` category or for any rule IDs with a prefix of `GB`. However, it is possible to use the _Log_ action for a global override but any rule that is part of the category `gatebot` or with a rule ID with a prefix of `GB` will ignore this override and resort to using the default action as published in the managed ruleset.

</Aside>

## The DDoS L7 Attack Mitigation Managed Ruleset

<Aside type='warning'>

Currently, the `ddos_l7` phase may only be overridden via API.

</Aside>

Cloudflare WAF includes a DDoS L7 Attack Mitigation Managed Ruleset, a set of pre-configured rules used to match known DDoS attack vectors at the application layer on the edge:

* Credential stuffing attacks
* Requests causing large amounts of origin errors
* Excessive traffic hitting origin
* Excessive traffic hitting cache
* Abuse of search features
* Many other attack vectors

The majority of the rules exposed to customers are ones that will be applied by our new "on-the-edge" mitigation system while a select few are part of the <a href="https://blog.cloudflare.com/meet-gatebot-a-bot-that-allows-us-to-sleep/">Gatebot mitigation system</a>.

## Availability

The DDoS L7 Attack Mitigation ruleset is available in Beta to customers on an Enterprise plan, where it is enabled by default.
