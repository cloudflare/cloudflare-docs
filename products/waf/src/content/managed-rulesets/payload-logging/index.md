---
order: 25
---

# Log the payload of matched rules

<Aside type='note'>

This feature is only available for customers on an Enterprise plan.

</Aside>

The WAF allows you to log the request information that triggered a specific rule. This information is known as the payload. Payload logging is especially useful when diagnosing the behavior of WAF rules. Since the values that triggered a rule may contain sensitive data, they are encrypted with a customer-provided public key so that only you can examine them later on.

Each ruleset has its own payload logging configuration. Configure the public key used to encrypt the logged payload. Generate a key pair directly in the browser or provide your own public key for this purpose.

Once enabled, you can view the payload of rule matches for the rulesets with payload logging enabled in the following locations:

* Firewall Analytics page
* Firewall Events log
* security event log

Enter your private key to decrypt the payload of a log entry directly in the browser. See [View the payload content in the dashboard](/managed-rulesets/payload-logging/view).

Alternatively, decrypt the payload using the `matched-data-cli` tool. See [Decrypt the payload content using the command line](/managed-rulesets/payload-logging/command-line#decrypt-the-payload-content-using-the-command-line).

<Aside type='warning' header='Important'>

* All Cloudflare logs are encrypted at rest. Encrypting the payload information adds a second layer of encryption for the matched values that triggered a WAF rule.
* Make sure you store your private key safely. If you lose the private key, configure payload logging with a new public key. The payload of new requests will be encrypted with the new public key.
* Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key.
* Cloudflare staff will never ask for the private key.

</Aside>
