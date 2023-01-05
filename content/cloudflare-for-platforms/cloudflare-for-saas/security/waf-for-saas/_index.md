---
pcx_content_type: overview
title: WAF for SaaS
weight: 1
---

# WAF for SaaS

[Web Application Firewall (WAF)](/waf/) allows you to create additional security measures through Cloudflare. As a SaaS provider, you can link firewall rules, rate limiting rules, and managed rules to your custom hostnames. This provides more control to keep your domains safe from malicious traffic.

As a SaaS provider, you may want to apply different security measures to different custom hostnames. With WAF for SaaS, you can create multiple WAF configuration that you can apply to different sets of custom hostnames. This added flexibility and security leads to optimal protection across the domains of your end customers.

---

## Prerequisites

Before you can use WAF for SaaS, you need to create a custom hostname. Review [Get started with Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) if you have not already done so.

You can also create a custom hostname through the API:

```json
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone:id}/custom_hostnames" \
     -H "X-Auth-Email: {email}" \
     -H "X-Auth-Key: {key}" \
     -H "Content-Type: application/json" \
        --data '{"Hostname":"example.com"}, "Ssl":{wildcard:false}}'
```

## Step 1 - Associate custom metadata to a custom hostname

To apply WAF to your custom hostname, you need to create an association between your customer’s domain and the firewall ruleset that you’d like to attach to it. Cloudflare’s product, [custom metadata](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) allows you to do this via the API. 

1. [Locate your zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/), available in the Cloudflare dashboard.

2. Locate your Authentication Key by selecting **My Profile** > **API tokens** > **Global API Key**.

3. Locate your custom hostname ID by making a ‘get’ call in the API:

```json
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames" \
     -H "X-Auth-Email: {email}" \
     -H "X-Auth-Key: {key}" \
     -H "Content-Type: application/JSON"

```

4. Plan your [custom metadata](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/). It is fully customizable. In the example below, we have chosen the tag “security_level” to which we expect to assign three values (low, medium, and high).

{{<Aside type="note">}}

One instance of low, medium, and high rules could be rate limiting. You can specify three different thresholds: low - 100 requests/minute, medium - 85 requests/minute, high - 50 requests/minute, for example. Another possibility is a Firewall Rule in which low challenges requests and high blocks them.

{{</Aside>}}

5. Make an API call in the format below using your Cloudflare email and the IDs gathered above:

```json
curl -sXPATCH "https://api.cloudflare.com/client/v4/zones/{zone:id}/custom_hostnames/{custom_hostname:id}"\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H "Content-Type: application/json"\
    -d '{
"Custom_metadata":{
"customer_id":"12345",
“security_level”: “low”
}
}'
```
This assigns custom metadata to your custom hostname so that it has a security tag associated with its ID.

## Step 2 - Trigger security products based on tags

1. Locate the custom metadata field in the Ruleset Engine where the WAF runs. This can be used to trigger different configurations of products such as [WAF](/waf/), [Firewall Rules](/firewall/), [Advanced Rate Limiting](/waf/rate-limiting-rules/), and [Transform Rules](/rules/transform/).

2. Build your rules either [through the dashboard](/firewall/cf-dashboard/create-edit-delete-rules/) or via the API. An example rate limiting rule, corresponding to “security_level” low, is shown below as an API call.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/zones/{zone:id}/rulesets/phases/http_ratelimit/entrypoint" \
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H "Content-Type: application/json"\
    -d '{

"rules": [
              {
                "action": "block",
                "ratelimit": {
                  "characteristics": [
                    "cf.colo.id",
                    "ip.src"
                  ],
                  "period": 10,
                  "requests_per_period": 2,
                  "mitigation_timeout": 60
                },
                "expression": "lookup_json_string(cf.hostname.metadata, \"security_level\") eq \"low\" and http.request.uri contains \"login\""
              }
            ]
          }}'
```

To build rules through the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and navigate to your account and website.

2. Select **Security** > **WAF**.

3. Follow the instructions on the dashboard specific to firewall rules, rate limiting rules, or managed rules, depending on your security goal.

4. Once the rule is active, you should see it under the applicable tab (firewall rules, rate limiting, or managed rules).

![Rule Active](/ssl/static/active-rule.png)
