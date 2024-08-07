---
title: Magic Transit with CDN
pcx_content_type: how-to
weight: 3
---

# Use BYOIP with Magic Transit and CDN

[Magic Transit](/magic-transit/) customers using [BYOIP](/byoip/) can also benefit from the performance, reliability, and security that Cloudflare offers for HTTP-based applications.

This configuration will use the [IP address management service bindings](/byoip/service-bindings/) to enable Cloudflare [CDN services (Cache)](/cache/) on top of Magic Transit, on individual IP addresses or on a subnet.

## Before you begin

* Consider the service bindings [scope and limitations](/byoip/service-bindings/).
* Plan for what IP addresses you want to configure. If you want to add CDN to multiple contiguous IP addresses, specifying a CIDR block that incorporates all IPs is more efficient.
    {{<details header="Example" >}}

**Magic Transit protected prefix:** `203.0.113.100/24`

**IPs to upgrade to the CDN:**

`203.0.113.16`
`203.0.113.17`
`203.0.113.18`
`203.0.113.19`
`203.0.113.20`
`203.0.113.21`
`203.0.113.22`
`203.0.113.23`

**Best practice:** Add one discrete CDN Service Binding for `203.0.113.16` with a `/29` netmask.

{{</details>}}

* Note that a transitional state will take place for four to six hours after you create the service binding. During this time, traffic destined to your origins will slowly transition from the Magic Transit pipeline to the CDN pipeline.

## 1. Get account information

1. Log in to your Cloudflare account and get your [account ID](/fundamentals/setup/find-account-and-zone-ids/) and [API token](/fundamentals/api/get-started/create-token/). The token permissions should include `Account` - `IP Prefixes` - `Edit`.
2. Make a `GET` request to the [List Services](/api/operations/ip-address-management-service-bindings-list-services) endpoint and take note of the `id` associated with the CDN service.
3. Use the [List Prefixes](/api/operations/ip-address-management-prefixes-list-prefixes) endpoint and take note of the `id` associated with the prefix (`cidr`) you will configure.

{{<example>}}

At this point, continuing the example mentioned above, you should have a mapping similar to the following:

| Variables  | Description                                        |
|-------------------------------|----------------------------------------------------|
| `{service_id}`                  | The ID of the CDN service within Cloudflare. <br /><br /> Example: `969xxxxxxxx000xxx0000000x00001bf`           |
| `{prefix_id}`                   | The ID of the Magic Transit protected prefix (`203.0.113.100/24`) you want to configure <br /><br /> Example: `6b25xxxxxxx000xxx0000000x0000cfc` |

{{</example>}}

4. To confirm you currently only have a Magic Transit service binding and that it spans across your entire prefix, make a `GET` request to the  [List Service Bindings](/api/operations/ip-address-management-service-bindings-list-service-bindings) endpoint. Replace the `{prefix_id}` in the URI path by the actual prefix ID you got from the previous step.

{{<example>}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings \
--header "Authorization: Bearer <API_TOKEN>"
```

{{</example>}}

## 2. Create service binding

{{<Aside type="warning">}}
Once this step is completed, a four to six-hour propagation state will initiate. Only after the service binding reaches an **active** state, all traffic will be processed through the CDN pipeline.
{{</Aside>}}

1. Make a `POST` request to the [Create Service Binding](/api/operations/ip-address-management-service-bindings-create-service-binding/) endpoint, indicating the IP address you want to bind to CDN. Don't forget to specify the **corresponding network mask**.

{{<example>}}

Continuing the example, `203.0.113.100/32` designates an IP address that is within the Magic Transit protected prefix `203.0.113.0/24`.

Replace the `{prefix_id}` in the URI with your prefix ID from previous steps. Within the request body, the `cidr` value should correspond to the IP address or subnet that you are configuring for use with CDN.

```bash

# Replace the cidr value by the IP address you are configuring.

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "cidr": "203.0.113.100/32",
  "service_id": <SERVICE_ID>
}'
```

In the response body, the initial provisioning state should be `provisioning`.

```json
{
  "errors": [],
  "messages": [],
  "success": true,
  "result": {
    "cidr": "203.0.113.100/32",
    "id": <CDN_SERVICE_BINDING_ID>,
    "provisioning": {
      "state": "provisioning"
      },
    "service_id": <SERVICE_ID>,
    "service_name": "CDN"
  }
}
```
{{</example>}}

2.(Optional) Through the four to six hours that your change will take to propagate, you can use the [List Service Bindings](/api/operations/ip-address-management-service-bindings-list-service-bindings) endpoint to programmatically check for the `active` provisioning state.

## 3. Create address maps

Once you have configured your IPs to have CDN service, you can use {{<glossary-tooltip term_id="address map" link="/byoip/address-maps/">}}address maps{{</glossary-tooltip>}} to specify which IPs should be used by Cloudflare in DNS responses when a record is [proxied](/dns/manage-dns-records/reference/proxied-dns-records/#proxied-records).

You can choose between two different scopes:

* Account-level: uses the address map for all proxied DNS records across all of the zones within an account.

* Zone-Level: uses the address map for all proxied DNS records within a zone.

{{<Aside type="note">}}
If you need to map only specific hostnames to specific IP addresses - and not all proxied DNS records -, you can use a [Subdomain setup](/dns/zone-setups/subdomain-setup/).
{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **IP Addresses** > **Address Maps**.
3. Select **Create an address map**.
4. Choose the scope of the address map.
5. Add the zones and IP addresses that you want to map.
6. Name your address map.
7. Review the information and select **Save and Deploy**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Create Address Map](/api/operations/ip-address-management-address-maps-create-address-map) endpoint.

Make sure you have the correct Key/Token and permissions.

{{</tab>}}
{{</tabs>}}

## 4. Create DNS records

* Proxied

{{<Aside type="note">}}
Total TLS
{{</Aside>}}

## 5.(Optional) Add layer 7 functionality

Leverage other features according to your needs:

* [Cache](/cache/)
* [WAF custom rules](/waf/custom-rules/#custom-rules)
* [Security analytics](/waf/analytics/security-analytics/#security-analytics)