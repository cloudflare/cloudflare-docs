---
title: Office 365 directory integration
pcx_content_type: how-to
weight: 1
---

# Office 365 directory integration

Cloudflare Area 1 integrates with Office 365 to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Authorize Area 1 with Office 365 for Directory Access

You need to authorize Cloudflare Area 1 to make connections into your [Office 365 tenant](https://learn.microsoft.com/en-us/microsoft-365/solutions/tenant-management-overview), to retrieve your directory details. The account used to authorize will require the **Privileged authentication admin** and **Privileged role admin** roles.

### How does the authorization work?

The authorization process grants Area 1 access to the Azure environment with the least applicable privileges required to function. The Enterprise Application that Area 1 registers is not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to the application in the Enterprise Application section.

When assigning user roles in the Office 365 console, you will find these roles in **User permissions** > **Roles configuration** > **Identity admin roles**.

![A list of permissions for Area 1](/email-security/static/bec/permissions.png)
