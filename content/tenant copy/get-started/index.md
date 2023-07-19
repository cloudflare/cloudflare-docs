---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started

Having access to Cloudflare’s provisioning capabilities allows you to more easily create and manage Cloudflare accounts. The following steps will get you started on making API calls to provision accounts, users, and services.

## Before you begin

### Channel and Alliance partner account setup

Before using the Tenant API, you need to [create an account](/fundamentals/account-and-billing/account-setup/create-account/), [verify your email address](/fundamentals/account-and-billing/account-setup/verify-email-address/), and [add your billing information](/fundamentals/account-and-billing/account-setup/create-billing-profile/).

After you sign your partner agreement with Cloudflare, Cloudflare will add [certain entitlements](/tenant/structure/) to your account that allow you to provision and manage custom accounts. If you have signed your partner agreement and your account has not yet been enabled, contact `partners@cloudflare.com`.

### API access

You also need to [retrieve your API key](/fundamentals/api/get-started/keys/#view-your-global-api-key) to authenticate your requests to the Tenant API.

For more details on using the Cloudflare API, refer to our [API overview](/fundamentals/api/).

## Step 1 - Create an account

{{<render file="_account-preamble.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_create-account-dash.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_create-account-api.md">}}

{{</tab>}}
{{</tabs>}}

## Step 2 - Grant user access

Now that you have created an account, you need to either give your customer direct access to Cloudflare or build an interface for them to interact with.

The first method gives customers control over all aspects of Cloudflare, while the latter allows you to integrate your customer's Cloudflare experience into a dashboard that you control and that they may already be familiar with.

### Option 1 - Direct access to Cloudflare

When you grant user access to an account, Cloudflare will send an invitation to the user so they can get access to the account. If they do not already have a Cloudflare user, Cloudflare will take them through the process of creating one. Once created, they will be given access to the account and any zones already created.

#### Using the dashboard

If you want to give customers access to their individual accounts, it is the same as if you were [inviting a teammate](/fundamentals/account-and-billing/members/manage/#add-account-members) to help manage your account.

#### Using the API

You can also grant access to the Cloudflare dashboard by using the API.

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<CUSTOMER_ACCOUNT_ID>/members' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
    "email": "<customer-email>",
    "roles": ["<user-role>"]
    }'
```

In most cases, you will want to create new users with a role of `Administrator` which always has the id `05784afa30c1afe1440e79d9351c7430`.

If your customer is on an Enterprise plan, they have access to a broader set of user roles. To get a full list of available roles, send a [`GET`](/api/operations/account-roles-list-roles) request to the API.

### Option 2 - Access via an interface

If you want greater control over how customers use Cloudflare or if you want your customers to use an existing dashboard of yours that they already know, use the Cloudflare API to build this experience.

This means that you will be making API calls to Cloudflare on behalf of your customers. To avoid getting [rate limited](/fundamentals/api/reference/limits/) by our API, Cloudflare recommend that you create accounts and users for each of your customers. Changes made by customer `A` should go through user `A` and changes made by customer `B` should go through user `B`.

{{<Aside type="note">}}

This capability is not enabled by default. If you need this functionality, contact [Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/).

{{</Aside>}}

To grant access via an interface, you need to create a service user, as no one will log in to the dashboard with them. If you are planning to use this method, Cloudflare will enable you to see the API key in order to make API calls as this user.

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/users' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
    "email": "<ID@youremaildomain.com>"
    }'
```

```json
---
header: Response
---
{
  "result": {
    "id": "60758bd48392a06215ae817bc35084b6",
    "email": "<identifier>@youremaildomain.com>",
    "first_name": null,
    "last_name": null,
    "username": "17bd2796b374cec14976ac3bced85c05",
    "telephone": null,
    "country": null,
    "created_on": "2019-02-21T23:20:28.645256Z",
    "modified_on": "2019-02-21T23:20:28.645256Z",
    "two_factor_authentication": {
      "enabled": false,
      "locked": false
    },
    "api_key": "xxx"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Step 3 - Create a zone

Now that you have a customer account and customer users (or service users), you need to create a zone.

To do this, send a [`POST`](/api/operations/zones-post) request to the `/zones` endpoint (including the customer account ID you received in [Step 1](#step-1---create-an-account)).

```bash
---
header: Request
---
curl -X POST 'https://api.cloudflare.com/client/v4/zones' \
-H 'Content-Type: application/json' \
-H 'x-auth-email: <EMAIL>' \
-H 'x-auth-key: <API_KEY>' \
-d '{
   "name": "example.com",
   "account": {
      "id": "<CUSTOMER_ACCOUNT_ID>"
   }
}'
```

## Step 4 - Create a zone plan subscription

Now that you have a zone provisioned for the customer, you can add the appropriate zone plan based on your reseller agreement.

{{<render file="_create-zone-subscription.md">}}

## Step 5 - Create other subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account-level subscriptions.

{{<render file="_create-account-subscription.md">}}

## Step 6 - Configure zone and services

Once you have added the necessary subscriptions, you or your customer can move on to configuring various services and fine-tuning account and zone settings.

Configuration can be done by anyone with access to the account (as well as the correct user permissions). This process does not differ from configuring any other Cloudflare account. For additional guidance, refer to our [Product docs](/).