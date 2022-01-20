---
order: 3
pcx-content-type: how-to
---

# Create a trigger

Triggers are a set of conditions you can use to determine if and when Cloudflare Zaraz should send events to third-party tools. In most cases, your objective will be to capture specific site actions that are relevant to your business. A trigger will usually be based on an action the end user has taken on your website. That action will then be passed to Cloudflare Zaraz using the Events API or the `dataLayer`. For example, when a user clicks a button, you can use the Event API to track this activity and use it as a trigger to send events to specific tools.

For most tools, the trigger will be a simple **page view** event type, for which Cloudflare Zaraz offers a `Pageview` preset configuration. If this is the case for the tool you are choosing, you do not need to do anything else. For example, with the Facebook Pixel tool you only need to enter your account ID and access token, and Zaraz will configure the event for you.

To create a new, custom trigger:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. In **Triggers**, select **Create trigger**. 

1. Enter a descriptive name for the trigger.

1. In **Match Rule**, define the condition that will activate this trigger. 

    1. In **Variable name**, input the variable you want as the trigger. For example, `{{ client.__zarazTrack }}` is the name of an event a user sends using `zaraz.track()`. Refer to [Zaraz event and system properties](/properties-reference) for a list of event and system variables you can use as triggers. 

    1. In the drop-down menu, choose from a list of operators, such as _Contains_, _Equals_, _Starts with_, among others.

    1. In **Match string** input the string that completes the rule. For example, if you were tracking purchases, you would input `purchase`.

    The following is an example of a complete rule:

    <TableWrap>

    | Variable name | Match operation | Match string |
    | ------------- | --------------- | ------------ |
    | `{{ client.__zarazTrack }}` | _Contains_ | `purchase` |

    </TableWrap>

1. Click **Save**. 

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers** and which tools use it. You can also **Edit** or **Delete** your trigger.

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