---
model:
  id: "2169496d-9c0e-4e49-8399-c44ee66bff7d"
  source: 1
  name: "@cf/openai/whisper-tiny-en"
  description: "Whisper is a pre-trained model for automatic speech recognition (ASR) and speech translation. Trained on 680k hours of labelled data, Whisper models demonstrate a strong ability to generalize to many datasets and domains without the need for fine-tuning. This is the English-only version of the Whisper Tiny model which was trained on the task of speech recognition."
  task:
    id: "dfce1c48-2a81-462e-a7fd-de97ce985207"
    name: "Automatic Speech Recognition"
    description: "Automatic speech recognition (ASR) models convert a speech signal, typically an audio input, to text."
  tags: []
  properties:
    - property_id: "beta"
      value: "true"
task_type: "automatic-speech-recognition"
model_display_name: "whisper-tiny-en"
layout: "model"
weight: 0
title: "whisper-tiny-en"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"audio\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"number\"\n          }\n        }\n      },\n      \"required\": [\n        \"audio\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"text\": {\n      \"type\": \"string\"\n    },\n    \"word_count\": {\n      \"type\": \"number\"\n    },\n    \"words\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"word\": {\n            \"type\": \"string\"\n          },\n          \"start\": {\n            \"type\": \"number\"\n          },\n          \"end\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    },\n    \"vtt\": {\n      \"type\": \"string\"\n    }\n  },\n  \"required\": [\n    \"text\"\n  ]\n}"

---
