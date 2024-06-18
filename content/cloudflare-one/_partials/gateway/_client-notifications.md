---
_build:
  publishResources: false
  render: never
  list: never
---

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/plans/zero-trust-services/) |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <ul><li> Gateway with WARP</li><li> Secure Web Gateway without DNS filtering </li></ul>   | Enterprise                                                                |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅           | 2024.1.159.0         |
| macOS    | ✅           | 2024.1.160.0         |
| Linux    | ❌           |                      |
| iOS      | ✅           | 1.3                  |
| Android  | ✅           | 1.4                  |
| ChromeOS | ✅           | 1.4                  |

{{</details>}}

Turn on **Display block notification for WARP client** to display notifications for Gateway block events. Blocked users will receive an operating system notification from the WARP client with a custom message you set. If you do not set a custom message, the WARP client will display a default message. Custom messages must be 100 characters or less.

Upon selecting the notification, WARP will direct your users to a block page. Optionally, you can direct users to a custom URL, such as an internal support form.

To turn on client notifications on macOS devices running DisplayLink software, you may have to allow system notifications when mirroring your display. For more information, refer to the [macOS documentation](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac).
