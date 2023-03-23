---
pcx_content_type: how-to
title: Temporary authentication
weight: 11
---

# Temporary authentication

With Cloudflare Access, you can require that users obtain approval before they can access a specific application. The administrator will receive an email notification to approve or deny the request. Unlike a typical Allow policy, the user will have to request access at the end of each session. This allows you to define the users who should have persistent access and those who must request temporary access.

## Set up temporary authentication

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Choose an application and select **Edit**.
3. Choose the **Allow** policy you want to configure and select **Edit**.
4. Under **Additional settings**, turn on [**Purpose justification**](/cloudflare-one/policies/access/require-purpose-justification/).
5. Turn on **Temporary authentication**.
6. Enter the **Email addresses of the approvers**. (Note: your approvers must be pass your [Application Launcher Access policy](/cloudflare-one/applications/app-launcher/) in order to verify their identity)
7. Save the policy.

Temporary authentication is now enabled for users who match this policy. You can optionally add a second **Allow** policy for users who should have persistent access. Be sure the policy order is set to allow persistent users through.

## Temporary authentication requests

When a user accesses the application, they will be prompted to enter a purpose justification and submit an access request. The request is automatically emailed to approvers. Alternatively, the user can manually present the approval link to approvers.
![Temporary authentication request page shown to users](/cloudflare-one/static/documentation/policies/temp-auth-request.png)

Approvers will receive a request similar to the example below. The approver can then grant access for a set amount of time, up to a maximum of 24 hours.

![Temporary authentication approval page shown to administrators](/cloudflare-one/static/documentation/policies/temp-auth-approval.png)
