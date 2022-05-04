---
pcx-content-type: how-to
title: Require Purpose Justification
weight: 2
meta:
  title: Require Purpose Justification after login
---

# Require Purpose Justification after login

Cloudflare Access allows security and IT teams to present users with a purpose justification screen directly after they log in to an Access application. This allows organizations to audit not only for _who_ is accessing their resources, but also for _why_ they are requesting access.

The purpose justification screen will show for any new sessions of an application. For example, if an Access application has a session time of eight hours, a user will see the purpose justification screen once every eight hours.

Configuring a purpose justification screen is done as part of configuring an Access policy.

1.  On the Zero Trust Dashboard, navigate to **Access** > **Applications**.
1.  Select an application and click **Edit**.
1.  Select the policy you want to configure with purpose justification.
1.  Open **Optional Configurations**.
1.  Enable purpose justification.
1.  (Optional) set a custom purpose justification message. This will appear on the purpose justification screen and will be visible to the user.
1.  Once configured, a user will see the following screen:

![Purpose Justification](/cloudflare-one/static/documentation/policies/purpose-justification.png)
