---
pcx_content_type: reference
title: Order and Time Rules
weight: 0
---

# Order and Time Rules

Ordering and Timing Rules uses cookies to track the order of requests a user has made and the time between requests and makes them available via [Cloudflare Rules](/rules/). This allows you to write rules that match valid or invalid sequences.

Ordering and Timing Rules is currently in private beta. If you would like to be included in the beta, contact your account team.

## Prerequisites

- Your account must have the Fraud Detection subscription.
- Each zone must have an API Shield subscription as it relies on [Endpoint Management](/api-shield/management-and-monitoring/).
- Each zone must configure the endpoints to track via Endpoint Management.

## Enable sequence cookies via the API

1. [Create an API token](/fundamentals/api/get-started/create-token/) if you do not already have one. The API token must include the _Zone_ > _Fraud Detection_ > _Edit_ permission.
2. [Get the zone ID](/fundamentals/setup/find-account-and-zone-ids/) for the zone(s) where you want to enable sequence cookies.
3. [Add the endpoints](/api-shield/management-and-monitoring/) that you want to track in your ordering and timing rules using API Shield’s Endpoint Management and make note of the short ID.
{{<Aside type="note">}}
The short ID will not be visible until our account team has enabled this feature for you. 
{{</Aside>}}
4. Enable the sequence cookie by adding your API token and zone ID to the following API call.

```bash
---
header: API call
---

curl --request PUT \
  --url https://api.cloudflare.com/client/v4/zones/{zone_id}/fraud_detection/sequence_cookies \
  --header 'Authorization: Bearer <API_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{"enabled": true}'
```

5. Use the expression editor to write sequence or timing based rules. You can put these rules in log only mode to monitor.

{{<Aside type="note">}}
When you enable sequence cookies, Cloudflare will start setting cookies for all requests that match your endpoints. 
{{</Aside>}}

Once you have enabled sequence cookies, the rules fields will be populated and you can now use the new fields in your rules.

---

## Rules fields

Ordering and Timing Rules introduces three new fields to Cloudflare Rules. All of these fields reference operations by their short ID. Accounts that have the Fraud Detection subscription can refer to the short ID by viewing the endpoint details via **API Shield** > **Endpoint Management** in the Cloudflare dashboard. Accounts without Fraud Detection cannot see this field.

Cloudflare only stores up to the 10 most recent operations in a sequence for up to one hour. If there are more than 10 operations in the sequence, older operations will be dropped and will not be included in the following fields. Similarly, if an operation happened more than one hour ago, it will also not be included in the following fields.

<table>
  <thead>
   <tr>
      <th style="width: 35%;">Field name</th>
      <th>Description</th>
      <th>Example value</th>
   </tr>
  </thead>
  <tbody style='vertical-align:top'>
    <tr>
        <td><p><code>cf.sequence.current_op</code><br />{{<type>}}string{{</type>}}</p>
        </td>
        <td>
          <p>This field contains the ID of the operation that matches the current request. If the current request does not match any operations defined in Endpoint Management, it will be an empty string.
          </p>
        </td>
        <td><p><code>c821cc00</code>
        </p>
        </td>
    </tr>
    <tr>
        <td><p><code>cf.sequence.previous_ops</code><br />{{<type>}}Array&lt;string>{{</type>}}</p>
        </td>
        <td>
          <p>This field contains an array of the prior operation IDs in the sequence, ordered from most to least recent. It does not include the current request. <br /><br /> If an operation is repeated, it will appear multiple times in the sequence. 
          </p>
        </td>
        <td><p><code>["f54dac32", "c821cc00", "a37dc89b"]</code>
        </p>
        </td>
    </tr>
    <tr>
        <td><p><code>cf.sequence.msec_since_op</code><br />{{<type>}}Array&lt;string>&lt;number>{{</type>}}</p>
        </td>
        <td>
          <p>This field contains a map where the keys are operation IDs and the values are the number of milliseconds since that operation has most recently occurred. <br /><br /> This does not include the current request or operation as it only factors in previous operations in the sequence. 
          </p>
        </td>
        <td><p><code>{"f54dac32": 1000, "c821cc00": 2000}</code>
        </p>
        </td>
    </tr>
    </tbody>
</table>

These sequence fields are available in:

- [Custom Rules](/waf/custom-rules/) (`http_request_firewall_custom`)
- [Rate limiting rules](/waf/rate-limiting-rules/) (`http_request_ratelimit`)
- [Bulk Redirects](/workers/examples/bulk-redirects/) (`http_request_redirect`)
- [HTTP Request Header Modification Rules](/rules/transform/response-header-modification/) (`http_request_late_transform`)`

### Example rules

The customer must request endpoint A before endpoint B.

```txt
---
header: Valid sequence
---
cf.sequence.current_op eq "bbbbbbbb" and
any(cf.sequence.previous_ops[*] == "aaaaaaaa")
```

```txt
---
header: Invalid sequence
---
cf.sequence.current_op eq "bbbbbbbb" and
not any(cf.sequence.previous_ops[*] == "aaaaaaaa")
```

Customer must request endpoint A at least one second before endpoint B.

```txt
---
header: Valid sequence
---
cf.sequence.current_op eq "bbbbbbbb" and
cf.sequence.msec_since_op["aaaaaaaa"] ge 1000
```

```txt
---
header: Invalid sequence
---
cf.sequence.current_op eq "bbbbbbbb" and
not cf.sequence.msec_since_op["aaaaaaaa"] ge 1000
```

---

## Disable sequence cookies via the API

Disabling sequence cookies will stop the rules fields from being populated. If you still have rules deployed which depend on these fields, those rules may not behave as intended. Remove or disable any rules that rely on sequence fields before disabling sequence cookies.

To disable sequence cookies:

1. [Create an API token](/fundamentals/api/get-started/create-token/) if you do not already have one. The API token must include the _Zone_ > _Fraud Detection_ > _Edit_ permission.
2. [Get the zone ID](/fundamentals/setup/find-account-and-zone-ids/) for the zone(s) where you want to enable sequence cookies.
3. [Add the endpoints](/api-shield/management-and-monitoring/) that you want to track in your ordering and timing rules using API Shield’s Endpoint Management and make note of the short ID.
{{<Aside type="note">}}
The short ID will not be visible until our account team has enabled this feature for you. 
{{</Aside>}}
4. Disable the sequence cookie using your API token, zone ID, and by setting `enabled` to `false` on the following API call.

```bash
---
header: API call
---
curl --request PUT https://api.cloudflare.com/client/v4/zones/{zone_id}/fraud_detection/sequence_cookies \
  --header "Authorization: Bearer <API_TOKEN>" \
  --data '{"enabled": false}'
```

---

## Limitations

Since the sequence data is stored in a cookie on the client, it is possible for the client to delete the cookies to hide or remove operations from their sequence. However, it is not possible for clients to insert operations into a sequence cookie. 

Also, Cloudflare only supports HTTPS requests since our cookies set the `Secure` attribute.