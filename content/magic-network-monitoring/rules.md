---
title: Rules
pcx_content_type: how-to
weight: 4
---

# Rules

Magic Network Monitoring rules will allow you to monitor the traffic volume destined for IP addresses or IP prefixes on your network. You can also receive alerts if the volume of traffic arriving at specific destinations exceeds a defined threshold.

## Create rules

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. Select **Configure Magic Network Monitoring** > **Add new rule**.
4. Create your rule according to your needs. Refer to [Rule fields](#rule-fields) for more information on what each field does.
        {{<Aside type="note" header="Automatically enable Magic Transit">}}If you are an Enterprise customer using [Magic Transit On Demand](/magic-transit/on-demand), enable **Auto-Advertisement** if you want to automatically activate Magic Transit when a certain threshold is exceeded.{{</Aside>}}
5. Select **Create a new rule** when you are finished.

## Edit or delete rules

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. Select **Configure Magic Network Monitoring**.
4. Find the rule you want to edit.
5. Select **Delete** if you want to delete that rule, or **Edit** to edit it.
6. Edit the appropriate fields.
7. Select **Save** when you are finished.


## Rule fields

| Field <div style="width: 100px"> | Description |
|-------| ------------|
| **Rule name** | Must be unique and cannot contain spaces. Supports characters `A-Z`, `a-z`, `0-9`, underscore (`_`), dash (`-`), period (`.`), and tilde (`~`).  Max 256 characters. |
| **Rule threshold type** | Can be defined in either bits per second or packets per second. |
| **Rule threshold** | The number of bits per second or packets per second for the rule alert. When this value is exceeded for the rule duration, an alert notification is sent. Minimum of `1` and no maximum. |
| **Rule duration** | The amount of time in seconds the rule threshold must exceed to send an alert notification. The minimum is 60 seconds and maximum is six hours (21,600 seconds).|
| **Auto-advertisement** | If you are a [Magic Transit On Demand](/magic-transit/on-demand) customer, you can enable this feature to automatically enable Magic Transit if the rule alert is triggered. |
| **Rule IP prefix** | The IP prefix associated with the rule for monitoring traffic volume. Must be a CIDR range such as `160.168.0.1/24`. Max is 5,000 unique CIDR entries. |

## Enable per-prefix thresholds with the API

You can also use the API to configure custom thresholds for specific prefixes.

The system uses the concept of rules, and each rule consists of a group of prefixes. All prefixes inside a rule are evaluated as a whole, and you should set up a rule if you want the prefixes' aggregated traffic to trigger an alert or advertisement. For thresholds on singular prefixes or IPs, you can create an individual rule with one prefix and the desired threshold.

### Example

```bash
"rules":[
        "name": "Too many packets",
        "prefixes": ["192.168.0.0/24", "172.118.0.0/24"],
        "packet_threshold": 10000,
        "automatic_advertisement": true,
        "duration": "1m0s",
       ]
```

For more granular thresholds, create a more focused rule as shown below.

```bash
"rules":[
        "name": "Too many packets",
        "prefixes": ["172.118.0.0/24"],
        "packet_threshold": 1000,
        "automatic_advertisement": true,
        "duration": "1m0s",
       ]
```

Refer to the [API documentation](https://developers.cloudflare.com/api/operations/magic-network-monitoring-rules-list-rules) for more information.