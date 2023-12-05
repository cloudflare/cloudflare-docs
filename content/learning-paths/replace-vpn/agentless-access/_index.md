---
title: Agentless access to private web services
pcx_content_type: overview
weight: 5
layout: learning-module
---

# Agentless access to private web services

Cloudflare supports Zero Trust, identity-aware access to internal HTTP applications without the need to use a device client. This step will require an active DNS zone on Cloudflare in the same account in which you are building your Zero Trust policies.

Performing these tasks in this order makes sure your private application is never accessible via the public Internet.

## Objectives

By the end of this module, you will be able to:

- Secure your application using a Cloudflare Access policy
- After protecting your route with an Access policy, you can create a publicly accessible route
