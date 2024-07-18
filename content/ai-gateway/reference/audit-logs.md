---
title: audit logs
pcx_content_type: concept
---

[Audit logs]( https://developers.cloudflare.com/fundamentals/setup/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to gateways in AI Gateway. This functionality is available on all plan types, free of charge, and is enabled by default.

## Viewing Audit Logs

To view audit logs for AI Gateway:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account > Audit Log**.

For more information on how to access and use audit logs, refer to [review audit logs documentation](https://developers.cloudflare.com/fundamentals/setup/account/account-security/review-audit-logs/).

## Logged Operations

The following configuration actions are logged:

| Operation         | Description                      |
|-------------------|----------------------------------|
| gateway created   | Creation of a new gateway.       |
| gateway deleted   | Deletion of an existing gateway. |
| gateway updated   | Edit of an existing gateway.     |

## Example Log Entry

Below is an example of an audit log entry showing the creation of a new gateway:

```json
{
 "action": {
     "info": "gateway created",
     "result": true,
     "type": "create"
 },
 "actor": {
     "email": "joaolenon@cloudflare.com",
     "id": "2be807ba1b409c0b61f8b5b46c270756",
     "ip": "2a09:bac1:5e20:8::6b:90",
     "type": "user"
 },
 "id": "2d82eb0e-1f97-46f8-a925-935296bad963",
 "interface": "UI",
 "metadata": {},
 "newValue": "",
 "newValueJson": {
     "cache_invalidate_on_update": false,
     "cache_ttl": 0,
     "collect_logs": true,
     "id": "test-lenon",
     "rate_limiting_interval": 0,
     "rate_limiting_limit": 0,
     "rate_limiting_technique": "fixed"
 },
 "oldValue": "",
 "oldValueJson": {},
 "owner": {
     "id": "0d37909e38d3e99c29fa2cd343ac421a"
 },
 "resource": {
     "id": "80303df8-0771-4cfa-a0f8-0bd893e831ca",
     "type": "ai_gateway.gateway_config"
 },
 "when": "2024-07-17T14:06:11.425Z"
}
