---
pcx_content_type: how-to
title: Device profiles
weight: 2
---

# Device profiles

{{<render file="warp/_device-profiles-intro.md">}}

## Create a new profile

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. In the **Profile settings** card, select **Create profile**. This will make a copy of the **Default** profile.
3. Enter any name for the profile.
4. Create rules to define the devices that will use this profile. Learn more about the available [Selectors](#selectors), [Operators](/cloudflare-one/policies/gateway/network-policies/#comparison-operators), and [Values](/cloudflare-one/policies/gateway/network-policies/#value).
5. Configure [WARP settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#device-settings) for these devices.

{{<Aside type="note">}}
At this time, **Split Tunnels** and **Local Domain Fallback** can only be modified after you save the profile.
{{</Aside>}}

6. Select **Create profile**.

Your profile will appear in the **Profile settings** list. You can rearrange the profiles in the list according to your desired [order of precedence](#order-of-precedence).

{{</tab>}}

{{<tab label="api" no-code="true">}}

Send a `POST` request to the [Devices endpoint](/api/operations/devices-create-device-settings-policy):

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/devices/policy \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "allow_mode_switch": false,
  "allow_updates": false,
  "allowed_to_leave": false,
  "auto_connect": 900,
  "captive_portal": 180,
  "description": "Cloudflare'\''s basic device settings profile, recommended in the implementation documentation. For details, refer to https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/device-profiles/",
  "disable_auto_fallback": true,
  "enabled": true,
  "exclude_office_ips": false,
  "match": "identity.email == \"me@mycompany.com\"",
  "name": "Cloudflare basic device profile",
  "precedence": 101,
  "service_mode_v2": {
    "mode": "warp"},
  "support_url": "https://it.company.com/help",
  "switch_locked": true
}'
```

{{</tab>}}
{{</tabs>}}

## Edit profile settings

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. In the **Profile settings** card, find the profile you want to update and select **Configure**.
3. Modify [WARP settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#device-settings) for this profile.
{{<Aside type="note">}}
Changing any of the settings below will cause the WARP connection to restart. The user may experience a brief period of connectivity loss while the new settings are being applied.

- [Service mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#service-mode)
- [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#local-domain-fallback)
- [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#split-tunnels)

{{</Aside>}}

4. Select **Save profile**.

The new settings will immediately propagate to devices that match this profile.

## Verify settings

To check WARP client settings on a specific device, open a terminal on the device and run:

```sh
$ warp-cli settings
```

## Selectors

| Selector                 | Description                                                                                                                                      | WARP mode required |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| User email               | Email address of a user <br /> `user-name@company.com`                                                                                           | Gateway with WARP  |
| User group emails        | Email address of an [IdP group](/cloudflare-one/policies/gateway/identity-selectors/#idp-groups-in-gateway) <br /> `contractors@company.com`   | Gateway with WARP  |
| User group IDs           | ID of an [IdP group](/cloudflare-one/policies/gateway/identity-selectors/#idp-groups-in-gateway) <br /> `12jf495bhjd7893ml09o`                 | Gateway with WARP  |
| User group names         | Name of an [IdP group](/cloudflare-one/policies/gateway/identity-selectors/#idp-groups-in-gateway) <br /> `developers`                         | Gateway with WARP  |
| Operating system         | Operating system of the device <br /> `macOS`                                                                                                                                          | Any mode           |
| Operating system version | [OS version](/cloudflare-one/identity/devices/warp-client-checks/os-version/#determine-the-os-version) specified in Semver format <br /> `1.2.0` | Any mode           |
| Managed network          | [Network location](/cloudflare-one/connections/connect-devices/warp/configure-warp/managed-networks/) of the device                              | Any mode           |
| SAML Attributes |  Attribute name and value from a [SAML IdP](/cloudflare-one/policies/gateway/identity-selectors/#generic-saml-idp)| Gateway with WARP |

## Comparison operators

| Operator                 | Meaning                                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| is                       | equals the defined value                                                         |
| in                       | matches at least one of the defined values                                       |

## Logical operators

To evaluate multiple conditions in an expression, select a logical operator:

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

## Order of precedence

Profiles are evaluated from top to bottom as shown in the UI and follows the first match principle — once a device matches a profile, evaluation stops and no subsequent profiles can override the decision.

The **Default** profile is always at the bottom of the list, meaning that it will only apply if the device does not match any of the previous profiles. If you make another custom profile the default, all settings will be copied over into the **Default** profile.
