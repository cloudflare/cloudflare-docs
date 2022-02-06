---
order: 3
pcx-content-type: how-to
---

# Create a trigger

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. In **Triggers**, select **Create trigger**. 

1. In **Trigger Name** enter a descriptive name for your trigger.

1. In **Rule type**, choose from the actions available in the drop-down menu to start building your rule. Refer to [Triggers and rules](/reference/triggers) for more information on what each rule type means.

1. In **Variable name**, input the variable you want as the trigger. For example, use the `{{ client.__zarazTrack }}` variable if you are [using `zaraz.track()` in your website](/web-api/zaraz-track).

1. Use the **Match operation** drop-down list to choose a comparison operator. For an expression to match, the value in **Variable name** and **Match string** must satisfy the comparison operator.

1. In **Match string**, input the string that completes the rule.

1. You can add more than one rule to your trigger. Click **Add rule** and repeat steps 5-8 to add another set of rules and conditions. If you add more than one rule, your trigger will only be valid when all conditions are true.

1. Click **Save**. 

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers**, as well as which tools use it. You can also **Edit** or **Delete** your trigger.

## Create a Blocking Trigger

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

Blocking Triggers are useful if you wish to block specific events, or even specific tools from firing, while keeping others active. If you wish to turn off Zaraz entirely on specific pages/domains/subdomains, we recommend using [Page Rules to block Zaraz](/advanced/block-zaraz). 

</Aside>