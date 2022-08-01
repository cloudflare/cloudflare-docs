---
title: "3: Enabling services"
pcx_content_type: get-started
weight: 4
meta:
  title: "Step 3: Enabling services"
---

# Step 3: Enabling services

In order for your customers to get the most out of Cloudflare, it is important that you can easily provision paid services so that your customer's services are as fast and secure as possible. To do that, we are going to create some subscriptions for our customer, but first the customer needs a zone.

## Creating a zone

Creating a zone is similar to creating an API Client, you need to specify the customer's account when creating the zone.

Refer to [Create Zone](https://api.cloudflare.com/#zone-create-zone) for more information.

Example of how to create a zone:

```json
curl -X POST https://api.cloudflare.com/client/v4/zones \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <x-auth-email>' \
-H 'x-auth-key: <x-auth-key>' \
-d '{
   "name": "example.com",
   "account": {
      "id": "<customer account id>"
   }
}'
```

## Creating a zone subscription

Now that you have a zone provisioned for the customer, you can add the appropriate zone plan based on your reseller agreement.

Refer to [Zone Subscription](https://api.cloudflare.com/#zone-subscription-properties) for more information.

Example of how to create a zone subscription:

```json
curl -X POST https://api.cloudflare.com/client/v4/zones/<zone id>/subscription \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <x-auth-email>' \
-H 'x-auth-key: <x-auth-key>' \
-d '{
   "rate_plan": {
      "id": "<rate plan>"
   }
}'
```

Allowed rate plans are:

*   PARTNERS\_PRO
*   PARTNERS\_BIZ
*   PARTNERS\_ENT

These are the same plans that customers buy in the dashboard. Additionally, depending on your agreement there may be additional services you can select such as `page_rules`. These are specified as `component_values` in the subscriptions creation request.

An example of a `POST` for such a request may look like this:

```json
{
  "rate_plan":{
    "id":"PARTNERS_BIZ"
  },
  "component_values":[
    {
      "name":"dedicated_certificates_custom",
      "value":1
    }
  ]
}
```

## Creating account subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account level subscriptions.

Refer to [Account Subscriptions](https://api.cloudflare.com/#account-subscriptions-properties) for more information.

Example of how to create an account subscription:

```json
curl -X POST https://api.cloudflare.com/client/v4/accounts/<account id>/subscriptions \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <x-auth-email>' \
-H 'x-auth-key: <x-auth-key>' \
-d '{
   "rate_plan": {
      "id": "<rate plan name>"
   }
}'
```

Once you have added the necessary features, you or your customer can move on to configuring the various services and fine-tuning settings.

***

## Next step

Learn how to modify zone settings and other services.

<p>{{<button type="primary" href="/tenant/get-started/service-configuration/">}}Step 4: Service configuration{{</button>}}</p>
