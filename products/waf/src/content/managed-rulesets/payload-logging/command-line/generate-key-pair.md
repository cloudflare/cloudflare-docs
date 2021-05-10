---
title: Generate a key pair
order: 1
type: overview
---

# Generate a key pair in the command line

Generate a public/private key pair using the Cloudflare [`matched-data-cli`](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. [Download](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.

1. Extract the content of the downloaded `.tar.gz` file to a local folder.

1. Open a terminal and navigate to the local folder containing the `matched-data-cli` tool.

    ```sh
    ~ $ cd matched-data-cli
    ```

1. Run the following command:

    ```sh
    ~/matched-data-cli $ ./matched-data-cli generate-key-pair
    {
      "private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",
      "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="
    }
    ```

After generating the key pair, copy the public key value and enter it in the [payload logging configuration](/managed-rulesets/payload-logging/configure).
