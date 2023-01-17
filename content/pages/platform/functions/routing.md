---
pcx-content-type: how-to
title: Routing
weight: 2
---

# Functions routing

Functions utilize file-based routing, where the directory structure indicates the designated routes that your functions will run on. A directory can also have as many levels as you’d like. For example, say you had the following directory:

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

Then the following routes will be generated based on the file structure, mapping the URL pattern to the /functions file that will be invoked:

| File path                   | Route                     |
|-----------------------------|---------------------------|
| /functions/index.js         | example.com               |
| /functions/helloworld.js    | example.com/helloworld    |
| /functions/howdyworld.js    | example.com/howdyworld    |
| /functions/fruits/index.js  | example.com/fruits        |
| /functions/fruits/apple.js  | example.com/fruits/apple  |
| /functions/fruits/banana.js | example.com/fruits/banana |

{{<Aside type="note">}}
Trailing slash is optional - both /foo and /foo/ will be routed to `/functions/foo.js` or `/functions/foo/index.js`
{{</Aside>}}

Note that if no Function is matched, it will fall back to a static asset if there is one. Otherwise the Function will fall back to the [default routing behavior](/pages/platform/serving-pages/) for Pages' static assets.

## Dynamic routes

Dynamic routes allow you to match URLs with parameterized segments. This can be especially useful if you are building dynamic applications. You can accept dynamic values which map to a single path by simply changing your filename.

By placing one set of brackets around your filename – e.g. `/users/[user].js` – you are creating a placeholder for a single path segment
| Path               | Matches? |
|--------------------|----------|
| /users/nevi        | Yes      |
| /users/daniel      | Yes      |
| /profile/nevi      | No       |
| /users/nevi/foobar | No       |
| /nevi              | No       |

By placing two sets of brackets around your filename – e.g. `/users/[[user]].js` – you are matching any depth of route below this point.
| Path                  | Matches? |
|-----------------------|----------|
| /users/nevi           | Yes      |
| /users/daniel         | Yes      |
| /profile/nevi         | No       |
| /users/nevi/foobar    | Yes      |
| /users/daniel/xyz/123 | Yes      |
| /nevi                 | No       |

Aside:
More specific routes (that is, those with fewer wildcards) take precedence over less specific routes.

 Looking at another example, if you have a folder structure like:

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
| /foo                  | Will route to a static asset if one is available |
| /date                 | /date.js                                         |
| /users/daniel         | /users/[user].js                                 |
| /users/nevi           | /users/[user].js                                 |
| /users/special        | /users/special.js                                |
| /users/daniel/xyz/123 | /users/[[catchall]].js                           |


The URL segment(s) that match the placeholder will be available in the aforementioned "request context" object. The `context.params` object can be used to find the matched value for a given filename placeholder.

For files which match a single URL segment (use a single set of brackets), the values are returned as a string:

```js
---
filename: functions/user/[user].js
---
export function onRequest(context) {
  return new Response(JSON.stringify(context.params.user))
}
```
will return "daniel" for requests to `/users/daniel`.


For files which match against multiple URL segments (use a double set of brackets), the values are returned as an array:

```js
---
filename: functions/user/[[catchall]].js
---
export function onRequest(context) {
  return new Response(context.params.catchall)
}
```
will return ["daniel", "xyz", "123"] for requests to `/users/daniel/xyz/123`.

## Function invocation routes

On a purely static project, Pages offers unlimited free requests. However, once you add Functions on a Pages project, all requests by default will invoke your function. In the spirit of continuing to offer unlimited free static requests, you can exclude these static routes by creating a `_routes.json` file. This file will be automatically generated if a `functions` directory is detected in your project when you publish your project with Pages CI or Wrangler.

{{<Aside type="note">}}
Some frameworks (e.g. Remix, SvelteKit) will also automatically generate a `_routes.json` file. However, if your preferred framework does not, create an issue on their framework repository with a link to this page or let us know on [Discord](https://discord.gg/cloudflaredev). See the framework section for more info on full-stack frameworks.
{{</Aside>}}

### Creating a _routes.json file
You will need to create a `_routes.json` file to control when your Function is invoked. It should be placed in the output directory of your project.

This file will include three different properties:
* **version**: Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible.
* **include**: Defines routes that will be invoked by Functions. Accepts wildcard behavior.
* **exclude**: Defines routes that will not be invoked by Functions. Accepts wildcard behavior. exclude always take priority over include.

{{<Aside type="note">}}
Wildcards are greedy, and match any number of path segments (slashes.)
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

Let’s look at another example. Here, any route inside the build directory will not invoke the Function and therefore will not incur a Functions invocation charge.

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
Below are limits related to Functions invocation routes:
* You must have at least one include rule.
* You may have no more than 100 include/exclude rules combined.
* Each rule may have no more than 100 characters.
