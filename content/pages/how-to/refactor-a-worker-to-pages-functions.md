---
pcx-content-type: how-to
title: Refactor a Worker to a Pages Function.
---

# Refactor a Worker to a Pages Function.

When building with Workers there is the option of running your worker separately from your application. A good usecase for this is if the logic in your worker is used by more than one application. 

However, when you handle things like forms submissions or want to ship a small piece of logic that is unique to your project. The logic can live in the same file system as your project while running on Cloudflare's edge network. You can now use [Pages Functions](/pages/platform/functions/).

# Handling form entries with Airtable

[Airtable](https://airtable.com/) can be used to store entires of information in different tables for the same account, which makes it a good usecase for handling specific forms for differnt projects with Pages Functions.

Previously, you would have created a worker in a folder using [wrangler](/workers/cli-wrangler/install-update/) and manage this worker from within your project or on another server.

For example, an airtable function that handles a form submission will have the default worker response to a `fetch` action that responsed to a `request` with a handler. 

In the Airtable code below, you have a `submitHandler` async function that can be reached if the pathname of the work is `/submit`. This function checks that the request method is a `POST` request and then proceeds to parse and post the form entries to the Airtable using the credentials.  

```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const FORM_URL = "https://egghead-cloudflare-pages-site.pages.dev";

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/submit") {
    return submitHandler(request);
  }

  return new Response.redirect(FORM_URL);
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
  // return Response.redirect(FORM_URL)
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


# Using a Pages Functions

While the above code works perfectly, you can handle this logic with your client in the same app with Pages Functions. First you will create a `functions` folder in the base of your application and within this folder you can create a `form.js` file to handle form submissions.

## Refactoring the worker 

Every worker has a `addEventListener` to listen for fetch events but you will not be needing this in a Pages function, You will `export` a single `OnRequest` function and depending on the HTTPS request it handles you will name it accordly. In the case of accepting form submissions and posting to an airtable you will export a single `OnRequestPost` function like so:

```js
export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}

```

The above code takes a `request` and `env` as argumnents which passes this props down to the `submitHandler` fucntion. Which stays the same as the original function. However,becasue Functions allow you to specify the HTTPS request type you can remove the `request.method` check. 

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


