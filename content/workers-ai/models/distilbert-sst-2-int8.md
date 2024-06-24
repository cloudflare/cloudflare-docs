---
model:
  id: "eaf31752-a074-441f-8b70-d593255d2811"
  source: 1
  name: "@cf/huggingface/distilbert-sst-2-int8"
  description: "Distilled BERT model that was finetuned on SST-2 for sentiment classification"
  task:
    id: "19606750-23ed-4371-aab2-c20349b53a60"
    name: "Text Classification"
    description: "Sentiment analysis or text classification is a common NLP task that classifies a text input into labels or classes."
  tags: []
  properties:
    - property_id: "beta"
      value: "false"
    - property_id: "info"
      value: "https://huggingface.co/Intel/distilbert-base-uncased-finetuned-sst-2-english-int8-static"
task_type: "text-classification"
model_display_name: "distilbert-sst-2-int8"
layout: "model"
weight: 100
title: "distilbert-sst-2-int8"
json_schema:
  input: "{\n  \"type\": \"object\",\n  \"properties\": {\n    \"text\": {\n      \"type\": \"string\",\n      \"minLength\": 1\n    }\n  },\n  \"required\": [\n    \"text\"\n  ]\n}"
  output: "{\n  \"type\": \"array\",\n  \"contentType\": \"application/json\",\n  \"items\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"score\": {\n        \"type\": \"number\"\n      },\n      \"label\": {\n        \"type\": \"string\"\n      }\n    }\n  }\n}"

---
