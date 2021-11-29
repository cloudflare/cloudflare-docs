---
order: 4
pcx-content-type: how-to
---

# Send Events to a third-party tool

Events are bundles of information you send to a third-party tool when a particular trigger is matched. To start using them, first create a trigger that determines the condition for which the event is sent. If you have already [set up a trigger](/get-started/create-trigger), here is how to create an event.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 
1. Go to **Zaraz**.
1. Select the third-party tool you want to send an Event to — like Facebook Pixel, or Google Analytics. 
1. Click the **Events** tab. 
1. In **Tracking Events** you can see a list of events currently sent to the tool you chose. Clicking each event shows you more details about it. To add a new event, click **Add new event**.
1. Give the event a name. This name will be used by you and your team when working in the dashboard. Depending on the tool you may need to configure additional settings.
1. In the **Firing triggers** field choose the relevant trigger you previously created. You may choose more than one trigger for your Event. When all the triggers you chose are valid, the event will be sent.
1. Click **Save**.

The new event created will appear in the third-party tool, in the **Events** tab, under **Tracking Events**.