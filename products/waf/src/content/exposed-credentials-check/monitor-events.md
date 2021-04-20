---
order: 35
---

# Monitor exposed credentials events

The Firewall Activity log contains entries for the requests with exposed credentials identified by rules configured with the Log action.

Check for these events in the Firewall Analytics dashboard (**Overview** tab of the **Firewall** app), filtering by a specific Rule ID. For more information on filtering Firewall Events, check [Understanding Firewall Analytics](https://support.cloudflare.com/hc/articles/360024520152#1eYXCEA5ZrNHxDm9tte0Bo) in the Support KB.

<Aside type='warning' header='important'>

These events are only logged after you activate the Exposed Credentials Managed Ruleset or create a custom rule checking for exposed credentials.

The log entries will not contain the values of the exposed credentials (username, email, or password). However, log entries will contain the value of the fields in the rule expression that triggered the rule. These might be values of fields containing credentials, depending on your rule configuration.

</Aside>
