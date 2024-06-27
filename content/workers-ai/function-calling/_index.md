---
pcx_content_type: navigation
title: Function Calling
weight: 5
layout: wide
---

{{<heading-pill style="beta">}} Function calling {{</heading-pill>}}

Function calling enables people to take Large Language Models (LLMs) and use the model response to execute functions or interact with external APIs. The developer usually defines a set of functions and the required input schema for each function, which we call `tools`. The model then intelligently understands when it needs to do a tool call, and it returns a JSON output which the user needs to feed to another function or API.

In essence, function calling allows you to perform actions with LLMs by executing code or making additional API calls.

## How can I use function calling?
Workers AI has [embedded function calling](/workers-ai/function-calling/embedded-function-calling/) which allows you to execute function code alongside your inference calls. We have a package called `@cloudflare/ai-utils` to help facilitate this.

For industry-standard function calling, take a look at the documentation on [Traditional Function Calling](/workers-ai/function-calling/traditional-function-calling/).

To show you the value of embedded function calling, take a look at the example below that compares traditional function calling with embedded function calling.

{{<tabs labels="Traditional | Embedded">}}
  {{<tab label="Traditional" default="true">}}
  ```js
export default {
    async fetch(request, env, ctx) {
        const response = await env.AI.run(
            "@hf/nousresearch/hermes-2-pro-mistral-7b", {
                messages: [{ role: "user", content: "What's the weather in Austin, Texas?" }],
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
            }
        );

        const selected_tool = response.tool_calls[0];
        let res;

        if (selected_tool.name == 'getWeather') {
            try {
                const latitude = selected_tool.arguments.latitude;
                const longitude = selected_tool.arguments.longitude;

                const url = `https://api.weatherapi.com/v1/current.json?key=${env.WEATHERAPI_TOKEN}&q=${latitude},${longitude}`;
                res = await fetch(url).then((res) => res.json());
            }
            catch (error) {
                return error;
            };
        };

        const finalResponse = await env.AI.run("@hf/nousresearch/hermes-2-pro-mistral-7b", {
                messages: [
                    { role: "user", content: "What's the weather in Austin, Texas?" },
                    {
                        role: "assistant",
                        content: "",
                        tool_call: selected_tool.name,
                    },
                    {
                        role: "tool",
                        name: selected_tool.name,
                        content: JSON.stringify(res)
                    }
                ],
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
            }
        );

    return new Response(JSON.stringify(finalResponse));
    
    }
}
  ```
  {{</tab>}}
  {{<tab label="Embedded">}}
  ```js
//TODO: MAKE APPLES TO APPLES WITH TRADITIONAL
import { createToolsFromOpenAPISpec, runWithTools, autoTrimTools } from "@cloudflare/ai-utils"

export default {
	async fetch(request, env, ctx) {
		const response = await runWithTools(
			env.AI,
			"@hf/nousresearch/hermes-2-pro-mistral-7b",
			{
				messages: [{ role: "user",content: "Can you name me 5 repos created by Cloudflare"}],
				tools: [
					...(await createToolsFromOpenAPISpec("https://raw.githubusercontent.com/github/rest-api-description/main/descriptions-next/api.github.com/api.github.com.json"))
				]
			},
			{
				streamFinalResponse: true,
				maxRecursiveToolRuns: 5,
				trimFunction: autoTrimTools,
				verbose: true,
				strictValidation: true
			}
		)
		return new Response(JSON.stringify(response));
	};
}
  ```
  {{</tab>}}
{{</tabs>}}

## What models support function calling?
There are open-source models which have been fine-tuned to do function calling. When browsing our [model catalog](/workers-ai/models/), look for models with the function calling property beside it. For example, [@hf/nousresearch/hermes-2-pro-mistral-7b](/workers-ai/models/hermes-2-pro-mistral-7b/) is a fine-tuned variant of Mistral 7B that you can use for function calling.