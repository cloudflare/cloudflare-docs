---
pcx_content_type: overview
title: Workers for Platforms
weight: 9
---
 
# Workers for Platforms
 
Using Cloudflare [Workers](/workers/) allows you to improve performance and scalability by hosting your application entirely through our network. Cloudflare’s Workers for Platforms is intended to help you deploy serverless functions programmatically, on behalf of your customers. 

The Workers configuration API was initially built around managing a relatively small number of scripts on each account. This leads to some difficulties when using Workers as a platform for your own users: script limits need to be raised, ever-increasing numbers of routes need to be added, and if your own logic is supposed to come before your customers then managing that logic in a central place becomes difficult.

Dispatch Namespaces are our solution to these problems. Instead of adding individual routes to your users’ workers, you’ll be able to upload them to a ’dispatch namespace’ and then dynamically dispatch to them at runtime using a ‘dispatch namespace binding’. This allows you to run your own code as a wrapper around the namespaced worker (while still managing it as a single script), logically groups your code separately from your users’ code, and provides some additional APIs such as ‘script tags’ for bulk operations on the namespaced workers.

Prior to using Workers for Platforms, [generate an API token](/api/tokens/create/#generating-the-token) or [obtain your API key](/api/keys/#view-your-api-key).


{{<directory-listing>}}
