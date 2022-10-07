---
title: Rules
pcx_content_type: overview
weight: 4
---

# Rules

Magic Network Monitoring rules will allow you to monitor the traffic volume destined for IP addresses or IP prefixes on your network. You can also receive alerts if the volume of traffic arriving at specific destinations exceeds a defined threshold.

If you are an Enterprise customer using [Magic Transit On Demand](/magic-transit/on-demand), you can also configure Magic Network Monitoring rules to automatically activate Magic Transit if the rule’s threshold is exceeded.

You can create and edit Magic Network Monitoring rules in the [Cloudflare dashboard](https://dash.cloudflare.com/login) from **Analytics** > **Magic Monitoring** and selecting **Configure Magic Network Monitoring**.

## Rule fields

| Field | Description |
|-------| ------------|
| **Rule name** | Must be unique and cannot contain spaces. Supports characters A-Z, a-z, 0-9, underscore (`_`), dash (`-`), period (`.`), and tilde (`~`).  Max 256 characters. |
| **Rule threshold type** | Can be defined in either bits per second or packets per second. |
| **Rule threshold** | The number of bits per second or packets per second for the rule alert. When this value is exceeded for the rule duration, an alert notification is sent. Minimum of 1 and no maximum. |
| **Rule duration** | The amount of time in seconds the rule threshold must exceed to send an alert notification. The minimum is 60 seconds and maximum is 6 hours (21,600 seconds).|
| **Auto-advertisement** | If you are a Magic Transit On Demand customer, you can enable this feature to automatically enable Magic Transit if the rule alert is triggered. |
| **Rule IP prefix** | The IP prefix associated with the rule for monitoring traffic volume. Must be a CIDR range such as `160.168.0.1/24`. Max is 5000 unique CIDR entries. |

## Enable per-prefix thresholds

You can use Magic Network Monitoring to configure custom thresholds for specific prefixes and CIDRs.

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

