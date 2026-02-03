## Troubleshooting

### Widget Not Rendering
- Check browser console for errors
- Verify sitekey is correct
- Ensure JavaScript is enabled
- Check for CSP (Content Security Policy) blocking script
- Verify not using `file://` protocol (only `http://` and `https://` work)

### Validation Failing
- Check secret key is correct
- Verify token not expired (>5 min old)
- Ensure token not already validated (single-use)
- Check server can reach Siteverify API
- Verify not using test secret key in production

### CSP Configuration
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://challenges.cloudflare.com; 
               frame-src https://challenges.cloudflare.com;">
```

## Reference

### Official Docs
- [Turnstile Overview](https://developers.cloudflare