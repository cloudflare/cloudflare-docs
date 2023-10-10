---
updated: 2023-06-13
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Handle form submissions with Airtable
layout: single
---

# Handle form submissions with Airtable

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will use [Cloudflare Workers](/workers/) and [Airtable](https://airtable.com) to persist form submissions from a front-end user interface. Airtable is a free-to-use spreadsheet solution that has an approachable API for developers. Workers will handle incoming form submissions and use Airtable's [REST API](https://airtable.com/api) to asynchronously persist the data in an Airtable base (Airtable's term for a spreadsheet) for later reference.

![GIF of a complete Airtable and serverless function integration](/images/workers/tutorials/airtable/example.gif)

## 1. Create a form

For this tutorial, you will be building a Workers function that handles input from a contact form. The form this tutorial references will collect a first name, last name, email address, phone number, message subject, and a message.

{{<Aside type="note" header="Build a form">}}
If this is your first time building a form and you would like to follow a tutorial to create a form with Cloudflare Pages, refer to the [HTML forms](/pages/tutorials/forms) tutorial.
{{</Aside>}}

Review a simplified example of the form used in this tuttorial. Note that the `action` parameter of the `<form>` tag should point to the deployed Workers application that you will build in this tutorial.

```html
---
header: Your front-end code
highlight: [1]
---
<form action="https://workers-airtable-form.signalnerve.workers.dev/submit" method="POST">
  <div>
    <label for="first_name">First name</label>
    <input type="text" name="first_name" id="first_name" autocomplete="given-name" placeholder="Ellen" required />
  </div>

  <div>
    <label for="last_name">Last name</label>
    <input type="text" name="last_name" id="last_name" autocomplete="family-name" placeholder="Ripley" required />
  </div>

  <div>
    <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="email" placeholder="eripley@nostromo.com" required />
    </div>
  </div>

  <div>
    <label for="phone">
      Phone
      <span>Optional</span>
    </label>
    <input type="text" name="phone" id="phone" autocomplete="tel" placeholder="+1 (123) 456-7890" />
  </div>

  <div>
    <label for="subject">Subject</label>
    <input type="text" name="subject" id="subject" placeholder="Your example subject" required />
  </div>

  <div>
    <label for="message">
      Message
      <span>Max 500 characters</span>
    </label>
    <textarea id="message" name="message" rows="4" placeholder="Tenetur quaerat expedita vero et illo. Tenetur explicabo dolor voluptatem eveniet. Commodi est beatae id voluptatum porro laudantium. Quam placeat accusamus vel officiis vel. Et perferendis dicta ut perspiciatis quos iste. Tempore autem molestias voluptates in sapiente enim doloremque." required></textarea>
  </div>

  <div>
    <button type="submit">
      Submit
    </button>
  </div>
</form>
```

## 2. Create a Worker project

To handle the form submission, create and deploy a Worker that parses the incoming form data and prepares it for submission to Airtable.

Create a new `airtable-form-handler` Worker project:

```sh
---
header: Create a new Worker
---
$ npm create cloudflare@latest airtable-form-handler
```

When configuring your Worker:

* Choose `"Hello World" script` for the type of application you would like to create.
* Select `No` to using TypeScript.
* Select `No` to deploying your Worker.

## 3. Configure an Airtable base

When your Worker is complete, it will send data up to an Airtable base via Airtable's REST API.

If you do not have an Airtable account, create one (the free plan is sufficient to complete this tutorial). In Airtable's dashboard, create a new base by selecting **Start from scratch**.

After you have created a new base, set it up for use with the front-end form. Delete the existing columns, and create six columns, with the following field types:

| Field name   | Airtable field type |
| ------------ | ------------------- |
| First Name   | "Single line text"  |
| Last Name    | "Single line text"  |
| Email        | "Email"             |
| Phone Number | "Phone number"      |
| Subject      | "Single line text"  |
| Message      | "Long text"         |

Note that the field names are case-sensitive. If you change the field names, you will need to exactly match your new field names in the API request you make to Airtable later in the tutorial. Finally, you can optionally rename your table -- by defaulte it will have a name like Table 1. In the below code, we assume the table has been renamed with a more descriptive name, like `Form Submissions`.

Next, navigate to [Airtable's API page](https://airtable.com/api) and select your new base. Note that you must be logged into Airtable to see your base information. In the API documentation page, find your **Airtable base ID**. 

You will also need to create a **Personal access token** that you'll use to access your Airtable base. You can do so by visiting the [Personal access tokens](https://airtable.com/create/tokens) page on Airtable's website and creating a new token. Make sure that you configure the token in the following way:

- Scope: the `data.records:write` scope must be set on the token
- Access: access should be granted to the base you have been working with in this tutorial

The results access token should now be set in your application. To make the token available in your codebase, use the [`wrangler secret`](/workers/wrangler/commands/#secret) command. The `secret` command encrypts and stores environment variables for use in your function, without revealing them to users.

Run `wrangler secret put`, passing `AIRTABLE_ACCESS_TOKEN` as the name of your secret:

```sh
---
header: Set the `AIRTABLE_ACCESS_TOKEN` secret with Wrangler
---
$ wrangler secret put AIRTABLE_ACCESS_TOKEN
Enter the secret text you would like assigned to the variable AIRTABLE_ACCESS_TOKEN on the script named airtable-form-handler:
******
🌀  Creating the secret for script name airtable-form-handler
✨  Success! Uploaded secret AIRTABLE_ACCESS_TOKEN.
```

Before you continue, review the keys that you should have from Airtable:

1.  **Airtable Table Name**: The name for your table, like Form Submissions.
2.  **Airtable Base ID**: The alphanumeric base ID found at the top of your base's API page.
3.  **Airtable Access Token**: A Personal Access Token created by the user to access information about your new Airtable base.

## 4. Submit data to Airtable

With your Airtable base set up, and the keys and IDs you need to communicate with the API ready, you will now set up your Worker to persist data from your form into Airtable.

In your Worker project's `worker.js` file, replace the default code with a Workers fetch handler that can respond to requests. When the URL requested has a pathname of `/submit`, you will handle a new form submission, otherwise, you will return a `404 Not Found` response.

```js
---
filename: worker.js
---
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === "/submit") {
      await submitHandler(request, env)
    }
    return new Response('Not found', { status: 404 })
  }
}
```

The `submitHandler` has two functions. First, it will parse the form data coming from your HTML5 form. Once the data is parsed, use the Airtable API to persist a new row (a new form submission) to your table:

```js
---
filename: worker.js
---
async function submitHandler (request, env) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405
    })
  }
  const body = await request.formData();

  const {
    first_name,
    last_name,
    email,
    phone,
    subject,
    message
  } = Object.fromEntries(body)

  // The keys in "fields" are case-sensitive, and
  // should exactly match the field names you set up
  // in your Airtable table, such as "First Name".
  const reqBody = {
    fields: {
      "First Name": first_name,
      "Last Name": last_name,
      "Email": email,
      "Phone Number": phone,
      "Subject": subject,
      "Message": message
    }
  }
  await createAirtableRecord(env, reqBody)
}

// Existing code
// export default ...
```

While the majority of this function is concerned with parsing the request body (the data being sent as part of the request), there are two important things to note. First, if the HTTP method sent to this function is not `POST`, you will return a new response with the status code of [`405 Method Not Allowed`](https://httpstatuses.com/405).

The variable `reqBody` represents a collection of fields, which are key-value pairs for each column in your Airtable table. By formatting `reqBody` as an object with a collection of fields, you are creating a new record in your table with a value for each field.

Then you call `createAirtableRecord` (the function you will define next). The `createAirtableRecord` function accepts a `body` parameter, which conforms to the Airtable API's required format — namely, a JavaScript object containing key-value pairs under `fields`, representing a single record to be created on your table:

```js
---
filename: worker.js
---
async function createAirtableRecord(env, body) {
  try {
    const result = fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json', 
      }
    })
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Existing code
// async function submitHandler
// export default ...
```

To make an authenticated request to Airtable, you need to provide four constants that represent data about your Airtable account, base, and table name. You have already set `AIRTABLE_ACCESS_TOKEN` using `wrangler secret`, since it is a value that should be encrypted. The **Airtable base ID** and **table name**, and `FORM_URL` are values that can be publicly shared in places like GitHub. Use Wrangler's [`vars`](/workers/wrangler/migration/v1-to-v2/wrangler-legacy/configuration/#vars) feature to pass public environment variables from your `wrangler.toml` file.

Add a `vars` table at the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
highlight: [7]
---
name = "workers-airtable-form"
main = "src/index.js"
compatibility_date = "2023-06-13"

[vars]
AIRTABLE_BASE_ID = "exampleBaseId"
AIRTABLE_TABLE_NAME = "Form Submissions"
```

With all these fields submitted, it is time to deploy your Workers serverless function and get your form communicating with it. First, publish your Worker:

```sh
---
header: Deploy your Worker
---
$ npx wrangler deploy
```

Your Worker project will deploy to a unique URL — for example, `https://workers-airtable-form.cloudflare.workers.dev`. This represents the first part of your front-end form's `action` attribute — the second part is the path for your form handler, which is `/submit`. In your front-end UI, configure your `form` tag as seen below:

```html
<form
  action="https://workers-airtable-form.cloudflare.workers.dev/submit"
  method="POST"
  class="..."
>
  <!-- The rest of your HTML form -->
</form>
```

After you have deployed your new form (refer to the [HTML forms](/pages/tutorials/forms) tutorial if you need help creating a form), you should be able to submit a new form submission and see the value show up immediately in Airtable:

![Example GIF of complete Airtable and serverless function integration](/images/workers/tutorials/airtable/example.gif)

## Conclusion

With this tutorial completed, you have created a Worker that can accept form submissions and persist them to Airtable. You have learned how to parse form data, set up environment variables, and use the `fetch` API to make requests to external services outside of your Worker.

## Related resources

- [Build a Slackbot](/workers/tutorials/build-a-slackbot)
- [Build a To-Do List Jamstack App](/workers/tutorials/build-a-jamstack-app)
- [Build a blog using Nuxt.js and Sanity.io on Cloudflare Pages](/pages/tutorials/build-a-blog-using-nuxt-and-sanity)
- [James Quick's video on building a Cloudflare Workers + Airtable integration](https://www.youtube.com/watch?v=tFQ2kbiu1K4)
