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
						'https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8'
					);
				});
			}

			video.play();
		</script>
	</body>
</html>
```

Refer to the [hls.js documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md) for more information.