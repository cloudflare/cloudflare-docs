<details>
  <summary>Streaming</summary>

```ts
import { Ai } from '@cloudflare/ai'

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: 'system', content: 'You are a friendly assistant' },
      { role: 'user', content: 'What is the origin of the phrase Hello, World' }
    ];

    const stream = await ai.run('{{ .Params.model.name }}', {
      messages,
      stream: true
    });

    return new Response(
      stream,
      { headers: { "content-type": "text/event-stream" } }
    );
  },
};
```

</details>

