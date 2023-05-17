---
pcx_content_type: how-to
title: Refactor a Worker to a Pages Function
---

# Refactor a Worker to a Pages Function

In this guide, you will learn how to refactor a Worker made to intake form submissions to a Pages Function that can be hosted on your Cloudflare Pages application. [Pages Functions](/pages/platform/functions/) is a serverless function that lives within the same project directory as your application and is deployed with Cloudflare Pages. It enables you to run server-side code that adds dynamic functionality without running a dedicated server. You may want to refactor a Worker to a Pages Function for one of these reasons: 

1. If you manage a serverless function that your Pages application depends on and wish to ship the logic without managing a Worker as a separate service.
2. If you are migrating your Worker to Pages Functions and want to use the routing and middleware capabilities of Pages Functions.

{{<Aside type= "note">}}

You can import your Worker to a Pages project without using Functions by creating a `_worker.js` file in the output directory of your Pages project. This [Advanced mode](/pages/platform/functions/advanced-mode/) requires writing your Worker with [Module syntax](/workers/learning/migrating-to-module-workers/). 

However, when using the `_worker.js` file in Pages, the entire `/functions` directory is ignored – including its routing and middleware characteristics.

{{</Aside>}}

## General refactoring steps 

1. Remove the `addEventListener()` method and its event response and replace it with the appropriate `OnRequest` method. Refer to [Functions](/pages/platform/functions/get-started/) to select the appropriate method for your Function.
2. Pass the `context` object as an argument to your new `OnRequest` method to access the properties of the context parameter: `request`,`env`,`params` and `next`.
3. Use middleware to handle logic that must be executed before or after route handlers. Learn more about [using Middleware](/pages/platform/functions/middleware/) in the Functions documentation.

## Background

To explain the process of refactoring, this guide uses a simple form submission example. 

Form submissions can be handled by Workers but can also be a good use case for Pages Functions, since forms are most times specific to a particular application. 

Assuming you are already using a Worker to handle your form, you would have deployed this Worker and then added the URL to your form action attribute in your HTML form. This means that when you change how the Worker handles your submissions, you must make changes to the Worker script. If the logic in your Worker is used by more than one application, Pages Functions would not be a good use case.

However, it can be beneficial to use a [Pages Function](/pages/platform/functions/) when you would like to organize your function logic in the same project directory as your application.

Building your application using Pages Functions can help you manage your client and serverless logic from the same place and make it easier to write and debug your code. 

## Handle form entries with Airtable and Workers

An [Airtable](https://airtable.com/) is a low-code platform for building collaborative applications. It helps customize your workflow, collaborate, and handle form submissions. For this example, you will utilize Airtable's form submission feature.

[Airtable](https://airtable.com/) can be used to store entries of information in different tables for the same account. When creating a Worker for handling the submission logic, the first step is to use [Wrangler](/workers/wrangler/install-and-update/) to initialize a new Worker within a specific folder or at the root of your application. 

This step creates the boilerplate to write your Airtable submission Worker. After writing your Worker, you can deploy it to Cloudflare's global network after you [configure your project for deployment](/workers/wrangler/configuration/). Refer to the Workers documentation for a full tutorial on how to [handle form submission with Workers](/workers/tutorials/handle-form-submissions-with-airtable/).

The following code block shows an example of a Worker that handles Airtable form submission.

Every Worker will have the default response to a `fetch` action with a `request` handler. The `submitHandler` async function is called if the pathname of the work is `/submit`. This function checks that the request method is a `POST` request and then proceeds to parse and post the form entries to Airtable using your credentials, which you can store using [Wrangler `secret`](/workers/wrangler/commands/#secret).

```js
---
filename: worker/index.js
---
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});


async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/submit") {
    return submitHandler(request);
  }

  return fetch(request.url);
}

async function submitHandler(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }
  const body = await request.formData();

  const { first_name, last_name, email, phone, subject, message } =
    Object.fromEntries(body);

  const reqBody = {
    fields: {
      "First Name": first_name,
      "Last Name": last_name,
      Email: email,
      "Phone number": phone,
      Subject: subject,
      Message: message,
    },
  };

  return HandleAirtableData(reqBody);
}

const HandleAirtableData = (body) => {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-type": `application/json`,
      },
    }
  );
};
```


### Refactor your Worker

To refactor the above Worker, go to your Pages project directory and create a `/functions` folder. In `/functions`, create a `form.js` file. This file will handle form submissions. 

Then, in the `form.js` file, export a single `onRequestPost`:

```js
---
filename: functions/form.js
---
export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}

```

Every Worker has an `addEventListener` to listen for `fetch` events, but you will not need this in a Pages Function. Instead, you will `export` a single `onRequest` function, and depending on the HTTPS request it handles, you will name it accordingly. Refer to [Function documentation](/pages/platform/functions/get-started/) to select the appropriate method for your function.

The above code takes a `request` and `env` as arguments which pass these properties down to the `submitHandler` function, which remains unchanged from the [original Worker](#handle-form-entries-with-airtable-and-workers). However, because Functions allow you to specify the HTTPS request type, you can remove the `request.method` check in your Worker. This is now handled by Pages Functions by naming the `onRequest` handler.

Now, you will introduce the `submitHandler` function and pass the `env` parameter as a property. This will allow you to access `env` in the `HandleAirtableData` function below. This function does a `POST` request to Airtable using your Airtable credentials:

```js
---
filename: functions/form.js
highlight: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
---
export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}

async function submitHandler({ request, env }) {
  const body = await request.formData();

  const { first_name, last_name, email, phone, subject, message } =
    Object.fromEntries(body);

  const reqBody = {
    fields: {
      "First Name": first_name,
      "Last Name": last_name,
      Email: email,
      "Phone number": phone,
      Subject: subject,
      Message: message,
    },
  };

  return HandleAirtableData({ body: reqBody, env: env });
}
```

Finally, create a `HandleAirtableData` function. This function will send a `fetch` request to Airtable with your Airtable credentials and the body of your request:

```js
---
filename: functions/form.js
---

// ..
const HandleAirtableData = async function onRequest({ body, env }) {
  return fetch(
    `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
      env.AIRTABLE_TABLE_NAME
    )}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
        "Content-type": `application/json`,
      },
    }
  );
};
```

You can test your Function [locally using Wrangler](/pages/platform/functions/local-development/). By completing this guide, you have successfully refactored your form submission Worker to a form submission Pages Function.

## Related resources

- [HTML forms](/pages/tutorials/forms/)
- [Plugins documentation](/pages/platform/functions/plugins/)
- [Functions documentation](/pages/platform/functions/)

