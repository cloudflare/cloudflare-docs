---
pcx_content_type: how-to
title: Enable Device Information Only
weight: 2
---

# Enable Device Information Only mode

Device Information Only mode allows you to enforce device posture rules when a user connects to your [self-hosted Access application](/cloudflare-one/applications/configure-apps/self-hosted-apps/). This mode relies on a client certificate generated from your account to establish trust between the Access application and the device.

To setup Device Information Only mode:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following minimum permissions:
    * **Zero Trust: Edit**
    *  **SSL and Certificates: Edit**

2. Enable client certificate provisioning for [your zone](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/):

    ```sh
    curl -X PATCH 'https://api.cloudflare.com/client/v4/zones/<ZONE ID>/devices/policy/certificates' \
    -h 'Authorization: Bearer <API TOKEN>' \
    -d '{"enabled": true}'
    ```

3. In your [WARP profile settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/), scroll down to **Service mode** and select **Device Information Only**.

4. [Enroll your device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device) into your Zero Trust organization.

    When enrolled in Device Information Only mode, the WARP client will automatically generate a client certificate and install the certificate on the device. This certificate is necessary to confirm the source of outgoing traffic.

5. (Optional) To view the client certificate on the device:

{{<tabs labels="Windows | macOS">}}
{{<tab label="windows" no-code="true">}}

1. Open the Start menu and select **Run**.
2. Enter `certlm.msc`.
3. Navigate to **Personal** > **Certificates**.

The certificate name should match the **Device ID** in your WARP client **Preferences**.
![Verifying the Device Information Only mode certificate in Windows](/cloudflare-one/static/documentation/connections/device-information-only-windows.png)

{{</tab>}}
{{<tab label="macos" no-code="true">}}
 
1. Open **Keychain Access**.
2. Go to **System** > **My Certificates**.

The certificate name should match the **Device ID** in your WARP client **Preferences**.
 
{{</tab>}}
{{</tabs>}}


6. (Optional) To view the client certificate in your Cloudflare account:
    1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), select the zone for which you enabled client certificates.
    2. Go to **SSL/TLS** > **Client Certificates**.

    The certificate name is the WARP enrollment **Device ID**.
    ![Example client certificate in the Cloudflare dashboard](/cloudflare-one/static/documentation/connections/device-information-only-cert.png)

7. Lastly, block traffic from devices that do not have a valid client certificate:
    1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), go to **SSL/TLS** > **Client Certificates**.
    2. Under **Hosts**, add the domain you want to protect with device posture rules.
    3. Select **Create mTLS rule**.
    4. In the **Hostname** dropdown, select your domain.
    5. Select **Deploy**. This creates a WAF Firewall rule that checks all requests to your domain for a valid client certificate.

Device Information Only mode is now enabled on the device. To start enforcing device posture, set up a [WARP client check](/cloudflare-one/identity/devices/warp-client-checks/) and add a _Require_ device posture rule to your [Access policy](/cloudflare-one/policies/access/). When the device connects to the Access application for the first time, the browser will ask to use the client certificate installed by WARP.
<div class="large-img">

![Browser prompts for client certificate](/cloudflare-one/static/documentation/connections/device-information-only-browser.png)

</div>