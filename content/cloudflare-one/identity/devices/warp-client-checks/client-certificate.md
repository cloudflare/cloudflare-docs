---
pcx_content_type: how-to
title: Client certificate
weight: 3
---

# Client certificate

The Client Certificate device posture attribute checks if the device has a valid certificate signed by a trusted certificate authority (CA). The posture check can be used in Gateway and Access policies to ensure that the user is connecting from a managed device.

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| All modes | All plans  |

| System   | Availability | Minimum WARP version<sup>1</sup> |
| ---------| -------------| ---------------------|
| Windows  | ✅           | 2024.6.415.0 |
| macOS    | ✅           | 2024.6.416.0 |
| Linux    | Coming soon  |    |
| iOS      | ❌           |   |
| Android  | ❌           |   |
| ChromeOS | ❌           |   |

<sup>1</sup> Client certificate checks that ran on an earlier WARP version will continue to work. To configure a new certificate check, update WARP to the versions listed above.
{{</details>}}

## Prerequisites

- A CA that issues client certificates for your devices. WARP does not evaluate the certificate trust chain; this needs to be the issuing certificate.
- Cloudflare WARP client is [deployed](/cloudflare-one/connections/connect-devices/warp/deployment/) on the device.
- A client certificate is [installed and trusted](#how-warp-checks-for-a-client-certificate) on the device.

{{<Aside type="note">}}
You can use the [Cloudflare PKI toolkit](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-mtls-using-cloudflare-pki) to generate a sample root CA for testing.
{{</Aside>}}

## Configure the client certificate check

1. {{<render file="_upload-mtls-cert.md" withParameters="The private key is only required if you are using this custom certificate for [Gateway HTTPS inspection](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/).">}}

2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

3. Scroll down to **WARP client checks** and select **Add new**.

4. Select **Client certificate**.

5. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   2. **Operating system**: Select your operating system.
   3. **OS locations**: Specify the location(s) where the client certificate is installed.
| System  | Certificate stores    |
| ------- | -------------------- |
| Windows | - Local machine trust store </br> - User trust store|
| macOS   | - System keychain      |
| Linux   | - NSSDB </br> - To search a custom location, enter the absolute file path(s) to the certificate and private key (for example `/usr/local/mycompany/certs/client.pem` and `/usr/local/mycompany/certs/client_key.pem`). The certificate and private key must be in `PEM` format. They can either be in two different files or the same file. |
   4. **Certificate ID**: Enter the UUID of the root CA.
   5. **Common name**: (Optional) To check for a specific common name on the client certificate, enter a string with optional `${serial_number}` and `${hostname}` variables (for example, `${serial_number}_mycompany`). WARP will search for an exact, case-insensitive match. If you do not specify a common name, WARP will ignore the common name field on the certificate.
   6. **Check for Extended Key Usage**: (Optional) Check whether the client certificate has one or more attributes set. Supported values are **Client authentication** (`1.3.6.1.5.5.7.3.2`) and/or **Email** (`1.3.6.1.5.5.7.3.4`).
   7. **Check for private key**: (Recommended) When enabled, WARP checks that the device has a private key associated with the client certificate.

6. Select **Save**.

Next, go to **Logs** > **Posture** and verify that the client certificate check is returning the expected results.

## How WARP checks for a client certificate

Learn how the WARP client determines if a client certificate is installed and trusted on the device.

{{<tabs labels=" Windows | macOS | Linux">}}

{{<tab label="windows" no-code="true">}}

1. Open a PowerShell window.
2. To search the local machine trust store for a certificate with a specific common name, run the following command:

  ```powershell
  PS C:\Users\JohnDoe> Get-ChildItem Cert:\LocalMachine\My\ | where{$_.Subject -like "*<COMMON_NAME>*"}
  ```

3. To search the user trust store for a certificate with a specific common name, run the following command:

  ```powershell
  PS C:\Users\JohnDoe> Get-ChildItem Cert:\CurrentUser\My\ | where{$_.Subject -like "*<COMMON_NAME>*"}
  ```

{{</tab>}}

{{<tab label="macos" no-code="true">}}

1. Open Terminal.
2. To search System Keychain for a certificate with a specific common name, run the following command:

```sh
$ /usr/bin/security find-certificate -c "<COMMON_NAME>" -p /Library/Keychains/System.keychain
```

{{</tab>}}

{{<tab label="linux" no-code="true">}}

1. Open Terminal.
2. To search NSSDB for a certificate with a specific common name, run the following command:

```sh
$ certutil -L -d sql:/etc/pki/nssdb -r -n <COMMON_NAME>
```

{{</tab>}}

{{</tabs>}}

For the posture check to pass, a certificate must appear in the output that validates against the uploaded root CA.
