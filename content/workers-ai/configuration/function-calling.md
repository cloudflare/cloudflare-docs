---
pcx_content_type: configuration
weight: 4
title: Function Calling
---

# Function Calling
Function calling enables people to take Large Language Models (LLMs) and use the model response to interact with external APIs. The developer usually defines a set of functions and the required input schema for each function, which we call `tools`. The model then intelligently understands when it needs to do a tool call, and it returns a JSON output which can be fed to another API.

In essence, you define a tool's API schema, the LLM then generates a JSON object based on the schema, then you use the JSON object as an input to make an API call.

## What models support function calling?
There are open-source models which have been fine-tuned to do function calling. When browsing our [model catalog](/workers-ai/models/), look for models with the function calling property beside it. For example, [@hf/nousresearch/hermes-2-pro-mistral-7b](/workers-ai/models/hermes-2-pro-mistral-7b/) is a fine-tuned variant of Mistral 7B that you can use for function calling.

## Basic function calling: input schema
With function calling, you define an array of tools with the name, description, parameters, properties, and the required parameters. The example below shows how you would pass a tool called `getWeather` in an inference request to a model.

```js
const response = await env.AI.run("@hf/nousresearch/hermes-2-pro-mistral-7b", {
      messages: [{ role: "user", content: "what is the weather in london?" }],
      tools: [
        {
          name: "getWeather",
          description: "Return the weather for a latitude and longitude",
          parameters: {
            type: "object",
            properties: {
              latitude: {
                type: "string",
                description: "The latitude for the given location",
              },
              longitude: {
                type: "string",
                description: "The longitude for the given location",
              },
            },
            required: ["latitude", "longitude"],
          },
        },
      ],
    });
	
return new Response(JSON.stringify(response.tool_calls));
````

The LLM will then return a JSON object with the required properties and the name of the tool that was called. You can then pass this JSON object to make an API call.

```json
[{"arguments":{"latitude":"51.5074","longitude":"-0.1278"},"name":"getWeather"}]
```

For a working example on how to do function calling, take a look at our [demo app](https://github.com/craigsdennis/lightbulb-moment-tool-calling/blob/main/src/index.ts).