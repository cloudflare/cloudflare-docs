---
pcx_content_type: how-to
title: Log the payload of matched rules
weight: 2
---

# Log the payload of matched rules

Data Loss Prevention allows you to log the data that triggered a specific DLP policy. This data is stored in the portion of the HTTP request known as the payload. Payload logging is especially useful when diagnosing the behavior of DLP rules. Since the values that triggered a rule may contain sensitive data, they are encrypted with a customer-provided public key so that only you can examine them later. The stored data will include a redacted version of the match, plus 20 characters of additional context on both sides of the match.

## 1. Generate a key pair

Follow [these instructions](/waf/managed-rules/payload-logging/command-line/generate-key-pair/) to generate a public/private key pair in the command line.

## 2. Upload the public key to Cloudflare

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.

2. In the **DLP Payload Encryption public key** field, paste your public key.

3. Select **Save**.

{{<Aside type="note">}}
The matching private key is required to view logs. If you lose your private key, you will need to [generate](#1-generate-a-key-pair) and [upload](#2-upload-the-public-key-to-cloudflare) a new public key. The payload of new requests will be encrypted with the new public key.
{{</Aside>}}

## 3. Enable payload logging for a DLP policy

You can enable payload logging for any Allow or Block HTTP policy that uses the [DLP Profile](/cloudflare-one/policies/filtering/http-policies/#dlp-profile) selector.

1. Go to **Gateway** > **Firewall Policies** > **HTTP**.

2. Edit an existing Allow or Block DLP policy, or [create a new policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy).

3. In the policy builder, scroll down to **Configure policy settings** and enable **Log the payload of matched rules**.

4. Select **Save**.

Data Loss Prevention will now store a portion of the payload for HTTP requests that match this policy.

## 4. View payload logs

1. Go to **Logs** > **Gateway** > **HTTP**.

2. Go to the DLP log you are interested in reviewing and expand the row.

3. Select **Decrypt Payload Log**.

4. Enter your private key and select **Decrypt**.

You will see the [ID of the matched DLP Profile](/api/operations/dlp-profiles-list-all-profiles) followed by the decrypted payload. Note that DLP currently logs only the first match.

{{<Aside type="note">}}
Neither the key nor the decrypted payload will be stored by Cloudflare.
{{</Aside>}}

## Data privacy

- All Cloudflare logs are encrypted at rest. Encrypting the payload content adds a second layer of encryption for the matched values that triggered a DLP rule.

- Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key. Cloudflare staff will never ask for the private key.

- All sensitive, DLP-matched alphanumeric characters in the log will be redacted. For example, `123-45-6789` will become `XXX-XX-XXXX`.
