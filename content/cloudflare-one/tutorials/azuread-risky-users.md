---
updated: 2023-01-06
category: 🔐 Zero Trust
difficulty: Advanced
pcx_content_type: tutorial
title: Isolate Azure AD risky users
---

# Isolate Azure AD risky users

Azure Active Directory (AD) calculates a user's [risk level](https://learn.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-investigate-risk) based on the probability that their account has been compromised. With Cloudflare Zero Trust, you can synchronize the risky users list with Azure AD and apply more stringent policies to users at higher risk.

This tutorial demonstrates how to automatically redirect users to a remote browser when they are deemed risky by Azure.

**Time to complete:**

1 hour

## Prerequisites

- Azure AD Premium P2 license
- [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/) add-on
- [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/) enabled on your devices

## 1. Create risky users group in Azure AD

1. Log in to the [Azure dashboard](https://portal.azure.com/).

2. Navigate to **All services** > **Azure Active Directory**.

3. In the Azure Active Directory menu, go to **Groups** and select **New group**.

4. For **Group type**, choose _Security_.

5. Name the group and select **Create**.

    ![Creating a new security group in Azure AD](/cloudflare-one/static/documentation/identity/azure/create-risky-users-group.png)

6. Copy the **Object Id** for the group, also known as the Group ID. You will need this value when calling the Microsoft Graph API.

## 2. Add risky users to group

Next, configure a [Cloudflare Workers](https://developers.cloudflare.com/workers/) script or [Azure Function](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) that automatically populates the security group with risky users.

### Example algorithm

The basic algorithm is described below. You can test out the API using [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).

1. Get the current members of the security group.
    ```js
    GET https://graph.microsoft.com/v1.0/groups/<GROUP ID>/members?$count=true
    ```

2. Delete all members of the security group. This saves you from having to manually remove users that are no longer risky.
    ```js
    DELETE https://graph.microsoft.com/v1.0/groups/<GROUP ID>/members/<MEMBER ID>/$ref
    ```

3. Get the list of Azure AD risky users. You can optionally filter the results by risk level (`low`, `medium`, or `high`).
    ```js
    GET https://graph.microsoft.com/v1.0/identityProtection/riskyUsers?$filter=riskLevel eq 'high'
    ```

4. Add risky users to the security group.
    ```js
    POST https://graph.microsoft.com/v1.0/groups/<GROUP ID>/members/$ref
    ```
    Request body:
    ```js
    {
        "@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/<MEMBER ID>"
    }
    ```

### Example Cloudflare Workers script

```js
---------FILL IN------------------
```

## 3. Add Azure AD as an identity provider

[Set up Azure AD as an identity provider](/cloudflare-one/identity/idp-integration/azuread/#set-up-azure-ad-as-an-identity-provider) in Cloudflare Access.

## 4. Enable group synchronization

To synchronize Azure AD users and groups with Cloudflare Access, refer to our [SCIM integration instructions](/cloudflare-one/identity/idp-integration/azuread/#synchronize-users-and-groups).

{{<Aside type="note">}}
- When you configure the IdP in the Zero Trust dashboard, be sure to select **Enable group membership change reauthentication**. 
- In Azure AD, be sure to add your risky users security group to the SCIM enterprise application.

{{</Aside>}}

## 5. Create a browser isolation policy

Once the SCIM integration is complete, the risky users group will appear in the Gateway [HTTP policy builder](/cloudflare-one/policies/filtering/http-policies/) when you choose the _User Group Names_ selector.

For example, you can create the following [isolation policy](/cloudflare-one/policies/browser-isolation/isolation-policies/):

| Selector | Operator | Value |
| - | - | - |
| Domain | In | `app1.example.com`, `app2.example.com` |
| User Group Names | in | `Example risky users group` |

|Action|
|------ |
| Isolate |

![HTTP policy shown in the Zero Trust dashboard](/cloudflare-one/static/documentation/identity/azure/risky-users-policy.png)

All members of `Example risky users group` in Azure AD will be isolated when they visit `app1.example.com` and `app2.example.com`. Cloudflare Access will automatically synchronize changes in group membership with Azure AD.

To test the policy, refer to the Microsoft documentation for [simulating risky detections](https://learn.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-simulate-risk).
