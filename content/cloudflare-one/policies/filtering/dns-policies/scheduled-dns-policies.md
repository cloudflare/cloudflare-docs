---
pcx_content_type: reference
title: Scheduled DNS policies
weight: 3
---

# Scheduled DNS policies

Cloudflare Gateway allows you to configure any DNS policy to activate or deactivate on a regular time interval. 

By default, Gateway policies are unscheduled and apply at all times. You can use the [Gateway Rules API](https://developers.cloudflare.com/api/operations/zero-trust-gateway-rules-create-zero-trust-gateway-rule) to create a scheduled DNS policy or add a schedule to an existing policy. To schedule a policy, send a [`POST`](https://developers.cloudflare.com/api/operations/zero-trust-gateway-rules-create-zero-trust-gateway-rule) or [`PUT`](https://developers.cloudflare.com/api/operations/zero-trust-gateway-rules-update-zero-trust-gateway-rule) request with the `schedule` parameter set to your desired days of the week, times of day, and time zone. The schedule will appear in the Zero Trust dashboard under **Gateway** > **Policies** > **DNS** when you expand the row for the policy.

## Example: Fixed time zone

The following command creates a DNS policy to block `facebook.com` only on weekdays from 8:00 AM - 12:30 PM and 1:30 PM - 5:00 PM in the Chicago, USA time zone.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/gateway/rules" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <API_KEY>" \
     -H "Content-Type: application/json" \
     --data '{
        "name": "office-no-facebook-policy",
        "action": "block",
        "traffic": "dns.fqdn == \"facebook.com\"",
        "enabled": true,
        "schedule": {
                "time_zone": "America/Chicago",
                "mon":  "08:00-12:30,13:30-17:00",
                "tue":  "08:00-12:30,13:30-17:00",
                "wed":  "08:00-12:30,13:30-17:00",
                "thu":  "08:00-12:30,13:30-17:00",
                "fri":  "08:00-12:30,13:30-17:00"
        }
    }'
```

Refer to [this table](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) for a list of all time zones.

## Example: User's time zone

The following command creates a DNS policy to block `clockin.com` only on weekends, in the time zone where the user is currently located.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/gateway/rules" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <API_KEY>" \
     -H "Content-Type: application/json" \
     --data '{
        "name": "clock-in-policy",
        "action": "block",
        "traffic": "dns.fqdn == \"clockin.com\"",
        "enabled": true,
        "schedule": {
            "sat":  "00:00-24:00",
            "sun":  "00:00-24:00"
        }
    }'
```

The user's time zone is inferred from their source IP address. If Gateway is unable to determine the time zone from the IP, we will fall back to the time zone of the data center where the query was received.

{{<Aside type="note">}}
Gateway will not change the policy's `enabled` status when inside or outside of the time period specified. When enabled, Gateway activates or deactivates the policy according to its schedule. When disabled, the policy is always deactivated.
{{</Aside>}}
