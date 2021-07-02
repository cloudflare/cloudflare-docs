---
order: 5
pcx-content-type: concept
---

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers.

## Route specificity 

- When defining route specificity, a trailing `/*` in your pattern may not act as expected.

Consider two different Workers, each deployed to the same zone. Worker A is assigned the `example.com/images/*` route and Worker B is given the `example.com/images*` route pattern. With these in place, here are how the following URLs will be resolved:

```
// (A) example.com/images/*
// (B) example.com/images*

"example.com/images" 
// -> B
"example.com/images123" 
// -> B
"example.com/images/hello"
// -> B
```

You will notice that all examples trigger Worker B. This includes the final example, which exemplifies the unexpected behavior.