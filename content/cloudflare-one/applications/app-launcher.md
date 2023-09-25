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

Tiles have a one-to-one relationship with each application you create in Access. The tile names displayed in the Access App Launcher portal correspond to the application names listed under **Access** > **Applications**. For example, if you create one application for general access to your Jira deployment and a separate application that restricts requests to a particular Jira path, a user authorized for both will see separate tiles for each. If you add multiple hostnames to a single application, the user will only see the domain selected in the application's **App Launcher** settings.

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

## Customize App Launcher appearance

You can display your own branding, messages, and links to users when they open the App Launcher.

To customize the App Launcher appearance:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Custom Pages**.
2. Find the **Customize App Launcher** setting and select **Customize**.
3. Give the App Launcher the look and feel of your organization by adding:
    - Your organization's name
    - A logo
    - A preferred background color for the header
    - A preferred background color for the page
    - A custom footer with links to your organization's help desk or other internal resources.
4. Next, customize the landing page that users will see when they login to the App Launcher. Available properties include:
    - A custom title
    - A custom subtitle
    - An image
    - A preferred color for the **Log in** button
    - A preferred color for the **Log in** button text

    All of the properties configured in Step 3 will also apply to the landing page.

   Note: We recommend lighter background colors because the font defaults to black.
  
6. Once you are satisfied with your customization, select **Save**.

The App Launcher screens are now updated. To view your changes, select **Preview**.

## Tags

You can label an Access application with up to 25 custom tags. End users can then filter the applications in their App Launcher by their tags.

### Create a tag

To create a new tag:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Tags**.
2. Select **Add tags**.
3. Enter up to 35 alphanumeric characters for the tag (for example, `Human Resources`) and select it in the dropdown menu.
4. Select **Save**.

You can now [add this tag](#tag-an-access-application) to an Access application.

### Tag an Access application

To add a tag to an existing Access application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Applications**.
2. Select an application and select **Configure**.
3. Select the **Overview** tab.
4. In the **Tags** dropdown, select the tags that you would like to assign to this application. The tag must be [created](#create-a-tag) before you can select it in the dropdown.
5. Select **Save application**.

The tag will now appear on the application's App Launcher tile.
