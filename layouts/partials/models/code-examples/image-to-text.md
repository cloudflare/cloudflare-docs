{{/* */}}

## Code Examples

<details>
  <summary>Workers - TypeScript</summary>

```ts
export interface Env {
  AI: Ai;
}


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const res = await fetch("https://cataas.com/cat");
    const blob = await res.arrayBuffer();
    const input = {
      image: [...new Uint8Array(blob)],
      prompt: "Generate a caption for this image",
      max_tokens: 512,
    };
    const response = await env.AI.run(
      "{{ .Page.Params.model.name}}",
      input
      );
    return new Response(JSON.stringify(response));
  },
} satisfies ExportedHandler<Env>;
```
</details>
