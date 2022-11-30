---
title: Integration with frameworks
pcx_content_type: reference
weight: 9
---

# Integration with frameworks

## Next.js

Image Resizing can be used automatically with Next.js' [`next/image` component](https://nextjs.org/docs/api-reference/next/image). With a [custom loader](https://nextjs.org/docs/api-reference/next/image#loader) which applies Cloudflare Image Resizing, `next/image` will set an optimal width and quality for a given client.

```js
import Image from 'next/image';

const normalizeSrc = src => {
  return src.startsWith('/') ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

const MyImage = props => {
  return (
    <Image
      loader={cloudflareLoader}
      src="/me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
};
```

{{<Aside type="note">}}

For local development, you can enable [Resize images from any origin checkbox](/images/image-resizing/enable-image-resizing/) for your zone. Then, replace `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}` with an absolute URL path:

`https://<YOUR_DOMAIN.COM>/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`

{{</Aside>}}