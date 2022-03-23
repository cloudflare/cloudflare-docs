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
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C</span></div></span></span></span></code></pre>{{</raw>}}

    ➜  ~ openssl x509 -noout -fingerprint -sha1 -inform der -in <Cloudflare_CA.crt>
    SHA1 Fingerprint=BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C
    ➜  ~ openssl x509 -noout -fingerprint -sha1 -inform pem -in <Cloudflare_CA.pem>
    SHA1 Fingerprint=BB:2D:B6:3D:6B:DE:DA:06:4E:CA:CB:40:F6:F2:61:40:B7:10:F0:6C

#### SHA256
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">F5:E1:56:C4:89:78:77:AD:79:3A:1E:83:FA:77:83:F1:9C:B0:C6:1B:58:2C:2F:50:11:B3:37:72:7C:62:3D:EF</span></div></span></span></span></code></pre>{{</raw>}}

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

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

1.  Double-click on the `.crt` file.

1.  In the pop-up message, choose the option that suits your needs (_login_, _Local Items_, or _System_) and click **Add**.

![Popup](/cloudflare-one/static/documentation/connections/keychain-popup.png)

The certificate is now listed in your preferred keychain within the **Keychain Access** application. You can always move the certificate under a different keychain by dragging and dropping the certificate onto the desired keychain on the left.

![Keychain](/cloudflare-one/static/documentation/connections/listed-in-keych.png)

1.  Double-click on the certificate.

1.  Click **Trust**.

![Keychain](/cloudflare-one/static/documentation/connections/cert-click-on-trust.png)

1.  From the **When using this certificate** drop-down menu, select **Always Trust**.

![Always trust](/cloudflare-one/static/documentation/connections/cert-select-always-trust.png)

1.  Close the menu.

The root certificate is now installed and ready to be used.

#### Base Operating System

You can install the Cloudflare certificate on your terminal, too.

1.  Download the Cloudflare certificate.
1.  Open Terminal.
1.  Launch the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">Cloudflare_CA.crt</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Update the OpenSSL CA Store to include the Cloudflare certificate:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">cat</span><span class="CodeBlock--token-plain"> Cloudflare_CA.pem </span><span class="CodeBlock--token-operator">&gt&gt</span><span class="CodeBlock--token-plain"> /usr/local/etc/openssl/cert.pem</span></div></span></span></span></code></pre>{{</raw>}}

### iOS

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

The device will show a message: _This website is trying to open Settings to how you a configuration profile. Do you want to allow this?_

![iOS download](/cloudflare-one/static/documentation/connections/ios_cert_download.jpg)

1.  Tap **Allow**.

1.  Navigate to **Settings** > **General** > **Profile** and find the **Cloudflare for Teams ECC Certificate Authority** profile.

![iOS profile](/cloudflare-one/static/documentation/connections/ios_cert_profile1.jpg)

1.  Tap **Install**. If the iOS device is passcode-protected, you will be prompted to enter the passcode.

1.  Next, a certificate warning will appear. Tap **Install**.

If a second prompt is displayed, tap **Install** again.

1.  Next, the **Profile Installed** screen will appear. Tap **Done**.

The certificate is now installed. However, before it can be used, it must be trusted by the device.

1.  On the device, go to **Settings** > **General** > **About** > **Certificate Trust Settings**.

The installed root certificates will be displayed in the _Enable full trust for root certificates_ section.

![iOS cert trust](/cloudflare-one/static/documentation/connections/ios_cert_trust1.jpg)

1.  Tap the slide button next to the Cloudflare certificate you just installed.

1.  A confirmation dialogue will appear. Tap **Continue**.

![iOS cert confirm](/cloudflare-one/static/documentation/connections/ios_cert_trust2.jpg)

The root certificate is now installed and ready to be used.

### Windows

Windows offers two options to install the certificate, each having a different impact on which users will be affected by trusting the root certificate.

| Store Location      | Impact                  |
| ------------------- | ----------------------- |
| Current User Store  | The logged in user      |
| Local Machine Store | All users on the system |

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

1.  Right-click on the certificate file.

1.  Click **Open**.\
    If you see a Security Warning window, click **Open**.

1.  The **Certificate** window will appear. Click **Install Certificate**.

![Windows install cert](/cloudflare-one/static/documentation/connections/windows_install_cert.png)

1.  Now choose a Store Location.

1.  Click **Next**.

1.  On the next screen, click **Browse**.

1.  Choose the **Trusted Root Certification Authorities** store.

1.  Click **OK**.

![Windows cert location](/cloudflare-one/static/documentation/connections/windows_cert_location.png)

1. Click **Finish**.

![Windows cert install complete](/cloudflare-one/static/documentation/connections/windows_cert_install_finished.png)

The root certificate is now installed and ready to be used.

### Linux

The location where the root certificate should be installed is different depending on your Linux distribution. Please follow the specific instructions for your flavor of Linux.

#### Debian / Ubuntu

1. Download both the [.crt certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt) and the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy both certificates to the user store.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">cp</span><span class="CodeBlock--token-plain"> Cloudflare_CA.crt Cloudflare_CA.pem /usr/share/ca-certificates</span></div></span></span></span></code></pre>{{</raw>}}
  
3. Import the certificate
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> dpkg-reconfigure ca-certificates</span></div></span></span></span></code></pre>{{</raw>}}

#### CentOS / RedHat

1. Download both the [.crt certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.crt) and the [.pem certificate](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem).
2. Copy both certificates to the trust store.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">cp</span><span class="CodeBlock--token-plain"> Cloudflare_CA.crt Cloudflare_CA.pem /etc/pki/ca-trust/source/anchors</span></div></span></span></span></code></pre>{{</raw>}}

3. Import the certificate.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> update-ca-trust</span></div></span></span></span></code></pre>{{</raw>}}

### Android

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

1.  Navigate to the **Settings** menu.

1.  Select **Security**.

![Android settings](/cloudflare-one/static/documentation/connections/android_security_settings.png)

1.  Tap **Advanced** > **Encryption & Credentials**.

{{<table-wrap>}}

|                                                                                                            |                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ![Android encrypt settings](/cloudflare-one/static/documentation/connections/android_advanced_encrypt.png) | ![Android cred settings](/cloudflare-one/static/documentation/connections/android_advanced_encrypt2.png) |

{{</table-wrap>}}

1.  Tap **Install a certificate > CA certificate**.

{{<table-wrap>}}

|                                                                                                    |                                                                                          |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Android install cert](/cloudflare-one/static/documentation/connections/android_install_cert.png) | ![Android ca cert](/cloudflare-one/static/documentation/connections/android_ca_cert.png) |

{{</table-wrap>}}

1.  Tap **Install Anyway**.

![Android install anyway](/cloudflare-one/static/documentation/connections/android_install_anyway.png)

1.  Verify your identity through the fingerprint, or by inserting the pin code.

1.  Select the certificate you want to install.

![Android choose cert](/cloudflare-one/static/documentation/connections/android_choose_certificate.png)

The root certificate is now installed and ready to be used.

### ChromeOS

1.  [Download the Cloudflare certificate](#download-the-cloudflare-root-certificate).

1.  Navigate to your **ChromeOS Settings**.

![Chrome OS Settings cog](/cloudflare-one/static/documentation/connections/chromeOS1_cert.png)

1.  Navigate to **Apps** and then click **Google Play Store**.

![Click google play store in Apps section](/cloudflare-one/static/documentation/connections/chromeOS2_cert.png)

1.  Click **Manage Android preferences**.

![Click manage android preferences](/cloudflare-one/static/documentation/connections/chromeOS3_cert.png)

1.  Click **Security & location** then click **Credentials** then click **Install from SD card**.

{{<table-wrap>}}

|                                                                                                   |                                                                                           |                                                                                                    |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![Click security & location](/cloudflare-one/static/documentation/connections/chromeOS4_cert.png) | ![click credentials](/cloudflare-one/static/documentation/connections/chromeOS5_cert.png) | ![click install from SD card](/cloudflare-one/static/documentation/connections/chromeOS6_cert.png) |

{{</table-wrap>}}

1.  In the file open dialog select the `Cloudflare_CA.crt` file downloaded in step #1 and click **Open**.

![Choose the Cloudflare_CA.crt file to install](/cloudflare-one/static/documentation/connections/chromeOS7_cert.png)

1.  Enter anything you want for the certificate name and click **OK**.

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
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">gc .</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Cloudflare_CA.crt </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> ac C:</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Python37</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">Lib</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">site-packages</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">pip</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">_vendor</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">certifi</span><span class="CodeBlock--token-punctuation">\</span><span class="CodeBlock--token-plain">cacert.pem</span></div></span></span></span></code></pre>{{</raw>}}

#### Python on Mac and Linux

1.  Install the `certifi` package.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">pip </span><span class="CodeBlock--token-function">install</span><span class="CodeBlock--token-plain"> certifi</span></div></span></span></span></code></pre>{{</raw>}}

1.  Identify the CA store by running:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">python -m certifi</span></div></span></span></span></code></pre>{{</raw>}}

1.  This will output:

<!---->

    ~/Library/Python/3.7/lib/python/site-packages/certifi/cert.pem

1.  Append the Cloudflare certificate to this CA Store by running:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">cat</span><span class="CodeBlock--token-plain"> /Library/Keychains/System.keychain Cloudflare_CA.crt </span><span class="CodeBlock--token-operator">&gt&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-variable CodeBlock--token-variable">$(</span><span class="CodeBlock--token-variable">python -m certifi</span><span class="CodeBlock--token-variable CodeBlock--token-variable">)</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  If needed, configure system variables to point to this CA Store by running:

<!---->

    export CERT_PATH=$(python -m certifi)
    export SSL_CERT_FILE=${CERT_PATH}
    export REQUESTS_CA_BUNDLE=${CERT_PATH}

### Git

#### Git on Windows

1.  Open Powershell.

1.  Run the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-git" language="git"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git config -l</span></div></span></span></span></code></pre>{{</raw>}}

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
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-git" language="git"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">gc .\Cloudflare_CA.crt | ac $(git config --get http.sslcainfo)</span></div></span></span></span></code></pre>{{</raw>}}

#### Git on Mac and Linux

1.  Configure Git to trust the Cloudflare certificate with the following command.

<!---->

    git config --global http.sslcainfo [PATH_TO_CLOUDFLARE_CERT]

### npm

The command below will set the `cafile` configuration to use the Cloudflare certificate. Make sure to use the certificate in the [`.pem`](/cloudflare-one/static/documentation/connections/Cloudflare_CA.pem) file type.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">npm</span><span class="CodeBlock--token-plain"> config </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">set</span><span class="CodeBlock--token-plain"> cafile </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-plain">PATH_TO_CLOUDFLARE_CERT.pem</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
On some systems you may need to set the following in your path/export list
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-builtin CodeBlock--token-class-name">export</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">NODE_EXTRA_CA_CERTS</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-string">'[PATH_TO_CLOUDFLARE_CERT.pem]'</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Google Cloud SDK

The commands below will set the Google Cloud SDK to use the Cloudflare certificate. More information on configuring the Google Cloud SDK is available [here](https://cloud.google.com/sdk/docs/proxy-settings).

1.  Get curl's `cacert` bundle.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -O https://curl.se/ca/cacert.pem</span></div></span></span></span></code></pre>{{</raw>}}

1.  Get the Cloudflare CA.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -O https://developers.cloudflare.com/cloudflare-one/5147a72af7d01d4f3a34276f1452bf1e/Cloudflare_CA.pem</span></div></span></span></span></code></pre>{{</raw>}}

1.  Combine the certs into a single `.pem` file.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">cat</span><span class="CodeBlock--token-plain"> cacert.pem </span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain"> ~/ca.pem</span></div></span></span></span></code></pre>{{</raw>}}
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">cat</span><span class="CodeBlock--token-plain"> Cloudflare_CA.pem </span><span class="CodeBlock--token-operator">&gt&gt</span><span class="CodeBlock--token-plain"> ~/ca.pem</span></div></span></span></span></code></pre>{{</raw>}}

1.  Configure Google Cloud to use the combined `.pem`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">gcloud config </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">set</span><span class="CodeBlock--token-plain"> core/custom_ca_certs_file ~/ca.pem</span></div></span></span></span></code></pre>{{</raw>}}

### AWS CLI

If you're using the AWS CLI, you need to set the `AWS_CA_BUNDLE` environment variable to use the Cloudflare root certificate. Commands are available for different operating systems in the instructions available [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

### IntelliJ IDEA

Instructions on how to install the Cloudflare root certificate are available [here](https://www.jetbrains.com/help/idea/settings-tools-server-certificates.html)
