---
pcx_content_type: how-to
title: Client certificate
weight: 3
---

# Client certificate

{{<render file="posture/_available-for-warp-with-gateway.md">}}

The Client Certificate device posture attribute checks if the device has a valid certificate signed by a trusted certificate authority (CA). The posture check can be used in Gateway and Access policies to ensure that the user is connecting from a managed device.

## Prerequisites

You will need a root CA that issues client certificates for your devices. You can use the [Cloudflare PKI toolkit](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-mtls-using-cloudflare-pki) to generate a sample root CA for testing.

## Configure the client certificate check

1. {{<render file="_upload-mtls-cert.md" withParameters="The private key is only required if you are using this custom certificate for [Gateway HTTPS inspection](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/).">}}

2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

3. Scroll down to **WARP client checks** and select **Add new**.

4. Select **Client certificate**.

5. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   2. **Operating system**: Select your operating system.
   3. **Certificate ID**: Enter the UUID of the root CA.
   4. **Common name**: Enter the common name of the client certificate (not the root CA).

6. Select **Save**.

Next, go to **Logs** > **Posture** and verify that the client certificate check is returning the expected results.

## How WARP checks for a client certificate

Learn how the WARP client determines if a client certificate is installed and trusted on the device.

{{<tabs labels="macOS | Windows | Linux">}}
{{<tab label="macos" no-code="true">}}

1. Open Terminal.
2. Run the following command to search for a certificate with a specific common name:

```sh
$ /usr/bin/security find-certificate -c "<COMMON_NAME>" -p /Library/Keychains/System.keychain
```

{{</tab>}}
{{<tab label="windows" no-code="true">}}

1. Open a Powershell window.
2. Run the following command to search for a certificate with a specific common name:

```bash
PS C:\Users\JohnDoe> Get-ChildItem Cert:\LocalMachine\Root\ | where{$_.Subject -like "*<COMMON_NAME>*"}
```

{{</tab>}}

{{<tab label="linux" no-code="true">}}

1. Open Terminal.
2. Run the following command to search for a certificate with a specific common name:

```sh
$ certutil -L -d sql:/etc/pki/nssdb -r -n <COMMON_NAME>

```

{{</tab>}}
{{</tabs>}}

For the posture check to pass, a certificate must appear in the output that validates against the uploaded root CA.
