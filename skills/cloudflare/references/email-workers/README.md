# Cloudflare Email Workers Skill

Expert guidance for building, configuring, and deploying Cloudflare Email Workers.

## Overview

Email Workers let you programmatically process incoming emails using Cloudflare Workers runtime. Use them to build custom email routing logic, spam filters, auto-responders, ticket systems, notification handlers, and more.

## Core Architecture

### Event Handler (ES Modules)

```typescript
export default {
  async email(message, env, ctx) {
    // Process email
    await message.forward("destination@example.com");
  },
};
```

### Event Handler (Service Worker - Deprecated)

```typescript
addEventListener("email", async (event) => {
  await event.message.forward("destination@example.com");
});
```

**Use ES modules format for all new projects.**

## ForwardableEmailMessage API

### Properties

```typescript
interface ForwardableEmailMessage {
  readonly from: string;        // Envelope From
  readonly to: string;          // Envelope To
  readonly headers: Headers;    // Message headers
  readonly raw: ReadableStream; // Raw message stream
  readonly rawSize: number;     // Message size in bytes
  
  setReject(reason: string): void;
  forward(rcptTo: string, headers?: Headers): Promise<void>;
  reply(message: EmailMessage): Promise<void>;
}
```

### Key Methods

- **`setReject(reason)`**: Reject with permanent SMTP error
- **`forward(rcptTo, headers?)`**: Forward to verified destination (only `X-*` headers allowed)
- **`reply(message)`**: Reply to sender with new EmailMessage

### EmailMessage for Sending

```typescript
interface EmailMessage {
  readonly from: string;
  readonly to: string;
}

// Usage
import { EmailMessage } from "cloudflare:email";
const msg = new EmailMessage(from, to, rawMimeContent);
```

## Common Patterns

### 1. Allowlist

```typescript
export default {
  async email(message, env, ctx) {
    const allowList = ["friend@example.com", "coworker@example.com"];
    if (!allowList.includes(message.from)) {
      message.setReject("Address not allowed");
    } else {
      await message.forward("inbox@corp.example.com");
    }
  },
};
```

### 2. Blocklist

```typescript
export default {
  async email(message, env, ctx) {
    const blockList = ["spam@example.com", "badactor@example.com"];
    if (blockList.includes(message.from)) {
      message.setReject("Blocked sender");
    } else {
      await message.forward("inbox@corp.example.com");
    }
  },
};
```

### 3. Parse Email with postal-mime

```typescript
import * as PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime.default();
    const rawEmail = new Response(message.raw);
    const email = await parser.parse(await rawEmail.arrayBuffer());
    
    // email contains: headers, from, to, subject, html, text, attachments
    console.log(email.subject, email.from);
    
    await message.forward("inbox@example.com");
  },
};
```

### 4. Auto-Reply

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from 'mimetext';

export default {
  async email(message, env, ctx) {
    const msg = createMimeMessage();
    msg.setSender({ name: 'Support Team', addr: 'support@example.com' });
    msg.setRecipient(message.from);
    msg.setHeader('In-Reply-To', message.headers.get('Message-ID'));
    msg.setSubject('Re: Your inquiry');
    msg.addMessage({
      contentType: 'text/plain',
      data: 'Thank you for contacting us. We will respond within 24 hours.',
    });

    const replyMessage = new EmailMessage(
      'support@example.com',
      message.from,
      msg.asRaw()
    );

    await message.reply(replyMessage);
    await message.forward("team@example.com");
  },
};
```

### 5. Conditional Routing by Subject

```typescript
export default {
  async email(message, env, ctx) {
    const subject = message.headers.get('Subject') || '';
    
    if (subject.toLowerCase().includes('billing')) {
      await message.forward("billing@example.com");
    } else if (subject.toLowerCase().includes('support')) {
      await message.forward("support@example.com");
    } else {
      await message.forward("general@example.com");
    }
  },
};
```

### 6. Store Email in KV/R2

```typescript
import * as PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime.default();
    const rawEmail = new Response(message.raw);
    const email = await parser.parse(await rawEmail.arrayBuffer());
    
    // Store in KV
    const key = `email:${Date.now()}:${message.from}`;
    await env.EMAIL_ARCHIVE.put(key, JSON.stringify({
      from: email.from,
      subject: email.subject,
      receivedAt: new Date().toISOString(),
    }));
    
    await message.forward("inbox@example.com");
  },
};
```

### 7. Webhook Notification

```typescript
export default {
  async email(message, env, ctx) {
    const subject = message.headers.get('Subject');
    
    // Notify via webhook
    ctx.waitUntil(
      fetch('https://hooks.slack.com/services/YOUR/WEBHOOK/URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New email from ${message.from}: ${subject}`,
        }),
      })
    );
    
    await message.forward("inbox@example.com");
  },
};
```

### 8. Size-Based Filtering

```typescript
export default {
  async email(message, env, ctx) {
    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    
    if (message.rawSize > MAX_SIZE) {
      message.setReject("Message too large");
    } else {
      await message.forward("inbox@example.com");
    }
  },
};
```

## Wrangler Configuration

### Minimal Config (Local Dev)

```jsonc
// wrangler.jsonc
{
  "send_email": [
    {
      "name": "EMAIL"
    }
  ]
}
```

```toml
# wrangler.toml
[[send_email]]
name = "EMAIL"
```

### Full Production Config

```toml
name = "email-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Email binding
[[send_email]]
name = "EMAIL"

# Add KV for email archival
[[kv_namespaces]]
binding = "EMAIL_ARCHIVE"
id = "your-kv-namespace-id"

# Add secrets for API keys
[vars]
WEBHOOK_URL = "https://example.com/webhook"
```

## Local Development

### Test Receiving Email

```bash
npx wrangler dev
```

```bash
curl --request POST 'http://localhost:8787/cdn-cgi/handler/email' \
  --url-query 'from=sender@example.com' \
  --url-query 'to=recipient@example.com' \
  --header 'Content-Type: application/json' \
  --data-raw 'From: sender@example.com
To: recipient@example.com
Subject: Test Email

Hello world'
```

### Test Sending Email

Wrangler writes sent emails to local `.eml` files:

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from 'mimetext';

export default {
  async fetch(request, env, ctx) {
    const msg = createMimeMessage();
    msg.setSender({ name: 'Test', addr: 'sender@example.com' });
    msg.setRecipient('recipient@example.com');
    msg.setSubject('Test from Worker');
    msg.addMessage({
      contentType: 'text/plain',
      data: 'Hello from Email Worker',
    });

    const message = new EmailMessage(
      'sender@example.com',
      'recipient@example.com',
      msg.asRaw()
    );
    await env.EMAIL.send(message);
    
    return Response.json({ ok: true });
  }
};
```

Visit `http://localhost:8787/` to trigger. Check terminal for `.eml` file path.

## Deployment

### Prerequisites

1. Enable Email Routing in Cloudflare dashboard
2. Add verified destination address
3. Configure wrangler.toml

### Deploy

```bash
npx wrangler deploy
```

### Bind to Route

In Cloudflare dashboard:
1. Go to Email Routing → Email Workers
2. Create route (e.g., `hello@yourdomain.com`)
3. Bind route to your deployed Worker

## Limits

| Limit | Value |
|-------|-------|
| Max message size | 25 MiB |
| Max rules | 200 |
| Max destination addresses | 200 |
| Workers CPU (free tier) | Limited (upgrade for more) |

### CPU Limit Errors

Monitor with `wrangler tail`:

```bash
npx wrangler tail
```

Look for `EXCEEDED_CPU` errors. Consider:
- Upgrading to Workers Paid plan
- Optimizing email parsing logic
- Using `ctx.waitUntil()` for non-critical operations

## Best Practices

### 1. Use Verified Destinations Only

`forward()` only works with verified destination addresses in your Cloudflare account.

### 2. Handle Large Emails

```typescript
export default {
  async email(message, env, ctx) {
    if (message.rawSize > 20 * 1024 * 1024) {
      // Don't parse huge emails synchronously
      ctx.waitUntil(processLargeEmail(message, env));
      await message.forward("inbox@example.com");
      return;
    }
    
    // Normal processing
  },
};
```

### 3. Use ctx.waitUntil for Async Operations

```typescript
export default {
  async email(message, env, ctx) {
    // Forward immediately
    await message.forward("inbox@example.com");
    
    // Non-blocking operations
    ctx.waitUntil(
      Promise.all([
        logToAnalytics(message),
        notifySlack(message),
        updateDatabase(message),
      ])
    );
  },
};
```

### 4. Add Custom Headers When Forwarding

```typescript
export default {
  async email(message, env, ctx) {
    const customHeaders = new Headers();
    customHeaders.set('X-Processed-By', 'Email-Worker');
    customHeaders.set('X-Original-To', message.to);
    
    await message.forward("inbox@example.com", customHeaders);
  },
};
```

### 5. Parse Headers Safely

```typescript
export default {
  async email(message, env, ctx) {
    const subject = message.headers.get('Subject') || '(no subject)';
    const messageId = message.headers.get('Message-ID') || '';
    
    // Avoid throwing on missing headers
  },
};
```

### 6. Type Safety

```typescript
interface Env {
  EMAIL: SendEmail;
  EMAIL_ARCHIVE: KVNamespace;
  WEBHOOK_URL: string;
}

export default {
  async email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext) {
    // Fully typed
  },
};
```

## Common Use Cases

1. **Spam/Allowlist Filtering**: Block/allow senders
2. **Auto-Responders**: Reply with canned responses
3. **Ticket Creation**: Parse email, create support ticket
4. **Email Archival**: Store emails in KV/R2/D1
5. **Notification Routing**: Forward to Slack/Discord/webhooks
6. **Size Filtering**: Reject oversized attachments
7. **Domain Routing**: Route by sender domain
8. **Subject-Based Routing**: Route by keywords in subject
9. **Attachment Handling**: Extract and store attachments
10. **Email Analytics**: Track email metrics

## Dependencies

### Recommended npm Packages

```json
{
  "dependencies": {
    "postal-mime": "^2.3.3",    // Parse incoming emails
    "mimetext": "^4.0.0"         // Compose outgoing emails
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.0.0",
    "wrangler": "^3.0.0"
  }
}
```

## Troubleshooting

### Email Not Forwarding

- Verify destination address in Cloudflare dashboard
- Check Email Routing is enabled
- Verify route binding in dashboard
- Check `wrangler tail` for errors

### CPU Limit Errors

- Upgrade to Workers Paid plan
- Use `ctx.waitUntil()` for heavy operations
- Avoid synchronous parsing of large emails

### Local Dev Not Working

- Ensure `send_email` binding in wrangler config
- Use correct curl format with `--data-raw`
- Check wrangler version (`npx wrangler --version`)

## Advanced Patterns

### Multi-Tenant Email Processing

```typescript
export default {
  async email(message, env, ctx) {
    const [localPart, domain] = message.to.split('@');
    
    // Route based on subdomain or local part
    const tenantId = extractTenantId(localPart);
    const config = await env.TENANT_CONFIG.get(tenantId, 'json');
    
    if (config?.forwardTo) {
      await message.forward(config.forwardTo);
    } else {
      message.setReject("Unknown recipient");
    }
  },
};
```

### Attachment Extraction

```typescript
import * as PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime.default();
    const rawEmail = new Response(message.raw);
    const email = await parser.parse(await rawEmail.arrayBuffer());
    
    // Process attachments
    for (const attachment of email.attachments) {
      const key = `attachments/${Date.now()}-${attachment.filename}`;
      ctx.waitUntil(
        env.ATTACHMENTS.put(key, attachment.content, {
          metadata: {
            contentType: attachment.mimeType,
            from: email.from.address,
          },
        })
      );
    }
    
    await message.forward("inbox@example.com");
  },
};
```

### Conditional Auto-Reply with Rate Limiting

```typescript
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from 'mimetext';

export default {
  async email(message, env, ctx) {
    const rateKey = `rate:${message.from}`;
    const lastReply = await env.RATE_LIMIT.get(rateKey);
    
    if (!lastReply) {
      // Send auto-reply
      const msg = createMimeMessage();
      msg.setSender({ name: 'Auto Reply', addr: 'noreply@example.com' });
      msg.setRecipient(message.from);
      msg.setSubject('Received your message');
      msg.addMessage({
        contentType: 'text/plain',
        data: 'Thank you for contacting us.',
      });
      
      const reply = new EmailMessage('noreply@example.com', message.from, msg.asRaw());
      await message.reply(reply);
      
      // Rate limit: 1 reply per hour
      ctx.waitUntil(
        env.RATE_LIMIT.put(rateKey, Date.now().toString(), { expirationTtl: 3600 })
      );
    }
    
    await message.forward("inbox@example.com");
  },
};
```

## Related Documentation

- [Email Routing Setup](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)
- [Workers Platform](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/)
