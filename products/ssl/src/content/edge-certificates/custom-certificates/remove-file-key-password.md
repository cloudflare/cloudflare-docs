---
order: 6
pcx-content-type: how-to
---

# Remove key file password

You cannot upload a custom certificate with a password-protected key file.

The process for removing the password depends on your operating system. The following examples remove the password from `example.com.key`.

<details>
<summary>Linux</summary>
<div>

1. Open a command console.
1. Navigate to the directory containing the `example.com.key` file.
1. Copy the original key.

    ```sh
    $ cp example.com.key temp.key
    ```

1. Run the following command (if using an ECDSA certificate, replace `rsa` with `ec`).

    ```sh
    $ openssl rsa -in temp.key -out example.com.key
    ```

1. When prompted in the console window, enter the original key password.
1. [Upload the file contents](../uploading#upload-a-custom-certificate) to Cloudflare.

</div>
</details>

<details>
<summary>Windows</summary>
<div>

1. Go to https://indy.fulgan.com/SSL/ and download the latest version of OpenSSL for your x86 or x86_64 operating system.
1. Open the `.zip` file and extract it.
1. Click **openssl.exe**.
1. In the command window that appears, run:

    ```sh
    $ rsa -in C:\Path\To\example.com.key -out key.pem
    ```

1. Enter the original key password when prompted by the **openssl.exe** command window.
1. [Upload](../uploading#upload-a-custom-certificate) the contents of the `key.pem` file to Cloudflare.

</div>
</details>
