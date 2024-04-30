---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}

Only available for Enterprise users.

{{</Aside>}}

Turn on **Display block notification for WARP client** to display notifications for Gateway block events. Blocked users will receive an operating system notification from the WARP client with a custom message you set. If you do not set a custom message, the WARP client will display a default message. Custom messages must be 100 characters or less.

{{<details header="Operating system support">}}

The WARP client supports operating system notifications on Windows and macOS.

To turn on client notifications on macOS devices running DisplayLink software:

1. Open System Settings.
2. Go to **Notifications** > **Notification Center**.
3. Turn on **Allow notifications when mirroring or sharing the display**.

{{</details>}}

Upon selecting the notification, WARP will direct your users to a block page. Optionally, you can direct users to a custom URL, such as an internal support form.
