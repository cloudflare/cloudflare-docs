---
title: Access allowlisted sources
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

One of the most common use cases for custom egress policies is to ensure a consistent egress IP for users accessing SaaS applications that may not support SAML, or vendor services that can only use IP-level controls. If given the option (or if your business controls the application), we strongly recommend using Cloudflare Access to move from IP-level authentication to identity-aware authentication that uses continuous evaluation.

In building these policies, we recommend building "baseline" policies that can cover a majority of your use cases without making policy management overly complex. If all of your end-users need to access a series of applications that all require a specific egress IP, you should build a policy explicit to those users (or to all your users) that ensure that all of their traffic egresses using those IPs.

[screenshot and api example]
