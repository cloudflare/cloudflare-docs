---
order: 3
type: overview
---

# Command-line operations

The [`matched-data-cli`](https://github.com/cloudflare/matched-data-cli) command-line tool, provided by Cloudflare, supports several tasks related to payload logging.

Use the tool to:

* [Generate a key pair](#generate-a-key-pair-using-the-command-line)
* [Decrypt payload content](#decrypt-payload-content-using-the-command-line)

## Generate a key pair using the command line

Generate a public/private key pair using the [`matched-data-cli`](https://github.com/cloudflare/matched-data-cli) command-line tool provided by Cloudflare. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. Download the `matched-data-cli` tool for your platform from the [Releases](https://github.com/cloudflare/matched-data-cli/releases) page on GitHub, under **Assets**.

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

## Decrypt the payload content using the command line

Use the `matched-data-cli` tool to decrypt a payload in the command line.

1. Download the `matched-data-cli` tool for your platform from the [Releases](https://github.com/cloudflare/matched-data-cli/releases) page on GitHub, under **Assets**.

1. Extract the content of the downloaded `.tar.gz` file to a local folder.

1. Open a command line window and change to the local folder containing the `matched-data-cli` binary.

    ```sh
    ~ $ cd matched-data-cli

    ~/matched-data-cli $
    ```

1. Define two environment variables: one with your private key and another one with the encrypted payload:

    ```sh
    ~/matched-data-cli $ PRIVATE_KEY=<PRIVATE_KEY>

    ~/matched-data-cli $ ENCRYPTED_PAYLOAD=<ENCRYPTED_PAYLOAD>
    ```

    Replace `<PRIVATE_KEY>` with your private key and `<ENCRYPTED_PAYLOAD>` with the encrypted payload.

1. Change to the local folder containing the `matched-data-cli` binary and run the following command to decrypt the payload:

    ```sh
    ~/matched-data-cli $ ./matched-data-cli decrypt -d $ENCRYPTED_PAYLOAD -k $PRIVATE_KEY
    ```

    Do not replace any text in this command, since it uses the environment variables you defined.

### Example

The following example defines two environment variables and runs the `matched-data-cli` tool to decrypt the payload in the `ENCRYPTED_PAYLOAD` environment variable:

```sh
~ $ cd matched-data-cli

~/matched-data-cli $ PRIVATE_KEY=uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=

~/matched-data-cli $ ENCRYPTED_PAYLOAD=A2nf3cy4G3XwychG1p/G/kpoYFtZ9pXi4R4NfJ8DrwJbTgAAAAAAAABqpfZoJeu5+nHnFLj8WdzFUglb5Ba+PNHcwq0Q7ATwmyX3WN8vRIxWyylFJ0SHcyVl0Dl03K8zjAd43MNTpWSu2UQ5MW7aFjn7w5DYbL0wiEOsmDQD9SDIbA80eAI7

~/matched-data-cli $ ./matched-data-cli decrypt -d $ENCRYPTED_PAYLOAD -k $PRIVATE_KEY
{"http.request.version": "HTTP/1.1", "http.request.uri.path": "/cms/%0Aadmin"}
```

<Aside type='Note' header='Encryption formats'>

The format of the encrypted payload can change over time. The `matched-data-cli` tool returns an error if it cannot decrypt a new encryption format.

To fix this error, download a newer version of the tool from the [Releases](https://github.com/cloudflare/matched-data-cli/releases) page on GitHub and try again.

</Aside>
