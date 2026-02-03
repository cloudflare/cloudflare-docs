### HTTP Methods
```javascript
request.method // GET, POST, PUT, DELETE, etc.
```

### Response Constructors
```javascript
// Plain text
new Response("Hello", { status: 200 })

// JSON
Response.json({ key: "value" })

// HTML
new Response("<h1>Hi</h1>", { 
  headers: { "Content-Type": "text/html" }
})

// Redirect
Response.redirect("https://example.com", 301)
```

### Header Operations
```javascript
// Request headers
request.headers.get("X-Header")
request.headers.has("X-Header")
request.headers.set("X-Header", "value")
request.headers.delete("X-Header")

// Response headers (must clone first)
const res = new Response(response.body, response);
res.headers.set("X-Header", "value")
res.headers.append("Set-Cookie", "value")
res.headers.delete("X-Header")
```

### URL Operations
```javascript
const url = new URL(request.url);
url.hostname    // "example.com"
url.pathname    // "/path/to/page"
url.search      // "?query=value"
url.searchParams.get("query") // "value"
```

### Cloudflare Pr