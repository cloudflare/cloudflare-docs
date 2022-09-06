---
pcx_content_type: overview
title: Workers for Platforms
weight: 9
---
 
# Workers for Platforms
 
Using Cloudflare [Workers](/workers/) allows you to improve performance and scalability by hosting your application entirely through our network. Cloudflare’s Workers for Platforms  is intended to help you deploy serverless functions programmatically, on behalf of your customers. Prior to using Workers for Platforms, [generate an API token](/api/tokens/create/#generating-the-token) or [obtain your API key](/api/keys/#view-your-api-key).


We’re able to provide an unlimited number of scripts to our Workers for Platforms customers. We achieve this by pruning inactive scripts that are not actively receiving live traffic and requests from our edge to cold storage. Once a request is made to a script that’s been pruned, there will be a slight “cold start” for us to fetch the script. Consequent requests will be fast as the script will be cached on our edge and placed back in hot storage.

{{<directory-listing>}}
