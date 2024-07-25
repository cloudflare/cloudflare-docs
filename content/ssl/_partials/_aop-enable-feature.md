---
_build:
  publishResources: false
  render: never
  list: never
---

Then, enable the Authenticated Origin Pulls feature as an option for your Cloudflare zone.

This step sets the TLS Client Auth to require Cloudflare to use a client certificate when connecting to your origin server.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Authenticated Origin Pulls** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Origin Server**.
3.  For **Authenticated Origin Pulls**, switch the toggle to **On**.

{{<Aside type="warning">}}

Note that this step means Authenticated Origin Pulls will be available, but you still have to go through the following steps to complete the configuration.

{{</Aside>}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Authenticated Origin Pulls** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `tls_client_auth` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

{{<Aside type="warning">}}

Note that this step means Authenticated Origin Pulls will be available, but you still have to go through the following steps to complete the configuration.

{{</Aside>}}

{{</tab>}}
{{</tabs>}}