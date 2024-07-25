---
pcx_content_type: reference
title: API Reference
weight: 7
meta:
  title: API Reference - Embedded function calling
---

# API Reference

Learn more about the API reference for [embedded function calling](/workers-ai/function-calling/embedded).

## runWithTools

This wrapper method enables you to do embedded function calling. You pass it the AI binding, model, inputs (`messages` array and `tools` array), and optional configurations.

{{<definitions>}}

- `AI Binding`{{<type>}}Ai{{</type>}}
  - The AI binding, such as `env.AI`.
- `model`{{<type>}}BaseAiTextGenerationModels {{</type>}}
  - The ID of the model that supports function calling. For example, `@hf/nousresearch/hermes-2-pro-mistral-7b`.
- `input`{{<type>}}Object {{</type>}}
  - `messages`{{<type>}}RoleScopedChatInput[] {{</type>}}
  - `tools`{{<type>}}AiTextGenerationToolInputWithFunction[] {{</type>}}
- `config`{{<type>}}Object {{</type>}}
  - `streamFinalResponse`{{<type>}}boolean {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `maxRecursiveToolRuns`{{<type>}}number {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `strictValidation`{{<type>}}boolean {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `verbose`{{<type>}}boolean {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `trimFunction`{{<type>}}boolean {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}} - For the `trimFunction`, you can pass it `autoTrimTools`, which is another helper method we've devised to automatically choose the correct tools (using an LLM) before sending it off for inference. This means that your final inference call will have fewer input tokens.
    {{</definitions>}}

## createToolsFromOpenAPISpec

This method lets you automatically create tool schemas based on OpenAPI specs, so you don't have to manually write or hardcode the tool schemas. You can pass the OpenAPI spec for any API in JSON or YAML format.

`createToolsFromOpenAPISpec` has a config input that allows you to perform overrides if you need to provide headers like Authentication or User-Agent.

{{<definitions>}}

- `spec`{{<type>}}string {{</type>}}
  - The OpenAPI specifiction in either JSON or YAML format, or a URL to a remote OpenAPI specification.
- `config`{{<type>}}Config {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}} - Configuration options for the createToolsFromOpenAPISpec function
  - `overrides`{{<type>}}ConfigRule[] {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `matchPatterns`{{<type>}}RegExp[] {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - `options`{{<type>}}Object {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}} {
  `verbose`{{<type>}}boolean {{</type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  }
  {{</definitions>}}
