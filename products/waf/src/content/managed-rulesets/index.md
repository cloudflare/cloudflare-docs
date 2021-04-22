---
order: 2
---

# Available Managed Rulesets

Cloudflare provides the following Managed Rulesets in the WAF:

<TableWrap><table style="table-layout:fixed; width:100%;">
  <thead>
    <tr>
      <td style='width:30%; white-space:normal'><strong>Ruleset</strong></td>
      <td style='width:70%; word-wrap:break-word; white-space:normal'><strong>Description</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/articles/200172016#4vxxAwzbHx0eQ8XfETjxiN'>Cloudflare Managed Ruleset</a></td>
      <td>Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.</td>
    </tr>
    <tr>
      <td style='width:30%; word-wrap:break-word; white-space:normal'><a href='https://support.cloudflare.com/hc/articles/200172016#sJbboLurEVhipzWYJQnyz'>Cloudflare OWASP Core Ruleset</a></td>
      <td>Cloudflare's implementation of the Open Web Application Security Project, or OWASP ModSecurity Core Rule Set. Cloudflare routinely monitors for updates from OWASP based on the latest version available from the official code repository.</td>
    </tr>
  </tbody>
</table></TableWrap>

<Aside type='note' header='Note'>

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate threat scores and execute actions based on the score. When a scoring rule in the ruleset matches a request, the threat score increases.
The final rule in the OWASP ruleset triggers an action based on a threshold for the threat score.
You can configure the ruleset by overriding the threat score threshold in the final rule.
You can also activate or deactivate scoring rules by overriding the paranoia level categories.

</Aside>

## Matched payload logging


To accomplish this, while ensuring end-user privacy, we built encrypted WAF matched payload logging. This feature will log only the specific component of the request the WAF has deemed malicious — and it is encrypted using a customer-provided key to ensure that no Cloudflare employee can examine the data*. Additionally, the crypto uses an exciting new standard — developed in part by Cloudflare — called Hybrid Public Key Encryption (HPKE).

*All Cloudflare logs are encrypted at rest. This feature implements a second layer of encryption for the specific matched fields so that only the customer can decrypt it.



Once enabled, encrypted payloads for the rulesets configured with payload logging will be available:

* in the security event log (as download from the UI)
* in the Firewall Events log
* in the Firewall Analytics UI


<Aside type='warning' header='Important'>

* Make sure you store your private key safely. If you lose the private key, configure payload logging with a new public key. The payload of new requests will be encrypted with the new public key.
* Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key.
* Cloudflare staff will never ask for the private key.

</Aside>

### Configure payload logging in the dashboard

Configure payload logging for a ruleset in the ruleset configuration page.

1. In **Firewall** > **Managed Rules**, click **Configure** next to the Managed Ruleset you want to configure.

1. At the bottom of the page, click **Configure payload logging**.

1. After reading about the implications of enabling payload logging, select one of the available options to provide a public key:

    * _Generate key pair using your web browser_ — Generates a key pair (a private and a public key) in your browser and configures payload logging with the generated public key.

    * _Use my own public key_ — Enter a public key [generated with the `matched-data-cli` command-line tool](#generate-a-key-pair-using-the-command-line).

1. Click **Next**.

1. If you generated a key pair in the browser, copy the displayed private key and store it safely. You must use this private key later to decrypt request payloads.

1. Click **Done**.


### Generate a key pair using the command line

You can generate a public/private key pair using the [Matched Data CLI](https://github.com/cloudflare/matched-data-cli) command-line tool provided by Cloudflare that works offline. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. [Download the latest binaries](https://github.com/cloudflare/matched-data-cli/releases) for your platform, compressed in `.tar.gz` format. The binaries are available under **Assets**.

1. Extract the archive to a local folder.

1. Open a terminal and navigate to the folder containing the extracted `matched-data-cli` binary.

1. Run the following command: 

```sh
~/dist $ ./matched-data-cli generate-key-pair
{
  "private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",
  "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="
}
```

After generating the key pair, copy the public key value and enter it in the payload logging configuration.

### Decrypt the payload in the dashboard

### Decrypt the payload using the command line


