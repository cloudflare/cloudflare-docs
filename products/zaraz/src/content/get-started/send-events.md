---
order: 4
pcx-content-type: how-to
---

# Send Events to a third-party tool

Events are bundles of information Zaraz sends to a third-party tool when a particular trigger is matched. To start using them, first create a trigger that determines the condition for which the event is sent. If you have already [set up a trigger](/create-trigger), follow these steps to create an event.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. Under **Third-party tools**, select the third-party tool you want to send an Event to — for example, Facebook Pixel or Google Analytics.  

1. Click the **Events** tab. 

1. Under **Tracking Events**, you can find a list of events currently sent to the tool you chose. Clicking the links in each Event shows you more details about the conditions associated with it. To add a new Event, click **Create event**.

1. Give the event a descriptive name. Depending on the tool, you may need to configure additional settings.

1. In the **Firing triggers** field, choose the relevant trigger you [previously created](/get-started/create-trigger). You may choose more than one trigger for your Event. If you choose more than one trigger, the event will be sent to the third-party tool only when all the selected triggers are matched.

1. Depending on the tool, you may also choose an **Event type** — either **Page View** or **Event**. The options you can fill out in **Event** will depend on the tool you are configuring.

1. Click **Save**.

The new event you created will appear in the third-party tool, in the **Events** tab, under **Tracking Events**. 