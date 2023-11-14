---
updated: 2023-10-19
category: 🔐 Access
difficulty: Intermediate
pcx_content_type: tutorial
title: Create custom headers for Cloudflare Access-protected origins with Workers
---

# Create custom headers for Cloudflare Access-protected origins with Workers

{{<tutorial>}}

{{<markdown>}}

This tutorial covers how to add custom headers to send down to your origin services protected by Cloudflare Access. This can be valuable when applications or some networking implementations require specific, custom headers passed to the origin, which can sometimes be difficult to replicate when moving the traffic to a Zero Trust proxy of any kind.

When Cloudflare sends a request to your origin, the request will include an application token as a `Cf-Access-Jwt-Assertion` request header and as a `CF_Authorization` cookie.

Cloudflare signs the token with a key pair unique to your account. You should validate the token with your public key to ensure that the request came from Access and not a malicious third party.

Along with the JWT header, `CF_Authorization` cookie, and other Cloudflare specific headers, also sent is a header called `cf-access-authenticated-user-email` containing the authenticated user's email address.

To send the authenticated user's email address as a different header or to include other Cloudflare or custom headers you can use a Worker.

**Time to complete:**

30 minutes

{{</markdown>}}

{{<tutorial-prereqs>}}

- Secure your origin server with [Access](/cloudflare-one/policies/access/)

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create the Worker">}}

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), go to **Workers & Pages**.
2. If this is your first Worker, select **Create Worker**. Otherwise, select **Create application**, then select **Create Worker**.
3. Enter an identifiable name for the Worker, then select **Deploy**.
4. Select **Edit code**.
5. Replace the default code with the following script:

   ```javascript
   ---
   header: Worker custom HTTP header script
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

1. Go to the Worker you created > **Triggers**.
2. In **Routes**, select **Add route**.
3. Enter the hostname and zone for your origin, then select **Add route**.

The Worker will now insert a custom header into requests that match the defined route. For example:

   ```http
   ---
   header: Example custom header
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
