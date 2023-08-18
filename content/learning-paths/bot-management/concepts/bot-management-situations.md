---
title: When to use bot management
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

There are several ways that bots can affect your application, depending on the nature of your application and its expected traffic.

Bot management is particularly useful in situations where you need to distinguish between legitimate human traffic and bots performing relatively innocent actions, but at scale.

## When you expect human traffic

When you expect human traffic headed towards your application, there are two main categories of abuse.

### Malicious actions

Purely malicious traffic attempts to take your application offline. A common example of this is a [Distributed Denial of Service (DDoS) attack](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), where an attacker sends junk traffic to overwhelm a target or its surrounding infrastructure with a flood of Internet traffic.

Cloudflare automatically mitigates these kinds of security risks with our [WAF](/waf/) and [DDoS](/ddos-protection/) protection.

### Innocent actions, done at scale

Actions such as submitting a username and password or filling out a form are not malicious actions in themselves, but they become that way if done in an automated fashion.

{{<render file="_bot-types-attacks.md" productFolder="bots">}}

This is the prime use case for bot management, because action itself is innocent, but you want to distinguish between legitimate humans and bots impersonating humans.

## When you expect automated traffic

When you expect automated traffic - for example, with an API - the problem is quite different.

There, it's not trying to distinguish bots from humans, but rather *bad* automated traffic from *good* automated traffic.

Cloudflare offers [API Shield](/api-shield/) as a separate service to help manage this problem.

## Summary

Bot management is the most effective when used to protect something that is usually accessed by humans, but is still vulnerable to automated abuse.