## Common Use Cases

### 1. Header Manipulation
**Use for**: Adding/removing/modifying request or response headers
```javascript
// Add timestamp header
const timestamp = Date.now().toString(16);
modifiedRequest.headers.set("X-Hex-Timestamp", timestamp);

// Remove sensitive headers
newResponse.headers.delete("X-Powered-By");
newResponse.headers.delete("Server");

// Set security headers
newResponse.headers.set("X-Frame-Options", "DENY");
newResponse.headers.set("X-Content-Type-Options", "nosniff");
```

### 2. Cookie Modification
**Use for**: Setting dynamic cookies, expiry times, A/B testing
```javascript
const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();
const group = request.headers.get("userGroup") == "premium" ? "A" : "B";
response.headers.append(
  "Set-Cookie",
  `testGroup=${group}; Expires=${expiry}; path=/`
);
```

### 3. Bot Management
**Use for**: Routing bots, honeypots, rate limiting
```javascript
// Access bot score from request.cf
const botScore = reques