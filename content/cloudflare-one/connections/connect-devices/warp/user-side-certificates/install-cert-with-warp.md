---
pcx_content_type: how-to
title: Install certificate using WARP
weight: 1
meta:
    description: Automatically deploy a root certificate on desktop devices.
---

# Install a certificate using the WARP client

The WARP client can automatically install the Cloudflare certificate (or a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/)) on devices enrolled in your Zero Trust organization. The certificate is required if you want to [apply HTTP policies to encrypted websites](/cloudflare-one/policies/filtering/http-policies/tls-decryption/), display custom block pages, and more.

## Supported platforms

This feature is available on Windows, macOS, and Linux. On mobile devices, you will need to [install the certificate manually](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/).

## Install the certificate using WARP

1. (Optional) [Upload](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) a custom root certificate to Cloudflare.
2. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP client**.
3. Enable **Install CA to system certificate store**.
4. [Install](/cloudflare-one/connections/connect-devices/warp/download-warp/) the WARP client on the device.
5. [Enroll the device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device) in your Zero Trust organization.

If a custom certificate is not provided, WARP will install the default [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) in the system keychain for all users. If you uploaded a custom certificate, the WARP client will deploy your custom certificate instead of the Cloudflare certificate.

{{<Aside type="note" header="Important">}}
WARP only installs the system certificate — it does not install the certificate on individual applications. You will need to [manually add the certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) to applications that rely on their own certificate store.

{{</Aside>}}

## View the installed certificate

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

On Linux, the certificate is stored in `/usr/local/share/ca-certificates`. The default Cloudflare certificate is named `Cloudflare_CA.crt`.

If you do not see the certificate, run the following command to update the system store:

```sh
$ update-ca-certificates
```

## Uninstall the certificate

If the certificate was installed by the WARP client, it is automatically removed when you disable **Install CA to system certificate store** or [uninstall WARP](/cloudflare-one/connections/connect-devices/warp/remove-warp/). WARP does not remove certificates that were installed manually (for example, certificates added to third-party applications).

To manually remove the certificate, refer to the instructions supplied by your operating system or the third-party application.
