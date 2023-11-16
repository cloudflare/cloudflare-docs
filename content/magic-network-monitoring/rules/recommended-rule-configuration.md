---
title: Recommended rule configuration
pcx_content_type: how-to
weight: 1
---

# Recommended rule configuration

You can create [Magic Network Monitoring rules](/magic-network-monitoring/rules/) to monitor the traffic volume of your network, for a set of IP addresses and/or IP {{<glossary-tooltip term_id="prefix">}}prefixes{{</glossary-tooltip>}}. The traffic volume threshold for these rules is also set by you. If the traffic volume threshold is crossed, Magic Network Monitoring will send an alert via email, webhook, or PagerDuty.

Follow the guidelines outlined in this page to create appropriate Magic Network Monitoring rules and set accurate rule thresholds.

## Rule IP prefixes

Cloudflare recommends that customers start by creating one Magic Network Monitoring rule for each public `/24` IP prefix within their network. It is helpful to include the range of the `/24` IP prefix to make it easier to find and filter for the rule in Magic Network Monitoring analytics.

As you become more familiar with the traffic patterns across each IP prefix, we encourage you to create more complex rules with IP prefixes that are smaller or larger than a `/24` prefix depending on your needs. You can also combine and monitor multiple IP prefixes within the same rule.

## Rule threshold

Follow the steps below to configure appropriate rule thresholds.

### Initial rule configuration

When you initially configure Magic Network Monitoring, you may not know the typical traffic volume patterns across each of your IP prefixes. Cloudflare recommends that you set a high rule threshold of either 10 Gbps (gigabits per second) or 10 Mpps (million packets per second) that is unlikely to be crossed during initial configuration.

This will allow you to collect initial information about the typical traffic volume for a Magic Network Monitoring rule without receiving any alerts. After you have collected and analyzed the historical traffic data for an Magic Network Monitoring rule, the threshold should be adjusted to an appropriate value.

Threshold type | Recommended rule threshold to collect initial data
---            | ---
Bits           | 10 Gpbs (10,000,000,000 bits per second)
Packets        | 10 Mpps (10,000,000 packets per second)

### Setting the appropriate threshold

After creating the initial set of rules to monitor your network traffic, you should collect 14-30 days of historical traffic volume data for each rule.

Cloudflare recommends that new customers set a rule threshold that is two times larger than the maximum non-attack traffic observed for a one minute time interval within an Magic Network Monitoring rule.

To find the maximum non-attack traffic for a one minute time interval over the past 14-30 days, you can filter for the specific rule you want to analyze. To do that:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. Select **Add filter**.
4. In **New filter**, use the drop-down menus to create the following filter:
    Field           | Operator | Rule name
    ---             |---       | ---
    _Monitoring Rule_ | _equals_   | `<RULE_NAME>`

Once the rule filter is selected in Magic Network Monitoring Analytics, you can check the historical traffic volume data for the rule over the selected time period. We recommend that you check your historical traffic volume data in increments of seven days since that is the largest window that shows one hour time intervals. You can select a custom seven day time range in Magic Network Monitoring Analytics by going to the top right corner of Magic Network Monitoring analytics, opening the time window dropdown, and selecting **Custom range**.

![How to choose a custom time range.](/images/magic-network-monitoring/custom-time-range.png)

You should review the selected seven day time range and identify the largest traffic volume peak. Then, click and drag on the largest traffic peak to view the traffic volume data for a smaller time window. Continue until you are viewing the traffic volume data in one minute time intervals. 

Record the largest traffic volume peak for the rule in a spreadsheet, then repeat this process across 14-30 days of data. The rule threshold should be updated to be two times the largest traffic spike for a one minute time interval across 14-30 days of data. You should go through this process to set the threshold for each Magic Network Monitoring rule.

## Rule duration

Your IP prefixes may experience inconsistent spikes in traffic volume across one minute time intervals. We recommend that you set a rule duration of 120 seconds to reduce false positive alerts on short-term non-malicious traffic spikes. A rule duration of 120 seconds means that the traffic volume must be above the rule threshold for 120 seconds before an alert is fired.

## Adjusting rules over time

After you update your first set of rule thresholds based on historical traffic data, it will be important to monitor for Magic Network Monitoring alerts to check if the rule thresholds are appropriate. Customers are encouraged to adjust the rule thresholds and the duration over time to find the ideal alert sensitivity level for their specific network environment.