---
type: example
summary: Set up an A/B test by controlling what page is served based on
  cookies. This version supports passing the request through to test and control
  on the origin.
tags:
  - Originless
pcx_content_type: configuration
title: A/B testing with middleware
weight: 1001
layout: example
---

```js
---
filename: /functions/_middleware.js
---
const cookieName = "ab-test-cookie"
const newHomepagePathName = "/test"

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url)
  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=new`)) {
      // pass the request to /test
      url.pathname = newHomepagePathName
      return env.ASSETS.fetch(url)
    } else {
      const percentage = Math.floor(Math.random() * 100)
      let version = "current" // default version
      // change pathname and version name for 50% of traffic 
      if (percentage < 50) {
        url.pathname = newHomepagePathName
        version = "new"
      }
      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url)
      let response = new Response(asset.body, asset)
      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
      return response
    }
  }
  return next()
};

export const onRequest = [abTest];
```
