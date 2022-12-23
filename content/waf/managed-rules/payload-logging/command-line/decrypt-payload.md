---
title: Decrypt the payload content
pcx_content_type: how-to
type: overview
weight: 3
layout: list
meta:
  title: Decrypt the payload content in the command line
---

# Decrypt the payload content in the command line

Use the `matched-data-cli` tool to decrypt a payload in the command line.

1.  [Download](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.

2.  Extract the content of the downloaded `.tar.gz` file to a local folder.

3.  Open a command line window and change to the local folder containing the `matched-data-cli` binary.

    ```sh
    ~ $ cd matched-data-cli
    ```

4.  Create two files: one with your private key and another one with the encrypted payload:

    ```sh
    ~/matched-data-cli $ printf "<PRIVATE_KEY>" > private_key.txt && chmod 400 private_key.txt

    ~/matched-data-cli $ printf "<ENCRYPTED_PAYLOAD>" > encrypted_payload.txt
    ```

    Replace `<PRIVATE_KEY>` with your private key and `<ENCRYPTED_PAYLOAD>` with the encrypted payload.

    Note: The first `printf` command will make your private key visible in your command history.

5.  Run the following command to decrypt the payload:

    ```sh
    ~/matched-data-cli $ ./matched-data-cli decrypt -k private_key.txt encrypted_payload.txt
    ```

{{<Aside type="note">}}
If you are using macOS and you get an error when running the `matched-data-cli` tool, refer to [Troubleshooting macOS errors](/waf/managed-rules/payload-logging/command-line/generate-key-pair/#troubleshooting-macos-errors).
{{</Aside>}}

## Example

The following example creates two files — one with the private key and another one with the encrypted payload — and runs the `matched-data-cli` tool to decrypt the payload in the `encrypted_payload.txt` file:

```sh
~ $ cd matched-data-cli

~/matched-data-cli $ printf "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=" > private_key.txt && chmod 400 private_key.txt

~/matched-data-cli $ printf "AzTY6FHajXYXuDMUte82wrd+1n5CEHPoydYiyd3FMg5IEQAAAAAAAAA0lOhGXBclw8pWU5jbbYuepSIJN5JohTtZekLliJBlVWk=" > encrypted_payload.txt

~/matched-data-cli $ ./matched-data-cli decrypt -k private_key.txt encrypted_payload.txt
test matched data
```

{{<Aside type="note" header="Encryption formats">}}

The format of the encrypted payload can change over time. The `matched-data-cli` tool returns an error if it cannot decrypt a new encryption format.

To fix this error, [download](https://github.com/cloudflare/matched-data-cli/releases) a newer version of the tool from GitHub and try again.

{{</Aside>}}
