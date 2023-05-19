---
pcx_content_type: how-to
title: Device enrollment permissions
weight: 3
---

# Device enrollment permissions

Device enrollment permissions determine which users can connect new devices to your organization's Cloudflare Zero Trust instance.

## Set device enrollment permissions

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. In the **Device enrollment** card, select **Manage**.
3. In the **Rules** tab, configure one or more [Access policies](/cloudflare-one/policies/access/) to define who can join their device.
4. In the **Authentication** tab, select the [identity providers](/cloudflare-one/identity/idp-integration/) users can authenticate with.
5. Select **Save**.

Users can now [enroll their device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) by logging in to your identity provider. To prevent users from logging out of your organization after they enroll, disable [Allow devices to leave organization](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#allow-device-to-leave-organization) in your WARP client settings.

## Example policies

### Check for service token

Instead of requiring users to authenticate with their credentials, you can use a service token to enroll devices without any user interaction. Because users are not required to log in to an identity provider, identity-based policies cannot be enforced on these devices.

To enroll a device using a service token:

1. Create an [Access service token](/cloudflare-one/identity/service-tokens/#create-a-service-token).

2. Copy the token's **Client ID** and **Client Secret**.

2. In your [device enrollment permissions](#set-device-enrollment-permissions), create the following policy:

    | Selector          | Operator | Value        | Action        |
    | ----------------- | -------- | ------------ | ------------- |
    | Service Token     | is       | `<TOKEN-NAME>` | Service Auth  |

3. In your MDM [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/), add the following fields:
    - `auth_client_id`: The **Client ID** of your service token.
    - `auth_client_secret`: The **Client Secret** of your service token.

When you deploy the WARP client with your MDM provider, WARP will automatically connect the device to your Zero Trust organization. You can verify which devices have enrolled by going to **My Team** > **Devices**. Devices that enrolled using a service token (or any other Service Auth policy) will have the **Email** field show as `non_identity@<team-name>.cloudflareaccess.com`.

### Check for mTLS certificate

Enterprise customers can enforce [mutual TLS authentication](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/) during device enrollment.

To check for an mTLS certificate:

1. [Add an mTLS certificate](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration) to your account. You can generate a sample certificate using the [Cloudflare PKI toolkit](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-mtls-using-cloudflare-pki).

2. In **Associated hostnames**, enter your Zero Trust [team domain](/cloudflare-one/glossary/#team-domain): `<team-name>.cloudflareaccess.com`
3. In your [device enrollment permissions](#set-device-enrollment-permissions), add a _Common Name_ or _Valid Certificate_ rule. For example, the following policy requires a client certificate with a specific common name:

    | Selector          | Operator | Value        | Action        |
    | ----------------- | -------- | ------------ | ------------- |
    | Common Name       | is       | `<CERT-COMMON-NAME>` | Allow  |

4. On your device, add the client certificate to the [system keychain](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-in-the-browser).

When users [log in to your Zero Trust organization](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device-manually) from the WARP client, their device must present a valid client certificate in order to connect.
