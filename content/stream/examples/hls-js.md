---
type: example
summary: Example of hls.js playback with Cloudflare Stream
tags:
  - Playback
pcx_content_type: configuration
title: Video playback with hls.js
layout: example
---

[Run and edit this code in your browser on Stackblitz.](https://stackblitz.com/edit/js-819kwb?file=index.js,package.json,index.html) 

Refer to the [hls.js documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md) for more information.

```html
<script src="//cdn.jsdelivr.net/npm/hls.js@latest"></script>

<video id="video"></video>
<script>
  if (Hls.isSupported()) {
    const video = document.getElementById('video');
    const hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(
        'https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8'
      );
    });
  }

  video.play();
</script>
```