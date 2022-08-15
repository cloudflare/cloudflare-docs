
---
title: Video.js
weight: 1
meta:
  title: Example of Video.js playback with Cloudflare Stream
---

### Video.js

* [Video.js API docs](https://docs.videojs.com/)
* [Example Code](https://stackblitz.com/edit/cloudflare-stream-examples?file=examples%2Fvideo-js.html&initialPath=video-js&terminal=start-stackblitz)

``` html
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
      <!-- Replace the src URL with the HLS manifest URL for a given video
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