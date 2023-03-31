---
pcx_content_type: how-to
title: Add bookmarks
weight: 6
---

# Add bookmarks

With Cloudflare Zero Trust, you can show applications on the [App Launcher](/cloudflare-one/applications/app-launcher/) even if those applications are not secured behind Access. This way, users can access all the applications they need to work, all in one place — regardless of whether those applications are protected by Access.

Links to applications not protected by Access can be added as bookmarks. To add a bookmark:

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **Access** > **Applications**.

2. Select **Add an application** > **Bookmark**.

3. Name your application.

4. Enter your **Application URL**, for example `https://mybookmark.com`.

5. Turn on **App Launcher visibility** if you want the application to be visible in the App Launcher. The toggle does not impact the ability for users to reach the application.

6. (Optional) To add a custom logo for your application, select **Custom** and enter the image URL.

   {{<Aside type="note">}}
   If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
   {{</Aside>}}

7. Select **Add application** to save and exit.

The application will show up on the Applications page labeled as `BOOKMARK`. You can always edit or delete your bookmarks, as you would any other application.
