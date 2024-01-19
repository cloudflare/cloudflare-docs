---
title: Integrate with frameworks
pcx_content_type: reference
weight: 25
---

# Integrate with frameworks

## Next.js

Image transformations can be used automatically with the Next.js [`<Image />` component](https://nextjs.org/docs/api-reference/next/image).

To use image transformations, define a global image loader or multiple custom loaders for each `<Image />` component.

Next.js will request the image with the correct parameters for width and quality.

Image transformations will be responsible for caching and serving an optimal format to the client.

### Global Loader

To use Images with **all** your app's images, define a global [loaderFile](https://nextjs.org/docs/pages/api-reference/components/image#loaderfile) for your app.

Add the following settings to the **next.config.js** file located at the root our your Next.js application.

```js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
}
```

Next, create the `imageLoader.js` file in the specified path (relative to the root of your Next.js application).

```js
const normalizeSrc = src => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader ({ src, width, quality }) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};
```

### Custom Loaders

Alternatively, define a loader for each `<Image />` component.


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

For local development, you can enable [Resize images from any origin checkbox](/images/get-started/) for your zone. Then, replace `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}` with an absolute URL path:

`https://<YOUR_DOMAIN.COM>/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`

{{</Aside>}}