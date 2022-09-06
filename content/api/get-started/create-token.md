---
title: Create API token
pcx_content_type: how-to
weight: 11
---

# Create an API token

Before you begin, [find your zone and account IDs](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens) and go to **User Profile** -> **API Tokens**.
2. Select **Create Token**.

If you are new to API tokens or the Cloudflare API, templates are the quickest way to get started. If a specific template matches your needs, select the desired template to further customize it. If no template matches your use case or you want to build the token from scratch, select **Create Custom Token**.

![API token template selection options](/api/static/template-select.png)

### Customizing the token

For this example, the `Edit Zone DNS` template has been selected. After selecting a template, you are presented with a view of the currently selected permissions. There are three required inputs to creating a Token:

1.  The token name
2.  The permissions granted to the token
3.  The resources the token can affect

There are two additional inputs that can be used to restrict how a token is used. These are *IP restrictions* and *Time to Live (TTL) restrictions*. Both of these are covered in Advance Usage under [Restricting Token Use](/api/tokens/advanced/restrictions/)

![API token template customization](/api/static/template-customize.png)

Because a template was selected, both the name and the permissions have been pre-selected. In the case of a custom token, both of inputs one and two would need to be filled in. the only required selection is which zones the token should belong to. Let's cover each of these sections.

#### Token name

This can be anything text and should be informative of why or how the token is being used as a reference.

#### Token Permissions

Permissions are segmented into three categories based on resource:

1.  Zone Permissions
2.  Account Permissions
3.  User Permissions

Each category contains Permission Groups related to those resources. DNS permissions belong to the Zone category, while Billing permissions belong to the Account category. A full list of the Permission Groups can be [found here](/api/tokens/create/permissions/)

After selecting a Permission Group, you can choose what level of access to grant the token. Most groups offer `Edit` or `Read` options. `Edit` is full *CRUDL* (*create*, *read*, *update*, *delete*, *list*) access, while `Read` is just the *read* permission and *list* where appropriate.

#### Token Resources

The resources selected will be the only ones that the token will be able to perform the authorized actions against. For example granting `Zone DNS Read` access to a zone `example.com` will allow the token to read DNS records for only that specific zone. Any other zone will return an error for DNS record reads operations. Any other operation on that zone will also return an error.

As permissions are selected in resource categories, options for selecting the appropriate resources will appear. Note that for user permissions, there is no necessary selection as the token will operate on the user creating the token.

##### Zone Resources

When creating tokens with access to zone resources there are multiple ways to define the access. The options available are:

1.  A specific zone - ex: example.com.
2.  All zones from a specific account - ex: All zones belonging to the account named `example production`.
3.  All zones in all accounts. This grants access to every zone you have access to. Exercise caution when granting permissions this widely.

Note: When selections of option 2 or 3 are included, then excluding zones can be used to "allow all" zones as defined except specific zones.

For this example, we go with option 1 and select the zone `theburritobot.com`.

![Selecting a specific zone](./media/zone-selection.png)

##### Account Resources

Account resources are similar to zone resources but with 1 less option:

1.  A specific account - ex: My Production Account.
2.  All accounts. This would be all the accounts the user has access to.

Once you have selected the appropriate permissions and resources, select `Continue to Summary` to review the token before creating.