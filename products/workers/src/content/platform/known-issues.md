---
order: 5
pcx-content-type: concept
---

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers.

## Route specificity 

- When defining route specificity, a trailing `/*` in your pattern may not act as expected:

    1) `example.com/images/*`

    2) `example.com/images*`

For requests like `example.com/images/hello` to route successfully, the route pattern path must be set to option 2 (`example.com/images*`) without the forward slash. If the route pattern path is set to option 1 (`example.com/images/*`) requests that include a suffix, like `example.com/images/world`, will not route as intended. 
