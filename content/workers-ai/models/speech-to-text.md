---
title: Speech to text
pcx_content_type: get-started
weight: 2
---

# Speech to text
Whisper is an automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data collected from the web.

* ID: **@cf/openai/whisper** - used to `run` this model via SDK or API
* Name: Automatic speech recognition (ASR) system from OpenAI
* Task: speech-recognition
* License type: MIT
* [Terms + Information](https://github.com/openai/whisper/blob/main/LICENSE)

## Examples

{{<tabs labels="worker | curl">}}
{{<tab label="worker" default="true">}}

```ts
import { Ai } from "@cloudflare/ai";

export interface Env {
	AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const res: any = await fetch("https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav");
    const blob = await res.arrayBuffer();

    const ai = new Ai(env.AI);
    const input = {
    audio: [...new Uint8Array(blob)],
    };

    const response = await ai.run("@cf/openai/whisper", input);

    return Response.json({ input: { audio: [] }, response });
  }
}
```

{{</tab>}}

{{<tab label="curl">}}

```sh
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/openai/whisper \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  --data-binary @talking-llama.mp3
```

{{</tab>}}
{{</tabs>}}

## API schema
The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  oneOf: [
    { type: "string", format: "binary" },
    {
      type: "object",
      properties: {
        audio: {
          type: "array",
          items: {
            type: "number",
          },
        },
      },
    },
  ],
}
```

### Output

```json
{
  type: "object",
  properties: {
    text: {
      type: "string",
    },
  },
}
```