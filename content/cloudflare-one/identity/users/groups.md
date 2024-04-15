---
pcx_content_type: concept
title: Access groups
weight: 2
---

# Access groups

An Access group is a set of rules that can be configured once and then quickly applied across many Access applications. You can assign an Access group to any Access policy, and all the criteria from the selected group will apply to that application.

{{<Aside type="note">}}

Access groups are distinct from groups in your identity provider, like Okta groups. Access groups can contain a mix of individual users, groups from identity providers, and service authentication options like service tokens.

{{</Aside>}}

## Create a group

{{<render file="access/_access-group.md">}}

## Group criteria

Group criteria determine whether or not a user is a member of a particular group. Since groups are simply a collection of Access rules, they use the same [rule types](/cloudflare-one/policies/access/#rule-types) and [selectors](/cloudflare-one/policies/access/#selectors) shown in the Access policy builder.

## Groups for IP-based rules

We recommend using groups to define any IP address-based rules you configure in policies. Keeping IP addresses in one place allows you to modify or remove addresses once, rather than in each policy, and reduces the potential for mistakes.

{{<Aside type="note">}}

If adding more than one IP address or range to a group, use an Include rule for the IPs. If you do not use an Include rule, the policy will require traffic to originate from all ranges.

{{</Aside>}}

## Groups for country requirements

You can create an Access group that consists of countries to allow or block. Access will treat the countries in the Include rule with an OR logical operator. When building policies for an Access application, you can assign this Access group to a Require policy to require at least one of the countries inside of the group.
