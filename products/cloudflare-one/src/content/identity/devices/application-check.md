---
order: 11
pcx-content-type: how-to
---

# Application Check

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | WARP with Gateway | All plans | 

</div>
</details>

<Aside type="note">

You can create multiple instances of the Application Check for each operating system you need to run it on, or if you need to check for multiple applications.

</Aside>

The Application Check device posture attribute checks that a specific application process is running on a device.

To enable Application Check:

1. On the Zero Trust Dashboard, navigate to **My Team** > **Devices** > **Device posture**.
1. Click **+Add**.
1. Select **Application Check**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Enter a file path (for example, `c:\my folder\myfile.exe`).
1. Next, you can choose to enter a [**Signing certificate thumbprint**](#determine-the-signing-thumbprint). 

    Adding this information will enable the check to ensure that the application was signed by the expected software developer. 

1. You can also opt to enter a [**SHA-256** value](#determine-the-sha-256-value). 

    This enables the check to ensure the integrity of the binary file on the device.

1. Click **Save**.

Your device posture attribute is now visible on the **Device posture** page.

## Determine the signing thumbprint

The process to determine the signing thumbprint of an application varies depending on the operating system. This is how you would look up the signing thumbprint of the Cloudflare WARP application on macOS and Windows.

### On macOS

1. Create a directory.

    ```sh
    $ ~/Desktop % mkdir tmp

    $ ~/Desktop % cd tmp
    ```

1. Run the following command to extract certificates for the WARP application:

    ```sh
    $ ~/Desktop/tmp % codesign -d --extract-certificates "/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP" Executable=/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP
    ```

1. Next, run the following command to extract the SHA1 thumbprint:

    ```sh
    $ ~/Desktop/tmp % openssl x509 -inform DER -in codesign0 -fingerprint -sha1 -noout | tr -d :                              
    SHA1 Fingerprint=FE2C359D79D4CEAE6BDF7EFB507326C6B4E2436E
    ```

### On Windows

1. Open a PowerShell window.
1. Use the `Get-AuthenticodeSignature` command to find the thumbprint. For example:

```txt
Get-AuthenticodeSignature -FilePath c:\myfile.exe
```

## Determine the SHA-256 value

The SHA-256 value almost always changes between versions of a file/application. 

### On macOS

1. Open a Terminal window.
1. Use the `shasum` command to find the SHA256 value of the file. For example:

```sh
$ shasum -a 256 myfile
```

### On Windows

1. Open a PowerShell window.
1. Use the `get-filehash` command to find the SHA256 value of the file. For example:

```txt
get-filehash -path "C:\myfile.exe" -Algorithm SHA256 | format-list
```
