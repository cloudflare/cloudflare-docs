---
pcx-content-type: how-to
title: File Check
weight: 13
---

# File Check

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

{{<Aside type="note">}}

You can create multiple instances of the File Check for each operating system you need to run it on, or if you need to check for multiple files.

{{</Aside>}}

The File Check device posture attribute checks for the presence of a file on a device.

To enable File Check:

1.  On the Zero Trust Dashboard, navigate to **My Team** > **Devices** > **Device posture**.

1.  Click **+Add**.

1.  Select **File Check**.

1.  Enter a descriptive name for the check.

1.  Select your operating system.

1.  Enter a file path (for example: `c:\my folder\myfile.exe`).

1.  Next, you can choose to enter a [**Signing certificate thumbprint**](#determine-the-signing-thumbprint).

    Adding this information will enable the check to ensure that the file was signed by the expected software developer.

1.  You can also opt to enter a [**SHA-256** value](#determine-the-sha-256-value).

    This enables the check to ensure the integrity of the binary file on the device.

1.  Click **Save**.

Your device posture attribute is now visible on the **Device posture** page.

## Determine the signing thumbprint

The process to determine the signing thumbprint of a file varies depending on the operating system. This is how you would look up the signing thumbprint of the Cloudflare WARP application on macOS and Windows.

### On macOS

1.  Create a directory.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">~/Desktop % mkdir tmp</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">~/Desktop % cd tmp</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Run the following command to extract certificates for the WARP application:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">~/Desktop/tmp % codesign -d --extract-certificates &quot;/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP&quot; Executable=/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Next, run the following command to extract the SHA1 thumbprint:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">~/Desktop/tmp % openssl x509 -inform DER -in codesign0 -fingerprint -sha1 -noout | tr -d :</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">SHA1 Fingerprint=FE2C359D79D4CEAE6BDF7EFB507326C6B4E2436E</span></div></span></span></span></code></pre>{{</raw>}}

### On Windows

1.  Open a PowerShell window.
1.  Use the `Get-AuthenticodeSignature` command to find the thumbprint. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Get-AuthenticodeSignature -FilePath c:\myfile.exe</span></div></span></span></span></code></pre>{{</raw>}}

## Determine the SHA-256 value

The SHA-256 value almost always changes between versions of a file/application.

### On macOS

1.  Open a Terminal window.
1.  Use the `shasum` command to find the SHA256 value of the file. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">shasum -a 256 myfile</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### On Windows

1.  Open a PowerShell window.
1.  Use the `get-filehash` command to find the SHA256 value of the file. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">get-filehash -path &quot;C:\myfile.exe&quot; -Algorithm SHA256 | format-list</span></div></span></span></span></code></pre>{{</raw>}}
