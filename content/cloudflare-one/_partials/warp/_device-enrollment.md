---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. In **Device enrollment permissions**, select **Manage**.
3. In the **Rules** tab, configure one or more [Access policies](/cloudflare-one/policies/access/) to define who can join their device. For example, you could allow all users with a company email address:
  | Rule type | Selector | Value |
  | --------- | ---------| ------ |
  | Include   | Emails ending in    | `@company.com` |

  {{<Aside type="note">}}
  Device posture checks are not supported in device enrollment policies. WARP can only perform posture checks after the device is enrolled.
  {{</Aside>}}

4. In the **Authentication** tab, select the [identity providers](/cloudflare-one/identity/idp-integration/) users can authenticate with. If you have not integrated an identity provider, you can use the [one-time PIN](/cloudflare-one/identity/one-time-pin/).
5. Select **Save**.
