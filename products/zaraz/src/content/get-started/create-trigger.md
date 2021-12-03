---
order: 3
pcx-content-type: how-to
---

# Create a trigger

Triggers are a set of conditions you can use to determine if and when Zaraz should send events to third-party tools. In most cases, your objective will be to capture specific site actions that are relevant to your business. In this case, a trigger will usually be based on an action the end-user has taken on your website. That action will then be passed to Zaraz using the Events API, the `dataLayer`, or the `zarazData` object. For example, when a user clicks a button, you can use the Event API to track this activity and use it as a trigger to send events to specific tools.

In order to create a new trigger:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.

1. Go to **Zaraz**.

1. In **Triggers**, select **Create trigger**.

1. Give the trigger a name. This name will be used in the Zaraz dashboard and should be descriptive.

1. In **Match Rules** create the condition that activates this trigger.

    1. In **Variable name** input the variable you want as the trigger. For example, `{{ client.__zarazTrack }}` is the name of an event a user sends using `zarazTrack`. Refer to the [Accessing User Properties](/user-properties) table for a list of variables you can use as triggers.

    1. In the dropdown menu, choose from a list of actions, such as _Contains_, _Equals_, _Starts with_, among others.

    1. In **Match string** input the string that completes the rule. For example, if you were tracking purchases, you would input `purchase`.

    The following is an example of a complete rule:

    ```txt
    {{ client.__zarazTrack }}` Contains `signup_success 2`
    ```

1. Click **Save**. 

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers**. You can also see where your trigger is used, and click the trigger to edit it.