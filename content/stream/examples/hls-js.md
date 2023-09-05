---
type: example
summary: Example of video playback with Cloudflare Stream and the HLS reference player (hls.js)
tags:
  - Playback
pcx_content_type: configuration
title: hls.js
weight: 5
layout: example
---

[Run and edit this code in your browser on StackBlitz.](https://workers.new/stream/hls-js) 

```html
<html>
	<head>
		<script src="//cdn.jsdelivr.net/npm/hls.js@latest"></script>
	</head>
	<body>
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
	</body>
</html>
```

Refer to the [hls.js documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md) for more information.