---
title: User Guide
pcx_content_type: how-to
weight: 1
meta:
  title: Using Cloudflare's Time Service
---

# Using Cloudflare's Time Service

{{<render file="_ntp-definition.md">}}

To use our NTP server, change the time configuration in your device to point to `time.cloudflare.com`.

## MacOs

To have your Mac to synchronize time from `time.cloudflare.com`:

1.  Go to **System Preferences**.
2.  Go to **Date & Time**.
3.  Click the lock icon on the bottom left to make changes.
4.  Enter your password.
5.  Next to **Set date and time automatically**, enter `time.cloudflare.com`.

![Screenshot of updating the Date & Time settings on machine running macOS](/images/time-services/mactime.png)

## Windows

To have your Windows machine synchronize time from `time.cloudflare.com`:

1.  Go to **Control Panel**.
2.  Go to **Clock and Region**.
3.  Click **Date and Time**.
4.  Go to the **Internet Time** tab.
5.  Click **Change settings..**
6.  For **Server:**, type `time.cloudflare.com` and click **Update now**.
7.  Click **OK**.

![Screenshot of updating the Date and Time settings on machine running Windows](/images/time-services/window.png)
