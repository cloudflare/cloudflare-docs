---
pcx_content_type: how-to
title: Application check
weight: 1
---

# Application check

{{<render file="posture/_available-for-warp-with-gateway.md">}}

The Application Check device posture attribute checks that a specific application process is running on a device. You can create multiple application checks for each operating system you need to run it on, or if you need to check for multiple applications.

## Configure an application check

1.  In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

2.  Scroll down to **WARP client checks** and select **Add new**.

3.  Select **Application Check**.

4.  You will be prompted for the following information:
    1. **Name**: Enter a unique name for this device posture check.
    2. **Operating system**: Select your operating system.
    3. **Application path**: Enter the file path for the executable that will be running (for example, `c:\my folder\myfile.exe`).
    {{<Aside type="note">}}

- Be sure to enter the binary file path, not the application launch path. When checking for an application on macOS, a common mistake is to enter `/Applications/ApplicationName.app`. This will not work as `ApplicationName.app` is a folder. The executable file that will be running is located within the folder, for example `ApplicationName.app/Contents/MacOS/ApplicationName`.
- Some applications change their file path after an update. Ensure that the application is always in a stable location or use `%PATH%` variables when possible.

{{</Aside>}}
    4. **Signing certificate thumbprint (recommended)**: Enter the [thumbprint of the publishing certificate](#determine-the-signing-thumbprint) used to sign the binary. Adding this information will enable the check to ensure that the application was signed by the expected software developer.
    5. **SHA-256 (optional)**: Enter the [SHA-256 value](#determine-the-sha-256-value) of the binary. This is used to ensure the integrity of the binary file on the device.

5. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/analytics/logs/posture-logs) that the application check is returning the expected results.

## Determine the signing thumbprint

The process to determine the signing thumbprint of an application varies depending on the operating system. This is how you would look up the signing thumbprint of the Cloudflare WARP application on macOS and Windows.

{{<Aside type="note">}}

When setting up new device posture checks, we recommend first testing them without setting certificate thumbprint or SHA256 checksum values.

{{</Aside>}}

### On macOS

1. Create a directory.

   ```bash
   ~/Desktop $ mkdir tmp

   ~/Desktop $ cd tmp
   ```

2. Run the following command to extract certificates for the WARP application:

   ```sh
   ~/Desktop/tmp $ codesign -d --extract-certificates "/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP"
   Executable=/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP
   ```

3. Next, run the following command to extract the SHA1 thumbprint:

   ```sh
   ~/Desktop/tmp $ openssl x509 -inform DER -in codesign0 -fingerprint -sha1 -noout | tr -d :
   SHA1 Fingerprint=FE2C359D79D4CEAE6BDF7EFB507326C6B4E2436E
   ```

### On Windows

1. Open a PowerShell window.
2. Use the `Get-AuthenticodeSignature` command to find the thumbprint. For example:

   ```bash
   PS C:\>Users\JohnDoe> Get-AuthenticodeSignature -FilePath c:\myfile.exe
   ```

## Determine the SHA-256 value

The SHA-256 value almost always changes between versions of a file/application.

### On macOS

1. Open a Terminal window.
2. Use the `shasum` command to find the SHA256 value of the file. For example:

   ```sh
   $ shasum -a 256 myfile
   ```

### On Windows

1. Open a PowerShell window.
2. Use the `get-filehash` command to find the SHA256 value of the file. For example:

   ```bash
   PS C:\>Users\JohnDoe> get-filehash -path "C:\myfile.exe" -Algorithm SHA256 | format-list
   ```

## How WARP checks for an application

Learn how the WARP client determines if an application is running on various systems.

### On macOS

To get the list of active processes, run the following command:

```sh
$ ps -eo comm | xargs which | sort | uniq -u
```

The application path must appear in the output for the check to pass.

### On Linux

The WARP client gets the list of running binaries by following the soft links in `/proc/<pid>/exe`. To view all active processes and their soft links:

```sh
$ ps -eo pid | awk '{print "/proc/"$1"/exe"}' | xargs readlink -f | awk '{print $1}' | sort | uniq -u
```

The application path must appear in the `/proc/<pid>/exe` output for the check to pass.
