---
order: 3
pcx-content-type: how-to
---

# Triggers

Triggers are a set of conditions you can use to determine if and when Cloudflare Zaraz should [send events to third-party tools](/get-started/send-events). In most cases, your objective will be to capture specific site actions that are relevant to your business. A trigger will usually be based on an action the end user has taken on your website, like when a user clicks a button.

These actions can be captured in a number of ways. You can use the Events API or the `dataLayer` and the Event API to send them to specific events and tools. You can also use different types of rules, instead of the Events API or `dataLayer` code in your website.

For most tools, the trigger will be a simple **page view** event type, for which Cloudflare Zaraz offers a `Pageview` preset configuration. If this is the case for the tool you are choosing, you do not need to do anything else. For example, with the Facebook Pixel tool you only need to enter your account ID and access token, and Zaraz will configure the event for you.

A complete trigger will look like this:

```txt
<trigger type> <variable name> <comparison operator> <string to match>
```

Refer to [Trigger type](#trigger-type) for more information on the types of triggers available, and [Zaraz event and system properties](/properties-reference), for more information on the variables you can use. 

## Create a trigger

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. In **Triggers**, select **Create trigger**. 

1. In **Trigger Name** enter a descriptive name for your trigger.

1. In **Trigger type**, choose from the actions available in the drop-down menu to start building your rule.

1. In **Variable name**, input the variable you want as the trigger. For example, `{{ client.__zarazTrack }}` is the name of an event a user sends using `zaraz.track().

1. Use the **Match operation** drop-down list to choose a comparison operator. For an expression to match, the value in `Variable name` and `Match string` must satisfy the comparison operator.

1. In **Match string** input the string that completes the rule.

1. To add another rule to your trigger, click **Add rule** and repeat steps 5-7 to add another set of rules and conditions. If you add more than one rule, your trigger will only be valid when _all_ conditions are true.

1. Click **Save**. 

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers** and which tools use it. You can also **Edit** or **Delete** your trigger.

## Trigger type

The trigger type determines the kind of events Zaraz should listen for in your web page. Zaraz supports different trigger types which allow for the creation of complex rules. 

* **Page rule**: Zaraz tracks the variable you input in **Variable name**. For a complete list of supported variables, refer to [Zaraz event and system properties](/properties-reference).
* **Click listener**: Tracks clicks in a web page. You can setup click listeners using CSS selectors or XPath expressions.
* Form submission: Tracks form submissions using CSS selectors. Click the **Validate** toggle button to only fire the trigger when the form has no validation errors.
* Timer: Set up an interval of time in milliseconds before activating the trigger in **Interval**. In **Limit** specify the number of times the trigger will fire before stopping.

## Blocking Triggers

You may need to block one or more events in a tool from firing when a specific condition arises. For these cases, you can set Blocking Triggers.

When you add Blocking Triggers to an event, the event will not fire when the conditions you specify are true. If the tool has more than one event, other events without Blocking Triggers will still work for that specific tool.

To block a tool entirely, you have to configure Blocking Triggers on every event that belongs to that tool. Note that when you use Blocking Triggers, Zaraz will still load on the page.

To create Blocking Triggers, start by [creating the trigger](#create-a-trigger) with the conditions you want to use to block an event. Then:

1. Go to [Zaraz's main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).
1. Locate the third-party tool with the event you want to block and click **Edit**.
1. In **Event Name**, click the event you want to block.
1. In **Blocking Triggers**, use the dropdown menu to add a trigger to block the event.
1. Click **Save**.

<Aside type='note'>

Blocking Triggers are useful if you wish to block specific events, or even specific tools from firing, while keeping others active. If you wish to turn off Zaraz entirely on specific pages/domains/subdomains, we recommend using [Page Rules to block Zaraz](/get-started/block-zaraz). 

</Aside>