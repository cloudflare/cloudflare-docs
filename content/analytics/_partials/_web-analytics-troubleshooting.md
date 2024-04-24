---
_build:
  publishResources: false
  render: never
  list: never
---

For Cloudflare to automatically add the JavaScript snippet, your pages need to have valid HTML.

For example, Cloudflare would not be able to enable Web Analytics on a page like this:

```html
---
header: index.html
---
Hello world.
```

For Web Analytics to correctly insert the JavaScript snippet, you would need valid HTML output, such as:

```html
---
header: index.html
---
<!DOCTYPE html>
<html>
	<head>
		<title>Title</title>
	</head>
	<body>

		<p>Hello world.</p>

	</body>
</html>
```