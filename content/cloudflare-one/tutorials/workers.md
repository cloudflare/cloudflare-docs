---
updated: 2023-10-19
category: 🔐 Access
difficulty: Intermediate
pcx_content_type: tutorial
title: Custom Headers for Cloudflare Access-protected Origins using Cloudflare Workers
---

# Custom Headers for Cloudflare Access-protected Origins using Cloudflare Workers

This tutorial covers how to add custom headers to send down to your origin services protected by Cloudflare Access. This can be valuable when applications or some networking implementations require specific, custom headers passed to the origin, which can sometimes be difficult to replicate when moving the traffic to a Zero Trust proxy of any kind.

When Cloudflare sends a request to your origin, the request will include an application token as a Cf-Access-Jwt-Assertion request header and as a CF_Authorization cookie.

Cloudflare signs the token with a key pair unique to your account. You should validate the token with your public key to ensure that the request came from Access and not a malicious third party.

Along with the JWT header, CF_Authorization cookie, and other Cloudflare specific headers, also sent is a header called ‘cf-access-authenticated-user-email’ containing the authenticated user's email address.

To send the authenticated user's email address as a different header or to include other Cloudflare or custom headers you can use a Worker.

**Time to complete:**

30 minutes

## Prerequisites

- ???

## 1. Create the Worker

1. Sign in Cloudflare account and Navigate to “Workers & Pages”
2. Select “Create Application”
3. Select “Create Worker”
4. provide a name for the Worker and select “Deploy”
5. Remove the predefined code and paste the below code and “save and deploy”:

   ```javascript
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

## 2. Apply Worker to hostname

1. Navigate back to the Worker you just created Select “Triggers”
2. Select “Add route”
3. create the route and choose “Add route”.
4. The header configured in the Worker will now be inserted into requests that match the defined route similar to below.

   ```http
   ---
   highlight: [4,5]
   ---
   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", 
       "Accept-Encoding": "gzip", 
       "Accept-Language": "en-US,en;q=0.9", 
       "Cf-Access-Authenticated-User-Email": "user@example.com", 
       "Company-User-Id": "user@example.com", 
       "Connection": "keep-alive"
   ```
