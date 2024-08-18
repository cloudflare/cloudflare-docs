---
pcx_content_type: reference
title: Enabling log retention
weight: 13
---

# Enable log retention

By default, your HTTP request logs are not retained. When using the Logpull API for the first time, you will need to enable retention. You can also turn off retention at any time. Note that after retention is turned off, previously saved logs will be available until the retention period expires (refer to [Data retention period](/logs/logpull/understanding-the-basics/#data-retention-period)).

## Endpoints

There are two endpoints for managing log retention:

- `GET /logs/control/retention/flag` - returns the current status of retention
- `POST /logs/control/retention/flag` - turns retention on or off

{{<Aside type="note" header="Note">}}

In the linux examples below we use the optional [jq](/logs/tutorials/parsing-json-log-data/) tool to help parse the response data.

To make a `POST` call, you must have zone-scoped `edit` permissions, such as Super Administrator, Administrator, or Log Share. Additional information on making API calls can be found at the link below.

- [Making API Calls](/fundamentals/api/how-to/make-api-calls/)

{{</Aside>}}

## Example API requests using cURL

### Check log retention status:

{{<render file="_check-log-retention.md">}}

If the zone has log retention [enabled](/logs/logpull/enabling-log-retention/#enabled-response) you see the value `true`, whereas a value of `false` is returned when it is [disabled](/logs/logpull/enabling-log-retention/#disabled-response).

### Turn on log retention:

{{<render file="_enable-log-retention.md">}}

#### Enabled Response:

```json
{
  "flag": true
}
```
### Turn off log retention:

{{<render file="_disable-log-retention.md">}}

#### Disabled Response:

```json
{
  "flag": false
}
```

## Audit

Turning log retention on or off is recorded in [Cloudflare Audit Logs](/fundamentals/setup/account/account-security/review-audit-logs/#access-audit-logs).
