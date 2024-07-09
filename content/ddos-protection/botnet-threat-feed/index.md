---
pcx_content_type: concept
title: Botnet Threat Feed
weight: 15
meta:
  title: DDoS Botnet Threat Feed for service providers
---

{{<heading-pill style="early-access">}}DDoS Botnet Threat Feed for service providers{{</heading-pill>}}

The Cloudflare DDoS Botnet Threat Feed is a threat intelligence feed for service providers (SPs) such as hosting providers and Internet service providers (ISPs) that provides information about their own IP addresses that have participated in HTTP DDoS attacks as observed from Cloudflare's global network. The feed aims to help service providers stop the abuse and reduce DDoS attacks originating from within their networks.

Each service provider can only get information about IP addresses associated with their autonomous system numbers (ASNs).

To ensure the feed’s accuracy, Cloudflare will only include in the feed IP addresses that have participated in multiple HTTP DDoS attacks and have triggered high-confidence rules.

## Context

A single DDoS attack consisting of thousands of bots can involve as little as one single IP per service provider. Service providers usually only see a small fraction of the attack traffic leaving their network, and it can be hard to correlate it to malicious activity, while trying to identify abusers.

In the case of HTTPS DDoS attacks, service providers only see encrypted payloads leaving their network without any possibility to decrypt or understand if it is malicious or legitimate traffic. However, Cloudflare can see an entire attack and all of its sources if the attack targets an Internet property that uses Cloudflare's services. This global view can help service providers stop the abusers.

## Availability

The Cloudflare DDoS Botnet Threat Feed is available in early access for free to service providers. To get access, [sign up to the waiting list](https://www.cloudflare.com/lp/botnet-threat-feed/). For more information, refer to the [Terms of Use](https://www.cloudflare.com/en-gb/service-specific-terms-application-services/#ddos-botnet-threat-feed).

---

## Before you begin

Make sure that:

- You have [created a Cloudflare account](/fundamentals/setup/account/).
- You have access to the DDoS Botnet Threat Feed. If not, [sign up to the waiting list](https://www.cloudflare.com/lp/botnet-threat-feed/).

## Get started

### 1. Obtain Cloudflare API token

You must [obtain a Cloudflare API token](/fundamentals/api/get-started/create-token/) with at least the following account-level permission:

- _DDoS Botnet Feed_ > _Read_

### 2. Register your ASN via PeeringDB

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Select **DDoS Threat Feed ASNs**.
4. On the list of ASNs configured for your threat feed, select **Add ASN**. 
5. You will be redirected to the PeeringDB authentication page, where you can log in and consent to share the affiliation data with us. You will be redirected back to the configuration page once it is successful. 

### 3. Call Botnet Threat Feed API

Invoke one of the Botnet Threat Feed API endpoints:

- [Get full report](#get-full-report)
- [Get day report](#get-day-report)

---

## Available API endpoints

{{<Aside type="warning" header="Important notes">}}
- The API URI path is planned to change from `.../botnet_feed/...` to `.../ddos_botnet_feed/...` in the future.
- Responses with no IP addresses in the results (empty state) will return an `HTTP 200` status code (success), with an empty list in the `result` property.
{{</Aside>}}

To invoke an API endpoint, append the operation endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

### Get full report

Retrieves all the data in the botnet tracking database for a given ASN (currently two weeks worth of data).

- HTTP verb: `GET`
- Operation endpoint: `/accounts/{account_id}/botnet_feed/asn/{asn}/full_report`

The provided `{asn}` must be affiliated with your account.

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/botnet_feed/asn/{asn}/full_report" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "cidr": "127.0.0.1/32",
      "date": "1970-01-01T00:00:00Z",
      "offense_count": 10000
    },
    // ... other entries ...
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### Get day report

Retrieves all the data the botnet tracking database has for a given ASN on a given date. This operation currently allows dates greater than two weeks prior, but in this case it will return an empty dataset (the database currently stores two-weeks worth of data).

- HTTP verb: `GET`
- Operation endpoint: `/accounts/{account_id}/botnet_feed/asn/{asn}/day_report?date={date}`

The provided `{asn}` must be affiliated with your account.

`{date}` must be an ISO 8601-formatted date: `YYYY-MM-DD`. If no date is specified, the API responds with the data from the day before.

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/botnet_feed/asn/{asn}/day_report?date=2024-05-05" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "cidr": "127.0.0.1/32",
      "date": "2024-05-05T00:00:00Z",
      "offense_count": 10000
    },
    // ... other entries ...
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
