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

*   [Download certificate (.crt)](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt/)
*   [Download certificate (.pem)](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem/)

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

| Keychain   | Impact                  |
|-------------|-------------------------|
| login       | The logged in user      |
| Local Items | Cached iCloud passwords |
| System      | All users on the system |

Installing the certificate in the Login keychain will result in only the logged in user trusting the Cloudflare certificate. Installing it in the System keychain affects all users who have access to that machine.

To install the certificate in **Keychain Access**:

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2.  Double-click on the `.crt` file.

3.  In the pop-up message, choose the option that suits your needs (*login*, *Local Items*, or *System*) and click **Add**.

![Popup](/cloudflare-one/static/documentation/connections/keychain-popup.png)

The certificate is now listed in your preferred keychain within the **Keychain Access** application. You can always move the certificate under a different keychain by dragging and dropping the certificate onto the desired keychain on the left.

![Keychain](/cloudflare-one/static/documentation/connections/listed-in-keych.png)

4.  Double-click on the certificate.

5.  Click **Trust**.

![Keychain](/cloudflare-one/static/documentation/connections/cert-click-on-trust.png)

6.  From the **When using this certificate** drop-down menu, select **Always Trust**.

![Always trust](/cloudflare-one/static/documentation/connections/cert-select-always-trust.png)

7.  Close the menu.

The root certificate is now installed and ready to be used.

#### Base Operating System

You can install the Cloudflare certificate on your terminal, too.

1.  Download the Cloudflare certificate.
2.  Open Terminal.
3.  Launch the following command:

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain <Cloudflare_CA.crt>
```

1.  Update the OpenSSL CA Store to include the Cloudflare certificate:

```bash
sudo cat Cloudflare_CA.pem >> /usr/local/etc/openssl/cert.pem
```

### iOS

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

The device will show a message: *This website is trying to open Settings to how you a configuration profile. Do you want to allow this?*

![iOS download](/cloudflare-one/static/documentation/connections/ios_cert_download.jpg)

2.  Tap **Allow**.

3.  Navigate to **Settings** > **General** > **Profile** and find the **Cloudflare for Teams ECC Certificate Authority** profile.

![iOS profile](/cloudflare-one/static/documentation/connections/ios_cert_profile1.jpg)

4.  Tap **Install**. If the iOS device is passcode-protected, you will be prompted to enter the passcode.

5.  Next, a certificate warning will appear. Tap **Install**.

If a second prompt is displayed, tap **Install** again.

6.  Next, the **Profile Installed** screen will appear. Tap **Done**.

The certificate is now installed. However, before it can be used, it must be trusted by the device.

7.  On the device, go to **Settings** > **General** > **About** > **Certificate Trust Settings**.

The installed root certificates will be displayed in the *Enable full trust for root certificates* section.

![iOS cert trust](/cloudflare-one/static/documentation/connections/ios_cert_trust1.jpg)

8.  Tap the slide button next to the Cloudflare certificate you just installed.

9.  A confirmation dialogue will appear. Tap **Continue**.

![iOS cert confirm](/cloudflare-one/static/documentation/connections/ios_cert_trust2.jpg)

The root certificate is now installed and ready to be used.

### Windows

Windows offers two options to install the certificate, each having a different impact on which users will be affected by trusting the root certificate.

| Store Location      | Impact                  |
|---------------------|-------------------------|
| Current User Store  | The logged in user      |
| Local Machine Store | All users on the system |

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2.  Right-click on the certificate file.

3.  Click **Open**.\
    If you see a Security Warning window, click **Open**.

4.  The **Certificate** window will appear. Click **Install Certificate**.

![Windows install cert](/cloudflare-one/static/documentation/connections/windows_install_cert.png)

5.  Now choose a Store Location.

6.  Click **Next**.

7.  On the next screen, click **Browse**.

8.  Choose the **Trusted Root Certification Authorities** store.

9.  Click **OK**.

![Windows cert location](/cloudflare-one/static/documentation/connections/windows_cert_location.png)

10. Click **Finish**.

![Windows cert install complete](/cloudflare-one/static/documentation/connections/windows_cert_install_finished.png)

The root certificate is now installed and ready to be used.

### Android

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2.  Navigate to the **Settings** menu.

3.  Select **Security**.

![Android settings](/cloudflare-one/static/documentation/connections/android_security_settings.png)

4.  Tap **Advanced** > **Encryption & Credentials**.

{{<table-wrap>}}

|  |  |
|------|------|
| ![Android encrypt settings](/cloudflare-one/static/documentation/connections/android_advanced_encrypt.png) | ![Android cred settings](/cloudflare-one/static/documentation/connections/android_advanced_encrypt2.png) |

{{</table-wrap>}}

5.  Tap **Install a certificate > CA certificate**.

{{<table-wrap>}}

|  |  |
|------|------|
| ![Android install cert](/cloudflare-one/static/documentation/connections/android_install_cert.png) | ![Android ca cert](/cloudflare-one/static/documentation/connections/android_ca_cert.png) |

{{</table-wrap>}}

7.  Tap **Install Anyway**.

![Android install anyway](/cloudflare-one/static/documentation/connections/android_install_anyway.png)

8.  Verify your identity through the fingerprint, or by inserting the pin code.

9.  Select the certificate you want to install.

![Android choose cert](/cloudflare-one/static/documentation/connections/android_choose_certificate.png)

The root certificate is now installed and ready to be used.

### ChromeOS

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

2.  Navigate to your **ChromeOS Settings**.

![Chrome OS Settings cog](/cloudflare-one/static/documentation/connections/chromeOS1_cert.png)

3.  Navigate to **Apps** and then click **Google Play Store**.

![Click google play store in Apps section](/cloudflare-one/static/documentation/connections/chromeOS2_cert.png)

4.  Click **Manage Android preferences**.

![Click manage android preferences](/cloudflare-one/static/documentation/connections/chromeOS3_cert.png)

5.  Click **Security & location** then click **Credentials** then click **Install from SD card**.

{{<table-wrap>}}

|  |  |  |
|------|------|------|
| ![Click security & location](/cloudflare-one/static/documentation/connections/chromeOS4_cert.png) | ![click credentials](/cloudflare-one/static/documentation/connections/chromeOS5_cert.png) | ![click install from SD card](/cloudflare-one/static/documentation/connections/chromeOS6_cert.png) |

{{</table-wrap>}}

6.  In the file open dialog select the `Cloudflare_CA.crt` file downloaded in step #1 and click **Open**.

![Choose the Cloudflare\_CA.crt file to install](/cloudflare-one/static/documentation/connections/chromeOS7_cert.png)

7.  Enter anything you want for the certificate name and click **OK**.

![Name the certificate with anything](/cloudflare-one/static/documentation/connections/chromeOS8_cert.png)

## Adding to Applications

Some packages, development tools, and other applications provide options to trust root certificates that will allow for the traffic inspection features of Gateway to work without breaking the application.

All of the applications below first require downloading the Cloudflare certificate with the instructions above. On Mac, the default path is `/Library/Keychains/System.keychain Cloudflare_CA.crt`. On Windows, the default path is `\Cert:\CurrentUser\Root`.

### Firefox

If your organization is using Firefox, the browser may need additional configuration to recognize the Cloudflare certificate. There are several ways you can add your Cloudflare certificate to Firefox. For more detailed instructions, see this [Mozilla support article](https://support.mozilla.org/en-US/kb/setting-certificate-authorities-firefox).

### Python

#### Python on Windows

The command to install the certificate with Python on Windows automatically includes PIP and Certifi (the default certificate bundle for certificate validation).

1.  Run the following command to update the bundle to include the Cloudflare certificate:

```bash
gc .\Cloudflare_CA.crt | ac C:\Python37\Lib\site-packages\pip\_vendor\certifi\cacert.pem
```

#### Python on Mac

1.  Install the `certifi` package.

```bash
pip install certifi
```

1.  Identify the CA store by running:

```bash
python -m certifi
```

1.  This will output:

<!---->

    ~/Library/Python/3.7/lib/python/site-packages/certifi/cert.pem

1.  Append the Cloudflare certificate to this CA Store by running:

```bash
cat /Library/Keychains/System.keychain Cloudflare_CA.crt >> $(python -m certifi)
```

1.  If needed, configure system variables to point to this CA Store by running:

<!---->

    export CERT_PATH=$(python -m certifi)
    export SSL_CERT_FILE=${CERT_PATH}
    export REQUESTS_CA_BUNDLE=${CERT_PATH}

### Git

#### Git on Windows

1.  Open Powershell.

2.  Run the following command:

```git
git config -l
```

1.  This will output:

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

1.  The `http.sslcainfo` defines the CA Certificate store. Update this to append the Cloudflare certificate to the CA bundle by running this command:

```git
gc .\Cloudflare_CA.crt | ac $(git config --get http.sslcainfo)
```

#### Git on Mac

1.  Configure Git to trust the Cloudflare certificate with the following command.

<!---->

    git config --global http.sslcainfo [PATH_TO_CLOUDFLARE_CERT]

### npm

The command below will set the `cafile` configuration to use the Cloudflare certificate. Make sure to use the certificate in the [`.pem`](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem/) file type.

    npm config set cafile [PATH_TO_CLOUDFLARE_CERT]

### Google Cloud SDK

The commands below will set the Google Cloud SDK to use the Cloudflare certificate. More information on configuring the Google Cloud SDK is available [here](https://cloud.google.com/sdk/docs/proxy-settings).

1.  Get curl's `cacert` bundle.

    ```bash
    curl -O https://curl.se/ca/cacert.pem
    ```

2.  Get the Cloudflare CA.

    ```bash
    curl -O https://developers.cloudflare.com/cloudflare-one/5147a72af7d01d4f3a34276f1452bf1e/Cloudflare_CA.pem
    ```

3.  Combine the certs into a single `.pem` file.

    ```bash
    cat cacert.pem > ~/ca.pem
    ```

    ```bash
    cat Cloudflare_CA.pem >> ~/ca.pem
    ```

4.  Configure Google Cloud to use the combined `.pem`.

    ```bash
    gcloud config set core/custom_ca_certs_file ~/ca.pem
    ```

### AWS CLI

If you're using the AWS CLI, you need to set the `AWS_CA_BUNDLE` environment variable to use the Cloudflare root certificate. Commands are available for different operating systems in the instructions available [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

## IntelliJ IDEA

Instructions on how to install the Cloudflare root certificate are available [here](https://www.jetbrains.com/help/idea/settings-tools-server-certificates.html)
