## Common Pitfalls

### ❌ Skipping Server-Side Validation
```javascript
// WRONG - Client-only, easily bypassed
<form onsubmit="return window.turnstileToken ? true : false">
```

```javascript
// CORRECT - Always validate server-side
app.post('/submit', async (req, res) => {
  const validation = await validateTurnstile(token, ip);
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid' });
  }
  // Process request
});
```

### ❌ Exposing Secret Key
```javascript
// WRONG - Secret in client code
const SECRET = 'your-secret-key';
fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  body: JSON.stringify({ secret: SECRET, response: token })
});
```

```javascript
// CORRECT - Validation on server only
// Client sends token to your backend
// Backend validates with secret key
```

### ❌ Not Handling Token Expiry
```javascript
// WRONG - No expiry handling
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm(turnstileToken);
})