---
type: Use the OpenAI v4 SDK to stream responses from OpenAI
summary: Stream.
tags:
  - AI
pcx_content_type: configuration
title: Stream OpenAI API Responses
weight: 1001
layout: example
---


```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const openai = new OpenAI({
			apiKey: "YOUR API KEY"  // defaults to "OPENAI_API_KEY" environment variable
		});

		// make our request to the OpenAI API
		const stream = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: 'Share your excitement about the OpenAI TypeScript / Node SDK working Cloudflare Workers!' }],
			stream: true,
		});

		// Using our readable and writable to handle streaming data
		let { readable, writable } = new TransformStream()

		let writer = writable.getWriter()
		const textEncoder = new TextEncoder();

		// loop over the data as it is streamed from OpenAI and write it using our writeable
		for await (const part of stream) {
			console.log(part.choices[0]?.delta?.content || '');
			writer.write(textEncoder.encode(part.choices[0]?.delta?.content || ''));
		}
		
		writer.close();

		// Send readable back to the browser so it can read the stream content
		return new Response(readable);
	},
};
```

{{<Aside type= "Note">}}
In order to run this code you'll need to install the OpenAI SDK by running `npm i openai`.
{{</Aside>}}