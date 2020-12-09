---
title: "3: Enabling services"
order: 2
---

# Step 3: Enabling services

In order for your customers to get the most out of Cloudflare it is important that you can easily provision paid services so customer's services are as fast and secure as possible. To do that, we are going to create some subscriptions for our customer, but first the customer needs a zone.

## Create a zone

Creating a zone is no different the Client V4 API, but be sure to specify the customer's account when creating the zone.

[API Docs](https://api.cloudflare.com/#zone-create-zone)

Example - Create Zone

```bash
curl -X POST https://api.cloudflare.com/client/v4/zones -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "name": "example.com", "account": { "id": "<customer account id>" } }'
```

## Create a zone subscription

Now that you have a zone provisioned for the customer, you can add the appropriate zone plan based on your reseller agreement.

[API Docs](https://api.cloudflare.com/#zone-subscription-properties)

Example - Create Zone Subscription

```bash
curl -X POST https://api.cloudflare.com/client/v4/zones/<zone id>/subscription -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{"rate_plan": {"id": "<rate plan identifier>"}}'
```

Allowed rate plans are:

* `PARTNERS_PRO`
* `PARTNERS_BIZ`
* `PARTNERS_ENT`

These are the same plans that customers buy in the dashboard. Additionally, depending on your agreement there may be additional services you can select including `dedicated_certificates`, `dedicated_certificates_custom`, `page_rules`, etc. These are specified as `component_values` in the subscriptions creation request.

An example `POST` body for such a request may look like:

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

## Create account subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account level subscriptions.

[API Docs](https://api.cloudflare.com/#account-subscriptions-properties)

Example - Create Account Subscription

```bash
curl -X POST https://api.cloudflare.com/client/v4/accounts/<account id>/subscriptions -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "rate_plan": {"id": "<rate plan id>"} }'
```

Once you have added the necessary features, you or your customer can move on to configuring the various services and fine-tuning settings.

--------------------------------

## Continue the tutorial

Learn how to modify zone settings and other services.

<p><Button type="primary" href="/tutorial/service-configuration">Step 4: Service configuration</Button></p>
