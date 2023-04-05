---
pcx_content_type: reference
title: Routing
weight: 2
---

# Functions routing

Functions utilize file-based routing. Your `/functions` directory structure determines the designated routes that your Functions will run on. You can create a `/functions` directory with as many levels as needed for your project's use case. Review the following directory:

```
|---- …
|---- functions
      |___ index.js
      |___ helloworld.js
      |___ howdyworld.js
      |___ fruits
            |___ index.js
            |___ apple.js
            |___ banana.js
```

The following routes will be generated based on the above file structure. These routes map the URL pattern to the `/functions` file that will be invoked when a visitor goes to the URL:

| File path                   | Route                     |
|-----------------------------|---------------------------|
| /functions/index.js         | example.com               |
| /functions/helloworld.js    | example.com/helloworld    |
| /functions/howdyworld.js    | example.com/howdyworld    |
| /functions/fruits/index.js  | example.com/fruits        |
| /functions/fruits/apple.js  | example.com/fruits/apple  |
| /functions/fruits/banana.js | example.com/fruits/banana |

{{<Aside type="note" header="Trailing slash">}}

Trailing slash is optional. Both `/foo` and `/foo/` will be routed to `/functions/foo.js` or `/functions/foo/index.js`. If your project has both a `/functions/foo.js` and `/functions/foo/index.js` file, `/foo` and `/foo/` would route to `/functions/foo/index.js`.

{{</Aside>}}

If no Function is matched, it will fall back to a static asset if there is one. Otherwise, the Function will fall back to the [default routing behavior](/pages/platform/serving-pages/) for Pages' static assets.

## Dynamic routes

Dynamic routes allow you to match URLs with parameterized segments. This can be useful if you are building dynamic applications. You can accept dynamic values which map to a single path by changing your filename.

### Single path segments

To create a dynamic route, place one set of brackets around your filename – for example, `/users/[user].js`. By doing this, you are creating a placeholder for a single path segment:

| Path               | Matches? |
|--------------------|----------|
| /users/nevi        | Yes      |
| /users/daniel      | Yes      |
| /profile/nevi      | No       |
| /users/nevi/foobar | No       |
| /nevi              | No       |

### Multipath segments

By placing two sets of brackets around your filename – for example, `/users/[[user]].js` – you are matching any depth of route after `/users/`:

| Path                  | Matches? |
|-----------------------|----------|
| /users/nevi           | Yes      |
| /users/daniel         | Yes      |
| /profile/nevi         | No       |
| /users/nevi/foobar    | Yes      |
| /users/daniel/xyz/123 | Yes      |
| /nevi                 | No       |

{{<Aside type="note" header="Route specificity">}}

More specific routes (routes with fewer wildcards) take precedence over less specific routes.

{{</Aside>}}

#### Dynamic route examples

Review the following `/functions/` directory structure:

```
|---- …
|---- functions
      |___ date.js
      |___ users/
            |___ special.js
            |___ [user].js
            |___ [[catchall]].js
```

The following requests will match the following files:

| Request               | File                                             |
|-----------------------|--------------------------------------------------|
| /foo                  | Will route to a static asset if one is available.|
| /date                 | /date.js                                         |
| /users/daniel         | /users/[user].js                                 |
| /users/nevi           | /users/[user].js                                 |
| /users/special        | /users/special.js                                |
| /users/daniel/xyz/123 | /users/[[catchall]].js                           |


The URL segment(s) that match the placeholder (`[user]`) will be available in the request [`context`](/pages/platform/functions/api-reference/#eventcontext) object. The [`context.params`](/pages/platform/functions/api-reference/#params) object can be used to find the matched value for a given filename placeholder.

For files which match a single URL segment (use a single set of brackets), the values are returned as a string:

```js
---
filename: functions/users/[user].js
---
export function onRequest(context) {
  return new Response(context.params.user)
}
```

The above logic will return `daniel` for requests to `/users/daniel`.


For files which match against multiple URL segments (use a double set of brackets), the values are returned as an array:

```js
---
filename: functions/users/[[catchall]].js
---
export function onRequest(context) {
  return new Response(JSON.stringify(context.params.catchall))
}
```

The above logic will return `["daniel", "xyz", "123"]` for requests to `/users/daniel/xyz/123`.

## Functions invocation routes

On a purely static project, Pages offers unlimited free requests. However, once you add Functions on a Pages project, all requests by default will invoke your Function. To continue receiving unlimited free static requests, exclude your project's static routes by creating a `_routes.json` file. This file will be automatically generated if a `functions` directory is detected in your project when you publish your project with Pages CI or Wrangler.

{{<Aside type="note">}}

Some frameworks (such as Remix, SvelteKit) will also automatically generate a `_routes.json` file. However, if your preferred framework does not, create an issue on their framework repository with a link to this page or let us know on [Discord](https://discord.gg/cloudflaredev). Refer to the [Framework guide](/pages/framework-guides/) for more information on full-stack frameworks.

{{</Aside>}}

### Create a `_routes.json` file

Create a `_routes.json` file to control when your Function is invoked. It should be placed in the output directory of your project.

This file will include three different properties:

* **version**: Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible.
* **include**: Defines routes that will be invoked by Functions. Accepts wildcard behavior.
* **exclude**: Defines routes that will not be invoked by Functions. Accepts wildcard behavior. `exclude` always take priority over `include`.

{{<Aside type="note">}}

Wildcards match any number of path segments (slashes). For example, `/users/*` will match everything after the`/users/` path.

{{</Aside>}}

#### Example configuration

Below is an example of a `_routes.json`.

```json
---
filename: _routes.json
---
{
   "version": 1,
   "include": ["/*"],
   "exclude": []
}
```

This `_routes.json` will invoke your Functions on all routes.

Below is another example of a `_routes.json` file. Any route inside the `/build` directory will not invoke the Function and will not incur a Functions invocation charge.

```json
---
filename: _routes.json
---
{
   "version": 1,
   "include": ["/*"],
   "exclude": ["/build/*"]
}
```

### Limits

Functions invocation routes have the following limits:

* You must have at least one include rule.
* You may have no more than 100 include/exclude rules combined.
* Each rule may have no more than 100 characters.