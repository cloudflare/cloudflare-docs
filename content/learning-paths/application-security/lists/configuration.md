---
title: Configurations
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Both Custom and Managed Lists are located in the account settings. Refer to [Features by plan type](/learning-paths/application-security/lists/features/) for more information on plan eligibility. 

## Custom Lists

Using a Custom List is an alternative to creating individual Firewall rules with long lists of IP addresses or other types of identifiers. They are easier to read and update, especially when they are used across many security rules. Lists are often used in conjuction with in-house or third party security feeds.

## Managed Lists

The following lists are managed by the Cloudflare team and are regularly updated. 

{{<render file="_managed-lists.md" productFolder="waf">}}

## Creating a rule

Refer to [Use lists in expressions](/waf/tools/lists/use-in-expressions/) to learn how to invoke a Managed List.