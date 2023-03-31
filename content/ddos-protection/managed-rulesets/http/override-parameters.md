---
title: Parameters
pcx_content_type: reference
weight: 6
meta:
  title: HTTP DDoS Attack Protection parameters
---

# Ruleset parameters

Configure the HTTP DDoS Attack Protection managed ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can [configure the managed ruleset in the Cloudflare dashboard](/ddos-protection/managed-rulesets/http/configure-dashboard/) or [define overrides via Rulesets API](/ddos-protection/managed-rulesets/http/configure-api/).

The available parameters are the following:

- [Action](#action)
- [Sensitivity Level](#sensitivity-level)

## Action

API property name: `"action"`.

The action that will be performed for requests that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

{{<definitions>}}

- **Block**

  - API value: `"block"`.
  - Blocks HTTP requests that match the rule expression.

- **Managed Challenge**

  - API value: `"managed_challenge"`.
  - [Managed Challenges](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended) help reduce the lifetimes of human time spent solving Captchas across the Internet. Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge based on specific criteria.

- **Interactive Challenge**

  - API value: `"challenge"`.
  - Presents an interactive challenge to the clients making HTTP requests that match a rule expression.

- **Log**

    - API value: `"log"`.
    - Only available on Enterprise plans with the Advanced DDoS Protection subscription. Logs requests that match the expression of a rule detecting HTTP DDoS attacks. Recommended for validating a rule before committing to a more severe action.

{{<Aside type="note">}}

You cannot configure the rule action to _Log_ for rules with the `gatebot` tag.

However, you can use the _Log_ action in the global ruleset configuration. In this case, any rule with the `gatebot` tag will ignore the ruleset configuration and use the default action as defined in the managed ruleset. To prevent `gatebot` rules from executing their default action in _Log_ mode, set the sensitivity level of these rules to _Essentially Off_.

{{</Aside>}}

- **Connection Close**

  - API value: _N/A_ (internal rule action that you cannot use in overrides).
  - The client is instructed to establish a new connection (by disabling `keep-alive`) instead of reusing the existing connection. Existing requests are not affected.

- **Force Connection Close**

  - API value: _N/A_ (internal rule action that you cannot use in overrides).
  - Closes ongoing HTTP connections. This action does not block a request, but it forces the client to reconnect. For HTTP/2 and HTTP/3 connections, the connection will be closed even if it breaks other requests running on the same connection.
  - The performed action depends on the HTTP version:

    - HTTP/1: set the [`Connection` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection#directives) to `close`.
    - HTTP/2: send a [`GOAWAY` frame](https://datatracker.ietf.org/doc/html/rfc7540#section-6.8) to the client.

- **DDoS Dynamic**
  - API value: _N/A_ (internal rule action that you cannot use in overrides).
  - Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be one of the above or an undisclosed mitigation action.

{{</definitions>}}

## Sensitivity Level

{{<render file="managed-rulesets/_sensitivity-level-reference.md">}}
