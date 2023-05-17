---
title: Manage subscriptions
pcx_content_type: how-to
weight: 4
---

# Manage subscriptions

Once your customer has a zone provisioned, you can add zone and account-level subscriptions.

## Zone subscriptions

### Create zone subscription

{{<render file="_create-zone-subscription.md">}}

### Get zone subscription details

To get the details of a zone subscription, send a [`GET`](/api/operations/zone-subscription-zone-subscription-details) request to the `/zones/<ZONE_ID>/subscription` endpoint.

### Update zone subscription

To get the details of a zone subscription, send a [`PUT`](/api/operations/zone-subscription-update-zone-subscription) request to the `/zones/<ZONE_ID>/subscription` endpoint.

---

## Account subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account-level subscriptions.

### Create account subscription

{{<render file="_create-account-subscription.md">}}

### Get account subscription details

To get all subscriptions for an account, send a [`GET`](/api/operations/account-subscriptions-list-subscriptions) request to the `/accounts/<ACCOUNT_ID>/subscriptions` endpoint.

### Update account subscription

To update a subscription on an account, send a [`PUT`](/api/operations/account-subscriptions-update-subscription) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.

### Delete account subscription

To delete a subscription on an account, send a [`DELETE`](/api/operations/account-subscriptions-delete-subscription) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.
