---
pcx_content_type: concept
title: Function invocation routes
---
# Function invocation routes 

## Overview
By adding Functions to a project, all requests by default will invoke your Function. Having an `_routes.json` file, you can exclude routes such as a static assets directory. This file will be automatically generated if a functions directory is detected in your project and you use the Pages CI or Wrangler to publish your project. 

Additionally, some frameworks (e.g. Remix, SvelteKit) will also automatically generate this file.  However, if the framework you are using does not, please create an issue on their repository with a link to this page or let us know. 

## Why do you need it: 
Having a `_routes.json` file gives you more granular control over when your Function is invoked. This is particularly useful with respect to [billing](https://developers.cloudflare.com/pages/platform/functions/billing/) because Pages offers unlimited free requests to static assets if:
* You have excluded the static asset routes in your `_routes.json`
* You do not have Functions on your project 

## How do you use it: 
You will need to create an `_routes.json` file. This file will include three different properties:
* **version**: Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible.
* **include**: Defines routes that will be invoked by Functions. Accepts wildcard behavior.
* **exclude**: Defines routes that will not be invoked by Functions. Accepts wildcard behavior. Excludes always take priority over Includes.

Below is an example of a `_routes.json`. 


```json
---
filename: _routes.json
highlight: [3]
---

{
    "version": 1,
    "include": ["/*"],
    "exclude": []
}
```

This `_routes.json` will invoke your Functions on all routes. 

Let's look at another example. Here, any route inside the build directory will not invoke the Function and therefore will not incur a Functions invocation charge. 

```json
---
filename: _routes.json
highlight: [3]
---
{
    "version": 1,
    "include": ["/*"],
    "exclude": ["/build/*"]
}
```

## Limits
* You must have at least one `include` rule.
* You may have no more than 100 include/exclude rules combined. 
* Each rule may have no more than 100 characters.
