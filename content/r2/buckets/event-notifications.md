---
title: Event notifications
pcx_content_type: how-to
---

# Event notifications

Event notifications send messages to your [queue](/queues/) when data in your R2 bucket changes. You can consume these messages with a [consumer Worker](/queues/reference/how-queues-works/#create-a-consumer-worker) or [pull over HTTP](/queues/configuration/pull-consumers/) from outside of Cloudflare Workers. 


{{<Aside type="note" header="Open Beta">}}

The event notifications feature is currently in open beta. To report bugs or request features, go to the #r2-storage channel in the [Cloudflare Developer Discord](https://discord.cloudflare.com) or fill out the [feedback form](https://forms.gle/2HBKD9zG9PFiU4v79).

{{</Aside>}}

## Get started with event notifications

### Prerequisites

Before getting started, you will need:
- An existing R2 bucket. If you do not already have an existing R2 bucket, refer to [Create buckets](/r2/buckets/create-buckets/).
- An existing queue. If you do not already have a queue, refer to [Create a queue](/queues/get-started/#3-create-a-queue).
- A [consumer Worker](/queues/reference/how-queues-works/#create-a-consumer-worker) or [HTTP pull](/queues/configuration/pull-consumers/) enabled on your Queue.

### Set up Wrangler

To begin, refer to [Install/Update Wrangler](/workers/wrangler/install-and-update/#install-wrangler) to install Wrangler, the Cloudflare Developer Platform CLI. Log into Wrangler with the [`wrangler login` command](/workers/wrangler/commands/#login).

### Enable event notifications on your R2 bucket

To enable event notifications, add an event notification rule to your bucket by running the [`r2 bucket notification create` command](/workers/wrangler/commands/#notification-create). Event notification rules determine the [event types](/r2/buckets/event-notifications/#event-types) that trigger notifications and enable filtering based on object `prefix` and `suffix`.

```sh
$ npx wrangler r2 bucket notification create <BUCKET_NAME> --event-type <EVENT_TYPE> --queue <QUEUE_NAME>
```

For a more complete step-by-step example, refer to the [Log and store upload events in R2 with event notifications](/r2/examples/upload-logs-event-notifications/) example.

## Event types

<table>
  <tbody>
    <th style="width:25%">
      Event type
    </th>
    <th style="width:50%">
      Description
    </th>
    <th style="width:25%">
      Trigger actions
    </th>
    <tr>
      <td>
        <code>object-create</code>
      </td>
      <td>
        Triggered when new objects are created or existing objects are overwritten.
      </td>
      <td>
        <ul>
            <li><code>PutObject</code></li>
            <li><code>CopyObject</code></li>
            <li><code>CompleteMultipartUpload</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <code>object-delete</code>
      </td>
      <td>
        Triggered when an object is explicitly removed from the bucket.<br /><br />
        <b>Note</b>: During the beta, deletes that occur as a result of object lifecycle policies will not trigger this event.
      </td>
      <td>
        <ul>
            <li><code>DeleteObject</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Message format

Queue consumers receive notifications as [Messages](/queues/configuration/javascript-apis/#message). The following is an example of the body of a message that a consumer Worker will receive:

```json
{
  "account": "3f4b7e3dcab231cbfdaa90a6a28bd548",
  "action": "CopyObject",
  "bucket": "my-bucket",
  "object": {
    "key": "my-new-object",
    "size": 65536,
    "eTag": "c846ff7a18f28c2e262116d6e8719ef0"
  },
  "eventTime": "2024-05-24T19:36:44.379Z",
  "copySource": {
    "bucket": "my-bucket",
    "object": "my-original-object"
  }
}
```

### Properties

<table>
  <tbody>
    <th style="width:22%">
      Property
    </th>
    <th style="width:18%">
      Type
    </th>
    <th style="width:60%">
      Description
    </th>
    <tr>
      <td>
        <code>account</code>
      </td>
      <td>
        String
      </td>
      <td>
        The Cloudflare account ID that the event is associated with.
      </td>
    </tr>
    <tr>
      <td>
        <code>action</code>
      </td>
      <td>
        String
      </td>
      <td>
        The type of action that triggered the event notification. Example actions include: <code>PutObject</code>, <code>CopyObject</code>, <code>CompleteMultipartUpload</code>, <code>DeleteObject</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>bucket</code>
      </td>
      <td>
        String
      </td>
      <td>
        The name of the bucket where the event occurred.
      </td>
    </tr>
    <tr>
      <td>
        <code>object</code>
      </td>
      <td>
        Object
      </td>
      <td>
        A nested object containing details about the object involved in the event.
      </td>
    </tr>
    <tr>
      <td>
        <code>object.key</code>
      </td>
      <td>
        String
      </td>
      <td>
        The key (or name) of the object within the bucket.
      </td>
    </tr>
    <tr>
      <td>
        <code>object.size</code>
      </td>
      <td>
        Number
      </td>
      <td>
        The size of the object in bytes. Note: not present for object-delete events.
      </td>
    </tr>
    <tr>
      <td>
        <code>object.eTag</code>
      </td>
      <td>
        String
      </td>
      <td>
        The entity tag (eTag) of the object. Note: not present for object-delete events.
      </td>
    </tr>
    <tr>
      <td>
        <code>eventTime</code>
      </td>
      <td>
        String
      </td>
      <td>
        The time when the action that triggered the event occurred.
      </td>
    </tr>
    <tr>
      <td>
        <code>copySource</code>
      </td>
      <td>
        Object
      </td>
      <td>
        A nested object containing details about the source of a copied object. Note: only present for events triggered by <code>CopyObject</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>copySource.bucket</code>
      </td>
      <td>
        String
      </td>
      <td>
        The bucket that contained the source object.
      </td>
    </tr>
    <tr>
      <td>
        <code>copySource.object</code>
      </td>
      <td>
        String
      </td>
      <td>
        The name of the source object.
      </td>
    </tr>
  </tbody>
</table>

## Limitations

During the beta, event notifications has the following limitations:
- Queues [per-queue message throughput](/queues/platform/limits/) is currently 400 messages per second. If your workload produces more than 400 notifications per second, messages may be dropped.
- For a given bucket, only one event notification rule can be created per queue.
- Each bucket can have up to 5 event notification rules.
- Deletes that occur as a result of object lifecycle policies will not trigger an event notification.
