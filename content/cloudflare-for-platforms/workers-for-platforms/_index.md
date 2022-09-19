---
pcx_content_type: navigation
title: Workers for Platforms
weight: 9
---
 
# Workers for Platforms
 
Using Cloudflare [Workers](/workers/) allows you to improve performance and scalability by hosting your application entirely through our network. Cloudflare’s Workers for Platforms helps you deploy serverless functions programmatically on behalf of your customers.

The Workers configuration API was initially built around managing a relatively small number of scripts on each account. This leads to some difficulties when using Workers as a platform for your own users, including: frequently needing to increase script limits; adding an ever-increasing number of routes; and managing logic in a central place if your own logic is supposed to come before your customers' logic.

Dispatch namespaces are Cloudflare's solution to these problems. Instead of adding individual routes to your users’ Workers, you will upload them to a dispatch namespace and then dynamically dispatch to them at runtime using a dispatch namespace binding. This allows you to run your own code as a wrapper around the namespaced Worker while still managing it as a single script; logically groups your code separately from your users’ code; and provides additional APIs like `script tags` for bulk operations on the namespaced workers.

Prior to using Workers for Platforms, [generate an API token](/api/get-started/create-token) or [obtain your API key](/api/get-started/keys).

{{<directory-listing>}}

## Connect with us
If you have feature requests or notice any bugs, share your feedback directly with us by joining the [Cloudflare Developers community](https://discord.gg/jbBfwFqDVU) on Discord.