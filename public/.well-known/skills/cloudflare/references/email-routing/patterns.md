## Common Patterns

### 1. Allowlist Email Worker

```typescript
export default {
  async email(message, env, ctx) {
    const allowList = ["friend@example.com", "coworker@example.com"];
    if (allowList.indexOf(message.from) == -1) {
      message.setReject("Address not allowed");
    } else {
      await message.forward("inbox@corp");
    }
  },
};
```

### 2. Parse Email with postal-mime

```typescript
import * as PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime.default();
    const rawEmail = new Response(message.raw);
    const email = await parser.parse(await rawEmail.arrayBuffer());
    
    console.log({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      attachments: email.attachments
    });
    
    await message.forward("destination@example.com");
  },
};
```

### 3. Forward with Custom Headers

```typescript
export default {
  async email(message, env, 