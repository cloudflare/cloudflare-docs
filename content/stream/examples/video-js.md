---
type: example
summary: Example of Video.js playback with Cloudflare Stream
tags:
  - Playback
pcx_content_type: configuration
title: Video playback with Video.js
weight: 1001
layout: example
---

[Video.js API docs](https://docs.videojs.com/)

{{<Aside>}}
[**Run and edit this code in your browser on Stackblitz**](https://stackblitz.com/edit/cloudflare-stream-examples?file=examples%2Fvideo-js.html&initialPath=video-js&terminal=start-stackblitz)
{{</Aside>}}

```html
<html>
  <head>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js"></script>
  </head>
  <body>
    <video-js id="vid1" controls preload="auto">
      <!-- Replace the src URL with the HLS or DASH manifest URL for a given video
    You can access this from the Cloudflare Stream dashboard or via the Stream API -->
      <source
        src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8"
        type="application/x-mpegURL"
      />
    </video-js>

    <script>
      const vid = document.getElementById('vid1');
      const player = videojs(vid);
    </script>
  </body>
</html>
```