---
pcx_content_type: how-to
title: Install certificate manually
weight: 2
meta:
  description: Manually add the Cloudflare certificate to mobile devices and individual applications.
---

# Install the Cloudflare certificate

{{<Aside type="note">}}

This procedure is only required to enable specific Cloudflare Zero Trust features, and should only be done at the direction of your IT department. This procedure is not required to enable the WARP client for consumers.

{{</Aside>}}

If your device does not support [certificate installation via WARP](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/), you can manually install the Cloudflare certificate. You will need to add the certificate to both the [system keychain](#add-the-certificate-to-your-system) and to [individual application stores](#add-the-certificate-to-applications). These steps will need to be performed on each new device that is to be subject to HTTP filtering.

## Download the Cloudflare root certificate

First, download the Cloudflare certificate. The certificate is available both as a `.pem` and as a `.crt` file. Certain applications require the certificate to be in a specific file type, so ensure you download the most appropriate file for your use case.

- [Download certificate (.crt)](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt)
- [Download certificate (.pem)](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem)

### Verify the certificate fingerprint

To verify your download, check that the certificate's thumbprint matches:

#### SHA1

```txt
BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C
```

    ➜  ~ openssl x509 -noout -fingerprint -sha1 -inform der -in <Cloudflare_CA.crt>
    SHA1 Fingerprint=BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C
    ➜  ~ openssl x509 -noout -fingerprint -sha1 -inform pem -in <Cloudflare_CA.pem>
    SHA1 Fingerprint=BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C

#### SHA256

```txt
F5:E1:56:C4:89:78:77:AD:79:3A:1E:83:FA:77:83:F1:9C:B0:C6:1B:58:2C:2F:50:11:B3:37:72:7C:62:3D:EF
```

    ➜  ~ openssl x509 -noout -fingerprint -sha256 -inform der -in <Cloudflare_CA.crt>
    sha256 Fingerprint=F5:E1:56:C4:89:78:77:AD:79:3A:1E:83:FA:77:83:F1:9C:B0:C6:1B:58:2C:2F:50:11:B3:37:72:7C:62:3D:EF
    ➜  ~ openssl x509 -noout -fingerprint -sha256 -inform pem -in <Cloudflare_CA.pem>
    sha256 Fingerprint=F5:E1:56:C4:89:78:77:AD:79:3A:1E:83:FA:77:83:F1:9C:B0:C6:1B:58:2C:2F:50:11:B3:37:72:7C:62:3D:EF

## Add the certificate to your system

### macOS

You will need to install the root certificate in the **Keychain Access** application. In the application, you can choose the keychain in which you want to install the certificate. macOS offers three options, each having a different impact on which users will be affected by trusting the root certificate.

| Keychain    | Impact                  |
| ----------- | ----------------------- |
| login       | The logged in user      |
| Local Items | Cached iCloud passwords |
| System      | All users on the system |

Installing the certificate in the Login keychain will result in only the logged in user trusting the Cloudflare certificate. Installing it in the System Keychain affects all users who have access to that machine.

To install the certificate in **Keychain Access**:

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Double-click the `.crt` file.

3. In the pop-up message, choose the option that suits your needs (_login_, _Local Items_, or _System_) and click **Add**.

![macOS popup window for adding certificates](/images/cloudflare-one/connections/keychain-popup.png)

The certificate is now listed in your preferred keychain within the **Keychain Access** application. You can always move the certificate under a different keychain by dragging and dropping the certificate onto the desired keychain on the left.

![Viewing certificate in macOS Keychain Access application](/images/cloudflare-one/connections/listed-in-keych.png)

4. Double-click the certificate.

5. Click **Trust**.

![macOS window for certificate configuration](/images/cloudflare-one/connections/cert-click-on-trust.png)

6. From the **When using this certificate** drop-down menu, select **Always Trust**.

![macOS window for configuring certificate trust settings](/images/cloudflare-one/connections/cert-select-always-trust.png)

7. Close the menu.

The root certificate is now installed and ready to be used.

#### Base Operating System

You can install the Cloudflare certificate on your terminal, too.

1. Download the Cloudflare certificate.
2. Open Terminal.
3. Launch the following command:

```sh
$ sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain <Cloudflare_CA.crt>
```

4. Update the OpenSSL CA Store to include the Cloudflare certificate:

```sh
$ echo | sudo cat - Cloudflare_CA.pem >> /usr/local/etc/openssl/cert.pem
```

### iOS

iOS only allows the Safari browser to open and install certificates.

1. Open Safari and [download the Cloudflare certificate](#download-the-cloudflare-root-certificate). The device will show a message: _This website is trying to download a configuration profile. Do you want to allow this?_

![iOS popup message asking for permission to download certificate](/images/cloudflare-one/connections/ios_cert_download.PNG)

2. Tap **Allow**.

3. Go to **Settings** > **General** > **VPN & Device Management** and find the **Cloudflare for Teams ECC Certificate Authority** profile.

{{<Aside type="note">}}

Alternatively, you can go to **Settings**, where a new **Profile Downloaded** section will appear directly beneath your iCloud user account info.

{{</Aside>}}

![iOS screen for viewing certificate profile](/images/cloudflare-one/connections/ios_cert_profile.PNG)

4. Select the profile and tap **Install**. If the iOS device is passcode-protected, you will be prompted to enter the passcode.

5. Next, a certificate warning will appear. Tap **Install**.

If a second prompt is displayed, tap **Install** again.

6. Next, the **Profile Installed** screen will appear. Tap **Done**.

![iOS message confirming certificate profile installation](/images/cloudflare-one/connections/ios_profile_installed.PNG)

The certificate is now installed. However, before it can be used, it must be trusted by the device.

7. On the device, go to **Settings** > **General** > **About** > **Certificate Trust Settings**.

The installed root certificates will be displayed in the _Enable full trust for root certificates_ section.

![iOS screen for configuring certificate trust settings](/images/cloudflare-one/connections/ios_cert_trust1.PNG)

8. Tap the slide button next to the Cloudflare certificate you just installed.

9. A confirmation dialogue will appear. Tap **Continue**.

![iOS popup message asking to confirm trust setting](/images/cloudflare-one/connections/ios_cert_trust2.PNG)

The root certificate is now installed and ready to be used.

### Windows

Windows offers two options to install the certificate, each having a different impact on which users will be affected by trusting the root certificate.

| Store Location      | Impact                  |
| ------------------- | ----------------------- |
| Current User Store  | The logged in user      |
| Local Machine Store | All users on the system |

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Right-click the certificate file.

3. Click **Open**. If you see a Security Warning, click **Open** to proceed.

4. The **Certificate** window will appear. Click **Install Certificate**.

![Window for Cloudflare certificate](/images/cloudflare-one/connections/windows_install_cert.png)

5. Now choose a Store Location. If you see a Security Warning, click **Yes** to proceed.

6. On the next screen, click **Browse**.

7. Choose the **Trusted Root Certification Authorities** store.

8. Click **OK**.

![Window for selecting certificate store location](/images/cloudflare-one/connections/windows_cert_location.png)

9. Click **Finish**.

![Window for finishing certificate installation](/images/cloudflare-one/connections/windows_cert_install_finished.png)

The root certificate is now installed and ready to be used.

### Linux

The location where the root certificate should be installed is different depending on your Linux distribution. Please follow the specific instructions for your flavor of Linux.

#### Debian / Ubuntu

1. Download the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy the certificate to the system, changing the file extension to `.crt`.

```sh
$ sudo cp Cloudflare_CA.pem /usr/local/share/ca-certificates/Cloudflare_CA.crt
```

3. Import the certificate.

```sh
$ sudo dpkg-reconfigure ca-certificates
```

#### CentOS / RedHat

1. Download both the [.crt certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt) and the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy both certificates to the trust store.

```sh
$ sudo cp Cloudflare_CA.crt Cloudflare_CA.pem /etc/pki/ca-trust/source/anchors
```

3. Import the certificate.

```sh
$ sudo update-ca-trust
```

### Android

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Go to **Settings** > **Security**.

![Android **Settings** screen](/images/cloudflare-one/connections/android_security_settings.png)

3. Tap **Advanced** > **Encryption & Credentials**.

{{<table-wrap>}}

|                                                                                                          |                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ![Android **Security** settings screen](/images/cloudflare-one/connections/android_advanced_encrypt.png) | ![Android **Security** screen after expanding **Advanced** menu](/images/cloudflare-one/connections/android_advanced_encrypt2.png) |

{{</table-wrap>}}

4. Tap **Install a certificate** > **CA certificate**.

{{<table-wrap>}}

|                                                                                                             |                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| ![Android **Encryption & credentials** screen](/images/cloudflare-one/connections/android_install_cert.png) | ![Android **Install a certificate*** screen](/images/cloudflare-one/connections/android_ca_cert.png) |

{{</table-wrap>}}

5. Tap **Install Anyway**.

![Android screen asking to confirm certificate installation](/images/cloudflare-one/connections/android_install_anyway.png)

6. Verify your identity through the fingerprint, or by inserting the pin code.

7. Select the certificate you want to install.

![Selecting the Cloudflare certificate in the Android Google Drive app](/images/cloudflare-one/connections/android_choose_certificate.png)

The root certificate is now installed and ready to be used.

### ChromeOS

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Go to your **ChromeOS Settings**.

![**Settings** cog in ChromeOS](/images/cloudflare-one/connections/chromeOS1_cert.png)

3. Go to **Apps** > **Google Play Store**.

![**Google Play Store** app in ChromeOS settings](/images/cloudflare-one/connections/chromeOS2_cert.png)

4. Click **Manage Android preferences**.

![**Manage Android preferences** in ChromeOS settings](/images/cloudflare-one/connections/chromeOS3_cert.png)

5. Go to **Security & location** > **Credentials** > **Install from SD card**.

{{<table-wrap>}}

|                                                                                                  |                                                                                                   |                                                                                           |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![ChromeOS **Network & Internet** screen](/images/cloudflare-one/connections/chromeOS4_cert.png) | ![ChromeOS **Security & location** screen](/images/cloudflare-one/connections/chromeOS5_cert.png) | ![ChromeOS **Credentials** screen](/images/cloudflare-one/connections/chromeOS6_cert.png) |

{{</table-wrap>}}

6. In the file open dialog, select the `Cloudflare_CA.crt` file downloaded in step #1 and click **Open**.

![ChromeOS dialogue for selecting a certificate file](/images/cloudflare-one/connections/chromeOS7_cert.png)

7. Enter anything you want for the certificate name and click **OK**.

![ChromeOS dialogue for naming the certificate](/images/cloudflare-one/connections/chromeOS8_cert.png)

### Nix and NixOS

NixOS does not use the system certificate store for self updating and instead relies on the certificates found in `~/.nix-profile/etc/ssl/certs` or provided by `NIX_SSL_CERT_FILE` at runtime.

## Add the certificate to applications

Some packages, development tools, and other applications provide options to trust root certificates that will allow for the traffic inspection features of Gateway to work without breaking the application.

All of the applications below first require downloading the Cloudflare certificate with the instructions above. On Mac, the default path is `/Library/Keychains/System.keychain Cloudflare_CA.crt`. On Windows, the default path is `\Cert:\CurrentUser\Root`.

{{<Aside type="note">}}
Some applications require the use of a publicly trusted certificate — they do not trust the system certificate, nor do they have a configurable private store. For these applications to function, you must add a [Do Not Inspect policy](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) for the domains or IPs that the application relies on.
{{</Aside>}}

### Firefox

If your organization is using Firefox, the browser may need additional configuration to recognize the Cloudflare certificate. There are several ways you can add your Cloudflare certificate to Firefox. For more detailed instructions, see this [Mozilla support article](https://support.mozilla.org/en-US/kb/setting-certificate-authorities-firefox).

### Python

#### Python on Windows

The command to install the certificate with Python on Windows automatically includes PIP and Certifi (the default certificate bundle for certificate validation).

1. Download the Cloudflare root certificate:

   ```bash
   curl -o Cloudflare_CA.crt https://developers.cloudflare.com/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt
   ```

2. To update the bundle to include the Cloudflare certificate, run the following command:

   ```bash
   gc .\Cloudflare_CA.crt | ac C:\Python37\Lib\site-packages\pip\_vendor\certifi\cacert.pem
   ```

#### Python on Mac and Linux

1. Install the `certifi` package:

   ```sh
   $ pip install certifi
   ```

2. Identify the CA store:

   ```sh
   $ python -m certifi
   ~/Library/Python/3.7/lib/python/site-packages/certifi/cert.pem
   ```

3. Download the Cloudflare root certificate:

   ```sh
   $ wget https://developers.cloudflare.com/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem
   ```

4. Append the Cloudflare certificate to this CA Store by running:

   ```sh
   $ echo | cat - Cloudflare_CA.pem >> $(python -m certifi)
   ```

5. If needed, configure system variables to point to this CA Store:

   ```sh
   $ export CERT_PATH=$(python -m certifi)
   $ export SSL_CERT_FILE=${CERT_PATH}
   $ export REQUESTS_CA_BUNDLE=${CERT_PATH}
   ```

### Git

#### Git on Windows

1. Open PowerShell.

2. Run the following command:

```sh
$ git config -l
```

This command will output:

<!---->

    core.symlinks=false
    core.autocrlf=true
    core.fscache=true
    color.diff=auto
    color.status=auto
    color.branch=auto
    color.interactive=true
    help.format=html
    rebase.autosquash=true
    http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
    http.sslbackend=openssl
    diff.astextplain.textconv=astextplain
    filter.lfs.clean=git-lfs clean -- %f
    filter.lfs.smudge=git-lfs smudge -- %f
    filter.lfs.process=git-lfs filter-process
    filter.lfs.required=true
    credential.helper=manager

3. The `http.sslcainfo` defines the CA Certificate store. To append the Cloudflare certificate to the CA bundle, update `http.sslcainfo`.

```git
gc .\Cloudflare_CA.pem | ac $(git config --get http.sslcainfo)
```

#### Git on Mac and Linux

Configure Git to trust the Cloudflare certificate.

```sh
$ git config --global http.sslcainfo [PATH_TO_CLOUDFLARE_CERT]
```

### npm

The command below will set the `cafile` configuration to use the Cloudflare certificate. Make sure to use the certificate in the [`.pem`](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem) file type.

```sh
$ npm config set cafile [PATH_TO_CLOUDFLARE_CERT.pem]
```

On some systems you may need to set the following in your path/export list:

```sh
$ export NODE_EXTRA_CA_CERTS='[PATH_TO_CLOUDFLARE_CERT.pem]'
```

### Google Cloud SDK

The commands below will set the Google Cloud SDK to use the Cloudflare certificate. More information on configuring the Google Cloud SDK is available [here](https://cloud.google.com/sdk/docs/proxy-settings).

1. Get curl's `cacert` bundle.

   ```sh
   $ curl -O https://curl.se/ca/cacert.pem
   ```

2. Get the Cloudflare CA.

   ```sh
   $ curl -O https://developers.cloudflare.com/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem
   ```

3. Combine the certs into a single `.pem` file.

   ```sh
   $ cat cacert.pem Cloudflare_CA.pem > ~/ca.pem
   ```

4. Configure Google Cloud to use the combined `.pem`.

   ```sh
   $ gcloud config set core/custom_ca_certs_file ~/ca.pem
   ```

{{<Aside type="note">}}
The file at `~/ca.pem` needs to remain in place in order for the `gcloud` utility to leverage it. If the file is moved then step 3 above will need to be re-run to point `gcloud` to the file's new location.
{{</Aside>}}

#### Google Cloud SDK and Kaniko

Per the [`gcloud` documentation](https://cloud.google.com/sdk/gcloud/reference/builds/submit), if Kaniko is being used the Cloudflare certificate will need to be installed in the Kaniko CA store. Instructions can be found [here](https://docs.gitlab.com/ee/ci/docker/using_kaniko.html#using-a-registry-with-a-custom-certificate).

### Google Drive for desktop

To trust the Cloudflare root certificate in the Google Drive desktop application, follow the procedure for your operating system. These steps require you to [download the .pem certificate](#download-the-cloudflare-root-certificate).

<details>
<summary>macOS</summary>
<div>

1. In the Finder menu bar, go to **Go** > **Go to Folder**. Enter `/Applications/Google Drive.app/Contents/Resources`.
2. Find `roots.pem` and copy it to a permanent location, such as your Documents folder.
3. Append the contents of `cloudflare.pem` to the end of `roots.pem`.

   ```sh
   $ cat ~/Downloads/Cloudflare_CA.pem >> path/to/roots.pem
   ```

4. Apply the newly created root certificate to your Google Drive application.

   ```sh
   $ sudo defaults write /Library/Preferences/com.google.drivefs.settings TrustedRootsCertsFile -string "path/to/root.pem"
   ```

You can verify the update with the following command.

```sh
$ defaults read /Library/Preferences/com.google.drivefs.settings
```

</div>
</details>

<details>
<summary>Windows</summary>
<div>
 
1. In File Explorer, go to `\Program Files\Google\Drive File Stream\<version>\config\`.
2. Find `roots.pem` and copy it to a permanent location, such as your Documents folder.
3. Append the contents of `cloudflare.pem` to the end of `roots.pem`.

    ```sh
    $ cat ~\Downloads\Cloudflare_CA.pem >> path\to\roots.pem
    ```

4. Update the Google Drive registry key.

   ```sh
   $ reg ADD "HKEY_LOCAL_MACHINE\Software\Google\DriveFS" /v TrustedRootCertsFile /t REG_SZ /d "path\to\roots.pem"
   ```

You can verify the update with the following command.

```sh
$ reg QUERY "HKEY_LOCAL_MACHINE\Software\Google\DriveFS" /v TrustedRootCertsFile"
```

</div>
</details>

For more information, refer to the [Google documentation](https://support.google.com/a/answer/7644837) for the `TrustedRootCertsFile` setting.

### AWS CLI

If you're using the AWS CLI, you need to set the `AWS_CA_BUNDLE` environment variable to use the Cloudflare root certificate. Commands are available for different operating systems in the instructions available [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

### PHP Composer

The command below will set the [`cafile`](https://getcomposer.org/doc/06-config.md#cafile) configuration inside of `composer.json` to use the Cloudflare root certificate. Make sure to use the certificate in the [`.pem`](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem) file type.

```sh
$ composer config cafile [PATH_TO_CLOUDFLARE_CERT.pem]
```

Alternatively, you can add this manually to your `composer.json` file under the `config` key.

### JetBrains

To install the Cloudflare root certificate on JetBrains products, refer to the links below:

- [AppCode](https://www.jetbrains.com/help/objc/settings-tools-server-certificates.html)
- [CLion](https://www.jetbrains.com/help/clion/settings-tools-server-certificates.html)
- [DataGrip](https://www.jetbrains.com/help/datagrip/settings-tools-server-certificates.html)
- [DataSpell](https://www.jetbrains.com/help/dataspell/settings-tools-server-certificates.html)
- [GoLand](https://www.jetbrains.com/help/go/settings-tools-server-certificates.html)
- [IntelliJ IDEA](https://www.jetbrains.com/help/idea/settings-tools-server-certificates.html)
- [PhpStorm](https://www.jetbrains.com/help/phpstorm/settings-tools-server-certificates.html)
- [PyCharm](https://www.jetbrains.com/help/pycharm/settings-tools-server-certificates.html)
- [Rider](https://www.jetbrains.com/help/rider/Settings_Tools_Server_Certificates.html)
- [WebStorm](https://www.jetbrains.com/help/webstorm/settings-tools-server-certificates.html)

### Minikube

Instructions on how to install the Cloudflare root certificate are available [here](https://minikube.sigs.k8s.io/docs/handbook/vpn_and_proxy/#x509-certificate-signed-by-unknown-authority)
