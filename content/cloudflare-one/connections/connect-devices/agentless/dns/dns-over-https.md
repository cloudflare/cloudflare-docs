---
pcx_content_type: how-to
title: DNS over HTTPS
weight: 2
---

# Configure DNS over HTTPS

With Cloudflare Gateway, you can filter DNS over HTTPS (DoH) requests by location or by user without needing to install the WARP client on your devices.

Location-based policies require that you send DNS requests to a [location-specific DoH endpoint](#filter-doh-requests-by-location), while identity-based policies require that requests include a [user-specific DoH token](#filter-doh-requests-by-user).

## Filter DoH requests by location

Location-based policies require that you send DNS requests to a unique [DoH endpoint](/cloudflare-one/glossary/#doh-subdomain) assigned to the location:

```txt
https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query
```

### Prerequisites

Obtain your location's [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain).

### Configure browser for DoH

Browsers can be configured to use any DNS over HTTPS (DoH) endpoint. If you choose to configure DoH directly in your browser, you must choose a Gateway location as your DoH endpoint, otherwise Gateway DNS filtering will not occur in that browser.

<details>
<summary>Mozilla Firefox</summary>
<div>

1. In Firefox, go to **Settings**.
2. In the General menu, scroll down to **Network Settings**.
3. Select **Settings**.
4. Select **Enable DNS over HTTPS**.
5. In the **Use Provider** drop-down menu, select _Custom_.
6. In the **Custom** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.
7. Select **OK**.
8. Enter **about:config** in the address bar.
9. Select **Accept the risk!** if you see a prompt from Firefox.
10. Set **network.trr.bootstrapAddress** to `162.159.36.5`.
11. Set **network.trr.mode** to `3`.

{{<Aside type="note">}}

If you want to disable DoH for your organization so that Gateway can be enforced, create a policy to block [this canary domain](https://support.mozilla.org/en-US/kb/canary-domain-use-application-dnsnet).

{{</Aside>}}

</div>
</details>

<details>
<summary>Google Chrome</summary>
<div>

1. In Chrome, go to **Settings** > **Privacy and security** > **Security**.
2. Scroll down and turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Read more about [enabling DNS over HTTPS](https://www.chromium.org/developers/dns-over-https) on Chrome.

</div>
</details>

<details>
<summary>Microsoft Edge</summary>
<div>

1. In Microsoft Edge, go to **Settings**.
2. Select **Privacy, Search, and Services**, and scroll down to **Security**.
3. Turn on **Use secure DNS**.
4. Select **Choose a service provider**.
5. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

</div>
</details>

<details>
<summary>Brave</summary>
<div>

1. In Brave, go to **Settings** > **Security and Privacy** > **Security**.
2. Turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

</div>
</details>

<details>
	<summary>Safari</summary>
	<div>As of today, Safari does not support DNS over HTTPS.</div>
</details>

Your DNS queries will now be sent to Gateway for filtering. To filter these requests, build a DNS policy using the [Location selector](/cloudflare-one/connections/connect-devices/agentless/dns/locations).

## Filter DoH requests by user

In order to filter DoH queries based on user identity, each query must include a user-specific authentication token. If you have several devices per user and want to apply device-specific policies, you will need to map each device to a different email.

Currently, authentication tokens can only be generated through the API. You can run this [interactive Python script](/cloudflare-one/static/documentation/connections/authenticated-doh.py) which automates the setup procedure, or follow the steps described below.

### 1. Create a service token for the account

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/access/service_tokens" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <API_KEY>" \
     -H "Content-Type: application/json" \
     --data '{"name":"ACME Corporation service token"}'
```

Save the service token's `client_id`, `client_secret`, and `id`.

<details>
<summary>Example response</summary>
<div>

```bash
---
highlight: [3, 4, 7]
---
{
  "result": {
    "client_id": "88bf3b6d86161464f6509f7219099e57.access",
    "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",
    "created_at": "2022-06-09T01:59:17Z",
    "expires_at": "2023-06-09T01:59:17Z",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "name": "ACME Corporation service token",
    "updated_at": "2022-06-09T01:59:17Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

### 2. Enable DoH functionality for the service token

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/access/organizations/doh/<ID>" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <API_KEY>" \
     -H "Content-Type: application/json" \
```

If you get an `access.api.error.service_token_not_found` error, check that `<SERVICE_TOKEN_ID>` is the value of `id` and not `client_id`.

<details>
<summary>Example response</summary>
<div>

```bash
{
  "result": {
    "client_id": "88bf3b6d86161464f6509f7219099e57.access",
    "created_at": "2022-06-09T01:59:17Z",
    "expires_at": "2023-06-09T01:59:17Z",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "name": "ACME Corporation service token",
    "updated_at": "2022-06-09T01:59:17Z",
    "duration": "8760h"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

### 3. Create a user

Create a new user and optionally add them to a group.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/access/users" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <API_KEY>" \
     -H "Content-Type: application/json" \
     --data '{
        "name":"John Doe",
        "email":"jdoe@acme.com",
        "custom": {"groups":[{"id": "02fk6b3p3majl10", "email": "finance@acme.com", "name": "Finance"}]}
        }'
```

Save the user's `id` returned in the response.

<details>
<summary>Example response</summary>
<div>

```bash
---
highlight: [3]
---
{
  "result": {
    "id": "54d425de-7a78-4186-9975-d43c88ee7899",
    "created_at": "2022-03-16T21:18:39.93598Z",
    "updated_at": "2022-05-17T23:50:39.598345Z",
    "uid": "54d425de-7a78-4186-9975-d43c88ee7899",
    "name": "John Doe",
    "email": "jdoe@acme.com",
    "custom": {
        "groups": [
            {
                "email": "finance@acme.com",
                "id": "02fk6b3p3majl10",
                "name": "Finance"
            }
        ]
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

{{<Aside type="note">}}

Steps 1-3 above only need to be completed once, while Steps 4-5 below would occur during normal operation.

{{</Aside>}}

### 4. Generate a DoH token for the user

Request a DoH token for the user, using your service token to authenticate into your [team domain](/cloudflare-one/glossary/#team-domain).

```bash
curl -s -X GET "https://<TEAM_NAME>.cloudflareaccess.com/cdn-cgi/access/doh-token?account-id=<ACCOUNT_ID>&user-id=<USER_ID>&auth-domain=<TEAM_NAME>.cloudflareaccess.com" \
     -H "Cf-Access-Client-Id: <CLIENT_ID>" \
     -H "Cf-Access-Client-Secret: <CLIENT_SECRET>"
     -H "Content-Type: application/json" \
```

The response contains a unique DoH token associated with the user. This token expires in 24 hours. We recommend setting up a refresh flow for the DoH token instead of generating a new one for every DoH query.

<details>
<summary>Example response</summary>
<div>

```bash
{"token":"y2khbGciOiJSUzI1NiIsImtpZCI6ImJlZjVkYjg4ZTEwMjk3ZDEwNzhkMmEyYjE0MjMxZTljYTQwMjQ2NjAwOTQzNmJhOTQwOGJkODY3ZmI4OWFiOGQifQ.eyJ0eXBlIjoiZG9oIiwiYXVkIjoiY2xvdWRmbGFyZS1nYXRld2F5LmNvbSIsImlhdCI6MTY1NDc1MTg3NSwiZXhwIjoxNjU0ODM4Mjc1LCJhY2NvdW50LWlkIjoiMTA4MDM0OGIyZGYzYmQwN2QxZmI1MjM3Y2Q1ZDU5M2EiLCJ1c2VyLWlkIjoiNTRkNDI1ZGUtN2E3OC00MTg2LTk5NzUtZDQzYzg4ZWU3ODk5In0.I5p4WsH2dPhQ8vwy84zF05PsoBHCsUSXAaMpNhEH36oFZ3tXcs9ksLz7OzpZ_x3HxUfO3n57LlpAF1VehaBt2i94XCkvSgtHpYcwd_qZydLp-BGtcyfU1LbdXQC3m6zxKcIWu5VySi8I-J25UYlpyJhYgZ4DQUZIpqbSSt6WcVRKvA7OBa7xjkTux4OcqWAViO_ZS-GLwl-fqhvolmiwk37seBD3YuV1zG06VeWXfrMkZ5MbhooHD1DZDBHOZpTtmN8MbeKeI4tlY1mb_O3-jE-um6F9Hrl4NQm89MKFzsum-_Rywi5m4PTSlDza7fjdJs7RzFgJd3VWgzG-jgyQKw"}%
```

</div>
</details>

### 5. Send an authenticated DoH query

Send DoH queries to the resolver at `https://<ACCOUNT_ID>.cloudflare-gateway.com/dns-query`, making sure to include the user's DoH token in the `CF-Authorization` header.

```bash
curl -s 'https://<ACCOUNT_ID>.cloudflare-gateway.com/dns-query?name=example.com' \
     -H 'accept: application/dns-json' \
     -H 'CF-Authorization: <USER_DOH_TOKEN>' | jq
```

If the site is blocked and you have enabled [**Display block page**](/cloudflare-one/policies/filtering/configuring-block-page/#enable-the-block-page-for-dns-policies) for the policy, the query will return `162.159.36.12` (the IP address of the Gateway block page). If the block page is disabled, the response will be `0.0.0.0`.

<details>
<summary>Example response</summary>
<div>

```bash
{
  "Status": 0,
  "TC": false,
  "RD": true,
  "RA": true,
  "AD": false,
  "CD": false,
  "Question": [
    {
      "name": "example.com",
      "type": 1
    }
  ],
  "Answer": [
    {
      "name": "example.com",
      "type": 1,
      "TTL": 60,
      "data": "162.159.36.12"
    }
  ]
}
```

</div>
</details>

You can verify that the request was associated with the correct user email by checking your [Gateway DNS logs](/cloudflare-one/analytics/logs/gateway-logs/). To filter these requests, build a DNS policy using any of the Gateway [identity-based selectors](/cloudflare-one/policies/filtering/identity-selectors/).
