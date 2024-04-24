---
_build:
  publishResources: false
  render: never
  list: never
---

To queue all visitors prior to a time-based offering, set up a pre-queue as part of a [waiting room event](/waiting-room/additional-options/create-events/#create-an-event-from-the-dashboard).

To start queueing all new visitors without a scheduled event:

1.  Go to **Traffic** > **Waiting Room**.
2.  On a waiting room:
    1.  Ensure **Enabled** is set to **On**.
    2.  Set **Queue-all** to **On**.
3.  Your waiting room will begin queueing all new visitors and will not allow any new visitors to the path protected by your waiting room. Queue-all will override all other waiting room settings, including event settings.

{{<Aside type="note" header="Note">}}
Only new visitors will be queued. Active users that are already on your website will continue there and will not return to the queue until their session expires.
{{</Aside>}}

4.  To begin allowing visitors to the path protected by your waiting room, set **Queue-all** to **Off**.
