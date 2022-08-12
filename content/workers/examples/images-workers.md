---
type: example
summary: Set up custom domain for Images using a Worker or serve images using a prefix path and Cloudflare registered domain.
tags:
  - Images
  - Workers
pcx_content_type: configuration
title: Custom Domain with Images
weight: 1001
layout: example
---

To serve images from a custom domain:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select you account > select **Workers**.
3. Select **Create a service**.
4. In your Workers, select **Quick edit** and paste the following code.

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}
```js
export default {
	async fetch(request) {
		// You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA
		const accountHash = '';

		const { pathname } = new URL(request.url);

		// A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public
		// will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"

		return new Response(`https://imagedelivery.net/${accountHash}${pathname}`);
	}
};
```
{{</tab>}}
{{<tab label="ts/esm">}}
```ts
export default {
	async fetch(request: Request) {
		// You can find this in the dashboard, it should look something like this: ZWd9g1K7eljCn_KDTu_MWA
		const accountHash = '';

		const { pathname } = new URL(request.url);

		// A request to something like cdn.example.com/83eb7b2-5392-4565-b69e-aff66acddd00/public
		// will fetch "https://imagedelivery.net/<accountHash>/83eb7b2-5392-4565-b69e-aff66acddd00/public"

		return new Response(`https://imagedelivery.net/${accountHash}${pathname}`);
	}
};
```
{{</tab>}}
{{</tabs>}}

Another way you can serve images from a custom domain is by using the `cdn-cgi/imagedelivery` prefix path which is used as path to trigger `cdn-cgi` image proxy.

Below is an example showing the hostname as a Cloudflare proxied domain under the same account as the Image, followed with the prefix path and the image `<ACCOUNT_HASH>`, `<IMAGE_ID>` and `<VARIANT_NAME>` which can be found in the **Images** on the Cloudflare dashboard.

```js
https://example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
```


