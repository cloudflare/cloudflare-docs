---
title: QA, testing, and needs for changing egress location
pcx_content_type: overview
weight: 5
layout: learning-unit
---

Customers often have use cases in which specific groups of users may need to change the location from which they egress. We see this frequently with QA teams for applications or web development that need to test resources as though they are accessing from different, predetermined locales. This can be managed ad-hoc via Egress Policy, but most customers prefer to manage this without ongoing changes to the administrative panel and existing policies.

To accommodate this, you can build Virtual Networks that can be used as selectors in Egress Policies, to allow users to change their attached Virtual Network, and subsequently change their Egress IP deterministically.

[screenshot of policy and user experience]
