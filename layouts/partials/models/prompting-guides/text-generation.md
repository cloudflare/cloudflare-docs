{{- $loraFlag := false }}
{{- range .Params.model.properties }}
{{- if and (eq .property_id "lora") (eq .value "true") }}
{{- $loraFlag = true }}
{{- end }}
{{- end }}

## Prompting

Part of getting good results from text generation models is asking questions correctly. LLMs are usually trained with specific predefined templates, which should then be used with the model's tokenizer for better results when doing inference tasks.

{{ if $loraFlag }}
We recommend using unscoped prompts for inference with LoRA.
{{ else }}
There are two ways to prompt text generation models with Workers AI:
{{ end }}
{{ if not $loraFlag }}

### Scoped prompts

This is the **recommended** method. With scoped prompts, Workers AI takes the burden of knowing and using different chat templates for different models and provides a unified interface to developers when building prompts and creating text generation tasks.

Scoped prompts are a list of messages. Each message defines two keys: the role and the content.

Typically, the role can be one of three options:

- **system** - System messages define the AI's personality. You can use them to set rules and how you expect the AI to behave.
- **user** - User messages are where you actually query the AI by providing a question or a conversation.
- **assistant** - Assistant messages hint to the AI about the desired output format. Not all models support this role.

OpenAI has a [good explanation](https://docs.airops.com/docs/llm-step#openai-chat-model-specifications) of how they use these roles with their GPT models. Even though chat templates are flexible, other text generation models tend to follow the same conventions.

Here's an input example of a scoped prompt using system and user roles:

```javascript
{
  messages: [
    { role: "system", content: "you are a very funny comedian and you like emojis" },
    { role: "user", content: "tell me a joke about cloudflare" },
  ],
};
```

Here's a better example of a chat session using multiple iterations between the user and the assistant.

```javascript
{
  messages: [
    { role: "system", content: "you are a professional computer science assistant" },
    { role: "user", content: "what is WASM?" },
    { role: "assistant", content: "WASM (WebAssembly) is a binary instruction format that is designed to be a platform-agnostic" },
    { role: "user", content: "does Python compile to WASM?" },
    { role: "assistant", content: "No, Python does not directly compile to WebAssembly" },
    { role: "user", content: "what about Rust?" },
  ],
};
```

Note that different LLMs are trained with different templates for different use cases. While Workers AI tries its best to abstract the specifics of each LLM template from the developer through a unified API, you should always refer to the model documentation for details (we provide links in the table above.) For example, instruct models like Codellama are fine-tuned to respond to a user-provided instruction, while chat models expect fragments of dialogs as input.

{{ end }}

### Unscoped prompts

You can use unscoped prompts to send a single question to the model without worrying about providing any context. Workers AI will automatically convert your { prompt: } input to a reasonable default scoped prompt internally so that you get the best possible prediction.

```javascript
{
  prompt: "tell me a joke about cloudflare";
}
```

You can also use unscoped prompts to construct the model chat template manually. In this case, you can use the raw parameter. Here's an input example of a [Mistral](https://docs.mistral.ai/models/#chat-template) chat template prompt:

```javascript
{
  prompt: "<s>[INST]comedian[/INST]</s>\n[INST]tell me a joke about cloudflare[/INST]",
  raw: true
};
```
