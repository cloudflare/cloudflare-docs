---
order: 4
pcx-content-type: how-to
---

# Send Events to a third-party tool

Events are bundles of information you send to a third-party tool when a particular trigger is matched. To start using them, first create a trigger that determines the condition for which the event is sent. If you have already [set up a trigger](/create-trigger), here is how to create an event.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. Under **Third-party tools** select the third-party tool you want to send an Event to — like Facebook Pixel, or Google Analytics.  

1. Click the **Events** tab. 

1. In **Tracking Events** you can see a list of events currently sent to the tool you chose. Clicking the links in each event shows you more details about the conditions associated with the Event. To add a new event, click **Create event**.

1. Give the event a descriptive name. Depending on the tool, you may need to configure additional settings.

1. In the **Firing triggers** field choose the relevant trigger you [previously created](/get-started/create-trigger). You may choose more than one trigger for your Event. In this case, only when all the triggers you chose are valid will the event be sent to the third-party tool.

1. Depending on the tool, you may also see **Event type**, which lets you choose between **Page View** and **Event**. The options you can fill out in **Event** will depend on the tool you are configuring.

1. Click **Save**.

The new event created will appear in the third-party tool, in the **Events** tab, under **Tracking Events**. 