---
type: example
summary: Example of video playback with Cloudflare Stream and Video.js
tags:
  - Playback
pcx_content_type: configuration
title: Video.js
weight: 6
layout: example
---

[Run and edit this code in your browser on StackBlitz.](https://workers.new/stream/video-js) 

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

Refer to the [Video.js documentation](https://docs.videojs.com/) for more information.