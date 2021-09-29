---
title: Enable vary for images
pcx-content-type: how-to
---

# Enable vary for images

Vary for Images is enabled through Cloudflare’s API by creating a variants rule. In the examples below, learn how to serve JPEG, WebP, and AVIF variants for `.jpeg` and `.jpg` extensions.

## Create a variants rule 

```json
curl -X PATCH 
"https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0 c353/cache/variants" \ 
-H "X-Auth-Email: user@example.com" \ 
-H "X-Auth-Key: 3xamp1ek3y1234" \ 
-H "Content-Type: application/json" \ 
--data 
'{"value":{"jpeg":["image/webp","image/avif"],"jpg":["image/webp","image/avif"]}}' 
``` 

## Modify to only allow WebP variants 

```json
curl -X PATCH 
"https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0 c353/cache/variants" \ 
-H "X-Auth-Email: user@example.com" \ 
-H "X-Auth-Key: 3xamp1ek3y1234" \ 
-H "Content-Type: application/json" \ 
--data 
'{"value":{"jpeg":["image/webp"],"jpg":["image/webp"]}}' 
```

## Delete the rule 

```json
curl -X DELETE 
"https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/cache/variants" \ 
-H "X-Auth-Email: user@example.com" \ 
-H "X-Auth-Key: 3xamp1ek3y1234" 
```

## Get the rule 

```json
curl -X GET 
"https://api.cloudflare.com/client/v4/zones/023e105f4ecef8ad9ca31a8372d0c353/cache/variants" \
-H "X-Auth-Email: user@example.com" \ 
-H "X-Auth-Key: 3xamp1ek3y1234" 
```
