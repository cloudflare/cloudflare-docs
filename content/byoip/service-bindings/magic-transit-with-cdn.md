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

* Note that a transitional state will take place for four to six hours after you complete all the steps. During this time, traffic destined to your origins will slowly transition from the Magic Transit pipeline to the CDN pipeline.

## 1. Get account information

1. Log in to your Cloudflare account and your account ID and API token.
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

## 3. Create address map

* Account-level: for all proxied DNS records across all of the zones within an account

* Zone-Level: all proxied DNS records within a zone

{{<Aside type="note">}}
Subdomain setup alternative
{{</Aside>}}

## 4. Create DNS records

* Proxied

{{<Aside type="note">}}
Total TLS
{{</Aside>}}

## 5.(Optional) Add more layer 7 functionality