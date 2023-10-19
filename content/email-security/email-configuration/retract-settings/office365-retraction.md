---
title: Office 365 retraction
pcx_content_type: how-to
weight: 2
meta:
    title: Retraction guide for Microsoft Office 365
---

# Retraction guide for Microsoft Office 365

![Email workflow for retracting emails with Microsoft Office 365](/images/email-security/email-retraction/o365/opening_img-o365-retraction.png)

In this tutorial you will learn how to set up email retraction for Microsoft Office 365.

## 1. Authorize Area 1 with Office 365 for retraction

For message retraction to successfully execute, Area 1 needs to be authorized to make API calls into the Office 365 Graph API architecture. The account used to authorize Area 1 requires the **Privileged role admin** role.

When assigning user roles in the Office 365 console, you will find these roles in **User permissions** > **Roles configuration** > **Identity admin roles**.

### How does the authorization work?

The authorization process grants Area 1 access to the Azure environment with the least applicable privileges required to function. The Enterprise Application that Area 1 registers (the Area 1 Security Synchronator) is not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to the application in the Enterprise Application section.

![Permissions required for Area 1 to access Office 365](/images/email-security/email-retraction/o365/area1-synchronator.png)

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **RETRACT SETTINGS**.

    ![Access the retract settings in Area 1](/images/email-security/email-retraction/o365/step2-retract-settings.png)

{{<Aside type="note">}}If you do not see the Retract Settings option, [contact customer support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to enable the feature.{{</Aside>}}

3. You need to authorize Area 1 to execute retractions through the Graph API of Office 365. Make sure that the account that you will be using to authenticate has the appropriate administrative roles assigned. Select **Authorize** to start the process.

    ![Select Authorize to start the process of authorizing Area 1 to access Office 365](/images/email-security/email-retraction/o365/step3-authorize-o365.png)

4. The Area 1 dashboard will redirect you to a Microsoft login page. Select or enter the appropriate account to initiate the authentication process.

    ![Select an account or enter a new account to authorize Area 1](/images/email-security/email-retraction/o365/step4-authorize-login.png)

5. Once authenticated, the system will show a dialog box with a list of the requested permissions. Select **Accept** to authorize the change.

    ![Select Accept to authorize Area 1 in Office 365](/images/email-security/email-retraction/o365/step5-authorize.png)

6. Upon authorization, you will be automatically redirected to the Area 1 dashboard, with a notification that the authorization completed successfully. Select **Dismiss** to clear the notification.

    ![Select Dismiss to dismiss the success notification](/images/email-security/email-retraction/o365/step6-dismiss.png)

## 2. Configure auto-retraction actions

{{<render file="_auto-retraction.md"  withParameters="Office 365 messages cannot be recovered without using the eDiscovery feature or the Exchange admin center. Refer to [Recover hard deleted messages](#recover-hard-deleted-messages) for more information.">}}

## 3. Configure journaling

{{<render file="_journaling-connector.md">}}

## 4. Manual message retraction

{{<render file="_manual-retraction.md">}}

## Recover hard deleted messages

Office 365 has two ways for recovering hard deleted email messages:

- **[eDiscovery](https://learn.microsoft.com/en-us/purview/ediscovery?view=o365-worldwide)**
- **[Exchange admin center](https://learn.microsoft.com/en-us/exchange/recipients-in-exchange-online/manage-user-mailboxes/recover-deleted-messages)**

Refer to Microsoft's documentation to learn more about how to use these tools to recover deleted email messages.

## Geographic locations

{{<render file="_bcc-table-geographic-locations.md">}}