---
pcx_content_type: concept
title: SCIM provisioning
weight: 6
---

# SCIM provisioning

System for Cross-domain Identity Management (SCIM) is an open standard protocol that allows identity providers (such as Okta or Microsoft Entra ID) to synchronize user identity information with cloud applications and services. After configuring SCIM, user identities that you create, edit, or delete in the identity provider are automatically updated across all supported applications. This makes it easier for IT admins to onboard new users, update their groups and permissions, and revoke access in the event of an employee termination or security breach.

## Supported identity providers

Cloudflare Access currently supports SCIM provisioning using the following identity providers:

{{<render file="access/_scim-supported-idps.md">}}

## Sync users and groups in Zero Trust policies

Cloudflare Access can automatically deprovision users from Zero Trust after they are deactivated in the identity provider and display synchronized group names in the Access and Gateway policy builders. Cloudflare does not provision new users in Zero Trust when they are added to the identity provider -- users must first register a device with the WARP client or authenticate to an Access application.

## SCIM for Cloudflare dashboard SSO

To provision access to your Cloudflare account, you will need to set up a distinct [dashboard SSO SCIM integration](/fundamentals/setup/account/account-security/scim-setup/) in your IdP. You can assign users and groups to this new SCIM application to define who can access the Cloudflare dashboard.

Users provisioned via the [Zero Trust SCIM integration](#sync-users-and-groups-in-zero-trust-policies) will not have access to your Cloudflare dashboard unless you have manually added them to your [Cloudflare dashboard SSO application](/cloudflare-one/applications/configure-apps/dash-sso-apps/).
