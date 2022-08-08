---
pcx_content_type: content
title: Namespaces API
weight: 2
---

# Namespaces API

The following endpoints are additions/changes to the Workers API, all prefixed with `api.cloudflare.com/clinet/v4/accounts/:tag/workers/...`. Responses are the result(s) portion of the standard Cloudflare V4 API wrapper.

---

{{<table-wrap>}}

<table style="width:100%;border:1">
  <thead>
    <tr>
      <th>Type</th>
      <th>Endpoint</th>
      <th>Action</th>
      <th>Request</th>
      <th>Response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>POST</strong>
      </td>
      <td><code>/dispatch/namespaces</code></td>
      <td style="text-align:left">
        Creates a new namespace. For now, it requires only a name.
      </td>
      <td> 
      { <br>
          "name": "my-namespace"
      }</td>
      <td>{ <br>
    "namespace_id": "6e30dc7a91384ca3ab8e9b772a325aef", <br>
    "namespace_name": "my-namespace",<br>
    "created_on": "2022-06-12T16:38:49.725635Z",<br>
    "created_by": "b41a07502ca94198ae750e9b658b3747",<br>
    "modified_on": "2022-06-12T16:38:49.725635Z",<br>
    "modified_by": "b41a07502ca94198ae750e9b658b3747"<br>
}
</td>
    </tr>
    <tr>
      <td>
        <strong>
          PUT/PATCH 
        </strong>
      </td>
      <td><code>/dispatch/namespaces/:name
      </code></td>
      <td style="text-align:left">
        Updates a namespace. Both <code>PATH</code> and <code>PATCH</code> behave the same and will rename the namespace. <code>PUT</code> can also be used to create a namespace, but the name field is required and won't be inferred from the request.
      </td>
      <td>{<br>
    "name": "my-namespace"
}
</td>
<td>{<br>
    "namespace_id": "6e30dc7a91384ca3ab8e9b772a325aef",<br>
    "namespace_name": "my-namespace",<br>
    "created_on": "2022-06-12T16:38:49.725635Z",<br>
    "created_by": "b41a07502ca94198ae750e9b658b3747",<br>
    "modified_on": "2022-06-14T16:38:49.725635Z",<br>
    "modified_by": "b41a07502ca94198ae750e9b658b3747"<br>
}
</td>
    </tr>
    <tr>
      <td>
        <strong>
         PUT
        </strong>
      </td>
      <td><code>/dispatch/namespaces/:name/scripts/:name</code></td>
      <td style="text-align:left">This is the same as our standard Worker upload API but will upload the worker <em>to a namespace</em> instead of to your account in general. Workers uploaded this way will not appear on your dashboard.  They also won't be valid options for routes.Instead, you will need to be listed using the API with GET call: <code>GET /dispatch/namespaces/:name/scripts</code>.
      <br> 
      <br>
      To run workers uploaded to this endpoint, you will need a non-namespaced script with a namespace binding. </td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <strong>
          DELETE
        </strong>
      </td>
      <td><code>/dispatch/namespaces/:name/scripts/:name</code></td>
      <td style="text-align:left">Deletes a script from a namespace. This will fully delete the given script, immediately making it unavailable to all of the namespace bindings referencing this namespace.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <strong>
         GET
        </strong>
      </td>
      <td><code>/dispatch/namespaces/:name/scripts?limit=:limit&cursor=:cursor&tags=:tagList</code></td>
      <td style="text-align:left">Lists the Workers that have been uploaded to this namespace. This endpoint is paginated using the query parameters <code>limit</code> (to limit the number of results given, default and max of 1000) and <code>cursor</code> (for fetching pages after the first).
      <br>
      <br>
      It also accepts the query parameter <code>tags</code>, which is a comma-separated list of script <code>tags</code> and whether or not they should be included in the response, in the format <code>tag-name:[yes|no]</code>.
      <br>
      <br>
      In the API wrapper, pagination results are also included.
      </td>
      <td></td>
      <td>
    {<br>
      "id": "first-script-name", <br>
      "etag": "5a5fded5f0199bb1e897a3bb5b6f88066e56dc53434c8e9517106ce4d9a99e0a",<br>
      "handlers": [
        "fetch"
      ],<br>
      "modified_on": "2022-06-14T17:23:36.834567Z",<br>
      "created_on": "2022-06-14T17:23:36.834567Z",<br>
      "usage_model": "bundled",<br>
      "routes": null <br>
     }<br>
<br>
{<br>
    "result_info": {<br>
        "count": 20,<br>
        "cursor": "some-script-name"<br>
    }<br>
}

</td>
    
  </tbody>
</table>

{{</table-wrap>}}

---

## Changes to script uploads

In order to actually use scripts uploaded to a namespace, one of your non-namespaced scripts needs to have one of our new namespace bindings. We plan to have Wrangler support for this soon, but for now you can use Wrangler 2's unsafe bindings section in `wrangler.toml` to add one of these bindings to your script:

```json
[[unsafe.bindings]]
name = "dispatcher"
type = "namespace"
namespace = "my-namespace"
```

If you're doing your own multipart uploads, just include a similar object in your metadata's `bindings` property:

```json
{
    "bindings": [
        ...,
        {
            "name": "dispatcher",
            "type": "namespace",
            "namespace": "my-namespace"
        }
    ]
}
```

Once this binding is included, you'll be able to dispatch to any worker in that namespace by its script name:

```json
export default {
  async fetch(request, env) {
    try {
        // this example assumes this script is routed to *.example.com/*
        // and that your users' workers are named accordingly.
        // e.g. my-customer.example.com will run the script uploaded to
        // PUT /dispatch/namespaces/my-namespace/scripts/my-customer
        //
        // any method of 'routing' to a namespaced worker can be used,
        // though, in the end we just need the name of the worker.
        let worker_name = new URL(request.url).host.split('.')[0]
        let user_worker = env.dispatcher.get(worker_name)
        return user_worker.fetch()
    } catch (e) {
        if (e.message == 'Error: Worker not found.') {
            // we tried to get a worker that doesn't exist in our namespace
            return new Response('', {status: 404})
        }

        // this could be any other exception from `fetch()` *or* an exception
        // thrown by the called worker (e.g. if the dispatched worker has 
        // `throw MyException()`, you could check for that here).
        return new Response(e.message, {status: 500})
    }
  }
}
```

---

## Trace API Changes (POST /traces)

The 'trace attach' API now supports `namespace` as a field in the `consumer` and `producer` objects. The example request here will send trace events from the `my-customer` script in the `my-namespace` namespace to the `production` environment of the `my-trace` service.
Trace deletion remains the same for traces involving namespaced workers: `DELETE /traces/:tag`.

### Request

```json
{
    "producer": {
        "namespace": "my-namespace",
        "script": "my-customer"
    },
    "consumer": {
        "service": "my-trace",
        "environment": "production"
    }
}
```

### Response

```json
{
    "tag": "504034d91e254990ae4c6763db6fe281",
    "producer": {
      "namespace": "my-namespace",
      "environment": "my-customer"
    },
    "consumer": {
      "service": "my-trace",
      "environment": "production"
    },
    "created_on": "2022-06-14T18:42:42.933664Z",
    "updated_on": "2022-06-14T18:42:42.933664Z"
}
```