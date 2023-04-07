---
pcx_content_type: how-to
title: Create scheduled events
weight: 4
---

# Create scheduled events

When you want to customize the behavior of a waiting room for a specific period of time — such as changing the queueing method or increasing the total active users — set up a **scheduled event**. You can do this from the dashboard or via the API.

Any properties set on the event will override the default property on the waiting room for the duration of the event.

{{<Aside type="note">}}Only some customers can support scheduled events with their waiting rooms. For more details, refer to our [Plans](/waiting-room/plans/) page.{{</Aside>}}

## Create an event from the dashboard

1.  Within your application, go to **Traffic** > **Waiting Room**.
2.  Expand a waiting room  and select **Schedule event**.
3.  Customize the details for your event: name the event, add a description (optional), and select a Start Date Time and an End Date Time.
4.  You can also enable the pre-queueing — in this case you need to define a pre-queueing time. And you can also select **Shuffle at event start** and all users in the pre-queue will be randomly admitted at event start.
5.  Select **Next**.
6.  In the **Settings** section, you can define new values for your Total active users, New users per minute, Session duration, Session Renewal, and Queueing Method. For each of these settings you also have the option to always inherit the values defined in your waiting room. With this option, if you change the settings of your base waiting room, the corresponding Event setting will update as well.

    {{<Aside type="note">}}If you choose to override the values of Total active users, you must also override the number of New users per minute, and vice versa.{{</Aside>}}

7.  Select **Next**.
8.  In the customization section, you can select Always inherit your waiting room’s template (default) or you can override it with a Custom Event Template. In this case, you need to import your own template. M​ake sure to preview the result before continuing.
9.  Select **Next** and review your Event details and settings.
10.  Select **Save**.

In your waiting room page, in the **Next Event** column you can visualize the date of the next event scheduled. This columns will read `N/A` in case there is no event scheduled for that waiting room. You can always suspend, edit or delete your event.

{{<Aside type="note">}}You have a limit of five events per waiting room.{{</Aside>}}

## Create an event via API

To create an event, make a [POST request](/api/operations/waiting-room-create-event) including [required and optional parameters](#properties). Any properties set on the event will override the default property on the waiting room for the duration of the event.

If you are using a [custom template](/waiting-room/how-to/customize-waiting-room/#custom-waiting-room/), you may want to add [relevant variables](/api/operations/waiting-room-update-waiting-room) to your template (listed under the `json_response_enabled` parameter).

{{<Aside type="note">}}

If you need to create overlapping events, use different waiting rooms.

{{</Aside>}}

### Parameters

Though most parameters are identical to those in a regular waiting room, there are a few unique to creating an event. For a complete list of event settings, please refer to [Create an Event](/api/operations/waiting-room-create-event).

- `name` (required): Unique name with alphanumeric characters, hyphens, and underscores.
- `event_start_time` (required): ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. Must occur at least 1 minute before `event_end_time`.
- `event_end_time` (required): ISO 8601 timestamp that marks the end of the event.
- `shuffle_at_event_start`: If **true** and `prequeue_start_time` is not null, users in the prequeue will be shuffled randomly at the `event_start_time`. Commonly used to ensure fairness if your event is using a [**FIFO** queueing method](#set-up-a-lottery).
- `prequeue_start_time`: ISO 8601 timestamp that marks when to begin queueing all users before the event starts. Must occur at least **5 minutes before** `event_start_time`.
- `description`: A text description providing more detail about the event.
- `suspended`: If **true**, the event is ignored and traffic is handled based on the waiting room's normal configuration.

### Queueing methods

When setting up events, you may want to also adjust the default queueing methods for your waiting room.

Set the waiting room's queueing method to [**Passthrough**](/waiting-room/reference/queueing-methods/#passthrough) when you want to allow traffic normally, but then restrict traffic during a scheduled event.

Set the waiting room's queueing method to [**Reject**](/waiting-room/reference/queueing-methods/#reject) when you want to block all traffic normally, but then allow traffic during special events like signups or ticket sales.

## Set up a "lottery"

Set up a "lottery" system to reward all users who enter into the queue prior to your event start time.

Users who reach your application **during the prequeue period** are [randomly assigned](/waiting-room/reference/queueing-methods/#random) a place in line when the event starts. If the event uses [FIFO ordering](/waiting-room/reference/queueing-methods/#first-in-first-out-fifo), users who reach your application **after the prequeue period** are assigned places after users from the prequeue.

To set up a "lottery", include the [following parameters](#properties) in your API request:

- `prequeue_start_time`
- `shuffle_at_event_start`

## Preview an event configuration

Since some properties set on an event will override the default property of a waiting room for the duration of an event, you should use the API to [preview an event configuration](/api/operations/waiting-room-preview-active-event-details) before it begins.

This command shows you the event's configuration as if it were active, meaning that inherited fields from the waiting room will display their current values.

## Edit an event

To edit an event, use a [PATCH request](/api/operations/waiting-room-patch-event).

## Disable events

You can disable an event by setting its `suspended` parameter to `true`.

Additionally, events will not become active if a waiting room itself is **Disabled**.

## Other API commands

| Function                                                                      | Command  |
| ----------------------------------------------------------------------------- | -------- |
| [Get event details](/api/operations/waiting-room-event-details)   | `GET`    |
| [List scheduled events](/api/operations/waiting-room-list-events) | `GET`    |
| [Delete event](/api/operations/waiting-room-delete-event)         | `DELETE` |
