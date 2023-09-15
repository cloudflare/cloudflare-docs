---
pcx_content_type: how-to
title: Install certificate using WARP
weight: 1
meta:
    description: Automatically deploy a root certificate on desktop devices.
---

# Install a certificate using the WARP client

The WARP client can automatically install the Cloudflare certificate (or a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/)) on devices enrolled in your Zero Trust organization. The certificate is required if you want to [apply HTTP policies to encrypted websites](/cloudflare-one/policies/gateway/http-policies/tls-decryption/), display custom block pages, and more.

## Supported platforms

This feature is available on Windows, macOS, and Linux using a client version of 2023.3.381 or higher. On mobile devices, you will need to [install the certificate manually](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/).

## Install the certificate using WARP

1. (Optional) [Upload](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) a custom root certificate to Cloudflare.
2. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP client**.
3. Enable **Install CA to system certificate store**.
4. [Install](/cloudflare-one/connections/connect-devices/warp/download-warp/) the WARP client on the device.
5. [Enroll the device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#enroll-a-device-manually) in your Zero Trust organization.

If a custom certificate is not provided, WARP will install the default [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#download-the-cloudflare-root-certificate) in the system keychain for all users. If you uploaded a custom certificate, the WARP client will deploy your custom certificate instead of the Cloudflare certificate.

Next, [verify](#view-the-installed-certificate) that the certificate was successfully installed.

{{<Aside type="note" header="Important">}}
WARP only installs the system certificate — it does not install the certificate on individual applications. You will need to [manually add the certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) to applications that rely on their own certificate store.

{{</Aside>}}

## View the installed certificate

### Windows

1. Open the Start menu and select **Run**.
2. Enter `certlm.msc`.
3. Go to **Trusted Root Certification Authority** > **Certificates**.

The default Cloudflare certificate is named **Cloudflare for Teams ECC Certificate Authority**.

The certificate is also placed in `%ProgramData%\Cloudflare\installed_cert.pem` for easy reference by scripts or tools.

### macOS

1. Open **Keychain Access**.
2. Go to **System** > **Certificates**.
3. Double-click your certificate. (The default Cloudflare certificate is named **Cloudflare for Teams ECC Certificate Authority**.)
4. You should see **This certificate is marked as trusted for all users**. If the certificate is not trusted:
    1. Select **Trust**.
    2. Set **When using this certificate** to _Always Trust_.
  
The certificate is also placed in `/Library/Application Support/Cloudflare/installed_cert.pem` for easy reference by scripts or tools.


### Linux

On Linux, the certificate is stored in `/usr/local/share/ca-certificates`. The default Cloudflare certificate is named `Cloudflare_CA.crt`.

If you do not see the certificate, run the following command to update the system store:

```sh
$ update-ca-certificates
```
The certificate is also placed in `/var/lib/cloudflare-warp/installed_cert.pem` for easy reference by scripts or tools.

## Uninstall the certificate

If the certificate was installed by the WARP client, it is automatically removed when you disable **Install CA to system certificate store** or [uninstall WARP](/cloudflare-one/connections/connect-devices/warp/remove-warp/). WARP does not remove certificates that were installed manually (for example, certificates added to third-party applications).

To manually remove the certificate, refer to the instructions supplied by your operating system or the third-party application.
