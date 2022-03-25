---
_build:
  publishResources: false
  render: never
  list: never
---

To queue all visitors prior to a time-based offering:

1.  Go to **Traffic** > **Waiting Rooms**.
2.  On a waiting room:
    1.  Set **Enabled** to **On**.
    2.  Set **Queue All** to **On**.
3.  Your waiting room will begin queueing all visitors and will not allow any visitors to the path protected by your waiting room. On hover, the waiting room will show the estimated number of users in the queue.

{{<Aside type="note" header="Note">}}
Only new visitors will be queued. Active users that are already on your website will continue there and will not return to the queue until their session expires.
{{</Aside>}}

4.  To begin allowing visitors to the path protected by your waiting room, set **Queue All** to **Off**.
