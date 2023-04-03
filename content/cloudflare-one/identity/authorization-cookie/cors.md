---
pcx_content_type: how-to
title: CORS
weight: 4
---

# Access and CORS

Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is a mechanism that uses HTTP headers to grant a web application running on one origin permission to reach selected resources in a different origin. The web application executes a cross-origin HTTP request when it requests a resource that has a different origin from its own, including domain, protocol, or port.

For a CORS request to reach a site protected by Access, the request must include a valid `CF-Authorization` cookie. This may require additional configuration depending on the type of request:

- [Simple requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) are sent directly to the origin, without triggering a preflight request. For configuration instructions, refer to [Allow simple requests](#allow-simple-requests).

- [Preflighted requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests) cause the browser to send an OPTIONS request before sending the actual request. The OPTIONS request checks which methods and headers are allowed by the origin. For configuration instructions, refer to [Allow preflighted requests](#allow-preflighted-requests).

{{<Aside type="warning" header="Important">}}

- Do not troubleshoot CORS in Incognito mode, as this will cause disruptions with Access due to `CF-Authorization` being blocked as a third-party cookie on cross origin requests.

- Safari, in particular Safari 13.1, handles cookies in a unique format. In some cases, this can cause CORS to fail. This will be dependent on Apple releasing a patch for handling cookies. This is known to impact macOS 10.15.4 when running Safari 13.1 (15609.1.20.111.8).

{{</Aside>}}

## Allow simple requests

If you make a simple CORS request to an Access-protected domain and have not yet logged in, the request will return a `CORS error`. There are two ways you can resolve this error:

- **Option 1** — [Log in and refresh the page](#authenticate-manually).
- **Option 2** — [Create a Cloudflare Worker which automatically sends an authentication token](#send-authentication-token-with-cloudflare-worker). This method only works if both sites involved in the CORS exchange are behind Access.

### Authenticate manually

1. Visit the target domain in your browser. You will see the Access login page.
2. Log in to the target domain. This generates a `CF-Authorization` cookie.
3. Refresh the page that made the CORS request. The refresh resends the request with the newly generated cookie.

## Allow preflighted requests

If you make a preflighted cross-origin request to an Access-protected domain, the OPTIONS request will return a `403` error. This error occurs regardless of whether you have logged in to the domain. This is because the browser never includes cookies with OPTIONS requests, by design. Cloudflare will therefore block the preflight request, causing the CORS exchange to fail.

There are two ways you can resolve this error:

- **Option 1** — [Configure Cloudflare to respond to the OPTIONS request](#configure-response-to-preflight-requests).
- **Option 2** — [Create a Cloudflare Worker which automatically sends an authentication token](#send-authentication-token-with-cloudflare-worker). This method only works if both sites involved in the CORS exchange are behind Access.

### Configure response to preflight requests

You can configure Cloudflare to respond to the OPTIONS request on your behalf. The OPTIONS request never reaches your origin. After the preflight exchange resolves, the browser will then send the main request which does include the authentication cookie (assuming you have logged into the Access-protected domain).

To configure how Cloudflare responds to preflight requests:

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **Access** > **Applications**.
2. Locate the origin that will be receiving OPTIONS requests and click **Edit**.
3. In the **Settings** tab, scroll down to **CORS settings**.
4. Configure the dashboard [CORS settings](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers) to match the response headers sent by your origin.

   For example, if you have configured `api.mysite.com`to return the following headers:

   ```
   headers: {
       'Access-Control-Allow-Origin': 'https://example.com',
       'Access-Control-Allow-Credentials' : true,
       'Access-Control-Allow-Methods': 'GET, OPTIONS',
       'Access-Control-Allow-Headers': 'office',
       'Content-Type': 'application/json',
   }
   ```

   then go to `api.mysite.com` in Access and configure **Access-Control-Allow-Origin**, **Access-Control-Allow-Credentials**, **Access-Control-Allow-Methods**, and **Access-Control-Allow-Headers**.
   ![Example CORS settings configuration in Zero Trust](/cloudflare-one/static/documentation/policies/CORS-settings.png)

5. Click **Save application**.

6. (Optional) You can check your configuration by sending an OPTIONS request to the origin with `curl`. For example,

   ```bash
   curl -I -XOPTIONS https://api.mysite.com \
       -H 'origin: https://example.com' \
       -H 'access-control-request-method: GET'
   ```

   should return a response similar to:

   ```bash
   HTTP/2 200
   date: Tue, 24 May 2022 21:51:21 GMT
   vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
   access-control-allow-origin: https://example.com
   access-control-allow-methods: GET
   access-control-allow-credentials: true
   expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
   report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=A%2FbOOWJio%2B%2FjuJv5NC%2FE3%2Bo1zBl2UdjzJssw8gJLC4lE1lzIUPQKqJoLRTaVtFd21JK1d4g%2BnlEGNpx0mGtsR6jerNfr2H5mlQdO6u2RdOaJ6n%2F%2BS%2BF9%2Fa12UromVLcHsSA5Y%2Fj72tM%3D"}],"group":"cf-nel","max_age":604800}
   nel: {"success_fraction":0.01,"report_to":"cf-nel","max_age":604800}
   server: cloudflare
   cf-ray: 7109408e6b84efe4-EWR
   ```

## Send authentication token with Cloudflare Worker

If you have two sites protected by Cloudflare Access, `example.com` and `api.mysite.com`, requests made between the two will be subject to CORS checks. Users who log in to `example.com` will be issued a cookie for `example.com`. When the user's browser requests `api.mysite.com`, Cloudflare Access looks for a cookie specific to `api.mysite.com`. The request will fail if the user has not already logged in to `api.mysite.com`.

To avoid having to log in twice, you can create a Cloudflare Worker that automatically sends authentication credentials to `api.mysite.com`.

### Prerequisites

- [Workers account](/workers/get-started/guide/)
- `wrangler` installation
- `example.com` and `api.mysite.com` domains [protected by Access](/cloudflare-one/applications/configure-apps/)

### 1. Generate a service token

Follow [these instructions](/cloudflare-one/identity/service-tokens/) to generate a new Access service token. Copy the `Client ID` and `Client Secret` to a safe place, as you will use them in a later step.

### 2. Add a Service Auth policy

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Access** > **Applications**.

2. Find your `api.mysite.com` application and click **Edit**.

3. Click the **Policies** tab.

4. Add the following policy:
   | Action | Rule type | Selector |
   | ------------- | --------- | ------------- |
   | Service Auth | Include | Service Token |

### 3. Create a new Worker

1. Open a terminal and create a new Workers project.

   ```sh
   $ wrangler generate redirect-worker
   ```

2. Navigate to the project directory.

   ```sh
   $ cd redirect-worker
   ```

3. Open `wrangler.toml` in a text editor and insert your Account ID. To find your Account ID, open your [Cloudflare dashboard](https://dash.cloudflare.com/) and click the **Workers** tab.

   ```txt
   ---
   filename: wrangler.toml
   ---
   name = "redirect-worker"
   type = "javascript"

   account_id = "123abc456654abc123"
   workers_dev = true
   route = ""
   zone_id = ""
   compatibility_date = "2022-05-16"
   ```

4. Open `index.js` and copy in the following example code.

   ```js
   ---
   filename: index.js
   ---
   // The hostname where your API lives
   const originalAPIHostname = 'api.mysite.com'

   async function handleRequest(request) {

   /** Change just the host.
   If the request comes in on example.com/api/name, the new URL is api.mysite.com/api/name
   **/
   const url = new URL(request.url)
   url.hostname = originalAPIHostname

   /** If your API is located on api.mysite.com/anyname (without "api/" in the path),
   remove the "api/" part of example.com/api/name
   **/

   // url.pathname = url.pathname.substring(4)

   /** Best practice is to always use the original request to construct the new request
   to clone all the attributes. Applying the URL also requires a constructor
   since once a Request has been constructed, its URL is immutable.
   **/

   const newRequest = new Request(
       url.toString(),
       request,
   )

   newRequest.headers.set('cf-access-client-id', CF_ACCESS_CLIENT_ID)
   newRequest.headers.set('cf-access-client-secret', CF_ACCESS_CLIENT_SECRET)
   try {
       const response = await fetch(newRequest);

       // Copy over the response
       const modifiedResponse = new Response(response.body, response);

       // Delete the set-cookie from the response so it doesn't override existing cookies
       modifiedResponse.headers.delete("set-cookie")

       return  modifiedResponse;
   } catch (e) {
       return new Response(JSON.stringify({ error: e.message }), { status: 500 })
   }
   }

   addEventListener('fetch', event => {
   event.respondWith(handleRequest(event.request))
   })
   ```

5. Publish the Worker to your account.

   ```sh
   $ wrangler publish
   ```

### 4. Configure the Worker

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), navigate to the **Workers** tab.

2. Click your newly created Worker. In this example, the Worker is called `redirect-worker`.

3. In the **Triggers** tab, scroll down to **Routes** and add `example.com/api/*`. The Worker is placed on a subpath of `example.com` to avoid making a cross-origin request.

4. In the **Settings** tab, click **Variables**.

5. Under **Environment Variables**, add the following [secret variables](/workers/platform/environment-variables/#environment-variables-via-the-dashboard):
   - `CF_ACCESS_CLIENT_ID` = `<service token Client ID>`
   - `CF_ACCESS_CLIENT_SECRET` = `<service token Client Secret>`

The Client ID and Client Secret are copied from your [service token](#1-generate-a-service-token).

6. Enable the **Encrypt** option for each variable and click **Save**.

### 5. Update HTTP request URLs

Modify your `example.com` application to send all requests to `example.com/api/` instead of `api.mysite.com`.

HTTP requests should now work seamlessly between two different Access-protected domains. When a user logs in to `example.com`, the browser makes a request to the Worker instead of to `api.mysite.com`. The Worker adds the Access service token to the request headers and then forwards the request to `api.mysite.com`. Since the service token matches a Service Auth policy, the user no longer needs to log in to `api.mysite.com`.

## Troubleshooting

In general, we recommend the following steps when troubleshooting CORS issues:

1. Capture a HAR file with the issue described, as well as the JS console log output recorded simultaneously. This is because the HAR file alone will not give full visibility on the reason behind cross-origin issues.
2. Ensure that the application has set `credentials: 'same-origin'` in all fetch or XHR requests.
3. If you are using the [cross-origin setting](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) on script tags, these must be set to "use-credentials".

{{<Aside type="warning" header="CORS is failing on the same domain">}}
CORS checks do not occur on the same domain. If this error occurs, it is likely the request is being sent without the `CF-Authorization` cookie.
{{</Aside>}}
