---
pcx-content-type: how-to
title: Refactor a Worker to a Pages Function
---

# Refactor a Worker to a Pages Function

In this guide you will learn how to refactor a Worker to a Pages Function that can be hosted with your application on Cloudflare Pages. You may want to do this, if you are handling some logic that your application depends on as a serverless function and want to ship the logic together with your client without having to manage a Worker as a separate service.

# Handle form submissions in an application 

An example of a functionality that can be handled by a Worker but can also be a good usecase for Pages Functions is a simple form. This is because, forms are most times specific to a particular application. 

If you are already using a Worker for this, you would have deployed this Worker and then pointed your form action to the URL of the worker. Which means that when you want make changes to how Worker handles your submissions you do so separately from your Client. If the logic in your Worker is used by more than one application it makes sense to leave it this way. 

However, it can be beneficial to use [Pages Functions](/pages/platform/functions/), which is a serverless function that live within the same filesystem as your application and can be deployed with your frontend on Cloudflare Pages. This can help you manage your client and serverless logic from the same place and make it easier to use and debug your code. 


# Handling form entries with Airtable with a Worker

For a form submission use case, you can use an [Airtable](https://airtable.com/). An [Airtable](https://airtable.com/) is a low-code platform for building collaborative apps. It helps to customize your workflow, collaborate, handle form submissions and achieve ambitious outcomes. For this example, we will focus on the form submission feature of Airtable.

[Airtables](https://airtable.com/) can be used to store entires of information in different tables for the same account. When creating a Worker for handling the submission logic the first step is to use [wrangler](/workers/cli-wrangler/install-update/) to initialize a new Worker within a specific  folder or in the root of your application. 

This step creates the boilerplate to write your Airtable submission Worker. After writing your Worker you can deploy it to Cloudflare Edge network with your credentials. You can check the Workers documentation for a full tutorial on how to [handle form submission with workers](/workers/tutorials/handle-form-submissions-with-airtable/).

The code block below shows an example of a Worker that handles Airtable form submission.

Every Worker will have the default response to a `fetch` action with a `request` handler. Here you have a `submitHandler` async function that can be reached if the pathname of the work is `/submit`. This function checks that the request method is a `POST` request and then proceeds to parse and post the form entries to the Airtable using your credentials, which you can store using [wrangler secret](/workers/cli-wrangler/commands/#secret).

```js
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

[Pages Functions](/pages/platform/functions/) are serverless functions that run on Cloudflare Pages togther with your application. They enable you to run server-side code to enable dynamic functionality without running a dedicated server. Which is a good usecase for our Airtable example.

While the above code works perfectly, you can handle the form submission logic for your client in the same app with Pages Functions.

First, you will create a `functions` folder in the base of your application and within this folder you can create a `form.js` file to handle form submissions. In this file you will refactor the worker code to fit the Pages Function syntax.

## Refactoring the worker 

Every worker has a `addEventListener` to listen for fetch events but you will not be needing this in a Pages Function, You will `export` a single `OnRequest` function and depending on the HTTPS request it handles you will name it accordly. 

In the case of accepting form submissions and posting to an airtable you will export a single `OnRequestPost` function like so:

```js
export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}

```

The above code takes a `request` and `env` as arguments which passes this props down to the `submitHandler` function, which remains unchanged from the original Worker. However, because Functions allow you to specify the HTTPS request type you can remove the `request.method` check, as this is handled by naming the request type. 

```js
async function submitHandler({ request, env }) {
	const body = await request.formData();

	const { first_name, last_name, email, phone, subject, message } =
		Object.fromEntries(body);

	const reqBody = {
		fields: {
			'First Name': first_name,
			'Last Name': last_name,
			Email: email,
			'Phone number': phone,
			Subject: subject,
			Message: message,
		},
	};

	return HandleAirtableData({ body:reqBody,env:env });
}
```

The code block above shows that we pass the `env` parameter as props so we can access it in the `HandleAirtableData` function below. This function does a `POST` request to airtable using your Airtable credentials. 

```js
const HandleAirtableData = async function onRequest({ body, env }) {
	return fetch(
		`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
			env.AIRTABLE_TABLE_NAME
		)}`,
		{
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
				'Content-type': `application/json`,
			},
		}
	);
};
```

You can test your function [locally using wrangler 2](/pages/platform/functions/#develop-and-preview-locally).


# General refactoring steps 

1. Remove `addEventListener()` method and it's event response and replace this with the appropriate `OnRequest` method. 

2. Pass `context` object as argment to your new `OnRequest` method to be able to access your `request`,`env`,`params` and `next`.

3. Handle logic that needs to be executed before or after route handles with middleware. Learn more about [using Middleware](/pages/platform/functions/#adding-middleware) in the Functions documentation 


