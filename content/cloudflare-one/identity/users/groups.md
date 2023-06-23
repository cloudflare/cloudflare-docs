---
pcx_content_type: concept
title: Access groups
weight: 2
---

# Access groups

## Definition

A group is a set of rules that can be configured once and then quickly applied across many Access applications. You can select a group as a selector in any Zero Trust policy, and all the criteria from the selected group will apply to that application.

{{<Aside type="note">}}

Access groups are distinct from groups in your identity provider, like Okta groups. Access groups can contain a mix of individual users, groups from identity providers, and service authentication options like service tokens.

{{</Aside>}}

## Example scenario

Imagine you want to grant access to your applications to your team based in Lisbon, Portugal. In order to avoid building the same set of rules over and over across your applications, you can create a group called `lisbon-team`, which comprises:

- an Include rule granting access to everyone in Portugal, and
- a Require rule restricting access to users whose email ends in `@team.com`.

![Rule configuration example for an Access Group that demonstrates the use of the Include and Require fields.](/images/cloudflare-one/identity/users/access-groups.png)

Once the group is set up, you can use it to configure rules within your applications as follows:

![Using the previously created Access Group to configure a rule.](/images/cloudflare-one/identity/users/access-groups-setup.png)

## Create a group

To create and manage groups:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access**.
2. Open the Access Groups tab.
3. Select **Add a Group**.
4. Enter a name for the group.
5. Specify as many rules as needed to define your user group.
6. Select **Save**.

## Group criteria

Group criteria determine whether or not a user is a member of a particular group. Since groups are simply a collection of Access rules, they use the same [rule types](/cloudflare-one/policies/access/#rule-types) and [selectors](/cloudflare-one/policies/access/#selectors) shown in the Access policy builder.

## Using groups for IP-based rules

We recommend using groups to define any IP address-based rules you configure in policies. Keeping IP addresses in one place allows you to modify or remove addresses once, rather than in each policy, and reduces the potential for mistakes.

{{<Aside>}}

If adding more than one IP address or range to a group, it’s best to use an Include rule. If you don’t use the Include rule, the policy using that group attempts to require traffic to originate from all ranges.

{{</Aside>}}

## Using groups for country requirements

You can create an Access Group that consists of countries to allow or block. The Access Group will treat the countries in the `Include` policy with an `OR` operator. You can use this Access Group inside of a `Require` rule to require at least one of the countries inside of the group.
