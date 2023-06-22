---
updated: 2023-06-14
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: OpenAI GPT function calling with JavaScript and Cloudflare Workers 
layout: single
---

# OpenAI GPT function calling with JavaScript and Cloudflare Workers 

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will learn to use [OpenAI function calling](https://platform.openai.com/docs/guides/gpt/function-calling) with JavaScript and Cloudflare Workers. Your Worker application will interact with the OpenAI API to define a function in your Worker code, have OpenAI tell you when to call that function and share those results with OpenAI to continue that conversation. For this guide, you will allow users to specify real-time data that needs to be pulled from a URL.

You will learn how to:

- Make an API call from Cloudflare Workers to OpenAI's API using JavaScript.
- Determine if OpenAI is indicating you should call a function in your code based on a user's input.
- Use Worker secrets with Wrangler.

---

## Create a Worker project

Create a Worker project in the command line:

```sh
---
header: Create a Worker project
---
$ npm create cloudflare@latest
```

For setup, select the following options:
* For `Where do you want to create your application?`, indicate `openai-function-calling-workers`.
* For `What type of application do you want to create?`, choose `"Hello World" script`.
* For `Do you want to use TypeScript?`, choose `no`.
* For `Do you want to deploy your application?`, choose `yes`.

Go to your new `openai-function-calling-workers` Worker project:

```sh
$ cd openai-function-calling-workers
```

Inside of your new `openai-function-calling-workers` directory, `src/worker.js` represents the entry point to your Cloudflare Workers application. You will configure this file for most of the tutorial.

You will also need a OpenAI account and API key for this tutorial. If you do not have one, [create a new OpenAI account](https://platform.openai.com/signup) and [create an API key](https://platform.openai.com/account/api-keys) to continue with this tutorial. Make sure to store you API key somewhere safe so you can use it later.

## Make a request to OpenAI

With your local environment set up, make your first request to OpenAI. You will use the OpenAI node library to interact with the OpenAI API. You will also be using the `axios-fetch` adapter to interact with OpenAI's node library on the edge. Install the OpenAI node library and `axios-fetch` adapter with `npm`:
```sh
npm install openai
npm install @vespaiach/axios-fetch-adapter
```

Initially, your generated `worker.js` file should look like this:
```js
---
filename: worker.js
---
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

Above `export default`, add the imports for `openai` and `axios-fetch`:
```js
import { Configuration, OpenAIApi } from "openai";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
```

Within your `fetch` function, set up the configuration and instantiate your `OpenAIApi` client:

```js
async fetch(request, env, ctx) {
  const configuration = new Configuration({
        apiKey: env.OPENAI_API_KEY,
        baseOptions: {
            adapter: fetchAdapter
        }
      });
      const openai = new OpenAIApi(configuration);

  return new Response('Hello World!');
},
```

To make this work, you need to use [`wrangler secret put`](/workers/wrangler/commands/#put-3) to set your `OPENAI_API_KEY`. This key is the API key you created earlier in the OpenAI dashboard:
```sh
npx wrangler secret put OPENAI_API_KEY
```

For local development, we'll also want to place this value in our `.dev.vars` file. Create a new file `.dev.vars` and add this line. Making sure to replace it with your own OpenAI API key:
```
OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>"
```

Now, make your request to the OpenAI [Chat Completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api) with your functions argument to indicate that you are enabling [function calling](https://platform.openai.com/docs/guides/gpt/function-calling) with this request.
```js
try{
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [{role: "user", content: "What's happening in the NBA today?"}],
    functions: [
      {
        name: "read_website_content",
        description: "Read the content on a given website",
        parameters: {
        type: "object",
        properties: {
          url: {
          type: "string",
          description: "The URL to the website to read ",
          }
        },
        required: ["url"],
        },
      }
    ]
  });

const msg = chatCompletion.data.choices[0].message;
console.log(msg.function_call)

return new Response('Hello World!');
} catch (e) {
  return new Response(e);
}
```

Review the arguments you are passing to OpenAI:

* **model**: The model you want OpenAI to use for your request.
* **messages**: A list containing the messages that are part of the conversation happening. In this guide, you only have one user message asking what is happening in the NBA today.
* **functions**: A list containing all the functions that you are telling OpenAI about. In this guide, you only have one function. Your function has the following properties:
    * **name**: The name of your function. You will be calling yours `read_website_content`.
    * **description**: A short description that lets OpenAI know what your function does. You are letting OpenAI know that your function reads the content on a given website.
    * **parameters**: The parameters that the function can accept described as a JSON Schema object. You will have one parameter called `url`.

After your request to OpenAI completes, you are logging the message back to confirm it is telling you to call your function. Run your code with `npx wrangler dev` and open it in a browser by pressing `b`. You should see the following in your terminal log:

```sh
Object {
  name: read_website_content,
  arguments: {
"url": "https://www.nba.com/"
}
```

Function calling intelligently determines what content to pass in the argument. Take note that you did not specify your `messages` `content` as `"what's happening on nba.com today?"`, but instead asked `"What's happening in the NBA today?"`. OpenAI determined that "https://www.nba.com" was the right URL to pass to your function.

## Building your `read_website_content()` function

Add the code to call your function when OpenAI determines you need to:
```js
 let websiteContent;

 if(msg.function_call.name === "read_website_content") {
    const url = JSON.parse(msg.function_call.arguments).url;
    websiteContent = await read_website_content(url);
    console.log(websiteContent);
 }
```

The above function does not exist. You need to create it. Use a node library called [`cheerio`](https://github.com/cheeriojs/cheerio) to the websites content. Run `npm` to install `cheerio`:
```sh
npm install cheerio
```

With cheerio installed, we can import it at the top of our file and immediately create our `read_website_content` function:
```js
import cheerio from "cheerio"; 

async function read_website_content(url) {
  console.log("reading website content");

  const response = await fetch(url);
  const body = await response.text();
  let cheerioBody = await cheerio.load(body);
  const resp = {
    website_body: cheerioBody("p").text(),
    url: url
  }
  return JSON.stringify(resp);
}
```

In this function, we take the url that we received back from OpenAI and we use JavaScript's [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to pull the content of the website, and then cheerio to pull out only the text of the website. We then create a JSON object for the response.

With this in place, we can run our code again to see that we're properly calling our function and pulling website data:
```sh
npx wrangler dev
```

When you open a browser, you should see the log of the website content in your terminal.

## Sending our function response back to OpenAI

The last part of our application is returning the data we got back from our function to OpenAI and having it answer the user's original question. Right after we log `websiteContent`, we'll make a second call to the chat completion API:
```js
const secondChatCompletion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo-0613",
  messages: [
    {role: "user", content: "What's happening in New York City today?"},
    msg,
    {
      role: "function",
      name: msg.function_call.name,
      content: websiteContent
    }
  ],
});

return new Response(secondChatCompletion.data.choices[0].message.content);
```

This one will look very similar to our first, but this time instead of passing the schema data about our function we're passing a message that contains the response we got back from our function. OpenAI will use this information to build it's response, which we'll output to the browser.

Run your code again by running `npx wrangler dev` and open it in your browser. This will now show you OpenAI's response using real-time information from the website. You can try other websites and topics by updating the user's message in your two API calls.

## Next steps

To deploy your application, run the `npx wrangler deploy` command to deploy your Worker application:

```sh
$ npx wrangler deploy
```

Reference the [finished code for this tutorial on GitHub](https://github.com/rickyrobinett/workers-sdk/tree/main/templates/examples/openai-function-calling).

To continue working with Workers and AI, refer to [the guide on using LangChaing and Cloudflare Workers together](https://blog.cloudflare.com/langchain-and-cloudflare/) or [how to build a ChatGPT plugin with Cloudflare Workers](https://blog.cloudflare.com/magic-in-minutes-how-to-build-a-chatgpt-plugin-with-cloudflare-workers/).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.gg/cloudflaredev) to connect with fellow developers and the Cloudflare team.
