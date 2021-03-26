---
title: Use the Waiting Room API
alwaysopen: true
weight: 180
---

# Using the Waiting Room API

[Cloudflare Waiting Rooms](/about) redirect visitors to virtual waiting rooms when they are trying to access web pages that have high volumes of traffic.

The [Cloudflare Waiting Room API](https://api.cloudflare.com/#waiting_rooms) provides an interface for programmatically managing waiting rooms.

## Request URL format

To invoke a [Cloudflare Waiting Room API](https://api.cloudflare.com/#waiting-room-properties) operation, append the endpoint to the Cloudflare API base URL:

```bash
https://api.cloudflare.com/client/v4
```

For authentication instructions, see [_Getting Started: Requests_](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [_Getting Started: Endpoints_](https://api.cloudflare.com/#getting-started-endpoints).

## Manage Your Waiting Rooms

<table style="width:100%">
   <thead>
        <tr>
            <th>Operation</th>
            <th>Method + URL stub</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-list-waiting_rooms'>List Waiting Rooms</a></td>
            <td><code>GET&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms</code></td>
            <td>List all waiting rooms for a zone.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-create-waiting-room'>Create Waiting Room</a></td>
            <td><code>POST&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms</code></td>
            <td>Create a waiting room.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-waiting-room-details'>Waiting Room Details</a></td>
            <td><code>GET&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms/{'{:identifier}'}</code></td>
            <td>Fetch a waiting room.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-update-waiting-room'>Update Waiting Room</a></td>
            <td><code>PUT&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms/{'{:identifier}'}</code></td>
            <td>Update a waiting room.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-delete-waiting-room'>Delete Waiting Room</a></td>
            <td><code>DELETE&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms/{'{:identifier}'}</code></td>
            <td>Delete a waiting room.</td>
        </tr>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-patch-waiting-room'>Patch Waiting Room</a></td>
            <td><code>PATCH&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms/{'{:identifier}'}</code></td>
            <td>Patch a configured waiting room.</td>
        </tr>
   </tbody>
</table>

## Fetch the current status of a Waiting Room

<table style="width:100%">
    <thead>
        <tr>
            <th>Operation</th>
            <th>Method + URL stub</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href='https://api.cloudflare.com/#waiting-room-get-waiting-room-status'>Get the current status of a waiting room</a></td>
            <td><code>GET&nbsp;zones/{'{:zone_identifier}'}/waiting_rooms/{'{:identifier}'}/status</code></td>
            <td>
                <ul>
                <li>Returns <code>queueing</code> if the queue is activated (clients are put in the waiting room).</li>
                <li>Returns <code>not_queueing</code> if the queue is not activated or if the waiting room is suspended.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>
