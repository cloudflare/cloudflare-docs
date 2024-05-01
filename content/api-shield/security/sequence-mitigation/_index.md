---
pcx_content_type: concept
title: Sequence Mitigation
weight: 4
---

# Sequence Mitigation

Sequence Mitigation allows you to enforce request patterns for authenticated clients communicating with your API. This feature utilizes the same underlying system that powers Sequence Analytics.

You can use Sequence Rules to establish a set of known behavior for API clients.

For example, you may expect that API requests made during a bank funds transfer could conform to the following order in time:

| Order | Method | Path | Description |
| --- | --- | --- | --- |
| 1 | `GET` | `/api/v1/users/{user_id}/accounts` | `user_id` is the active user. |
| 2 | `GET` | `/api/v1/accounts/{account_id}/balance` | `account_id` is one of the user’s accounts. |
| 3 | `GET` | `/api/v1/accounts/{account_id}/balance` | `account_id` is a different account belonging to the user. |
| 4 | `POST` | `/api/v1/transferFunds` | This contains a request body detailing an account to transfer funds from, an account to transfer funds to, and an amount of money to transfer. |

You may want to enforce that an API user requests `GET /api/v1/users/{user_id}/accounts` before `GET /api/v1/accounts/{account_id}/balance` and that you request `GET /api/v1/accounts/{account_id}/balance` before `POST /api/v1/transferFunds`.

Using Sequence Mitigation, you can enforce that request pattern with two new Sequence Mitigation rules.

{{<Aside type="note">}}
You can create Sequence Mitigation rules for a sequence even if the sequence is not listed in [Sequence Analytics](/api-shield/security/sequence-analytics/).
{{</Aside>}}

## Process

You can create a sequence rule to enforce behavior on your API over time in two different ways. Sequence rules can either protect an endpoint from users performing a known specific sequence of API calls (otherwise known as a negative security model) or from users making API requests outside of your expectations (otherwise known as a positive security model).

In the bank funds transfer example, enforcing that a user requests `GET /api/v1/accounts/{account_id}/balance` before `POST /api/v1/transferFunds` is considered a positive security model, since a user may only perform a funds transfer after listing an account balance.

A negative security model may be useful if you see abusive behavior that is outside the norm of your application and you need to stop the requests while researching the correct positive security model to implement. 

For example, if there was an authorization bug that allowed users to iterate through other users' profiles that contain account numbers via `GET /api/v1/users/{var1}/profile` and then a user tries to make fradulent funds transfers, you could create up a rule to block or log the sequence `GET /api/v1/users/{var1}/profile` to `POST /api/v1/transferFunds`.

## Create a sequence rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **API Shield** > **API Rules**.
3. Select **Create sequence rule**. 
4. Name your rule.
5. Select a starting endpoint. This is the endpoint that you expect users to hit first in their request flow when using your API.
    1. Choose a hostname to display the list of endpoints for that hostname.
    2. Choose an endpoint.
    3. Select **Set as starting endpoint**.
6. Select a final endpoint. This is the endpoint you are targeting for protection.
    1. Choose a hostname to display the list of endpoints for that hostname.
    2. Choose an endpoint.
    3. Select **Set as ending endpoint**.
7. Choose an action that corresponds to the security model type:
    - **Allow**: This will create a positive security model by defining approved sequences on your API.
    - **Log** / **Block**: This will test or enforce a negative security model defining known bad sequences on your API.
{{<Aside type="note">}} 
If you chose **Allow**, select whether to log or block the request to the final endpoint when users do not first request the starting endpoint in the sequence.
{{</Aside>}}
8. Select **Create rule**.

## Edit a sequence rule 

You also have the option to edit an existing rule by selecting it on the rule list. You can rename your rule, adjust the starting and ending endpoint order, modify the endpoint, and change the action of the rule. 

## Reprioritize a sequence rule

You can change the priority order of your rules by selecting and dragging the rules on the list. 

You can also explicitly set a priority order by selecting the three dots on your rule and choosing **Move to…** where you can set the new priority in the resulting modal window.

## Limitations

### Endpoint Management

To track requests to {{<glossary-tooltip term_id="API endpoint">}}API endpoints{{</glossary-tooltip>}}, they must be added to [Endpoint Management](/api-shield/management-and-monitoring/). Add your endpoints to endpoint management via [API Discovery](/api-shield/security/api-discovery/), [Schema Validation](/api-shield/security/schema-validation/), or [manually](/api-shield/management-and-monitoring/#add-endpoints-manually) through the Cloudflare dashboard.

### Session Identifiers

API Shield uses your configured {{<glossary-tooltip term_id="session identifier">}}session identifier{{</glossary-tooltip>}} to track sessions. You must configure a session identifier that is unique per end user of your API in order for Sequence Mitigation to function as expected.

### Request limitations

API Shield currently stores the last 10 requested endpoints by each API user identified by the session identifier. Sequence Mitigation de-duplicates requests to the same endpoint while building the sequence. 

To illustrate, in the original [sequence example](/api-shield/security/sequence-mitigation/) listed above, Sequence Mitigation would store the following sequence:

1. `GET /api/v1/users/{user_id}/accounts`
2. `GET /api/v1/accounts/{account_id}/balance`
3. `POST /api/v1/transferFunds`

Sequence Mitigation de-duplicated the two requests to `GET /api/v1/accounts/{account_id}/balance` and stored them as a single request.

### Time limitations

Sequence Mitigation rules have a lookback period of 10 minutes. If you create a rule that one path must be requested before another path and more than 10 minutes elapses between a user requesting each path, the rule will not match.

## Availability

Sequence Mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.