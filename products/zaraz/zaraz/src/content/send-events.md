---
pcx-content-type: how-to
---

# Send Events to a third-party tool

Events are bundles of information you send to a third-party tool. To start using them, you first create a trigger that determines the condition for which the event is sent. If you have already [set up a trigger](/create-trigger), here is how to create an event.

1. Log in to the Cloudflare dashboard and select your account. Go to Zaraz.
1. In **Third-parties**, choose the tool you wish to send an event to - like Facebook Pixel, or Google Analytics.
1. Click the **Events** tab. 
1. Under **Tracking Events** you can see a list of events currently sent to the tool you chose. Clicking each event shows you more details about it. To add a new event, click **Add event**.
1. Give the event a name. This name will be used by you and your team when working in the dashboard.
1. Click in the **Firing triggers** field and choose the relevant trigger from the dropdown selection. You may choose more than one trigger. When all the triggers you chose are valid, the event will be sent.
1. Depending on the tool you are configuring, additional settings may need to be configured.
1. When you are finished, click **Add Event**.

The new event created will appear in **Tracking Events**. The page also shows you the triggering rules you added and exactly what data you are sending to the third-party end-point you have selected. 

From here, you can also add **Blocking Triggers** to the event. When the conditions set in Blocking triggers are met, the event is not fired.