---
updated: 2024-05-16
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Custom access control for files in R2 using D1 and Workers
---

# Custom access control for files in R2 using D1 and Workers

This tutorial gives you an overview on how to create a TypeScript-based Cloudflare Worker which allows you to control file access based on a simple username and password authentication, using a D1 database for user management and an R2 bucket for file storage. 

The following sections will guide you through the process of creating a Worker using the Cloudflare CLI, creating and setting up a D1 database and R2 bucket, and then implementing the functionality to securely upload and fetch files from the created R2 bucket.

{{<tutorial>}}

{{<tutorial-prereqs>}}

## Prerequisites

Before you can start with this tutorial, you will need to have the following prerequisites:
1. A Cloudflare account
2. [`npm`](https://docs.npmjs.com/getting-started)
3. [`Node.js`](https://nodejs.org/en/) with version `16.17.0` or later

{{</tutorial-prereqs>}}

{{<tutorial-step title="1. Create a new Worker application">}}

## 1. Create a new Worker application

To get started developing your Worker you will use the [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare). To do this, open a terminal window and run the following command:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" no-code="true">}}
```sh
npm create cloudflare@latest -y
```
{{</tab>}}

{{<tab label="yarn" no-code="true">}}
```sh
yarn create cloudflare
```
{{</tab>}}
{{</tabs>}}

Then simply follow the prompts in order to create your new Worker application:

1. Give your new Worker a concise and descriptive name.
2. Select `"Hello World" Worker` for the type of application, as it creates a simple example Worker which is triggered by an HTTP request.
3. Select `Yes` to use TypeScript.
4. Decide if you want to initialize a git repository for this new Worker project. We will select `No`, for this tutorial, but feel free to choose `Yes`.
5. Choose `No` when asked if you want to deploy your application.

If you do choose to deploy here, you will be asked to authenticate (if not logged in already) and select an account, then your project will be deployed. You can always (re)deploy your application later on by running `npx wrangler deploy`.

{{</tutorial-step>}}

{{<tutorial-step title="2. Create a new D1 database and binding" >}}

## 2. Create a new D1 database and binding

Before you can start to modify the now created worker, you need to create a D1 database.
This can be done through the Cloudflare Portal or the Wrangler CLI.
For this tutorial, we will use the Wrangler CLI for simplicity.

To create a D1 database, just run the following command.
If you get asked to install wrangler, just confirm by pressing `y` and then press `Enter`.

```sh
npx wrangler d1 create <YOUR_DATABASE_NAME>
```

But be sure to replace `<YOUR_DATABASE_NAME>` with the name you want to you for your database. Keep in mind that this name can't be changed later on.

After the database is successfully created, you will see the data for the binding displayed as an output.
The binding declaration will start with `[[d1_databases]]` and contain the binding name, database name and ID.
To use the database in your worker, you will need to add the binding to your `wrangler.toml` file, by copying the declaration and pasting it into the wrangler file.


{{</tutorial-step>}}

{{<tutorial-step title="3. Create R2 bucket and binding">}}

## 3. Create R2 bucket and binding

Now that the D1 database is created, you also need to create an R2 bucket which will be used to store the uploaded files.
This step can also be done through the Cloudflare Portal, but as before, we will use the Wrangler CLI for this tutorial.
To create an R2 bucket, run the following command:

```sh
npx wrangler r2 bucket create <YOUR_BUCKET_NAME>
```

This works similar to the D1 database creation, where you will need to replace `<YOUR_BUCKET_NAME>` with the name you want to use for your bucket.
But this time you will need to add the binding to your wrangler file manually.
To do this, go to the `wrangler.toml` file again and then add the following lines:

```toml
[[r2_buckets]]
binding = 'BUCKET'
bucket_name = '<YOUR_BUCKET_NAME>'
```

Now that you prepared the wrangler configuration, you should update the `worker-configuration.d.ts` file to include the new bindings.
You could either update it manually or run the following command in the directory of your project to update it automatically based on the wrangler configuration file (recommended).

```sh
npm run cf-typegen    
```

{{</tutorial-step>}}

{{<tutorial-step title="4. Database preparation">}}

## 4. Database preparation

Before you can start developing the Worker, you need to prepare the D1 database.

For this you need to
1. create a table in the database which will then be used to store the user data 
2. create a unique index on the username column, which will speed up database queries and ensure that the username is unique
3. insert a test user into the table, so you can test your code later on

As this operation only needs to be done once, this will be done through the Wrangler CLI and not in the Workers code.
Just run the following commands in order to prepare the database, but be sure to replace `<YOUR_DATABASE_NAME>` with the name you used for your database:

```sh
npx wrangler d1 execute <YOUR_DATABASE_NAME> --command "CREATE TABLE user (id INTEGER PRIMARY KEY NOT NULL, username STRING NOT NULL, password STRING NOT NULL)" --remote
npx wrangler d1 execute <YOUR_DATABASE_NAME> --command "CREATE UNIQUE INDEX user_username ON user (username)"  --remote
npx wrangler d1 execute <YOUR_DATABASE_NAME> --command "INSERT INTO user (username, password) VALUES ('admin', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8')"  --remote
```

{{</tutorial-step>}}

{{<tutorial-step title="5. Implement authentication in the Worker">}}

## 5. Implement authentication in the Worker

Now that the database and bucket are all set up, you can start to develop the Worker application.
The first thing you will need to do is to implemen the authentication for the requests.

This tutorial will use a simple username and password authentication, where the username and password (hashed) are stored in the D1 database.
The requests will contain, the username and password as a base64 encoded string, which is also called Basic Authentication.
Depending on the request method, this string will be retrieved from the `Authorization` header for POST requests or the `Authorization` search parameter for GET requests.

To handle the authentication, you will need to replace the current code within `old.ts` file with the following code:

```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		try {
			const url = new URL(request.url);
			let authBase64;
			if (request.method === 'POST') {
				authBase64 = request.headers.get('Authorization');
			} else if (request.method === 'GET') {
				authBase64 = new URL(request.url).searchParams.get('Authorization');
			} else {
				return new Response('Method Not Allowed!', { status: 405 });
			}
			if (!authBase64 || authBase64.substring(0, 6) !== 'Basic ') {
				return new Response('Unauthorized!', { status: 401 });
			}

			const authString = atob(authBase64.substring(6));
			const [username, password] = authString.split(':');
			if (!username || !password) {
				return new Response('Unauthorized!', { status: 401 });
			}
			
			// TODO: Check if the username and password are correct
		} catch (error) {
			console.error('An error occurred!', error);
			return new Response('Internal Server Error!', { status: 500 });
		}
	},
};
```

The code above currently extracts the username and password from the request, but does not yet check if the username and password are correct.

To check the username and password, you will need to hash the password and then query the D1 database table `user` with the given username and hashed password.
If the username and password are correct, you will retrieve a record, otherwise the response will be empty, and you should return a `401 Unauthorized` response.
To add this functionality, you will need to add the following code to the `fetch` function by replacing the TODO comment from the last code snippet:

```ts
const passwordHashBuffer = await crypto.subtle.digest(
	{ name: 'SHA-256', },
	new TextEncoder().encode(password)
);
const passwordHashArray = Array.from(new Uint8Array(passwordHashBuffer));
const passwordHashString = passwordHashArray.map(b => b.toString(16).padStart(2, '0')).join('')

const user = await env.DB.prepare('SELECT id FROM user WHERE username = ? AND password = ? LIMIT 1')
	.bind(username, passwordHashString)
	.first<{ id: number }>();
if (!user) {
	return new Response('Unauthorized!', { status: 401 });
}

// TODO: Implement upload functionality
```

This code will now ensure that every request is authenticated before it can be processed further.

{{</tutorial-step>}}

{{<tutorial-step title="6. Upload a file through the Worker">}}

## 6. Upload a file through the Worker

Now that the authentication is set up, you can start to implement the functionality for uploading a file through the Worker.
To do this, you will need to add a new code path that handles HTTP `POST` requests.
Then within it, you will need to get the data from the request, which is sent within the body of the request, by using the `request.blob()` function.
After that, you can upload the data to the R2 bucket by using the `env.BUCKET.put` function.
And finally, you will return a `200 OK` response to the client.

To implement this functionality, you will need to replace the TODO comment from the last code snippet with the following code:

```ts
if (request.method === 'POST') {
    const file = await request.blob();
	// Upload the file to the R2 bucket with the user id followed by a slash as the prefix and then the path of the URL
    await env.BUCKET.put(`${user.id}/${url.pathname}`, file);
    return new Response('OK', { status: 200 });
}
// TODO: Implement GET request handling
```

This code will now allow you to upload a file through the Worker, which will be stored in your R2 bucket.

{{</tutorial-step>}}

{{<tutorial-step title="7. Fetch a file through the Worker">}}

## 7. Fetch from an R2 bucket

To round up the Worker application, you will need to implement the functionality to fetch files from the R2 bucket.
This can be done by adding a new code path that handles `GET` requests.
Within this code path, you will need to extract the URL pathname and then retrieve the asset from the R2 bucket by using the `env.BUCKET.get` function.

To finalize the code, just replace the TODO comment for handling GET requests from the last code snippet with the following code:

```ts
if (request.method === 'GET') {
	const file = await env.BUCKET.get(`${user.id}/${url.pathname.slice(1)}`);
	if (!file) {
		return new Response('Not Found!', { status: 404 });
	}
	return new Response(await file.blob());
}
return new Response('Method Not Allowed!', { status: 405 });
```

This code now allows you to fetch and return data from the R2 bucket when a `GET` request is made to the Worker application.

{{</tutorial-step>}}

{{<tutorial-step title="8. Deploy your Worker">}}

## 8. Deploy your Worker

After completing the code for this Cloudflare Worker tutorial, you will need to deploy it to Cloudflare.
To do this open the terminal in the directory created for your application, and then run:

```sh
$ npx wrangler deploy
```
You might get asked to authenticate (if not logged in already) and select an account. After that, the Worker will be deployed to Cloudflare.
When the deployment finished successfully, you will see a success message with the URL where your Worker is now accessible.


{{</tutorial-step>}}


{{<tutorial-step title="9. Test your Worker" optional=true >}}

## 9. Test your Worker (optional)

To finish this tutorial, you should test your Worker application by sending a `POST` request to upload a file and after that a `GET` request to fetch the file.
This can be done by using a tool like `curl` or `Postman`, but for simplicity, this will describe the usage of `curl`.

First run the following command to upload a simple JSON file with the content `{"Hello": "Worker!"}`:

```sh
curl --location '<YOUR_WORKER_URL>/myFile.json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46cGFzc3dvcmQ=' \
--data '{
    "Hello": "Worker!"
}'
```

Then run the next command, or simply open the URL in your browser, to fetch the file you just uploaded:

```sh
curl --location '<YOUR_WORKER_URL>/myFile.json?Authorization=Basic%20YWRtaW46cGFzc3dvcmQ%3D'
```

{{</tutorial-step>}}

{{<tutorial-step title="Next steps" >}}

## Next steps

If you want to learn more about Cloudflare Workers, R2, or D1 you can check out the following documentation:
- [Cloudflare Workers](/workers/)
- [Cloudflare R2](/r2/)
- [Cloudflare D1](/d1/)

{{</tutorial-step>}}

{{</tutorial>}}
