---
pcx_content_type: how-to
title: App Launcher
weight: 11
---

# App Launcher

With the Access App Launcher, users can easily open all applications that they have access to from a single dashboard.

The App Launcher is available at a [team domain](/cloudflare-one/glossary/#team-domain) unique to your Cloudflare Zero Trust account, for example `mycompany.cloudflareaccess.com`.

Users log in using one of the identity providers configured for the account. Once Access authenticates the user, the App Launcher displays applications they are authorized to use, in the form of application tiles. Selecting an application tile launches the application’s hostname, sending the user to that tool as part of their SSO flow.

![App Launcher portal](/images/cloudflare-one/applications/app-launcher.png)

## Enable the App Launcher

By default, the App Launcher is disabled. To enable it, you must configure a policy that defines which users can access the App Launcher.

To enable the App Launcher:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

2. Under the **App Launcher** card, select **Manage**.

3. On the **Rules** tab, [build a rule](/cloudflare-one/policies/access/) to define who can access your App Launcher portal. These rules do not impact permissions for the applications secured behind Access.

4. On the **Authentication** tab, choose the identity providers users can authenticate with.

5. Select **Save**.

The App Launcher is now available at `<your-team-name>.cloudflareaccess.com`. You can always edit your App Launcher rules by going to **Settings** > **Authentication**.

## Add a tile to the App Launcher

Tiles have a one-to-one relationship with each application you create in Access. The tile names displayed in the Access App Launcher portal correspond to the application names listed under **Access** > **Applications**. For example, if you create one application for general access to your Jira deployment and a separate application that restricts requests to a particular Jira path, a user authorized for both will see separate tiles for each. If you add multiple hostnames to a single application, the user will only see the domain selected in **Application Appearance**.

To show an Access application in the App Launcher:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Applications**.
2. Select an application and select **Configure**.
3. In the **Overview** tab, select **Enable App in App Launcher**. The App Launcher link will only appear for users who are allowed by your Access policies. Blocked users will not see the app in their App Launcher.

{{<Aside type="note">}}
This toggle does not impact the user's ability to reach the application. Allowed users can always reach the application via a direct link, regardless of whether the toggle is enabled. Blocked users will never have access to the application.
{{</Aside>}}

4. Choose a domain to use for the App Launcher link.

5. To use a custom logo for the application tile, select **Custom** and enter a link to your desired image.

{{<Aside type="note">}}
If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
{{</Aside>}}