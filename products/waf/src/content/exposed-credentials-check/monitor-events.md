---
order: 5
---

# Monitor exposed credentials events

The Firewall **Activity log** contains entries for requests with exposed credentials identified by rules with the _Log_ action.

Check for exposed credentials events in the Firewall Analytics dashboard (**Overview** tab of the **Firewall** app), filtering by a specific Rule ID. For more information on filtering Firewall Events, check [Understanding Firewall Analytics](https://support.cloudflare.com/hc/articles/360024520152#1eYXCEA5ZrNHxDm9tte0Bo) in the Support KB.

<Aside type='warning' header='Important'>

Exposed credentials events are only logged after you activate the Exposed Credentials Check Managed Ruleset or create a custom rule checking for exposed credentials.

The log entries will not contain the values of the exposed credentials (username, email, or password). However, if matched payload logging is enabled, the log entries will contain the values of the fields in the rule expression that triggered the rule. These values might be the values of credential fields, depending on your rule configuration.

</Aside>
