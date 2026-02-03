# Email Handling

Agents can receive and reply to emails via Cloudflare Email Routing.

## Wrangler Config

```jsonc
{
  "durable_objects": {
    "bindings": [{ "name": "EmailAgent", "class_name": "EmailAgent" }]
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["EmailAgent"] }],
  "send_email": [
    { "name": "SEB", "destination_address": "reply@yourdomain.com" }
  ]
}
```

Configure Email Routing in Cloudflare dashboard to forward to your Worker.

## Implement onEmail

```typescript
import { Agent, AgentEmail } from "agents";
import PostalMime from "postal-mime";

type State = { emails: Array<{ from: string; subject: string; text: string; timestamp: Date }> };

export class EmailAgent extends Agent<Env, State> {
  initialState: State = { emails: [] };

  async onEmail(email: AgentEmail) {
    console.log("From:", email.from);
    console.log("To:", email.to);
    console.log("Subject:", email.headers.get("subject"));

    // Get raw email content
    const raw = await email.getRaw();

    // Parse with postal-mime
    const parsed = await PostalMime.parse(raw);

    // Update state
    this.setState({
      emails: [...this.state.emails, {
        from: email.from,
        subject: parsed.subject ?? "",
        text: parsed.text ?? "",
        timestamp: new Date()
      }]
    });

    // Reply
    await this.replyToEmail(email, {
      fromName: "My Agent",
      subject: `Re: ${email.headers.get("subject")}`,
      body: "Thanks for your email! I'll process it shortly.",
      contentType: "text/plain"
    });
  }
}
```

**Install postal-mime for parsing:**
```bash
npm install postal-mime
```

## Route Emails to Agent

```typescript
import { routeAgentRequest, routeAgentEmail, createAddressBasedEmailResolver } from "agents";

export default {
  async email(message, env) {
    await routeAgentEmail(message, env, {
      resolver: createAddressBasedEmailResolver("EmailAgent")
    });
  },

  async fetch(request, env) {
    return routeAgentRequest(request, env) ?? new Response("Not found", { status: 404 });
  }
};
```

## Custom Email Resolvers

### Header-Based Resolver

Routes based on X-Agent headers in replies:

```typescript
import { createHeaderBasedEmailResolver } from "agents";

await routeAgentEmail(message, env, {
  resolver: createHeaderBasedEmailResolver()
});
```

### Custom Resolver

```typescript
const customResolver = async (email, env) => {
  // Parse recipient to determine agent
  const [localPart] = email.to.split("@");
  
  if (localPart.startsWith("support-")) {
    return {
      agentName: "SupportAgent",
      agentId: localPart.replace("support-", "")
    };
  }
  
  return null; // Don't route
};

await routeAgentEmail(message, env, { resolver: customResolver });
```
