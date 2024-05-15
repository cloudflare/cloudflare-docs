---
pcx_content_type: how-to
title: SaaS applications
weight: 1
---

# Add a SaaS application to Access

Cloudflare Access allows you to add an additional authentication layer to your SaaS applications. When you integrate a SaaS application with Access, users log in to the application with Cloudflare as the Single Sign-On provider. The user is then redirected to the configured identity providers for that application and are only granted access if they pass your Access policies.

## Add a SaaS application

Cloudflare integrates with the majority of SaaS applications that support the SAML or OIDC authentication protocol. If you do not see your application listed below, refer to our generic SAML or generic OIDC guide and consult your SaaS application's documentation.

{{<directory-listing>}}

## Configure SCIM

Cloudflare Access supports [SCIM provisioning](/cloudflare-one/identity/users/scim/) for SaaS applications that use the SAML authentication protocol. Each SaaS application has different SCIM setup requirements, and some applications may not support all of the SCIM settings available in Zero Trust.

### Prerequisites

- [Add a SaaS application](#add-a-saas-application) using SAML
- Add a [supported identity provider (IdP)](/cloudflare-one/identity/users/scim/#supported-identity-providers) to Zero Trust
- Enable SCIM provisioning between your IdP and Zero Trust. Refer to our [IdP setup guides](/cloudflare-one/identity/idp-integration/) for details.

### 1. Obtain SaaS application settings

Get the following information from your SaaS application account:

- **Remote URL**: The SCIM server URL for your SaaS application, for example `https://<your-domain>/scim/v2`
- **Credentials**: The SCIM authentication credentials used by your SaaS application (Bearer Token, HTTP Basic, or OAuth 2.0)

### 2. Configure SCIM in Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Applications**.
2. Select the SaaS application that you want to enable SCIM provisioning for, and select **Edit**.
3. In the **Authentication** tab, turn on **SCIM provisioning**.
4. Select your IdP.
5. In **Remote URL**, enter the SCIM server URL obtained from your SaaS application account.
6. Select the credential type compatible with your SaaS application.
7. Enter the authentication credentials obtained from your SaaS application account.
8. Select **Verify credentials**.
9. (Optional) Configure [advanced provisioning settings](#advanced-provisioning-settings).
10. Select **Save application**.

Cloudflare will begin synchronizing users and groups between your IdP and the SaaS application according to the provisioning schedule set in your IdP. To track the user's identity over time, view your [User Registry audit logs](/cloudflare-one/insights/logs/users/).

### Advanced provisioning settings

#### User synchronization

- **User event handling**: Choose the user creation/update/deletion events that you want Cloudflare to forward from the IdP to the SaaS application.
- **Filter**: You can enter a SCIM filter expression that matches the IdP users that you want to synchronize with the SaaS application. For example, ........... To synchronize all IdP users, leave this field blank.
- **Transformation**: You can enter a JSONata script that transforms user identities from the IdP into the format expected by your SaaS application.

#### Group synchronization

- **Group event handling**: Choose the group creation/update/deletion events that you want Cloudflare to forward from the IdP to the SaaS application.
- **Filter**:  You can enter a SCIM filter expression that matches the IdP groups that you want to synchronize with the SaaS application. For example, ........... To synchronize all IdP groups, leave this field blank.
- **Transformation**: You can enter a JSONata script that transforms groups from the IdP into the format expected by your SaaS application.

#### Additional settings

- **Deletion handling**: Choose what happens to users and groups in the SaaS application when they are deleted from your IdP.

### Settings for common SaaS applications

The table below lists some common SaaS applications, the authentication method used for SCIM, and their SCIM provisioning/deprovisioning capabilities. If your application is not listed, consult their documentation for details.

| Application | Credential type | Create user | Update user | Delete user | Create group | Update group | Delete group |
| ----------- | --------------- | ----------- | ----------- | ------------ | ----------- | ------------- | ------------ |
| Atlassian |  | | |  |  |  |  |
| AWS  | Bearer token | ✅| ✅| ✅ | ✅ | ✅ | ❌ |
| Datadog |  | | |  |  |  |  |
| GitHub |  | | |  |  |  |  |
| Gmail |  | | |  |  |  |  |
| Google Workspace |  | | |  |  |  |  |
| Microsoft Azure |  | | |  |  |  |  |
| Salesforce |  | | |  |  |  |  |
| Slack |  | | |  |  |  |  |
| Wordpress |  | | |  |  |  |  |
