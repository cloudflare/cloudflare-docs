---
_build:
  publishResources: false
  render: never
  list: never
---

For Cloudflare to automatically add the JavaScript snippet, your pages needs to generate a valid HTML page and contain opening and closing `<body>` tags.

For example, Cloudflare would not be able to enable Web Analytics on a page like this:

```html
---
header: index.html
---
Hello world.
```

Your HTML needs more structure for Web Analytics to correctly insert the JavaScript snippet, such as:

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