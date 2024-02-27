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
  tags:
    - "automatic-speech-recognition"
    - "openai"
  properties:
    - property_id: "info"
      value: "https://openai.com/research/whisper"
    - property_id: "constellation_config"
      value: "max_requests_per_min:\n  default: 120\n  accounts:\n    32118455: 1440 # ai.cloudflare.com staging\n    50147400: 1440 # ai.cloudflare.com\n    52406228: 1440 # rchen@ account\n    7677216: 1440 # Cloudflare Stream Production Account\n\ndownloads:\n  \"model-repository/whisper/1/huggingface-model-cache/merges.txt\":\n    url: https://pub-aad46f56812e4449bc904f1d68336a16.r2.dev/whisper-base/merges.txt\n    sha256sum: 78f27f801feb4283ae969d4cadacb28fc051b655647402b1a252c7079ea11c46\n  \"model-repository/whisper/1/huggingface-model-cache/vocab.json\":\n    url: https://pub-aad46f56812e4449bc904f1d68336a16.r2.dev/whisper-base/vocab.json\n    sha256sum: 8f680bba319e01a653d2e8a5dbc17a9157179e0576e6ce74ce0c06356c6e24f9\n  \"model-repository/whisper/1/huggingface-model-cache/tokenizer.json\":\n    url: https://pub-aad46f56812e4449bc904f1d68336a16.r2.dev/whisper-base/tokenizer.json\n    sha256sum: dfc530298b6fbed1a97c6472c575b026453706e2a204c7f7038f2c9d208b0759\n  \"model-repository/whisper/1/huggingface-model-cache/model.safetensors\":\n    url: https://pub-aad46f56812e4449bc904f1d68336a16.r2.dev/whisper-base/model.safetensors\n    sha256sum: 07cadb9f25677c8d50df603e66a98fbd842cce45047139baeb16e6219a1e807b\n\nneurons:\n  metrics:\n    - name: audio_seconds\n      neuron_cost: 0.6856583333\nmax_concurrent_requests: 1"
task_type: "automatic-speech-recognition"
model_display_name: "whisper"
layout: "model"
title: "whisper"
---
