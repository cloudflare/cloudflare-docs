---
pcx-content-type: concept
order: 4
---

# DDoS L7 Attack Mitigation (Beta)

<Aside type='warning'>

This feature is available for all customers, but only selected customers on an Enterprise plan may override the Managed Ruleset.

</Aside>

The DDoS L7 Attack Mitigation Managed Ruleset allows you to have more control over a subset of Cloudflare's mitigation rules. You can configure the performed action when an attack is detected and the sensitivity of attack detection mechanisms. This Managed Ruleset also provides additional information in the Firewall dashboard on the types of attacks detected for a specific zone.

By default, Cloudflare mitigation systems and the WAF will apply the actions from this Managed Ruleset for all customers, regardless of plan level. However, only certain customers may override the rules in the Managed Ruleset.

## Available actions

The WAF can perform one of the following actions when an L7 DDoS attack is detected:

* _Log_ — Only available on Enterprise plans. Logs requests that match the expression of a rule detecting layer-7 DDoS attacks. Recommended for validating a rule before committing to a more severe action.
* _Block_ — Blocks HTTP requests that match the rule expression.
* _Challenge (Captcha)_ — Presents a CAPTCHA challenge to the clients making HTTP requests that match a rule expression.
* _Force Connection Close_ — Closes ongoing HTTP connections. The performed action depends on the HTTP version:
    * HTTP/1: set the [`Connection` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#directives) to `close`.
    * HTTP/2: send a [`GOAWAY` frame](https://datatracker.ietf.org/doc/html/rfc7540#section-6.8) to the client.
    * HTTP/3: not supported.
* _DDoS Dynamic_ — Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be one of the above or an undisclosed mitigation action.

<Aside type='warning' header='Important'>

You cannot set the rule action to _Log_ using overrides for rules with the `gatebot` category or any rule whose `id` starts with `GB`.

However, you can use the _Log_ action in global override. In this case, any rule with the `gatebot` category or whose `id` starts with `GB` will ignore the override and use the default action as defined in the Managed Ruleset.

</Aside>

## The DDoS L7 Attack Mitigation Managed Ruleset

<Aside type='warning'>

Currently, you can only override rules of the DDoS L7 Attack Mitigation Managed Ruleset via API.

</Aside>

Cloudflare WAF includes the DDoS L7 Attack Mitigation Managed Ruleset, a set of pre-configured rules used to match known DDoS attack vectors at the application layer on the edge, like the following:

* Credential stuffing attacks
* Requests causing large amounts of origin errors
* Excessive traffic hitting origin
* Excessive traffic hitting cache
* Abuse of search features
* Many other attack vectors

Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

## Availability

The DDoS L7 Attack Mitigation feature is available in Beta to all customers.

However, only customers on an Enterprise plan can customize the behavior of the DDoS L7 Attack Mitigation Managed Ruleset using overrides.
