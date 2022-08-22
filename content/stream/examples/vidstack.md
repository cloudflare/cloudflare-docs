---
type: example
summary: Example of video playback with Cloudflare Stream and Vidstack
tags:
  - Playback
pcx_content_type: configuration
title: Vidstack
weight: 4
layout: example
---

[Run and edit this code in your browser on Stackblitz.](https://workers.new/stream/vidstack) 

```html
<html>
	<head>
		<script
			type="module"
			src="https://cdn.jsdelivr.net/npm/@vidstack/player@next/cdn/bundle.js"
		></script>
	</head>
	<body>
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
	</body>
</html>
```

Refer to the [Vidstack documentation](https://www.vidstack.io/docs/player/getting-started/quickstart/hls.html) for more information.