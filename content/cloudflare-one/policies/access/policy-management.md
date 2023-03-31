---
pcx_content_type: how-to
title: Manage Access policies
weight: 2
---

# Manage Access policies

Access policies are properties of applications. When setting up an Access application, you will be prompted to create at least one policy for the application. You can go back and create, edit, or delete policies at any time.

## Create a policy

To create an Access policy for an existing application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Access** > **Applications**.
2. Locate the application for which you want to create the policy and select **Edit**.
3. Select **Add a policy**.
4. Enter a **Policy name**. This name will identify your policy in the list of application policies.
5. Choose an [**Action**](/cloudflare-one/policies/access/#actions) for the policy.
6. Configure as many [**Rules**](/cloudflare-one/policies/access/#rule-types) as needed.
7. Select **Add policy**.
8. Rearrange the rows in the policy table to match your desired [order of precedence](/cloudflare-one/policies/access/#order-of-execution).
9. Select **Save application**.

Your new policy is now in effect.

## Edit a policy

To make changes to an existing policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Access** > **Applications**.
2. Locate the application for which you want to change the policies and select **Edit**. You will see a list of existing policies.
3. Locate the policy you want to update and select **Edit**.
4. Once you have made the necessary changes, select **Save policy**.
5. Select **Save application**.

The updated policy is now in effect.

## Delete a policy

To delete an Access policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Access** > **Applications**.
2. Locate the application for which you want to delete the policy and select **Edit**. You will see a list of existing policies.
3. Locate the policy you want to delete and select **Delete**.
4. A pop-up message will ask you to confirm your decision to delete the policy. Select **Delete**.
5. Select **Save application**.

Your policy has now been deleted.

## Test your policies

You can test your policies against an existing user identity to see if they would be granted access. For the policy tester to work, the user must have logged into the [App Launcher](/cloudflare-one/applications/app-launcher/) or any other Access application at some point in time.

To check if a user has access to an application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Access** > **Applications**.
2. Locate the application you want to test and select **Edit**.
3. Select **Test your policies**.
4. Enter the user's email address and select **Check user**.

The policy tester reports the following information:

- Whether the user is allowed or denied access to the application based on all configured policies.
- The user's identity from their most recent Access login attempt.
- Whether the user matches individual Allow, Block, or Bypass policies.
