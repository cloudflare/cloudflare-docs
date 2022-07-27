---
pcx-content-type: how-to
title: App Launcher
weight: 11
---

# App Launcher

With the Access App Launcher, users can easily open all applications that they have access to from a single dashboard.

The App Launcher is available at a [team domain](/cloudflare-one/glossary/#team-domain) unique to your Cloudflare Zero Trust account, for example `mycompany.cloudflareaccess.com`.

Users log in using one of the identity providers configured for the account. Once Access authenticates the user, the App Launcher displays applications they are authorized to use, in the form of application tiles. Clicking on an application tile launches the application’s hostname, sending the user to that tool as part of their SSO flow.

Tiles have a one-to-one relationship with each application you create in Access. If you create one application for general access to your Jira deployment and a separate application that restricts requests to a particular Jira path, a user authorized for both will see separate tiles for each. The tile names displayed in the Access App Launcher portal correspond to the application names listed under **Access** > **Applications**.

![App Launcher portal](/cloudflare-one/static/documentation/applications/app-launcher.png)

## Enable the App Launcher

By default, the App Launcher is disabled. To enable it, you must configure a policy that defines which users can access the App Launcher.

To enable the App Launcher:

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **Authentication**.

2. Under the **App Launcher** card, select **Manage**.

3. On the **Rules** tab, [build a rule](/cloudflare-one/policies/access/) to define who can access your App Launcher portal. These rules do not impact permissions for the applications secured behind Access.

4. On the **Authentication** tab, choose the identity providers users can authenticate with.

5. Select **Save**.

The App Launcher is now available at `<your-team-name>.cloudflareaccess.com`. You can always edit your App Launcher rules by going to **Settings** > **Authentication**.
