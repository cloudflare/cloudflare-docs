## Best Practices

### Security

- **Never commit tokens**: Use environment variables
- **Minimal permissions**: Create scoped API tokens
- **Rotate tokens**: Regularly refresh tokens
- **Use token expiration**: Set expiry dates
- **Audit token usage**: Monitor API logs

### Performance

- **Batch operations**: Group related API calls
- **Use pagination wisely**: Don't fetch all data if unnecessary
- **Cache responses**: Store rarely-changing data locally
- **Parallel requests**: Use `Promise.all()` for independent operations
- **Handle rate limits**: Implement exponential backoff

### Code organization

```typescript
// Create reusable client instance
export const cfClient = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
});

// Wrap common operations
export async function