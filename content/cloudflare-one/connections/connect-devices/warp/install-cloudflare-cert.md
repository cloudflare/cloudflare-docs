---
pcx-content-type: how-to
title: Install the Cloudflare certificate
weight: 3
---

# Install the Cloudflare certificate

{{<Aside type="note">}}

This procedure is only required to enable specific Cloudflare Zero Trust features, and should only be done at the direction of your IT department. This procedure is not required to enable the WARP client for consumers.

{{</Aside>}}

Advanced security features including HTTPS traffic inspection require users to install and trust the Cloudflare root certificate on their machine or device. If you are installing certificates manually on all of your devices, these steps will need to be performed on each new device that is to be subject to HTTP filtering.

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

### MacOS

You will need to install the root certificate in the **Keychain Access** application. In the application, you can choose the keychain in which you want to install the certificate. macOS offers three options, each having a different impact on which users will be affected by trusting the root certificate.

| Keychain    | Impact                  |
| ----------- | ----------------------- |
| login       | The logged in user      |
| Local Items | Cached iCloud passwords |
| System      | All users on the system |

Installing the certificate in the Login keychain will result in only the logged in user trusting the Cloudflare certificate. Installing it in the System keychain affects all users who have access to that machine.

To install the certificate in **Keychain Access**:

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Double-click the `.crt` file.

3. In the pop-up message, choose the option that suits your needs (_login_, _Local Items_, or _System_) and click **Add**.

![MacOS popup window for adding certificates](/cloudflare-one/static/documentation/connections/keychain-popup.png)

The certificate is now listed in your preferred keychain within the **Keychain Access** application. You can always move the certificate under a different keychain by dragging and dropping the certificate onto the desired keychain on the left.

![Viewing certificate in MacOS Keychain Access application](/cloudflare-one/static/documentation/connections/listed-in-keych.png)

4. Double-click the certificate.

5. Click **Trust**.

![MacOS window for certificate configuration](/cloudflare-one/static/documentation/connections/cert-click-on-trust.png)

6. From the **When using this certificate** drop-down menu, select **Always Trust**.

![MacOS window for configuring certificate trust settings](/cloudflare-one/static/documentation/connections/cert-select-always-trust.png)

7. Close the menu.

The root certificate is now installed and ready to be used.

#### Base Operating System

You can install the Cloudflare certificate on your terminal, too.

1. Download the Cloudflare certificate.
2. Open Terminal.
3. Launch the following command:

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain <Cloudflare_CA.crt>
```

4. Update the OpenSSL CA Store to include the Cloudflare certificate:

```bash
sudo cat Cloudflare_CA.pem >> /usr/local/etc/openssl/cert.pem
```

### iOS

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate). The device will show a message: _This website is trying to download a configuration profile. Do you want to allow this?_

![iOS popup message asking for permission to download certificate](/cloudflare-one/static/documentation/connections/ios_cert_download.PNG)

2. Tap **Allow**.

3. Navigate to **Settings** > **General** > **VPN & Device Management** and find the **Cloudflare for Teams ECC Certificate Authority** profile.

{{<Aside type="note">}}

Alternatively you can navigate to **Settings**, where a new **Profile Downloaded** section will appear directly beneath your iCloud user account info.

{{</Aside>}}

![iOS screen for viewing certificate profile](/cloudflare-one/static/documentation/connections/ios_cert_profile.PNG)

4. Select the profile and tap **Install**. If the iOS device is passcode-protected, you will be prompted to enter the passcode.

5. Next, a certificate warning will appear. Tap **Install**.

If a second prompt is displayed, tap **Install** again.

6. Next, the **Profile Installed** screen will appear. Tap **Done**.

![iOS message confirming certificate profile installation](/cloudflare-one/static/documentation/connections/ios_profile_installed.PNG)

The certificate is now installed. However, before it can be used, it must be trusted by the device.

7. On the device, go to **Settings** > **General** > **About** > **Certificate Trust Settings**.

The installed root certificates will be displayed in the _Enable full trust for root certificates_ section.

![iOS screen for configuring certificate trust settings](/cloudflare-one/static/documentation/connections/ios_cert_trust1.PNG)

8. Tap the slide button next to the Cloudflare certificate you just installed.

9. A confirmation dialogue will appear. Tap **Continue**.

![iOS popup message asking to confirm trust setting](/cloudflare-one/static/documentation/connections/ios_cert_trust2.PNG)

The root certificate is now installed and ready to be used.

### Windows

Windows offers two options to install the certificate, each having a different impact on which users will be affected by trusting the root certificate.

| Store Location      | Impact                  |
| ------------------- | ----------------------- |
| Current User Store  | The logged in user      |
| Local Machine Store | All users on the system |

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Right-click the certificate file.

3. Click **Open**.\
    If you see a Security Warning window, click **Open**.

4. The **Certificate** window will appear. Click **Install Certificate**.

![Window for Cloudflare certificate](/cloudflare-one/static/documentation/connections/windows_install_cert.png)

5. Now choose a Store Location.

6. Click **Next**.

7. On the next screen, click **Browse**.

8. Choose the **Trusted Root Certification Authorities** store.

9. Click **OK**.

![Window for selecting certificate store location](/cloudflare-one/static/documentation/connections/windows_cert_location.png)

10. Click **Finish**.

![Window for finishing certificate installation](/cloudflare-one/static/documentation/connections/windows_cert_install_finished.png)

The root certificate is now installed and ready to be used.

### Linux

The location where the root certificate should be installed is different depending on your Linux distribution. Please follow the specific instructions for your flavor of Linux.

#### Debian / Ubuntu

1. Download both the [.crt certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt) and the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy both certificates to the user store.

  ```bash
  sudo cp Cloudflare_CA.crt Cloudflare_CA.pem /usr/share/ca-certificates
  ```
  
3. Import the certificate

```bash
sudo dpkg-reconfigure ca-certificates
```

#### CentOS / RedHat

1. Download both the [.crt certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt) and the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy both certificates to the trust store.

  ```bash
  sudo cp Cloudflare_CA.crt Cloudflare_CA.pem /etc/pki/ca-trust/source/anchors
  ```

3. Import the certificate.

```bash
sudo update-ca-trust
```

### Android

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Navigate to **Settings** > **Security**.

![Android **Settings** screen](/cloudflare-one/static/documentation/connections/android_security_settings.png)

3. Tap **Advanced** > **Encryption & Credentials**.

{{<table-wrap>}}

|                                                                                                            |                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![Android **Security** settings screen](/cloudflare-one/static/documentation/connections/android_advanced_encrypt.png) | ![Android **Security** screen after expanding **Advanced** menu](/cloudflare-one/static/documentation/connections/android_advanced_encrypt2.png) |

{{</table-wrap>}}

4. Tap **Install a certificate > CA certificate**.

{{<table-wrap>}}

|                                                                                                    |                                                                                          |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Android **Encryption & credentials** screen](/cloudflare-one/static/documentation/connections/android_install_cert.png) | ![Android **Install a certificate*** screen](/cloudflare-one/static/documentation/connections/android_ca_cert.png) |

{{</table-wrap>}}

5. Tap **Install Anyway**.

![Android screen asking to confirm certificate installation](/cloudflare-one/static/documentation/connections/android_install_anyway.png)

6. Verify your identity through the fingerprint, or by inserting the pin code.

7. Select the certificate you want to install.

![Selecting the Cloudflare certificate in the Android Google Drive app](/cloudflare-one/static/documentation/connections/android_choose_certificate.png)

The root certificate is now installed and ready to be used.

### ChromeOS

1. [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2. Navigate to your **ChromeOS Settings**.

![**Settings** cog in ChromeOS](/cloudflare-one/static/documentation/connections/chromeOS1_cert.png)

3. Navigate to **Apps** > **Google Play Store**.

![**Google Play Store** app in ChromeOS settings](/cloudflare-one/static/documentation/connections/chromeOS2_cert.png)

4. Click **Manage Android preferences**.

![**Manage Android preferences** in ChromeOS settings](/cloudflare-one/static/documentation/connections/chromeOS3_cert.png)

5. Navigate to **Security & location** > **Credentials** > **Install from SD card**.

{{<table-wrap>}}

|                                                                                                   |                                                                                           |                                                                                                    |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![ChromeOS **Network & Internet** screen](/cloudflare-one/static/documentation/connections/chromeOS4_cert.png) | ![ChromeOS **Security & location** screen](/cloudflare-one/static/documentation/connections/chromeOS5_cert.png) | ![ChromeOS **Credentials** screen](/cloudflare-one/static/documentation/connections/chromeOS6_cert.png) |

{{</table-wrap>}}

6. In the file open dialog, select the `Cloudflare_CA.crt` file downloaded in step #1 and click **Open**.

![ChromeOS dialogue for selecting a certificate file](/cloudflare-one/static/documentation/connections/chromeOS7_cert.png)

7. Enter anything you want for the certificate name and click **OK**.

![ChromeOS dialogue for naming the certificate](/cloudflare-one/static/documentation/connections/chromeOS8_cert.png)


### Nix and NixOS

nixOS does not use the system certificate store for self updating and instead relies on the certificates found in `~/.nix-profile/etc/ssl/certs` or provided by `NIX_SSL_CERT_FILE` at runtime.

## Add the certificate to applications

Some packages, development tools, and other applications provide options to trust root certificates that will allow for the traffic inspection features of Gateway to work without breaking the application.

All of the applications below first require downloading the Cloudflare certificate with the instructions above. On Mac, the default path is `/Library/Keychains/System.keychain Cloudflare_CA.crt`. On Windows, the default path is `\Cert:\CurrentUser\Root`.

### Firefox

If your organization is using Firefox, the browser may need additional configuration to recognize the Cloudflare certificate. There are several ways you can add your Cloudflare certificate to Firefox. For more detailed instructions, see this [Mozilla support article](https://support.mozilla.org/en-US/kb/setting-certificate-authorities-firefox).

### Python

#### Python on Windows

The command to install the certificate with Python on Windows automatically includes PIP and Certifi (the default certificate bundle for certificate validation).

To update the bundle to include the Cloudflare certificate, run the following command:

```bash
gc .\Cloudflare_CA.crt | ac C:\Python37\Lib\site-packages\pip\_vendor\certifi\cacert.pem
```

#### Python on Mac and Linux

1. Install the `certifi` package.

```bash
pip install certifi
```

2. Identify the CA store.

```bash
python -m certifi
```

This command will output:

<!---->

    ~/Library/Python/3.7/lib/python/site-packages/certifi/cert.pem

3. Append the Cloudflare certificate to this CA Store by running:

```bash
cat /Library/Keychains/System.keychain Cloudflare_CA.crt >> $(python -m certifi)
```

4. If needed, configure system variables to point to this CA Store.

<!---->

    export CERT_PATH=$(python -m certifi)
    export SSL_CERT_FILE=${CERT_PATH}
    export REQUESTS_CA_BUNDLE=${CERT_PATH}

### Git

#### Git on Windows

1. Open Powershell.

2. Run the following command:

```git
git config -l
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
gc .\Cloudflare_CA.crt | ac $(git config --get http.sslcainfo)
```

#### Git on Mac and Linux

Configure Git to trust the Cloudflare certificate.

<!---->

    git config --global http.sslcainfo [PATH_TO_CLOUDFLARE_CERT]

### npm

The command below will set the `cafile` configuration to use the Cloudflare certificate. Make sure to use the certificate in the [`.pem`](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem) file type.

```bash
npm config set cafile [PATH_TO_CLOUDFLARE_CERT.pem]
```

On some systems you may need to set the following in your path/export list:

```bash
export NODE_EXTRA_CA_CERTS='[PATH_TO_CLOUDFLARE_CERT.pem]'
```

### Google Cloud SDK

The commands below will set the Google Cloud SDK to use the Cloudflare certificate. More information on configuring the Google Cloud SDK is available [here](https://cloud.google.com/sdk/docs/proxy-settings).

1. Get curl's `cacert` bundle.

    ```bash
    curl -O https://curl.se/ca/cacert.pem
    ```

2. Get the Cloudflare CA.

    ```bash
    curl -O https://developers.cloudflare.com/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem
    ```

2. Combine the certs into a single `.pem` file.

    ```bash
    cat cacert.pem Cloudflare_CA.pem > ~/ca.pem
    ```

3. Configure Google Cloud to use the combined `.pem`.

    ```bash
    gcloud config set core/custom_ca_certs_file ~/ca.pem
    ```

### AWS CLI

If you're using the AWS CLI, you need to set the `AWS_CA_BUNDLE` environment variable to use the Cloudflare root certificate. Commands are available for different operating systems in the instructions available [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

### IntelliJ IDEA

Instructions on how to install the Cloudflare root certificate are available [here](https://www.jetbrains.com/help/idea/settings-tools-server-certificates.html)

### Minikube

Instructions on how to install the Cloudflare root certificate are available [here](https://minikube.sigs.k8s.io/docs/handbook/vpn_and_proxy/#x509-certificate-signed-by-unknown-authority)
