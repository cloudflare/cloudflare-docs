---
pcx_content_type: concept
title: User Agent Blocking
weight: 3
source: https://support.cloudflare.com/hc/en-us/articles/115001856951-Understanding-Cloudflare-User-Agent-Blocking
---

# Cloudflare User Agent Blocking

User Agent Blocking rules block specific browser or web application [`User-Agent` request headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent). These rules apply to the entire domain instead of individual subdomains.

User Agent Blocking rules are applied after [Zone Lockdown rules](/waf/tools/zone-lockdown/). If you allow an IP address via Zone Lockdown, it will skip any User Agent Blocking rules.

## Availability

Cloudflare User Agent Blocking is available on all plans. The number of available User Agent Blocking rules depends on your Cloudflare plan.

{{<feature-table id="security.x_user_agent_rules">}}

## Create a User Agent Blocking rule

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Security** > **WAF**, and select the **Tools** tab.

3. Under **User Agent Blocking**, select **Create blocking rule**. 

4. Enter a descriptive name for the rule in **Name/Description**.

5. In **Action**, select the action to perform: _Managed Challenge_, _Block_, _JS Challenge_, or _Interactive Challenge_.

6. Enter a user agent value in **User Agent** (wildcards such as `*` are not supported). For example, to block the Bad Bot web spider, enter `BadBot/1.0.2 (+http://bad.bot)`.

7. Select **Save and Deploy blocking rule**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Issue a `POST` request for the [Create a User Agent Blocking rule](/api/operations/user-agent-blocking-rules-create-a-user-agent-blocking-rule) operation.

For example:

```bash
$ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/ua_rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "description": "Block Bad Bot web spider",
  "mode": "block",
  "configuration": {
    "target": "ua",
    "value": "BadBot/1.0.2 (+http://bad.bot)"
  }
}'
```

{{</tab>}}
{{</tabs>}}

## Related resources

- [Secure your application](/learning-paths/application-security/)
- [Cloudflare Zone Lockdown](/waf/tools/zone-lockdown/)
