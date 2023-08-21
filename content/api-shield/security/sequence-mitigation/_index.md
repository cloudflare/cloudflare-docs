---
pcx_content_type: concept
title: Sequence Mitigation
weight: 4
---

# Sequence Mitigation

Sequence Mitigation allows you to enforce request patterns for authenticated clients communicating with your API. This feature utilizes the same underlying system that powers Sequence Analytics.

## Limitations

### Endpoint Management

To track requests to API endpoints, they must be added to [Endpoint Management](/api-shield/management-and-monitoring/). Add your endpoints to endpoint management via [API Discovery](/api-shield/security/api-discovery/), [Schema Validation](/api-shield/security/schema-validation/), or [manually](/api-shield/management-and-monitoring/#add-endpoints-manually) through the Cloudflare dashboard.

{{<Aside type="note">}}
API endpoints are subject to change.
{{</Aside>}}

### Session Identifiers

API Shield uses your configured session identifier to track sessions. You must configure a session identifier that is unique per end user of your API in order for Sequence Mitigation to function as expected.

### Request limitations

API Shield currently stores the last 10 requested endpoints by each API user identified by the session identifier. Sequence Mitigation de-duplicates requests to the same endpoint while building the sequence. 

To illustrate, in the original sequence example listed in the [Configuration](/api-shield/security/sequence-mitigation/configure/) section, Sequence Mitigation would store the following sequence:

1. `GET /api/v1/users/{user_id}/accounts`
2. `GET /api/v1/accounts/{account_id}/balance`
3. `POST /api/v1/transferFunds`

Sequence Mitigation de-duplicated the two requests to `GET /api/v1/accounts/{account_id}/balance` and stored them as a single request.

### Time limitations

Sequence Mitigation rules have a lookback period of 10 minutes. If you create a rule that one path must be requested before another path and more than 10 minutes elapses between a user requesting each path, the rule will not match.

## Availability

Sequence Mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.