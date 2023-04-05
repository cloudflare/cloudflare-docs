---
title: Generate a key pair
pcx_content_type: how-to
type: overview
weight: 2
meta:
  title: Generate a key pair in the command line
---

# Generate a key pair in the command line

Generate a public/private key pair using the Cloudflare [`matched-data-cli`](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1.  [Download](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.

2.  Extract the content of the downloaded `.tar.gz` file to a local folder.

3.  Open a terminal and go to the local folder containing the `matched-data-cli` tool.

    ```sh
    ~ $ cd matched-data-cli
    ```

4.  Run the following command:

    ```sh
    ~/matched-data-cli $ ./matched-data-cli generate-key-pair
    {
      "private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",
      "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="
    }
    ```

After generating the key pair, copy the public key value and enter it in the payload logging configuration.

## Troubleshooting macOS errors

If you are using macOS, the operating system may block the `matched-data-cli` tool, depending on your security settings.

For instructions on how to execute unsigned binaries like the `matched-data-cli` tool in macOS, refer to the [Safely open apps on your Mac](https://support.apple.com/en-us/HT202491#:~:text=If%20you%20want%20to%20open%20an%20app%20that%20hasn%E2%80%99t%20been%20notarized%20or%20is%20from%20an%20unidentified%20developer) page in Apple Support.

