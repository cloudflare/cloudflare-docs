## Common Use Cases

### 1. API Gateway
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Route based on path
    if (url.pathname.startsWith('/v1/users')) {
      return fetch('https://users-api.example.com' + url.pathname);
    }
    
    if (url.pathname.startsWith('/v1/posts')) {
      return fetch('https://posts-api.example.com' + url.pathname);
    }
    
    return new Response('API Gateway', { status: 404 });
  },
};
```

### 2. A/B Testing
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookie = request.headers.get('Cookie');
    
    // Check existing variant
    let variant = cookie?.includes('ab_test=B') ? 'B' : null;
    
    if (!variant) {
      // Assign 50/50 split
      variant = Math.random() < 0.5 ? 'A' : 'B';
    }
    
    const targetUrl = variant === 'A' 
      ? 'https://a.example.com' 
      : 'https://b.example.com';
    
    con