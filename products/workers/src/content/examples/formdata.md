---
order: 1000
type: example
summary: On any GET request, renders a HTML page with a simple <form> rendered. Upon <form> submission, a POST request is sent to this Worker which is parsed into a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instance. The FormData is then converted into an object and returned to the client as a JSON response.
tags:
  - FormData
  - Originless
pcx-content-type: configuration
---

# FormData

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const HTML = `
  <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <title>Example: FormData</title>
      <style>
        label {
          display: block;
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <form action="/" method="POST">
        <label for="first">First Name</label>
        <input id="first" name="first"/>

        <label for="last">Last Name</label>
        <input id="last" name="last"/>

        <label for="age">Age</label>
        <input id="age" name="age" type="number" min="18" step="1"/>

        <label for="awesome">
          <input id="awesome" name="awesome" type="checkbox" checked/>
          Cloudflare Workers are awesome!
        </label>

        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
`;
export default {
  async fetch(req) {
    // Respond with the HTML form
    if (req.method === "GET") {
      return new Response(HTML, {
        headers: {
          "Content-Type": "text/html;charset=utf8",
        },
      });
    }
    // Only accept POSTs now
    if (req.method !== "POST") {
      return new Response("send POST method");
    }
    // Parse request body as `FormData` instance
    let fdata = await req.formData();
    console.log("Got input:", [...fdata]);
    // FormData -> Object
    let json = Object.fromEntries(fdata);
    let output = JSON.stringify(json, null, 2);
    return new Response(output, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
```
