---
pcx_content_type: how-to
title: Enable per-prefix thresholds
---

# Enable per-prefix thresholds with prefix auto advertisement

Use Flow-based monitoring to configure custom thresholds for specific prefixes and CIDRs.

The system uses the concept of rules, and each rule consists of a group of prefixes. All prefixes inside a rule are evaluated as a whole, and you should set up a rule if you want the prefixes' aggregated traffic to trigger an alert or advertisement. For thresholds on singular prefixes or IPs, you can create an individual rule with one prefix and the desired threshold.

## Example 

For a rule with two Prefix CIDRs and a `packet_threshold` of `10000` as shown below, the rule will be flagged if the joint packet traffic of `192.168.0.0/24` and `172.118.0.0/24` is greater than `10000`. This also means that Cloudflare attempts to auto advertise both CIDRs in case the flag is turned on.

```txt
"rules":[
         "name": "Too many packets",
         "prefixes": ["192.168.0.0/24", "172.118.0.0/24"],
         "packet_threshold": 10000,
         "automatic_advertisement": true,
         "duration": "1m0s",
        ]
```

For more granular thresholds, create a more focused rule as shown below.

```txt
"rules":[
         "name": "Too many packets",
         "prefixes": ["172.118.0.0/24"],
         "packet_threshold": 1000,
         "automatic_advertisement": true,
         "duration": "1m0s",
        ]
```

## Auto advertisement for prefixes inside a flagged rule

To enable an auto advertisement flag for each created rule, contact your account team. Auto advertisement allows Magic Transit customers to automatically advertise all prefixes inside a rule whenever it is flagged by an incoming attack.

## Notifications

Webhook, Pagerduty, and Email notifications are sent following an auto-advertisement attempt for all prefixes inside the flagged rule.

You will receive the status of the advertisement for each prefix with the following available statuses:

- **Advertised** - The prefix was successfully advertised.
- **Already Advertised** - The prefix was advertised prior to the auto advertisement attempt.
- **Delayed** - The prefix cannot currently be advertised but will attempt advertisement. After the prefix can be advertised, a new notification is sent with the updated status.
- **Locked** - The prefix is locked and cannot be advertised.
- **Could not Advertise** - Cloudflare was unable to advertise the prefix. This status can occur for multiple reasons, but usually occurs when you are not allowed to advertise a prefix.
- **Error** - A general error occurred during prefix advertisement.
