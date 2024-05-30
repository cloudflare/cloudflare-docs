
## Responses

{{- $loraFlag := false }}
{{- range .Params.model.properties }}
{{- if and (eq .property_id "lora") (eq .value "true") }}
{{- $loraFlag = true }}
{{- end }}
{{- end }}

{{ if not $loraFlag }}

### Using streaming

The recommended method to handle text generation responses is streaming.


LLMs work internally by generating responses sequentially using a process of repeated inference — the full output of a LLM model is essentially a sequence of hundreds or thousands of individual prediction tasks. For this reason, while it only takes a few milliseconds to generate a single token, generating the full response takes longer, on the order of seconds.

You can use streaming to start displaying the response as soon as the first tokens are generated, and append each additional token until the response is complete. This yields a much better experience for the end user. Displaying text incrementally as it's generated not only provides instant responsiveness, but also gives the end-user time to read and interpret the text.

To enable, set the `stream` parameter to true.

Using the Workers API:

```javascript
const stream = await env.AI.run('{{ .Params.model.name }}', {
  stream: true,
  messages,
});

return new Response(stream, {
  headers: {
    "content-type": "text/event-stream",
  },
});
```

Using the REST API:

```bash
$ curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{{ .Params.model.name }} \
  -X POST \
  -H "Authorization: Bearer {API_TOKEN}" \
  -d '{ "stream": true, "messages": [{ "role": "system", "content": "You are a friendly assistant" }, { "role": "user", "content": "Why is pizza so good?" }]}'
```

Streaming responses use [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events); the are easy to use, simple to implement on the server side, standardized, and broadly available across many platforms natively or as a polyfill.

```bash
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<account>/ai/run/{{ .Params.model.name }}" \
-H "Authorization: Bearer {API_TOKEN}" \
-H "Content-Type:application/json" \
-d '{ "prompt": "where is new york?", "stream": true }'

data: {"response":"New"}

data: {"response":" York"}

data: {"response":" is"}

data: {"response":" located"}

data: {"response":" in"}

data: {"response":" the"}

...

data: [DONE]
```

#### Handling streaming responses in the client

Below is an example showing how to parse this response in JavaScript, from the browser:

```js
const source = new EventSource("/"); // Workers AI streaming endpoint
source.onmessage = (event) => {
  if (event.data == "[DONE]") {
    source.close();
    return;
  }
  const data = JSON.parse(event.data);
  el.innerHTML += data.response;
};
```

### Non-streaming response

Non-streaming responses may be helpful in some contexts, and they are possible; however, be aware that we limit the maximum number of output sequence tokens to avoid timeouts. Whenever possible, use streaming.

{{ end }}

```json
{
  "response": "The origin of the phrase \"Hello, World\" is not well-documented, but it is believed to have originated in the early days of computing. In the 1970s, when personal computers were first becoming popular, many programming languages, including C, had a simple \"Hello, World\" program that was used to demonstrate the basics of programming.\nThe idea behind the program was to print the words \"Hello, World\" on the screen, and it was often used as a first program for beginners to learn the basics of programming. Over time, the phrase \"Hello, World\" became a common greeting among programmers and computer enthusiasts, and it is now widely recognized as a symbol of the computing industry.\nIt's worth noting that the phrase \"Hello, World\" is not a specific phrase that was coined by any one person or organization, but rather a catchphrase that evolved over time as a result of its widespread use in the computing industry."
}
```
