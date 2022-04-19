---
pcx-content-type: how-to
title: Refactor a Worker to a Pages Function
---

# Refactor a Worker to a Pages Function

In this guide, you will learn how to refactor a Worker to a Pages Function that can be hosted with your application on Cloudflare Pages. You may want to do this if you manage a serverless function that your application depends on and wish to ship the logic without managing a Worker as a separate service.

# Handle form submissions in an application 

An example of a functionality that can be handled by a Worker but can also be a good use case for Pages Functions is a simple form. This is because forms are most times specific to a particular application. 

Assuming you are already using a Worker to handle your form, you would have deployed this Worker and then pointed your form action to the URL of the Worker. When you change how the Worker handles your submissions, you do so separately from your client. If the logic in your Worker is used by more than one application, it makes sense to leave it this way.  

However, it can be beneficial to use a [Pages Function](/pages/platform/functions/), which is a serverless function that lives within the same filesystem as your application and is deployed with Cloudflare Pages. Building your application this way can help you manage your client and serverless logic from the same place and make it easier to use and debug your code. 

# Handling form entries with Airtable with a Worker

 An [Airtable](https://airtable.com/) is a low-code platform for building collaborative applications. It helps customize your workflow, collaborate, and handle form submissions. For this example, you will utilize Airtable's form submission feature.

[Airtables](https://airtable.com/) can be used to store entries of information in different tables for the same account. When creating a Worker for handling the submission logic, the first step is to use [Wrangler](/workers/cli-wrangler/install-update/) to initialize a new Worker within a specific folder or at the root of your application. 

This step creates the boilerplate to write your Airtable submission Worker. After writing your Worker, you can deploy it to Cloudflare's edge network after you [configure your project for deployment](/workers/get-started/guide/#7-configure-your-project-for-deployment). Review the Workers documentation for a full tutorial on how to [handle form submission with Workers](/workers/tutorials/handle-form-submissions-with-airtable/).

The code block below shows an example of a Worker that handles Airtable form submission.

Every Worker will have the default response to a `fetch` action with a `request` handler. In the example below, you have a `submitHandler` async function that is called if the pathname of the work is `/submit`. This function checks that the request method is a `POST` request and then proceeds to parse and post the form entries to Airtable using your credentials, which you can store using [wrangler secret](/workers/cli-wrangler/commands/#secret).

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


# Using Pages Functions

[Pages Functions](/pages/platform/functions/) are serverless functions that run on Cloudflare Pages together with your application. They enable you to run server-side code to enable dynamic functionality without running a dedicated server. While the above code works perfectly, you can handle the form submission logic for your client in the same application with Pages Functions.

You can refactor your Airtable Worker to Pages Functions by doing the following. First, you will create a `functions` folder at the base of your application, and within this folder, you can create a `form.js` file to handle form submissions. Next, you will refactor the Worker code to fit the Pages Function syntax in this file.

## Refactoring your Worker

Every Worker has an `addEventListener` to listen for `fetch` events, but you will not need this in a Pages Function. Instead, you will `export` a single `OnRequest` function, and depending on the HTTPS request it handles, you will name it accordingly.  

In the case of accepting form submissions and posting to an Airtable, you will export a single `OnRequestPost` function like the example below:

```js
---
filename: functions/form.js
---
export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}

```

The above code takes a `request` and `env` as arguments which passes these props down to the `submitHandler` function, which remains unchanged from the original Worker. However, because Functions allow you to specify the HTTPS request type, you can remove the `request.method` check, which is handled by naming the request type. 

```js
---
filename: functions/form.js
---
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

The code block above shows that you pass the `env` parameter as props so we can access it in the `HandleAirtableData` function below. This function does a `POST` request to Airtable using your Airtable credentials.  

```js
---
filename: functions/form.js
---
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

You can test your function [locally using Wrangler 2](/pages/platform/functions/#develop-and-preview-locally).

# General refactoring steps 

1. Remove the `addEventListener()` method and its event response and replace it with the appropriate `OnRequest` method. 
2. Pass the `context` object as an argument to your new `OnRequest` method to access the properties of the context parameter: `request`,`env`,`params` and `next`.
3. Handle logic must be executed before or after route handles with middleware. Learn more about [using Middleware](/pages/platform/functions/#adding-middleware) in the Functions documentation.


