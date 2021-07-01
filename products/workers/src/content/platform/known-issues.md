---
order: 5
pcx-content-type: concept
---

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers:

- When defining route specificity, avoid the use of forward slashes before a wildcard to ensure accuracy when matching suffixes. For example, consider the below path examples:


    1) `example.com/images/*`

    2) example.com/images*

for requests like `example.com/images/hello` to route successfully, the route pattern path must be set to option 2 (`example.com/images*`) without the forward slash. If the route pattern path is set to option 1 (`example.com/images/*`) requests that include a suffix, like `example.com/images/world`, will not route as intended. 
