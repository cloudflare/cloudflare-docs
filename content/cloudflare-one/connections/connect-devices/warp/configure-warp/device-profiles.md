---
pcx_content_type: how-to
title: Device profiles
weight: 2
layout: single
---

# Device profiles

A device profile defines WARP client settings for a specific set of devices in your organization. You can create multiple profiles and apply different settings based on the user's identity, the device's location, and other criteria.

## Create a new profile

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. In the **Profile settings** card, select **Create profile**. This will make a copy of the **Default** profile.
3. Enter any name for the profile.
4. Create rules to define the devices that will use this profile. Learn more about the available [Selectors](#selectors), [Operators](/cloudflare-one/policies/gateway/network-policies/#comparison-operators), and [Values](/cloudflare-one/policies/gateway/network-policies/#value).
5. Configure [WARP settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#device-settings) for these devices.

{{<Aside type="note">}}
At this time, **Split Tunnels** and **Local Domain Fallback** can only be modified after you save the profile.
{{</Aside>}}

6. Select **Save**.

Your profile will appear in the **Profile settings** list. You can rearrange the profiles in the list according to your desired [order of precedence](#order-of-precedence).

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
| Operating system         | `macOS`                                                                                                                                          | Any mode           |
| Operating system version | [OS version](/cloudflare-one/identity/devices/warp-client-checks/os-version/#determine-the-os-version) specified in Semver format <br /> `1.2.0` | Any mode           |
| Managed network          | [Network location](/cloudflare-one/connections/connect-devices/warp/configure-warp/managed-networks/) of the device                              | Any mode           |
| SAML Attributes |  Attribute name and value from a [SAML IdP](/cloudflare-one/policies/gateway/identity-selectors/#generic-saml-idp)| Gateway with WARP |

## Order of precedence

Profiles are evaluated from top to bottom as shown in the UI and follows the first match principle — once a device matches a profile, evaluation stops and no subsequent profiles can override the decision.

The **Default** profile is always at the bottom of the list, meaning that it will only apply if the device does not match any of the previous profiles. If you make another custom profile the default, all settings will be copied over into the **Default** profile.
