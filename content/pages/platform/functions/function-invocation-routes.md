---
pcx_content_type: concept
title: Function invocation routes
---
# Function invocation routes 

By adding Functions to a Pages project, all requests by default will invoke your Function. You can exclude routes such as a static assets directory by creating `_routes.json` file. This file will be automatically generated if a `functions` directory is detected in your project when you publish your project with Pages CI or Wrangler. 

Additionally, some frameworks (such as Remix, SvelteKit) will also automatically generate a `_routes.json` file. However, if the framework you are using does not, create an issue on their repository with a link to this page or let us know on [Discord](https://discord.gg/cloudflaredev).

Having a `_routes.json` file gives you more granular control over when your Function is invoked. This is useful with respect to [billing](https://developers.cloudflare.com/pages/platform/functions/billing/) because Pages offers unlimited free requests to static assets in the following cases:

* You have excluded the static asset routes in your `_routes.json`.
* You do not have Functions in your Pages project.

## Create `_routes.json` file

You will need to create a `_routes.json` file to control when your Function is invoked. This file will include three different properties:
* **version**: Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible.
* **include**: Defines routes that will be invoked by Functions. Accepts wildcard behavior.
* **exclude**: Defines routes that will not be invoked by Functions. Accepts wildcard behavior. `exclude` always take priority over `include`.

### Example configuration
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

Let's look at another example. Here, any route inside the `build` directory will not invoke the Function and therefore will not incur a Functions invocation charge. 

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
### Example matches
Below are other examples of how matching works in the `_routes.json` file

| rule | matches |
| --- | ---| 
| /foo | /foo, /foo/ |
| /foo/ | /foo, /foo/ |
| /foo* | /foo, /foobar, /foo/bar, /foobar/baz |
| /* | This matches everything | 
| /foo/* | /foo, /foo/, /foo/bar |
| /foo/*.html | /foo/bar.html, /foo/bar/baz.html |

## Limits

Below are limits related to Functions invocation routes.

* You must have at least one `include` rule.
* You may have no more than 100 include/exclude rules combined. 
* Each rule may have no more than 100 characters.
