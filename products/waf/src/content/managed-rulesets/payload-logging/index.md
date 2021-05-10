---
order: 25
---

# Log the payload of matched rules

<Aside type='note'>

This feature is only available for customers on an Enterprise plan.

</Aside>

The WAF allows you to log the request information that triggered a specific rule. This information is known as the payload. Payload logging is especially useful when diagnosing the behavior of WAF rules. Since the values that triggered a rule may contain sensitive data, they are encrypted with a customer-provided public key so that only you can examine them later.

Each ruleset has its own payload logging configuration. To enable the feature, configure a public key to encrypt the logged payload by doing one of the following:

* Generate a key pair directly in the dashboard (Cloudflare will **only** save the generated public key)
* Enter your own public key

Once enabled, the WAF saves the payload of any rule matches for the ruleset configured with payload logging, encrypting the payload with your public key.

To view the content of the payload in clear text, do one of the following:

* In the Firewall Analytics page (**Firewall** > **Overview**), enter your private key to decrypt the payload of a log entry directly in the browser. See [View the payload content in the dashboard](/managed-rulesets/payload-logging/view).

* Decrypt the payload in the command line using the `matched-data-cli` tool. See [Decrypt the payload content in the command line](/managed-rulesets/payload-logging/command-line/decrypt-payload).

<Aside type='warning' header='Important'>

All Cloudflare logs are encrypted at rest. Encrypting the payload content adds a second layer of encryption for the matched values that triggered a WAF rule.

Make sure you store your private key safely. If you lose the private key, configure payload logging with a new public key. The payload of new requests will be encrypted with the new public key.

Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key. Cloudflare staff will never ask for the private key.

</Aside>
