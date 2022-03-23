---
pcx-content-type: how-to
title: Remove key file password
weight: 7
---

# Remove key file password

You cannot upload a custom certificate with a password-protected key file.

The process for removing the password depends on your operating system. The following examples remove the password from `example.com.key`.

<details>
<summary>Linux</summary>
<div>

1.  Open a command console.

2.  Navigate to the directory containing the `example.com.key` file.

3.  Copy the original key.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cp example.com.key temp.key</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4.  Run the following command (if using an ECDSA certificate, replace `rsa` with `ec`).
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">openssl rsa -in temp.key -out example.com.key</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5.  When prompted in the console window, enter the original key password.

6.  [Upload the file contents](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate) to Cloudflare.

</div>
</details>

<details>
<summary>Windows</summary>
<div>

1.  Go to https://indy.fulgan.com/SSL/ and download the latest version of OpenSSL for your x86 or x86_64 operating system.

2.  Open the `.zip` file and extract it.

3.  Click **openssl.exe**.

4.  In the command window that appears, run:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">rsa -in C:\Path\To\example.com.key -out key.pem</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5.  Enter the original key password when prompted by the **openssl.exe** command window.

6.  [Upload](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate/) the contents of the `key.pem` file to Cloudflare.

</div>
</details>
