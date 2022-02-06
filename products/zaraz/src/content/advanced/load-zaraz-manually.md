---
order:
pcx-content-type: reference
---

# Load Zaraz manually

If you turn off the [Auto-inject script](/reference/options) option, you will have to manually include the Zaraz script in your HTML, immediately before the `</head>` tag closes. The path to your script would be `/cdn-cgi/zaraz/i.js`, on your domain. Your script tag should look like this:

```html
<script src="/cdn-cgi/zaraz/i.js"></script>
```

With the script, your page HTML should be similar to the following:

```html
<html>
<head>
….
<script src="/cdn-cgi/zaraz/i.js"></script>
</head>
<body>
…
</body>
</html>
```