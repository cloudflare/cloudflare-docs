---
pcx-content-type: how-to
title: Temporary authentication
weight: 11
---

# Temporary authentication

With Cloudflare Access, you can require that users obtain approval before they can access a specific application. For any temporary authentication policy, a user will need to request access at the start of each session and every time their temporary session expires.

## How it works

Administrators can set up an Access policy to require approval before a user is granted access to an application. The administrator will receive an email notification to review and approve/deny the request. Unlike a typical Access policy, the user will have to request access at the end of each session. This allows administrators to define which users should have persistent access and those that must request temporary access.

## Pre-requisites

- Enable [Purpose Justification](/cloudflare-one/policies/access/require-purpose-justification/) on the Access policy for the desired application.
- If desired, ensure you have a second Access policy for users that should have persistent access. Be sure the policy order is set to allow persistent users through.

## Set up temporary authentication

1.  On the Zero Trust Dashboard, navigate to **Access** > **Applications**.
1.  Select an application and click **Edit**.
1.  Select the policy you want to configure with purpose justification.
1.  Open **Optional configurations**.
1.  Select **Enable temporary authentication**.
1.  Enter the desired **Approver Emails** (note: these must be email addresses).

Now when a user accesses an application behind a temporary authentication policy, they will be able to enter their reason for accessing and submit their access request. Approvers will receive an email alert to approve or deny the request. Alternatively, an approval link will be generated that the requesting user can present to the approver. The approver can then grant access for a set amount of time, for a maximum 24 hours).
