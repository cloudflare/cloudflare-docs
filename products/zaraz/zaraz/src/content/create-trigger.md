---
pcx-content-type: how-to
---

# Create a trigger

Triggers are a set of conditions you can use to determine if and when Zaraz should send events to third-party tools. In most cases, your objetive will be to capture specific site actions that are relevant to your business. In this case, a trigger will usually be based on an action the end-user has taken on your website. That action will then be passed Zaraz using the Events API, the `dataLayer`, or the `zarazData` object. For example, when a user clicks a button, you can use the Event API to track this activity and use it as a trigger to send events to specific tools.

In order to set a new trigger, follow the steps below.

1. Log in to the Cloudflare dashboard and select your account. Go to Zaraz.
1. In the Triggers section, click the plus sign. The **Create Trigger** page will open. 
1. Give the trigger a name and a description. This name will be used in the Zaraz dashboard and should be descriptive.
1. Click **Add new load rule** to set up the rules for this trigger. 
1. Choose between *Load rule*, *Browse rule* and *Exclude rule*. When the rules you choose are met, Zaraz sends the trigger to the event. *Exclude rule* are conditions that prevent the trigger from firing. For example, if you wish to block this trigger from loading on a Chrome browser, you can add it as an *Exclude rule*.
1. Click **Save** to save the new rule.