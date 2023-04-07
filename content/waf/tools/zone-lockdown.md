---
pcx_content_type: concept
title: Zone Lockdown
weight: 4
source: https://support.cloudflare.com/hc/en-us/articles/115001595131-Understanding-Cloudflare-Zone-Lockdown
---

# Cloudflare Zone Lockdown

Zone Lockdown specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. You can configure multiple destinations, including IPv4/IPv6 addresses, in a single Zone Lockdown rule.

All IP addresses not specified in the Zone Lockdown rule will not have access to the specified resources. Requests from those IP addresses will receive an `Access Denied` response.

## Availability

Cloudflare Zone Lockdown is available on paid plans. The number of available Zone Lockdown rules depends on your Cloudflare plan.

{{<feature-table id="security.x_zone_lockdown_rules">}}

## Create a Zone Lockdown rule

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **Security** > **WAF**, and select the **Tools** tab.

3. Under **Zone Lockdown**, select **Create lockdown rule**. 

4. Enter a descriptive name for the rule in **Name**.

5. For **URLs**, enter the domains, subdomains, or URLs you wish to protect from unauthorized IPs. You can use wildcards such as `*`. Enter one item per line.

6. For **IP Range**, enter one or more allowed IPv4/IPv6 addresses or CIDR ranges, one per line. Only these IP addresses and ranges will be able to access the resources you entered in **URLs**.

7. (Optional) If you are creating a Zone Lockdown rule that overlaps with an existing rule, expand **Advanced Options** and enter a priority for the rule in **Priority**. The lower the number, the higher the priority. Higher priority rules take precedence.

8. Select **Save and Deploy lockdown rule**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Issue a `POST` request for the [Create a Zone Lockdown rule](/api/operations/zone-lockdown-create-a-zone-lockdown-rule) operation.

For example:

```bash
$ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/lockdowns" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "description": "Block all traffic to staging and wiki unless it comes from HQ or branch offices",
  "urls": [
    "staging.example.com/*",
    "example.com/wiki/*"
  ],
  "configurations": [
    {
      "target": "ip_range",
      "value": "192.0.2.0/24"
    },
    {
      "target": "ip_range",
      "value": "2001:DB8::/64"
    },
    {
      "target": "ip",
      "value": "203.0.133.1"
    }
  ]
}'
```

{{</tab>}}
{{</tabs>}}

### Example rule

The following example rule will only allow visitors connecting from a company’s headquarters or branch offices to access the staging environment and the wiki:

* Name:

    ```txt
    Block all traffic to staging and wiki unless it comes from HQ or branch offices
    ```

* URLs:

    ```txt
    staging.example.com/*
    example.com/wiki/*
    ```

* IP Range:

    ```txt
    192.0.2.0/24
    2001:DB8::/64
    203.0.133.1
    ```

This example would not protect an internal wiki located on a different directory path such as `example.com/internal/wiki`.

## Access denied example

A visitor from an unauthorized IP will get the following error when there is a match for a Zone Lockdown rule:

![Example of Error 1106 (access denied) received by a user accessing the zone from an unauthorized IP address](/waf/static/tools/zone-lockdown-rule-error-1106-access-denied.png)

---

## Related resources

- [Secure your application](/learning-paths/application-security/)
- [User Agent Blocking](/waf/tools/user-agent-blocking/)
- [Allow Health Checks to bypass Zone Lockdown](/health-checks/how-to/zone-lockdown/)