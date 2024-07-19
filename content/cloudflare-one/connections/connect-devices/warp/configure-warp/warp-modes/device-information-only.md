---
pcx_content_type: how-to
title: Enable Device Information Only
weight: 2
---

# Enable Device Information Only mode

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| Device Information Only | Enterprise  |

| System   | Availability |
| ---------| -------------|
| Windows  | ✅           |
| macOS    | ✅           |
| Linux    | ✅           |
| iOS      | ✅           |
| Android  | ✅           |
| ChromeOS | ✅           |

{{</details>}}

Device Information Only mode allows you to enforce device posture rules when a user connects to your [self-hosted Access application](/cloudflare-one/applications/configure-apps/self-hosted-apps/). This mode relies on a client certificate generated from your account to establish trust between the Access application and the device.

## 1. Turn on account settings

1. Ask your account team to enable Device Information Only mode for your account.

2. Using the API, enable client certificate provisioning for [your zone](/fundamentals/setup/find-account-and-zone-ids/):

    ```bash
    curl --request PATCH \
    'https://api.cloudflare.com/client/v4/zones/{zone_id}/devices/policy/certificates' \
    --header "X-Auth-Email: <EMAIL>" \
    --header "X-Auth-Key: <API_KEY>" \
    --header "Content-Type: application/json" \
    --data '{"enabled": true}'
    ```

## 2. Configure the WARP client

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

2. Under **Profile settings**, choose a [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) and select **Configure**.

3. For **Service mode**, select **Device Information Only**.

4. Next, [enroll your device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/) into your Zero Trust organization.

When enrolled in Device Information Only mode, the WARP client will automatically generate a client certificate and install the certificate on the device. This certificate is necessary to confirm the source of outgoing traffic.

## 3. (Optional) Verify the client certificate

1. To view the client certificates installed on the device:

{{<tabs labels="Windows | macOS | Linux | iOS | Android | ChromeOS">}}
{{<tab label="windows" no-code="true">}}

1. Open the Start menu and select **Run**.
2. Enter `certlm.msc`.
3. Go to **Personal** > **Certificates**.

{{</tab>}}
{{<tab label="macos" no-code="true">}}

1. Open **Keychain Access**.
2. Go to **System** > **My Certificates**.

{{</tab>}}
{{<tab label="linux" no-code="true">}}

Open a terminal window and run the following command:

```sh
$ certutil -L -d sql:/etc/pki/nssdb
```

{{</tab>}}
{{<tab label="iOS" no-code="true">}}

Go to **Settings** > **General** > **About** > **Certificate Trust Settings**.

{{</tab>}}
{{<tab label="android" no-code="true">}}

The location of the client certificate may vary depending on the Android device.

- **Samsung**: Go to **Settings** > **Security** > **Other security settings** > **View security certificates**.
- **Google Pixel**: Go to **Security** > **Advanced settings** > **Encryption & credentials** > **Credential storage**.

{{</tab>}}
{{<tab label="chromeos" no-code="true">}}

Go to **Settings** > **Apps** > **Google Play Store** > **Manage Android Preferences** > **Security** > **Credentials**.
{{</tab>}}
{{</tabs>}}

The client certificate name should match the **Device ID** in your WARP client **Preferences**. The following example shows what this looks like in Windows:
![Client certificate name matches the Device ID in the WARP client](/images/cloudflare-one/connections/device-information-only-windows.png)

2. To verify the client certificate in your Cloudflare account:

   1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), select the zone for which you enabled client certificates.
   2. Go to **SSL/TLS** > **Client Certificates**.

    The certificate name is the WARP enrollment **Device ID**.
    ![Example client certificate in the Cloudflare dashboard](/images/cloudflare-one/connections/device-information-only-cert.png)

## 4. Enforce the client certificate

To block traffic from devices that do not have a valid client certificate:

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), go to **SSL/TLS** > **Client Certificates**.
2. Under **Hosts**, select **Edit** and enter the hostname of your Access application (for example, `app.mycompany.com`). This enables mTLS authentication for the application.
3. Select **Create mTLS rule**.
4. Create a WAF custom rule that checks all requests to your application for a valid client certificate:
    | Field | Operator | Value | Logic | Action |
    | ----- | -------- | ----- | ----- | ------ |
    | Client Certificate | equals | Off | And | Block |
    | Hostname | equals |  `app.mycompany.com` | | |
5. Select **Deploy**.

Device Information Only mode is now enabled on the device. To start enforcing device posture, set up a [WARP client check](/cloudflare-one/identity/devices/warp-client-checks/) and add a _Require_ device posture rule to your [Access policy](/cloudflare-one/policies/access/). When the device connects to the Access application for the first time, the browser will ask to use the client certificate installed by WARP.

<div class="large-img">

![Browser prompts for client certificate](/images/cloudflare-one/connections/device-information-only-browser.png)

</div>
