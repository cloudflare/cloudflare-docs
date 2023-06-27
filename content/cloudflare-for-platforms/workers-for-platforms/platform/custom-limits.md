---
pcx_content_type: concept
title: Custom limits
---

# Custom limits

Custom limits allow you to programmatically set limits on your customer’s Worker to set caps on usage. We support custom limits for CPU time and a number of subrequests. 

## Set Custom limits

Custom limits can be set in the dynamic dispatch Worker:

```js
---
filename: index.js
---
export default {
 async fetch(request, env) {
   try {
     // parse the URL, read the subdomain
     let workerName = new URL(request.url).host.split('.')[0];
     let userWorker = env.dispatcher.get(
       workerName,
       {},
       {// set limits
         limits: {cpuMs: 10, subrequests: 5}
       }
     );
     return await userWorker.fetch(request);
   } catch (e) {
     if (e.message.startsWith('Worker not found')) {
       // we tried to get a worker that doesn't exist in our dispatch namespace
       return new Response('', { status: 404 });
     }
      return new Response(e.message, { status: 500 });
   }
 },
};
```
{{<Aside type="note">}}

If a user Worker hits either of these limits, the user Worker will immediately throw an exception. 

{{</Aside>}}
