# Require a valid client certificate

Use Cloudflare [API Shield™](/firewall/cf-firewall-rules/api-shield) to protect your API or web application with client-certificate-based encryption.

Before you can use API Shield to protect your API or web application, you must do the following:

- [Enable mutual Transport Layer Security (mTLS) for a host](/ssl/client-certificates/enable-mtls) in your zone.
- [Create a client certificate](/ssl/client-certificates/create-client-certificate).
- [Configure your mobile app or Internet-of-things device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device) to use the client certificate.

<Aside>

You can only use API Shield with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each zone.

If you need to use a different CA, contact a Cloudflare customer success manager.

</Aside>

This example creates a firewall rule that requires API calls to present a valid client certificate. When the client certificate cannot be verified, the rule triggers the _Block_ action.

The rule includes a compound expression that comprises 2 [simple expressions](/firewall/cf-firewall-rules/fields-and-expressions/#simple-expressions) joined by the `and` operator.

The first expression uses the `http.host` field and the `in` operator to capture the hosts that should be protected—orangeclouded.com and api.orangeclouded.com in this example.

The second expression—`not cf.tls_client_auth.cert_verified`—returns `true` when a request to access your API or web application does _not_ present a valid client certificate.

Because the [action](/firewall/cf-firewall-rules/actions) for your rule is _Block_, only requests that present a valid client certificate can access the specified hosts.

<TableWrap>

| Expression                                                                                                      | Action |
| --------------------------------------------------------------------------------------------------------------- | ------ |
| `(http.host in {'{'}"orangeclouded.com" "api.orangeclouded.com"{'}'} and not cf.tls_client_auth.cert_verified)` | Block  |

</TableWrap>

To create an API Shield rule that requires a valid client certificate in the Cloudflare dashboard, [use the API Shield Rule interface](/firewall/cf-dashboard/create-api-shield-rule/#use-the-api-shield-rule-interface) in the **Firewall** app.
