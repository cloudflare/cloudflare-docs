## Best Practices

### 1. Use Async/Await
Always use `async/await` for cleaner asynchronous code:

```javascript
// Good
export default {
  async fetch(request, env, ctx) {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    return new Response(JSON.stringify(data));
  },
};

// Avoid
export default {
  fetch(request, env, ctx) {
    return fetch('https://api.example.com')
      .then(response => response.json())
      .then(data => new Response(JSON.stringify(data)));
  },
};
```

### 2. Clone Responses Before Reading
Response bodies can only be read once:

```javascript
export default {
  async fetch(request, env, ctx) {
    const response = await fetch('https://api.example.com');
    
    // Clone before caching
    ctx.waitUntil(cach