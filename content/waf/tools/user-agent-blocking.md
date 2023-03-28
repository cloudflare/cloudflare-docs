---
pcx_content_type: concept
title: User Agent Blocking
weight: 3
source: https://support.cloudflare.com/hc/en-us/articles/115001856951-Understanding-Cloudflare-User-Agent-Blocking
---

# Cloudflare User Agent Blocking

User Agent Blocking (UA) rules block specific browser or web application [`User-Agent` request headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent). UA rules apply to the entire domain instead of individual subdomains.

User Agent Blocking rules are applied after [Zone Lockdown rules](https://support.cloudflare.com/hc/articles/115001595131). If you allow an IP address via Zone Lockdown, it will skip any UA rules.

## Availability

Cloudflare User Agent Blocking is available on all plans. The number of available User Agent Blocking rules depends on your Cloudflare plan.

{{<feature-table id="security.x_user_agent_rules">}}

---

## Create a User Agent Blocking rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Security** > **WAF**, and select the **Tools** tab.

3. Under **User Agent Blocking**, select **Create blocking rule**. 

4. Enter a descriptive name for the rule in **Name/Description**.

5. In **Action**, select the action to perform: _Managed Challenge_, _Block_, _JS Challenge_, or _Interactive Challenge_.

6. Enter a user agent value in **User Agent** (wildcards such as `*` are not supported). For example, to block the _Bad Bot_ web spider, enter `BadBot/1.0.2 (+http://bad.bot)`.

7. Select **Save and Deploy blocking rule**.

___

## Related resources

- [Secure your application](/learning-paths/application-security/)
- [Cloudflare Zone Lockdown](https://support.cloudflare.com/hc/articles/115001595131)
