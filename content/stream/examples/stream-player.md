---
type: example
summary: Example of video playback with the Cloudflare Stream Player
tags:
  - Playback
pcx_content_type: configuration
title: Stream Player
weight: 1
layout: example
---

[Run and edit this code in your browser on StackBlitz.](https://workers.new/stream/stream-player) 

```html
<html>
	<head> </head>
	<body>
		<div style="position: relative; padding-top: 56.25%">
			<iframe
				src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/iframe?poster=https%3A%2F%2Fcustomer-m033z5x00ks6nunl.cloudflarestream.com%2Fb236bde30eb07b9d01318940e5fc3eda%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
				style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%"
				allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
				allowfullscreen="true"
			>
			</iframe>
		</div>
	</body>
</html>
```

Refer to the [Using the Stream Player](/stream/viewing-videos/using-the-stream-player/) for more information.