---
pcx_content_type: how-to
title: Install certificate using WARP
weight: 1
meta:
    description: Automatically deploy the Cloudflare certificate on desktop devices.
---

# Install a certificate using the WARP client

The WARP client can automatically install the Cloudflare certificate (or a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/)) on devices enrolled in your Zero Trust organization. Installing a certificate allows you to apply HTTP policies to encrypted websites, display custom block pages, and more. The certificate is required if you enabled [TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/) — otherwise, users will lose access to all HTTPS traffic.

## Supported platforms

This feature is available on desktop clients (Windows, macOS, and Linux). On mobile devices, you will need to [install the certificate manually](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/).

## Install the certificate via WARP

### Prerequisites

- WARP client is [deployed](/cloudflare-one/connections/connect-devices/warp/deployment/) on a [supported device](#supported-platforms).
- Device is [enrolled](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device) in your Zero Trust organization.

### Enable certificate installation

1. (Optional) [Upload](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) a custom root certificate to Cloudflare.
2. In the [Zero Trust dashboard](https://one.dash.cloudflare.com/), go to **Settings** > **WARP client**.
3. Enable **Install CA to system certificate store**.

If a custom certificate is not provided, WARP will install the default [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) in the System Keychain for all users. If you uploaded a custom certificate, the WARP client will deploy your custom certificate instead of the Cloudflare certificate. If you later modify or remove the custom certificate, WARP will automatically update the certificate on the device.

{{<Aside type="note">}}
You will still need to manually [add the certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) to individual applications.
{{</Aside>}}

## View the certificate

### Windows

1. Open the Start menu and select **Run**.
2. Enter `certlm.msc`.
3. Go to **Trusted Root Certification Authority** > **Certificates**.

The default Cloudflare certificate is named **Cloudflare for Teams ECC Certificate Authority**.

### macOS

1. Open **Keychain Access**.
2. Go to **System** > **Certificates**.

The default Cloudflare certificate is named **Cloudflare for Teams ECC Certificate Authority**.

### Linux

On Linux, the certificate is stored in `/usr/local/share/ca-certificates`.

The default Cloudflare certificate is named **Cloudflare for Teams ECC Certificate Authority**.

## Uninstall the certificate

To remove a certificate from your device, refer to the instructions supplied by your operating system.
