---
pcx_content_type: navigation
title: Logs
weight: 3
meta:
    title: Zero Trust logs
---

# Zero Trust logs

Review detailed logs for your Zero Trust organization.

{{<directory-listing>}}

## Log retention

Cloudflare Zero Trust logs are stored for a varying period of time based on the service used:

| Zero Trust plan | Admin logs | Access logs | DNS logs                                       | Network logs | HTTP logs |
| --------------- | ---------- | ----------- | ---------------------------------------------- | ------------ | --------- |
| **Free**        | 24 hours   | 24 hours    | 24 hours                                       | 24 hours     | 24 hours  |
| **Standard**    | 30 days    | 30 days     | 30 days                                        | 30 days      | 30 days   |
| **Access**      | 30 days    | 30 days     | 24 hours                                       | 24 hours     | 24 hours  |
| **Gateway**     | 30 days    | 24 hours    | 30 days                                        | 30 days      | 30 days   |
| **Enterprise**  | 180 days   | 180 days    | 180 days<sup><a href="#footnote-1">1</a></sup> | 30 days      | 30 days   |

<a name="footnote-1"><sup>1</sup></a> Enterprise users on per query plans cannot store DNS logs via Cloudflare. You can still export logs via [Logpush](logpush/). For more information, contact your account team.

## Customer Metadata Boundary

Cloudflare Zero Trust can be used with the Data Localization Suite to ensure that data storage is restricted to a specific geographic region. For more information refer to [Customer Metadata Boundary](/data-localization/metadata-boundary/).

## Data privacy

For more information on how we use this data, refer to our [Privacy Policy](https://www.cloudflare.com/application/privacypolicy/).
