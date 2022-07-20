---
pcx-content-type: how-to
title: Add bookmarks
weight: 6
---

# Add bookmarks

Cloudflare Zero Trust allows admins to show applications on their user’s [App Launcher](/cloudflare-one/applications/app-launcher/) even if those applications are not secured behind Access. This way, users can access all the applications they need to work, all in one place — regardless of whether those applications are protected by Access.

Links to applications not protected by Access can be added as **bookmarks**. To add a bookmark:

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access > Applications**.

1.  Click **Add an application**.

1.  Select **Bookmark**.

1.  Enter the **Application name** and **Application URL**.

1.  In the **Application visibility** card:

    - Toggle on **Show application in the App Launcher** if you want the application to be visible in the App Launcher. The toggle does not impact the ability for users to reach the application.
    - (Optional) Add a custom logo for your application by clicking **Custom** and entering a link to your desired image.

    {{<Aside type="note">}}
If you're having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
    {{</Aside>}}

1.  Click **Next**.

The application will show up in the Applications page labeled as `BOOKMARK`. You can always edit or delete your bookmarks, as you would any other application.
