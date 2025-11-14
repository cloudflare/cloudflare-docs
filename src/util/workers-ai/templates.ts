// Input Templates

export const binaryAudio = () => "Raw binary audio data sent as request body";

export const binaryImage = () =>
	"The binding returns a ReadableStream with the image in JPEG or PNG format. Process the stream to access the binary image data.";

export const llmMessages = () => `{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant" },
    { "role": "user", "content": "Tell me about Cloudflare Workers" }
  ]
}`;

export const llmPrompt = () => `{
  "prompt": "Tell me about Cloudflare Workers"
}`;

export const gptOssResponses = (modelName?: string) => {
	const model = modelName || "@cf/openai/gpt-oss-*";
	return `{
  "model": "${model}",
  "input": "Tell me about Cloudflare Workers"
}`;
};

export const embeddingsQueryContexts = () => `{
  "query": "What is Cloudflare Workers?",
  "contexts": [
    {
      "text": "Cloudflare Workers is a serverless platform for building applications."
    },
    {
      "text": "Workers runs on Cloudflare's global network across 300+ cities."
    }
  ]
}`;

export const embeddingsText = () => `{
  "text": "Input text to embed"
}`;

export const asyncBatchEmbeddings = () => `{
  "requests": [
    {
      "text": "First text to embed"
    },
    {
      "text": "Second text to embed"
    }
  ]
}`;

export const asyncBatchLLM = () => `{
  "requests": [
    { "prompt": "First request" },
    { "prompt": "Second request" }
  ]
}`;

export const asrNova3 = () => `{
  "audio": {
    "body": "<base64 encoded audio data>",
    "contentType": "audio/wav"
  }
}`;

export const asrWhisperArray = () => `{
  "audio": "Base64 encoded value of the audio data"
}`;

export const asrFlux = (encoding: string, sampleRate: string) => `{
  "encoding": "${encoding}",
  "sample_rate": "${sampleRate}"
}`;

export const ttsPrompt = () => `{
  "prompt": "The text content to be converted to speech"
}`;

export const ttsText = () => `{
  "text": "The text content to be converted to speech"
}`;

export const textToImagePrompt = () => `{
  "prompt": "A serene landscape with mountains at sunset"
}`;

export const textToImageImg2Img = () => `{
  "prompt": "A serene landscape with mountains at sunset",
  "image": [255, 255, 255, ...]
}`;

// Output Templates

export const gptOssResponsesOutput = (modelName?: string) => {
	const model = modelName || "@cf/openai/gpt-oss-*";
	return `{
  "id": "id-1763094420786",
  "created_at": 1763094420,
  "model": "${model}",
  "object": "response",
  "output": [
    {
      "id": "rs_07ad32c779f7439e9e3e891c6aded66a",
      "content": [
        {
          "text": "Reasoning process and analysis...",
          "type": "reasoning_text"
        }
      ],
      "type": "reasoning"
    },
    {
      "id": "msg_f0c991ab24084f62b445c54f882190a3",
      "content": [
        {
          "text": "Generated text response from the model",
          "type": "output_text"
        }
      ],
      "role": "assistant",
      "status": "completed",
      "type": "message"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 7,
    "output_tokens": 1231,
    "total_tokens": 1238
  }
}`;
};

export const workersAIOutput = () => `{
  "result": {
    "response": "Generated text response from the model",
    "tool_calls": [],
    "usage": {
      "prompt_tokens": 86,
      "completion_tokens": 171,
      "total_tokens": 257
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}`;

export const chatCompletionOutput = (modelName?: string) => {
	const model = modelName || "@cf/ibm-granite/granite-4.0-h-micro";
	return `{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "${model}",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Generated response from the model"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}`;
};

export const textCompletionOutput = (modelName?: string) => {
	const model = modelName || "@cf/ibm-granite/granite-4.0-h-micro";
	return `{
  "id": "cmpl-123",
  "object": "text_completion",
  "created": 1677652288,
  "model": "${model}",
  "choices": [
    {
      "index": 0,
      "text": "Generated text from the model",
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}`;
};

export const streamingOutput = () => `data: {"response":"Hello","p":"user"}

data: {"response":" there","p":"user"}

data: {"response":"","usage":{"prompt_tokens":10,"completion_tokens":50,"total_tokens":60}}

data: [DONE]`;

export const asyncBatchResponse = (modelName?: string) => {
	const modelField = modelName ? `\n    "model": "${modelName}",` : "";
	return `{
  "result": {
    "status": "queued",
    "request_id": "768f15b7-4fd6-4498-906e-ad94ffc7f8d2",${modelField}
  },
  "success": true,
  "errors": [],
  "messages": []
}`;
};

export const embeddingsQueryOutput = () => `{
  "response": [
    {
      "id": 0,
      "score": 0.95
    },
    {
      "id": 1,
      "score": 0.87
    }
  ]
}`;

export const embeddingsContextsOutput = () => `{
  "response": [
    [0.123, -0.456, 0.789, ...],
    [0.234, -0.567, 0.890, ...]
  ],
  "shape": [2, 1024],
  "pooling": "mean"
}`;

export const embeddingsStandardOutput = () => `{
  "data": [
    [0.123, -0.456, 0.789, ...]
  ],
  "shape": [1, 768]
}`;

export const asrNova3Output = () => `{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The transcribed text from the audio",
            "confidence": 0.98,
            "words": [
              {
                "word": "The",
                "start": 0.0,
                "end": 0.2,
                "confidence": 0.99
              },
              {
                "word": "transcribed",
                "start": 0.2,
                "end": 0.6,
                "confidence": 0.97
              }
            ]
          }
        ]
      }
    ],
    "summary": {
      "result": "success",
      "short": "Audio transcription completed"
    }
  }
}`;

export const asrWhisperSegmentsOutput = () => `{
  "text": "The transcribed text from the audio",
  "word_count": 6,
  "transcription_info": {
    "language": "en",
    "language_probability": 0.99,
    "duration": 2.5,
    "duration_after_vad": 2.3
  },
  "segments": [
    {
      "start": 0.0,
      "end": 2.5,
      "text": "The transcribed text from the audio",
      "words": [
        {
          "word": "The",
          "start": 0.0,
          "end": 0.2
        },
        {
          "word": "transcribed",
          "start": 0.2,
          "end": 0.6
        }
      ]
    }
  ],
  "vtt": "WEBVTT\\n\\n00:00:00.000 --> 00:00:02.500\\nThe transcribed text from the audio"
}`;

export const asrWhisperWordsOutput = () => `{
  "text": "The transcribed text from the audio",
  "word_count": 6,
  "words": [
    {
      "word": "The",
      "start": 0.0,
      "end": 0.2
    },
    {
      "word": "transcribed",
      "start": 0.2,
      "end": 0.6
    }
  ],
  "vtt": "WEBVTT\\n\\n00:00:00.000 --> 00:00:00.200\\nThe\\n\\n00:00:00.200 --> 00:00:00.600\\ntranscribed"
}`;

export const asrFluxOutput = () => `{
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "sequence_id": 0,
  "event": "Update",
  "turn_index": 0,
  "audio_window_start": 0.0,
  "audio_window_end": 2.5,
  "transcript": "The transcribed text from the audio",
  "words": [
    {
      "word": "The",
      "confidence": 0.99
    },
    {
      "word": "transcribed",
      "confidence": 0.95
    }
  ],
  "end_of_turn_confidence": 0.85
}`;

export const ttsMelottsOutput = () => `{
  "audio": "base64-encoded audio data..."
}`;

export const textToImageOutput = () => `{
  "image": "base64-encoded image data..."
}`;
