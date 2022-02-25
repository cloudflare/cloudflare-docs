---
pcx-content-type: how-to
title: Policy management
weight: 2
---

# Policy management

Policies are properties of applications. Creating the first policy for an application is part of the setup process for that application.

You can then choose to edit or delete that first policy after completing the application setup, or you can decide to add new policies to the application, all from the Applications section of the Cloudflare Zero Trust Dashboard.

You can create up to 1,000 policies per application.

## Create a policy

To create a Zero Trust policy for an existing application:

1.  On the Zero Trust Dashboard, navigate to the **Access > Applications** page.

2.  Locate the application for which you want to create the policy.

3.  Click **Add a Rule**.

![Add rule](/cloudflare-one/static/documentation/policies/add-rule.png)

1.  Select a **Rule name**. This name will identify your policy in the list of application policies.

2.  Select a **[Rule action](/cloudflare-one/policies/zero-trust/#actions)**.

3.  Configure as many **[Rules](/cloudflare-one/policies/zero-trust/#rules)** as needed.

4.  Click **Save rule**.

Your policy has now been added to the application.

## Edit a policy

To make any changes to an application’s policies:

1.  On the Zero Trust Dashboard, navigate to the **Access > Applications** page.

2.  Locate the application for which you want to change the policies.

3.  Click **Edit**. This will automatically redirect you to the app’s **Rules** section.

![Policies section](/cloudflare-one/static/documentation/policies/policies-section.png)

1.  Once in the **Policies** section, you can edit the **Rule name**, the **Rule action**, and any rules you had configured.

2.  Once you’ve made all the necessary changes, click **Save application**.

## Delete a policy

To delete a Zero Trust policy:

1.  On the Zero Trust Dashboard, navigate to the **Access > Applications** page.

2.  Locate the application for which you want to delete the policy.

3.  Click **Edit**. This will automatically redirect you to the app’s **Rules** section.

4.  Locate the policy you want to delete and click **Delete**.

5.  A pop-up message will ask you to confirm your decision to delete the policy. Click **Delete**.

6.  Click **Save application**.

Your policy has now been deleted.
