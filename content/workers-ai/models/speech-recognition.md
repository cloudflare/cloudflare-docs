---
title: Automatic Speech Recognition
pcx_content_type: get-started
weight: 2
---

# Automatic Speech Recognition

Automatic speech recognition (ASR) models convert a speech signal, typically an audio input, to text.

* Task type: **speech-recognition**
* TypeScript class: **AiSpeechRecognition**

{{<render file="_npm-update.md">}}

## Available Embedding Models

List of available models in for this task type:

| Model ID                        | Description                   |
| ------------------------------- | ----------------------------- |
| `@cf/openai/whisper`                   | Automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data<br/>[More information](https://openai.com/research/whisper)<br/>  |

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

## Responses

Automatic speech recognition responses return both a single string `text` property with the audio transciption and an optional array of `words` with start and end timestamps if the model supports that.

Here's an example of the output from the `@cf/openai/whisper` model:

```json
{
  "text": "It is a good day",
  "word_count": 5,
  "words": [
    {
      "word": "It",
      "start": 0.5600000023841858,
      "end": 1
    },
    {
      "word": "is",
      "start": 1,
      "end": 1.100000023841858
    },
    {
      "word": "a",
      "start": 1.100000023841858,
      "end": 1.2200000286102295
    },
    {
      "word": "good",
      "start": 1.2200000286102295,
      "end": 1.3200000524520874
    },
    {
      "word": "day",
      "start": 1.3200000524520874,
      "end": 1.4600000381469727
    }
  ]
}
```


## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

### Input

```json
{
  "oneOf": [
    {
      "type": "string",
      "format": "binary"
    },
    {
      "type": "object",
      "properties": {
        "audio": {
          "type": "array",
          "items": {
            "type": "number"
          }
        }
      }
    }
  ]
}
```

TypeScript class: **AiSpeechRecognitionInput**

### Output

```json
{
  "type": "object",
  "contentType": "application/json",
  "properties": {
    "text": {
      "type": "string"
    },
    "word_count": {
      "type": "number"
    },
    "words": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "word": {
            "type": "string"
          },
          "start": {
            "type": "number"
          },
          "end": {
            "type": "number"
          }
        }
      }
    }
  },
  "required": [
    "text"
  ]
}
```

TypeScript class: **AiSpeechRecognitionOutput**
