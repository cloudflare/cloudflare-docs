---
updated: 2021-01-26
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Create reuseable Zero Trust rules
---

# Create reuseable Zero Trust rules

You can use Cloudflare Access to require team members to connect to self-hosted or SaaS applications from a list of approved countries.

Before you build the rule, you'll need to follow [these instructions](/cloudflare-one/setup/) to set up Cloudflare Access in your account.

**This walkthrough covers how to:**

- Build a Zero Trust rule once and set it as the default for your account
- Use that rule when adding an application to Cloudflare Access
- Combine that default rule with other rules for additional customization

**Time to complete:**

10 minutes

## Create a default group

In Zero Trust, go to **Access** > **Access Groups**.

Groups contain criteria that you can reuse in your [Access policies](/cloudflare-one/policies/access/). Additionally, groups allow you to nest certain operators within rules in the Access policy.

For example, `Include` rules work like `OR` operators - anything in the list will meet the criteria. However, if you include values in the Require field, these work like `AND` operators.

You can set a group to be the default for your Zero Trust account. Any new policy that you create will, by default, include that group as its basic rule. To make an existing group the default, click **Edit**. To create a new group as the default, click **Add a Group**.

For example, you could create a new default group which will allow anyone with a `@cloudflare.com` address or other individual email addresses, such as email addresses of contractors, to reach an assigned application. Click **Save**.

The page will tag the default group as `Default`. You can quickly see the rule contents by clicking on the arrow to the left to expand the rules inside of a group.

## Use a default group

You can now use this group in any new or existing application. To add to a new application, navigate to the `Applications` page in the `Access` section of Zero Trust.

1.  Click **Add an application**.

    Groups can be used in both self-hosted and external SaaS applications. This example will use a self-hosted application.

1.  In the next page, give the application a name and set the subdomain or URL where the Access policy will apply.

1.  Lower on the page, you can also choose which identity providers can be used to authenticate for this specific application. For example, you could enable employees to use Okta while other specified users would login with GitHub.

1.  On the next page, Access will already have toggled the default rule to apply to the application.

If saved at this point, any user attempting to reach the subdomain or URL where the Access policy applies must authenticate with an `@cloudflare.com` address or must be added to the default group. If you don't want to use it, you can uncheck the box and add manual rules.

![Default rule check box selected automatically.](/cloudflare-one/static/zero-trust-security/default-groups/default-set.png)

You can also combine multiple groups. Another group listed here, `Approved Countries`, contains countries where this particular team operates. You can add this type of group to the policy. Instead of setting this as an `Include`, setting it as a `Require` will require that users connect from one of the countries in the list - in addition to having either an `@cloudflare.com` or a specified username.

![Combining rules using the Require function.](/cloudflare-one/static/zero-trust-security/default-groups/add-countries.png)

Finally, you can add manual one-off rules at the bottom of the page.

Click **Next** to finish creating the application.

## Change a group once and update all applications

Going forward, you can make edits once to the default group that will apply to any application that uses the group. For example, if a third contractor is added to the team you can add them to any application that uses the default group by editing the group itself.
