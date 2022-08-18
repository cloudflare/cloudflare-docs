---
type: example
summary: Example of Vidstack playback with Cloudflare Stream
tags:
  - Playback
pcx_content_type: configuration
title: Video playback with Vidstack
layout: example
---

[Run and edit this code in your browser on Stackblitz.](https://stackblitz.com/edit/js-819kwb?file=index.js,package.json,index.html) 

Refer to the [Vidstack documentation](https://www.vidstack.io/docs/player/getting-started/quickstart/hls.html) for more information.

```html
<vds-media>
  <vds-hls
    controls
    poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
  >
    <video
      controls
      src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8"
      preload="none"
    ></video>
  </vds-hls>
</vds-media>
```