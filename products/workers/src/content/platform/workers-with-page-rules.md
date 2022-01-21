---
order: 
pcx-content-type: concept
---

# Page Rules

Page Rules trigger certain actions whenever a request matches one of the URL patterns you define. You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Refer to the [Page Rules Support article](https://support.cloudflare.com/hc/en-us/articles/218411427) to learn more about configuring Page Rules.

## Page Rules with Workers

Cloudflare acts as a [reverse proxy](https://www.cloudflare.com/learning/what-is-cloudflare/) to provide services, like Page Rules, to Internet properties. Traffic headed to your application will first visit the closest Cloudflare data center to the visitor, where services like Workers and Page Rules will run, before going, if needed, to your origin server. If your application is built on Workers and/or Pages, the [Cloudflare network edge](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) acts as your origin server and responds to requests directly from the Cloudflare edge. 

When using Page Rules with Workers, the following workflow is applied. 

1. Request arrives at Cloudflare data center.
2. Cloudflare decides if this request is a Worker route and figures out the script ID.
3. Because this is a Worker route, Cloudflare disables a number of features, including some that would be set by Page Rules.
4. Page Rules run as part of normal request proessing with some features now disabled.
5. Worker executes.

If you are experiencing Page Rule errors when running Workers, contact your Cloudflare account team.