---
order: 3
pcx-content-type: how-to
---

# Create scheduled events

When you want to customize the behavior of a waiting room for a specific period of time — such as changing the queueing method or increasing the total active users — set up a **scheduled event**.

Any properties set on the event will override the default property on the waiting room for the duration of the event.

<Aside type="note">

Only some customers can support scheduled events with their waiting rooms. For more details, see our <a href="/plans">Plans</a> page.

</Aside>

## Create an event

At the moment, you can only create an event using the API.

To create an event, make a [POST request](https://api.cloudflare.com/#waiting-room-create-event) including [required and optional parameters](#properties). Any properties set on the event will override the default property on the waiting room for the duration of the event.

If you are using a [custom template](../customize-waiting-room#custom-waiting-room), you may want to add [relevant variables](https://api.cloudflare.com/#waiting-room-update-waiting-room) to your template (listed under the `json_response_enabled` parameter).

<Aside type="note">

If you need to create overlapping events, use different waiting rooms.

</Aside>

### Properties

Though most properties are identical to those on a [regular waiting room](https://api.cloudflare.com/#waiting-room-properties), there are a few unique to [creating an event](https://api.cloudflare.com/#waiting-room-create-event):

*   `name` (required): Unique name with alphanumeric characters, hyphens, and underscores.
*   `event_start_time` (required): ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. Must occur at least 1 minute before `event_end_time`.
*   `event_end_time` (required): ISO 8601 timestamp that marks the end of the event.
*   `shuffle_at_event_start`: If **true** and `prequeue_start_time` is not null, users in the prequeue will be shuffled randomly at the `event_start_time`. Commonly used to ensure fairness if your event is using a [**FIFO** queueing method](#set-up-a-lottery).
*   `prequeue_start_time`: ISO 8601 timestamp that marks when to begin queueing all users before the event starts. Must occur at least **5 minutes before** `event_start_time`.
*   `description`: A text description providing more detail about the event.
*   `suspended`: If **true**, the event is ignored and traffic is handled based on the waiting room's normal configuration.

### Queueing methods

When setting up events, you may want to also adjust the default queueing methods for your waiting room.

Set the waiting room's queueing method to [**Passthrough**](/reference/queueing-methods#passthrough) when you want to allow traffic normally, but then restrict traffic during a scheduled event.

Set the waiting room's queueing method to [**Reject**](/reference/queueing-methods#reject) when you want to block all traffic normally, but then allow traffic during special events like signups or ticket sales.

## Set up a "lottery"

Set up a "lottery" system to reward all users who enter into the queue prior to your event start time.

Users who reach your application **during the prequeue period** are [randomly assigned](/reference/queueing-methods#random) a place in line when the event starts. If the event uses [FIFO ordering](/reference/queueing-methods#first-in-first-out-fifo), users who reach your application **after the prequeue period** are assigned places after users from the prequeue.

To set up a "lottery", include the [following parameters](#properties) in your API request:

*   `prequeue_start_time`
*   `shuffle_at_event_start`

## Preview an event configuration

Since some properties set on an event will override the default property of a waiting room for the duration of an event, you should use the API to [preview an event configuration](https://api.cloudflare.com/#waiting-room-preview-active-event-details) before it begins.

This command shows you the event's configuration as if it were active, meaning that inherited fields from the waiting room will display their current values.

## Edit an event

To edit an event, use a [PATCH request](https://api.cloudflare.com/#waiting-room-patch-event).

## Disable events

You can disable an event by setting its `suspended` parameter to `true`.

Additionally, events will not become active if a waiting room itself is **Disabled**.

## Other API commands

Function | Command
\---------|---------
[Get event details](https://api.cloudflare.com/#waiting-room-event-details) | `GET`
[List scheduled events](https://api.cloudflare.com/#waiting-room-list-events) | `GET`
[Delete event](https://api.cloudflare.com/#waiting-room-delete-event) | `DELETE`
