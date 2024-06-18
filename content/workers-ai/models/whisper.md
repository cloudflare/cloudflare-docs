---
model:
  id: "c1c12ce4-c36a-4aa6-8da4-f63ba4b8984d"
  source: 1
  name: "@cf/openai/whisper"
  description: "Automatic speech recognition (ASR) system trained on 680,000 hours of multilingual and multitask supervised data"
  task:
    id: "dfce1c48-2a81-462e-a7fd-de97ce985207"
    name: "Automatic Speech Recognition"
    description: "Automatic speech recognition (ASR) models convert a speech signal, typically an audio input, to text."
  tags: []
  properties:
    - property_id: "beta"
      value: "false"
    - property_id: "info"
      value: "https://openai.com/research/whisper"
task_type: "automatic-speech-recognition"
model_display_name: "whisper"
layout: "model"
weight: 100
title: "whisper"
json_schema:
  input: "{\n  \"oneOf\": [\n    {\n      \"type\": \"string\",\n      \"format\": \"binary\"\n    },\n    {\n      \"type\": \"object\",\n      \"properties\": {\n        \"audio\": {\n          \"type\": \"array\",\n          \"items\": {\n            \"type\": \"number\"\n          }\n        }\n      },\n      \"required\": [\n        \"audio\"\n      ]\n    }\n  ]\n}"
  output: "{\n  \"type\": \"object\",\n  \"contentType\": \"application/json\",\n  \"properties\": {\n    \"text\": {\n      \"type\": \"string\"\n    },\n    \"word_count\": {\n      \"type\": \"number\"\n    },\n    \"words\": {\n      \"type\": \"array\",\n      \"items\": {\n        \"type\": \"object\",\n        \"properties\": {\n          \"word\": {\n            \"type\": \"string\"\n          },\n          \"start\": {\n            \"type\": \"number\"\n          },\n          \"end\": {\n            \"type\": \"number\"\n          }\n        }\n      }\n    },\n    \"vtt\": {\n      \"type\": \"string\"\n    }\n  },\n  \"required\": [\n    \"text\"\n  ]\n}"

---
