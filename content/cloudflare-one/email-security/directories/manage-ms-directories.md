---
title: Manage Microsoft directories
pcx_content_type: how-to
weight: 2
---

# Manage Microsoft directories

To manage a Microsoft directory:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Select **Zero Trust**.
3. Select **Email security**.
4. Select **Directories**.
5. Under **Directory name**, select **MS directory**.
6. From here, you can manage **Groups** or **Users** directories.

## Manage groups in your directory

Email Security allows you to view and manage your directory's group and their [impersonation registry](/cloudflare-one/email-security/detection-settings/impersonation-registry/). When a group is added to the registry, all members are registered by default. 

To manage your group directory, on the **MS directory** page, select the **Groups** tab.

### Add groups to registry

Email Security allows you to add group names to the registry. 

To add a single group to the registry:

1. Select the group name you want to add.
2. Select the three dots > **Add to registry**.

To add multiple groups to the registry at once:

1. Select the group names you want to add to the registry.
2. Select the **Action** dropdown list.
3. Select **Add to registry**.

### Remove groups from registry

Email Security allows you to remove group names from the registry. 

To remove a single group from the registry:

1. Select the group name you want to remove.
2. Select the three dots > **Remove from registry**.

To remove multiple groups from the registry at once:

1. Select the group names you want to remove from registry.
2. Select the **Action** dropdown list.
3. Select **Remove from registry**.

### Filter impersonation registry

You can filter the list of group names by registered and unregistered.

A group name is registered when it is part of the [impersonation registry](/cloudflare-one/email-security/detection-settings/impersonation-registry/). A group name is unregistered when they are not part of the impersonation registry.

To filter the list, under the **Impersonation registry** dropdown, select one of the following:
   - **All**: To view registered and unregistered groups.
   - **Registered**: To view registered groups.
   - **Unregistered**: To view unregistered groups.

## Manage users in your directory

Email Security allows you to view and manage the impersonation registry status of your directory's users.

To manage your users directory, on the **MS directory** page, select the **Users** tab.

### Add users to registry

To add a single user to the registry:

1. Select the name you want to add.
2. Select the three dots > **Add to registry**.

To add multiple users to the registry at once:

1. Select the names you want to add to the registry.
2. Select the **Action** dropdown list.
3. Select **Add to registry**.

### Remove users from registry

Email Security allows you to remove users from the registry. 

To remove a single user from the registry:

1. Select the name you want to remove.
2. Select the three dots > **Remove from registry**.

To remove multiple users from the registry at once:

1. Select the names you want to remove from the registry.
2. Select the **Action** dropdown list.
3. Select **Remove from registry**.

### Edit a user

To edit a user in the Microsoft directory:

- Under **Display name**, select the user you want to edit. From here, you can either:
   - Select **Edit**: Enter a **Secondary email**, then select **Save**.
   - Select **Add to registry** to add a user to your registry (this option is displayed if the user is not part of the impersonation registry).
   - Select **Remove from registry** to remove a user from the registry (this option is displayed if the user is part of the impersonation registry).

### Filter a user

You can filter the list of users by registered and unregistered.

A user is registered when they are added to the [impersonation registry](/cloudflare-one/email-security/detection-settings/impersonation-registry/). A user is unregistered when they are not part of the impersonation registry.

To filter the impersonation registry:

Select the **Impersonation registry** dropdown, and choose one of the following:
   - **All**: To view registered and unregistered users.
   - **Registered**: To view registered users.
   - **Unregistered**: To view unregistered users.

To filter users:

Select the **Users** dropdown, and choose one of the following:
   - **All**: To view users in groups and not in groups.
   - **Users in groups**: To view users in groups.
   - **Users not in groups**: To view users not in groups.