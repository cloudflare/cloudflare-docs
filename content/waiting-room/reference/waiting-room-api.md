---
pcx_content_type: reference
title: API commands
---

# API commands

Cloudflare Waiting Rooms redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.

The [Cloudflare Waiting Room API](https://api.cloudflare.com/#waiting_rooms) provides an interface for programmatically managing waiting rooms.

## Request URL format

To invoke a [Cloudflare Waiting Room API](https://api.cloudflare.com/#waiting-room-properties) operation, append the endpoint to the Cloudflare API base URL:

```shell
https://api.cloudflare.com/client/v4
```

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

<style>
  table { width: 100% }
</style>

## Manage your waiting room

| Operation                                                                             | Method + URL stub                                             | Notes                              |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------- |
| [List Waiting Rooms](https://api.cloudflare.com/#waiting-room-list-waiting_rooms)     | `GET zones/{:zone_identifier}/waiting_rooms`                  | List all waiting rooms for a zone. |
| [Create Waiting Room](https://api.cloudflare.com/#waiting-room-create-waiting_room)   | `POST zones/{:zone_identifier}/waiting_rooms`                 | Create a waiting room.             |
| [Waiting Room Details](https://api.cloudflare.com/#waiting-room-waiting-room-details) | `GET zones/{:zone_identifier}/waiting_rooms/{:identifier}`    | Fetch a waiting room.              |
| [Update a Waiting Room](https://api.cloudflare.com/#waiting-room-update-waiting-room) | `PUT zones/{:zone_identifier}/waiting_rooms/{:identifier}`    | Update a waiting room.             |
| [Delete a Waiting Room](https://api.cloudflare.com/#waiting-room-delete-waiting-room) | `DELETE zones/{:zone_identifier}/waiting_rooms/{:identifier}` | Delete a waiting room.             |
| [Patch a Waiting Room](https://api.cloudflare.com/#waiting-room-patch-waiting-room)   | `PATCH zones/{:zone_identifier}/waiting_rooms/{:identifier}`  | Patch a configured waiting room.   |

## Fetch the current status of a waiting room

| Operation                                                                                                    | Method + URL stub                                                 | Notes                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Get the current status of a waiting room](https://api.cloudflare.com/#waiting-room-get-waiting-room-status) | `GET zones/{:zone_identifier}/waiting_rooms/{:identifier}/status` | <ul><li>Returns <code>queueing</code> if the queue is activated (clients are put in the waiting room).</li><li>Returns <code>not_queueing</code> if the queue is not activated or if the waiting room is suspended.</li></ul> |
