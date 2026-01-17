## Best Practices

### Performance
1. **Keep code minimal**: 32KB limit, but aim for <10KB
2. **Avoid blocking operations**: 5ms execution limit
3. **Clone only when needed**: `new Request(request)` creates copy
4. **Cache strategically**: Use `caches.default` for repeated data
5. **Limit subrequests**: Plan-based limits (2-5)

### Security
1. **Validate input**: Never trust user data
2. **Use Web Crypto API**: For cryptographic operations
3. **Sanitize headers**: Remove sensitive information
4. **Check bot scores**: Use `request.cf.botManagement.score`
5. **Rate limit carefully**: Snippets run on every matching request

### Debugging
1. **Test in dashboard**: Use HTTP/Preview tabs
2. **Start simple**: Test with basic logic first
3. **Use custom headers**: Add debug headers to responses
4.