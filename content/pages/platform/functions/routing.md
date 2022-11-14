---
pcx-content-type: how-to
title: Routing
weight: 4
---

# Functions routing

Functions utilize file-based routing, where the directory structure indicates the designated routes that your functions will run on. A directory can also have as many levels as you’d like. For example, say you had the following directory: 

|---- …
|---- functions
      |___ index.js
      |___ helloworld.js
      |___ howdyworld.js
      |___ fruits
            |___ index.js
            |___ apple.js
            |___ banana.js	

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
