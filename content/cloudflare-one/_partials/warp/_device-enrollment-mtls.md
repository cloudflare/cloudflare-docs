---
_build:
  publishResources: false
  render: never
  list: never
---

To check for an mTLS certificate:

1. [Add an mTLS certificate](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration) to your account. You can generate a sample certificate using the [Cloudflare PKI toolkit](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-mtls-using-cloudflare-pki).

2. In **Associated hostnames**, enter your Zero Trust {{<glossary-tooltip term_id="team domain">}}team domain{{</glossary-tooltip>}}: `<team-name>.cloudflareaccess.com`
3. In your [device enrollment permissions](#set-device-enrollment-permissions), add a _Common Name_ or _Valid Certificate_ rule. For example, the following policy requires a client certificate with a specific common name:

    | Action   | Rule type | Selector    | Value                |
    | -------- | --------- | ------------| -------------------- |
    | Allow    | Require   | Common Name | `<CERT-COMMON-NAME>` |

4. On your device, add the client certificate to the [system keychain](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-in-the-browser).
