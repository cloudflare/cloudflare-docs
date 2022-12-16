---
title: Edit Email Workers
pcx_content_type: how-to
weight: 2
---

# Edit Email Workers

Adding or editing Email Workers is straightforward. You can rename, delete or edit Email Workers, as well as change the routes bound to a specific Email Worker.

## Add an Email worker

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Email** > **Email Routing** > **Email Workers**.

3. Select  **Create**.

{{<render file="_enable-create-worker.md">}}

## Edit an Email Worker

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Email** > **Email Routing** > **Email Workers**.

3. Find the Email Worker you want to rename, and select the three-dot button next to it.

4. Select **Code editor**.

5. Make the appropriate changes to your code.

6. Select **Save and deploy** when you are finished editing.

## Rename Email Worker

When you rename an Email Worker, you will lose the route that was previously bound to it. You will need to configure the route again after renaming the Email Worker.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Email** > **Email Routing** > **Email workers**.

3. Find the Email Worker you want to rename, and select the three-dot button next to it.

4. From the drop-down menu, select **Manage Worker**.

5. Select **Manage Service** > **Rename service**, and fill in the new Email Worker’s name.

6. Select **Continue** > **Move**.

7. Acknowledge the warning and select **Finish**.

8. Now, go back to **Email** > **Email Routing**.

9. In **Routes** find the custom address you previously had associated with your Email Worker, and select **Edit**.

10. In the **Destination** drop-down menu, select your renamed Email Worker.

11. Select **Save**.

## Edit route

The following steps show how to change a route associated with an Email Worker.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Email** > **Email Routing** > **Email workers**.

3. Find the Email Worker you want to change the associated route, and select  **route** on its card.

4. Select **Edit** to make the required changes.

5. Select **Save** to finish.

## Delete an Email Worker

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Email** > **Email Routing** > **Email workers**.

3. Find the Email Worker you want to delete, and select the three-dot button next to it.

4. From the drop-down menu, select  **Manage Worker**.

5. Select **Manage Service** > **Delete**.

6. Type the name of the Email Worker to confirm you want to delete it, and select **Delete**.