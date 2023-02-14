---
title: Control API Access
pcx_content_type: concept
weight: 13
---

# Control API access

Super administrators of an Enterprise account are capable of selectively scoping the API access. API access can be restricted for the entire account or only for specified account members.

Note that the feature does not disable API calls not related to the Enterprise account.

## Account-level access control

To restrict the API access for the entire account:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select an Enterprise account.
2.  Go to **Manage Account** > **Members**.
3.  Locate the **Enable API Access** section and then update the setting.

## Member-level access control

{{<Aside type="note">}}

Member-level settings will override the account-level setting. If a specific member has API access enabled whereas the account has the access disabled, that member can still call APIs related to the Enterprise account.

{{</Aside>}}

To restrict the API access for a specific member:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select an Enterprise account.
2.  Go to **Manage Account** > **Members**.
3.  Click on the member to expand and choose the intended **API Access**. If `Account Default`, then it follows the account level setting.
