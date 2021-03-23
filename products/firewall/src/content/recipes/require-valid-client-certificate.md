# Require a valid client certificate

Use Cloudflare [API Shield™](https://developers.cloudflare.com/firewall/cf-firewall-rules/api-shield) to protect your API or web application with client-certificate-based encryption.

Before you can use API Shield to protect your API or web application, you must do the following:

- [Create a client certificate](https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate).
- [Configure your mobile app or Internet-of-things device](https://developers.cloudflare.com/ssl/client-certificates/configure-your-mobile-app-or-iot-device) to use the client certificate.
- [Enable mutual Transport Layer Security (mTLS) for a host](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls) in your zone.

<Aside type='warning' header='Important'>

You can only use API Shield with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each zone.

If you need to use a different CA, contact a Cloudflare Customer Success Manager.

</Aside>

This example creates a firewall rule that requires API calls to present a valid client certificate. When the client certificate cannot be verified, the rule triggers the _Block_ action.

The rule includes a compound expression that comprises two [simple expressions](/cf-firewall-rules/fields-and-expressions#simple-expressions) joined by the `and` operator.

The first expression uses the `http.host` field and the `in` operator to capture the hosts that should be protected — `orangeclouded.com` and `api.orangeclouded.com` in this example.

The second expression — `not cf.tls_client_auth.cert_verified` — returns `true` when a request to access the API or web application does _not_ present a valid client certificate.

Because the [action](/cf-firewall-rules/actions) is _Block_, only requests that present a valid client certificate can access the specified hosts:

<table>
  <thead>
  <tr>
    <th>Expression</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(http.host in {'{'}"orangeclouded.com" "api.orangeclouded.com"{'}'} and not cf.tls_client_auth.cert_verified)</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>

To create a mTLS rule that requires a valid client certificate in the Cloudflare dashboard, [use the Mutual TLS Rule interface](/cf-dashboard/create-mtls-rule#use-the-mutual-tls-rule-interface) in the **Firewall** app.
