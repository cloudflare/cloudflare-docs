---
updated: 2023-11-27
category: 🔐 Access
difficulty: Intermediate
pcx_content_type: tutorial
title: Create custom headers for Cloudflare Access-protected origins with Workers
---

# Create custom headers for Cloudflare Access-protected origins with Workers

This tutorial covers how to use a [Cloudflare Worker](/workers/) to add custom HTTP headers to traffic, and how to send those custom headers to your origin services protected by [Cloudflare Access](/cloudflare-one/policies/access/).

Some applications and networking implementations require specific custom headers to be passed to the origin, which can be difficult to implement for traffic moving through a Zero Trust proxy. You can configure a Worker to send the [user authorization headers](/cloudflare-one/identity/authorization-cookie/) required by Access.

---

{{<tutorial>}}

{{<tutorial-prereqs>}}

- Secure your origin server with Cloudflare Access

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a Worker with custom headers">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **Workers & Pages**.
2. If this is your first Worker, select **Create Worker**. Otherwise, select **Create application**, then select **Create Worker**.
3. Enter an identifiable name for the Worker, then select **Deploy**.
4. Select **Edit code**.
5. Input the following Worker:

   ```javascript
   ---
   header: Worker with custom HTTP headers
   ---
   addEventListener("fetch", event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     const { headers } = request;
     const cfaccessemail = headers.get("cf-access-authenticated-user-email");
     const requestWithID = new Request(request);
     requestWithID.headers.set('company-user-id', cfaccessemail);

   return await fetch(requestWithID);
   }
   
   ```

6. Select **Save and deploy**.

Your Worker is now ready to send custom headers to your Access-protected origin services.

{{</tutorial-step>}}

{{<tutorial-step title="Apply the Worker to your hostname">}}

1. Select the Worker you created, then go to **Triggers**.
2. In **Routes**, select **Add route**.
3. Enter the hostname and zone for your origin, then select **Add route**.

The Worker will now insert a custom header into requests that match the defined route. For example:

   ```http
   ---
   header: Example custom header
   highlight:4-5
   ---
   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", 
       "Accept-Encoding": "gzip", 
       "Accept-Language": "en-US,en;q=0.9", 
       "Cf-Access-Authenticated-User-Email": "user@example.com", 
       "Company-User-Id": "user@example.com", 
       "Connection": "keep-alive"
   ```

{{</tutorial-step>}}

{{</tutorial>}}
