---
pcx-content-type: reference
title: Identity-based policies
weight: 6
---

# Identity-based policies

With Cloudflare Zero Trust, you can create Secure Web Gateway policies that filter outbound traffic down to the user identity level. To do that, you can build DNS, HTTP or Network policies using a set of [identity-based selectors](#identity-based-selectors). These selectors require Gateway with WARP mode to be enabled in the Zero Trust WARP client, and the user to be enrolled in your organization via the WARP client.

## Identity-based selectors

### SAML Attributes

Specify a value from the SAML Attribute Assertion.

| UI name         | API example                                 |
| --------------- | ------------------------------------------- |
| SAML Attributes | `identity.saml_attributes == "\"finance\""` |

### User Email

Use this selector to create identity-based DNS rules based on a user’s email.

| UI name    | API example value                           |
| ---------- | ------------------------------------------- |
| User Email | `identity.email == "user-name@company.com"` |

### User Group IDs

Use this selector to create identity-based DNS rules based on an IdP group ID of which the user is configured as a member in the IdP.

| UI name        | API example                                    |
| -------------- | ---------------------------------------------- |
| User Group IDs | `identity.groups.id == "12jf495bhjd7893ml09o"` |

### User Group Email

Use this selector to create identity-based DNS rules based on an IdP group email address of which the user is configured as a member in the IdP.

| UI name          | API example                                       |
| ---------------- | ------------------------------------------------- |
| User Group Email | `identity.groups.id == "contractors@company.com"` |

### User Group Names

Use this selector to create identity-based DNS rules based on an IdP group name of which the user is configured as a member in the IdP.

| UI name          | API example                             |
| ---------------- | --------------------------------------- |
| User Group Email | `identity.groups.name == "\"finance\""` |

### User Name

Use this selector to create identity-based DNS rules based on an IdP username for a particular user in the IdP.

| UI name   | API example                    |
| --------- | ------------------------------ |
| User Name | `identity.name == "user-name"` |

{{<Aside type="note" header="Gateway groups vs. Access groups">}}

In Gateway, a **User Group** refers to a group in your IdP (for example, an Okta group). Gateway does not currently support applying DNS, HTTP, and Network policies to [Access groups](/cloudflare-one/identity/users/groups/). This is because Access groups may include criteria not available through the IdP, such as device location or IP address.

{{</Aside>}}

## IdP groups in Gateway

Cloudflare Gateway can integrate with your organization's identity providers (IdPs). Before building a Gateway policy for IdP users or groups, be sure to [add the IdP as an authentication method](/cloudflare-one/identity/idp-integration/).

Because IdPs expose user groups in different formats, reference the list below to choose the appropriate identity-based selector.

### Azure AD

| Selector       | Value                  |
| -------------- | ------------------------------ |
| User Group IDs | `61503835-b6fe-4630-af88-de551dd59a2` |

The **Value** is the [Object Id](/cloudflare-one/identity/idp-integration/azuread/#using-azuread-groups) for an Azure group.

### GitHub

| Selector         | Value       |
| ---------------- | ----------- |
| User Group Names | `Marketing` |

### Google

| Selector         | Value       |
| ---------------- | ----------- |
| User Group Names | `Marketing` |

### Okta (OIDC)

| Selector         | Value       |
| ---------------- | ----------- |
| User Group Names | `Marketing` |

### Okta (SAML)

| Selector         | Attribute name  | Attribute value  |
| ---------------- | --------------- |----------------- |
| SAML Attributes  | `name`          |`Marketing`       |

### Generic IdP

If your IdP is not listed above, here is how you can determine which Gateway selector to use:

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Groups**.
2. Click **Add a Group**.
3. In the **Include** dropdown, select your IdP group.

    A text field will appear and prompt for either group names, group IDs, or SAML attributes. In the example below, we see that Okta groups will use the _User Group Names_ selector in Gateway.
    ![Determining the Gateway selector for an Okta group](/cloudflare-one/static/documentation/policies/identity-selector-group-names.png)

{{<Aside type="note">}}
Gateway retrieves a user's IdP data at the time of login. Therefore, if you add or remove a user from a group in your IdP, Gateway will not detect these changes until the user re-authenticates to your Zero Trust instance. There are two ways a user can re-authenticate:

- Log out from an Access-protected application and log back in.
- In their WARP client settings, click **Preferences** > **Account** > **Re-Authenticate Session**. This will open a browser window and prompt the user to log in.
{{</Aside>}}

