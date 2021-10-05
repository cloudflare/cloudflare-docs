---
order:
pcx-content-type: how-to
---

# Create scheduled events

When you want to customize the behavior of a waiting room — updating the queuing method, total active users, or any [other property](/reference/configuration-settings) — for a specific period of time, set up a scheduled event.

Any properties set on the event will override the default property on the waiting room for the duration of the event.

<Aside type="note">

Only certain customers can support scheduled events with their waiting rooms. For more details, see our <a href="/plans">Plans</a> page.

</Aside>

## Create an event

At the moment, you can only create an event [using the API](https://api.cloudflare.com/#waiting-room-create-event).

Any properties set on the event will override the default property on the waiting room for the duration of the event.

<Aside type="note">

A waiting room cannot support overlapping events.

</Aside>

### Unique properties

Though most properties are identical to those on a [regular waiting room](https://api.cloudflare.com/#waiting-room-properties), there are a few unique to [creating an event](https://api.cloudflare.com/#waiting-room-create-event):

- `event_start_time` (required): ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. Must occur at least 1 minute before `event_end_time`.
- `event_end_time` (required): ISO 8601 timestamp that marks the end of the event.
- `shuffle_at_event_start`: If `true` and `prequeue_start_time` is not null, users in the prequeue will be shuffled randomly at the `event_start_time`. Commonly used to ensure fairness if your event is using a [**FIFO** queueing method](/reference/queueing-methods#first-in-first-out-fifo).
- `prequeue_start_time`: ISO 8601 timestamp that marks when to begin queueing all users before the event starts. Must occur at least 5 minutes before `event_start_time`.
- `suspended`: If `true`, the event is ignored and traffic is handled based on the regular configuration.

## Preview an event configuration

Since properties set on an event will override the default property of a waiting room for the duration of an event, you can also use the API to [preview an event configuration](https://api.cloudflare.com/#waiting-room-preview-active-event-details).

This command shows you the event's configuration as if it were active, meaning that inherited fields from the waiting room will display as their current values.

Use this command to review your event before it reaches its **Start Time**.

## Edit an event

To edit an event, use a [PATCH request](https://api.cloudflare.com/#waiting-room-patch-event).

By default, you cannot change the [**queueing method**](/reference/queueing-methods) within five minutes of the `prequeue_start_time` or the `event_start_time`. You have to update these values first and then update the queueing method.

## Other API commands

Function | Command 
---------|---------
[Get event details](https://api.cloudflare.com/#waiting-room-event-details) | `GET`
[List scheduled events](https://api.cloudflare.com/#waiting-room-list-events) | `GET`
[Delete event](https://api.cloudflare.com/#waiting-room-delete-event) | `DELETE`
