---
order: 0
---

# Getting started

Cloudflare Workers is a **serverless application platform** running on Cloudflare’s global cloud network in over 200 cities around the world, offering both [free and paid plans](/platform/pricing).

Learn more about [how Workers works](/learning/how-workers-works).

<Aside header="Try the Playground">

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). It doesn’t require _any_ setup. It’s just a simple, instant way to preview and test a Workers script directly in the browser against any site.

</Aside>

--------------------------------

## 1. Sign up for a Workers account

Before you can start [publishing](/cli-wrangler/commands#publish) your Workers on your own domain or a free workers.dev subdomain, you’ll need to sign up for a Cloudflare Workers account.

<p><a href="https://dash.cloudflare.com/sign-up/workers" className="Button Button-is-docs-primary">Sign up</a></p>

The signup process will guide you through choosing a workers.dev subdomain and verifying your email address, both of which are required to publish.

--------------------------------

## 2. Install the Workers CLI

Installing `wrangler`, the Workers CLI, gives you the freedom to [generate](/cli-wrangler/commands#generate), [configure](/cli-wrangler/commands#configure), [build](/cli-wrangler/commands#build), [preview](/cli-wrangler/commands#preview), and [publish](/cli-wrangler/commands#publish) your Workers projects from the comfort of your dev environment.

To install [`wrangler`](https://github.com/cloudflare/wrangler), ensure you have [`npm` installed](https://www.npmjs.com/get-npm), then run:

```sh
$ npm install -g @cloudflare/wrangler
```

Then run `wrangler --version` to confirm that the installation was successful:

```sh
$ wrangler --version
👷 ✨  wrangler 1.11.0
```

--------------------------------

## 3. Generate a new project

Wrangler’s [`generate` subcommand](/cli-wrangler/commands#generate) will create a new project from a “starter” template—just a GitHub repo. With no [template argument](/cli-wrangler/commands#generate), Wrangler generates projects from the [default starter](https://github.com/cloudflare/worker-template). Let’s generate a new project, called `my-worker`:

```sh
~/ $ wrangler generate my-worker
```

Wrangler will create a directory called `my-worker` and populate it with the contents of the starter template, in this case the default, and will automatically configure the `wrangler.toml` file in the project’s root with the `name = "my-worker"`.

```sh
~/ $ cd my-worker
~/my-worker $ ls
CODE_OF_CONDUCT.md LICENSE_MIT        index.js           wrangler.toml
LICENSE_APACHE     README.md          package.json

~/my-worker $ cat wrangler.toml
name = "my-worker"
type = "javascript"
account_id = ""
workers_dev = true
route = ""
zone_id = ""
```

Visit the [Starters](/starters) page to see a complete list of our recommended starter templates.

For example, to build a Workers project in TypeScript, you would instead run:

```sh
~/ $ wrangler generate my-typescript-worker https://github.com/EverlastingBugstopper/worker-typescript-template
```

To start a project from your own code—rather than a starter—use [`wrangler init`](/cli-wrangler/commands#init).

--------------------------------

## 4. Write code

With your new project generated, you’re ready to write your own code.

### 4a. Understanding Hello World

At its heart, a Workers app consists of two parts:

1. An [event listener](/runtime-apis/add-event-listener) that listens for [`FetchEvents`](/runtime-apis/fetch-event), and
2. An event handler that returns a [Response](/runtime-apis/response) object which is passed to the event’s `.respondWith()` method.

When a request is received on one of Cloudflare’s edge servers for a URL matching a Workers script, it passes the request in to the Workers runtime, which in turn [emits a “fetch”](/learning/fetch-event-lifecycle) event in the [isolate](/learning/how-workers-works#isolates) where the script is running.

```js
---
filename: ~/my-worker/index.js
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" }
  })
}
```

Let’s break this down:

1. An event listener for the `FetchEvent` tells the script to listen for any request coming to your Worker. The event handler is passed the `event` object, which includes `event.request`, a [`Request`](/runtime-apis/request) object which is a representation of the HTTP request that triggered the FetchEvent.

2. The call to [`.respondWith()`](/runtime-apis/fetch-event#methods) lets us intercept the request in order send back a custom response (in this case, the plain text “Hello worker!”).

    - The `FetchEvent` handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/runtime-apis/response) or `Promise<Response>` that determines the response.

    - The `FetchEvent` object also provides [two other methods](/runtime-apis/fetch-event#methods) to handle unexpected exceptions and operations that may complete after a response is returned.

Learn more about [the `FetchEvent` lifecycle](/learning/fetch-event-lifecycle).

### 4b. Routing and filtering requests

Now that we have a very basic script running on all requests, the next thing you’ll commonly want to do be able to do is generate a dynamic response based on the requests the Worker script is receiving. This is often referred to as routing or filtering.

#### Option 1: Manually filter requests

You can use standard JavaScript branching logic, such as `if`/`else` or `switch` statements, to conditionally return different responses or execute different handlers based on the request:

```js
---
filename: ~/my-worker/index.js
highlight: [7, 8, 9, 10, 11]
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response
  if (request.method === "POST") {
    response = await generate(request)
  } else {
    response = new Response("Expected POST", { status: 500 })
  }
  // ...
}
```

It’s very common to filter requests based on:

- `request.method` — e.g. `GET` or `POST`.
- `request.url` — e.g. filter based on query parameters or the pathname.
- `request.headers` — filter based on specific headers.

See a list of [all properties of a `Request` object](/runtime-apis/request#properties).

In addition to standard request properties, the Workers platform populates the request with a [`cf` object](/runtime-apis/request#incomingrequestcfproperties), containing many useful properties, e.g. the `region` or `timezone`.

#### Option 2: Use a template for routing on URL

For more complex routing, it can be helpful to use a library. The [Workers router starter](https://github.com/cloudflare/worker-template-router) template provides an API similar to ExpressJS for handling requests based on HTTP methods and paths:

```sh
~/ $ wrangler generate my-worker-with-router https://github.com/cloudflare/worker-template-router
```

This starter is used in the tutorial for [building a Slack Bot](/tutorials/build-a-slackbot).

### 4c. Make use of runtime APIs

The example outlined in this guide is just a starting point. There are many Workers [runtime APIs](/runtime-apis) available to manipulate requests and generate responses. For example, you can use [HTMLRewriter](/runtime-apis/html-rewriter) to parse and transform HTML on the fly, use the [Cache](/runtime-apis/cache) to retrieve data from and put data into from [the Cloudflare cache](/learning/how-the-cache-works), compute a custom response right from the edge, redirect the request to another service, and so much more.

For inspiration, visit [Built with Workers](https://workers.cloudflare.com/built-with) for a showcase of projects.

--------------------------------

## 5. Preview your project

When you’re ready to preview your code, run Wrangler’s `preview` command:

```sh
~/my-worker $ wrangler preview --watch
```

This command will build your project, upload it to a unique URL, and open a tab in your browser to view it. This allows you to quickly test your project running on the actual Workers runtime, and optionally, even share it with others too.

The `--watch` flag tells Wrangler to watch your Workers project directory for changes, and will **automatically update** the preview tab live with the latest URL.

<Aside header="A note about building">

Running `wrangler preview` and `wrangler publish` both run `wrangler build` beforehand automatically, but it can be useful to run `build` separately to check for errors. Running `wrangler build` installs the necessary dependencies for your project and compiles it to make it ready for previewing or deployment. Learn [more about Wrangler](/cli-wrangler/commands).

</Aside>

--------------------------------

## 6. Configure your project for deployment

In order to publish your Workers project on Cloudflare’s global cloud network, you’ll need to configure Wrangler using details from your [Workers account](https://dash.cloudflare.com/sign-up/workers).

Specifically you’ll need to obtain:

- **Account ID**

- **API token** (recommended), or both **email** and **Global API Key**.

If deploying on a free workers.dev subdomain, that’s it. If you’re deploying onto your own domain, you’ll additionally need to configure the project with:

- **Zone ID**

### 6a. Obtaining your Account ID (and Zone ID)

#### workers.dev

For workers.dev domains, you will just need the Account ID:

1. [**Log in** to your Cloudflare account](https://dash.cloudflare.com/login) and select **Workers**.
2. On the right, look for **Account ID** and click **Click to copy** below the input.

#### Registered domains

For domains that you have registered on Cloudflare, you need both IDs:

1. [**Log in** to your Cloudflare account](https://dash.cloudflare.com/login) and select the desired domain.
2. Select the **Overview** tab on the navigation bar.
3. Scroll down until you see both **Zone ID** and **Account ID* on the right.
4. Click **Click to copy** below the input to each.

### 6b. Obtaining your **API token** or **Global API key**

#### Option 1: Obtaining your **API token** (recommended)

1. Continuing, also on the right side, click **Get your API token**.
2. You’ll be taken to your **Profile** page.
3. Click **Create token**.
4. Under the **API token templates** section, find the **Edit Cloudflare Workers** template and click **Use template**.
5. Fill out the rest of the fields and then click **Continue to summary**, where you can click **Create Token** and issue your token for use.

#### Option 2: Obtaining your **Global API Key**

1. Continuing, also on the right side, click **Get your API token**.
2. You’ll be taken to your **Profile** page.
3. Scroll to **API Keys**, and click **View** to copy your **Global API Key**.\*

<Aside type="warning">

\* __Warning:__ Treat your Global API Key like a password. It should not be stored in version control or in your code, use environment variables if possible.

</Aside>

### 6c. Configuring Wrangler with your credentials

Set up your default credentials on your local machine with `wrangler config`. This is an interactive command that will prompt you for your **API token**:

```sh
$ wrangler config
Enter API token:
superlongapitoken
```

Use the `--api-key` flag to instead configure with **email** and **global API key**:

```sh
$ wrangler config --api-key
Enter email:
testuser@example.com
Enter global API key:
superlongapikey
```

You can also [use environment variables](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/) to configure these authentication credentials.

### 6d. Configuring your project

To configure your project, we need to fill in a few missing fields in the `wrangler.toml` file in the root of the generated project. This file contains the information Wrangler needs to connect to the Cloudflare Workers API and publish your code.

For now, fill in just the `account_id` field with the value found in your dashboard.

```toml
---
filename: wrangler.toml
highlight: [2]
---
name = "my-worker"
account_id = "$yourAccountId"
```

Let’s also configure the `type` to `"webpack"`, to tell Wrangler to use [Webpack](/cli-wrangler/webpack) to package your project for deployment. (Learn more about [`type` configuration](/cli-wrangler/configuration).)

```toml
---
filename: wrangler.toml
highlight: [3]
---
name = "my-worker"
account_id = "$yourAccountId"
type = "webpack"
```

Finally, we need to tell Wrangler where we want to deploy our project.

#### Configure for deploying to workers.dev

With the `workers_dev` key in `wrangler.toml` set to `true`, Wrangler will publish your project to your `workers.dev` subdomain.

```toml
---
filename: wrangler.toml
highlight: [4]
---
name = "my-worker"
account_id = "$yourAccountId"
type = "webpack"
workers_dev = true
```

When deploying to a workers.dev subdomain, the **name** field will be used as the secondary subdomain for the deployed script, e.g. `my-worker.my-subdomain.workers.dev`.

#### (Optional) Configure for deploying to a registered domain

To publish your application on a domain you own, and not a workers.dev subdomain, you can add a `route` key to your `wrangler.toml`.

Wrangler’s [environments feature](/platform/environments) allows us to specify multiple different deploy targets for our application. Let's add a `production` environment, passing in a `zone_id` and `route`:

```toml
---
filename: wrangler.toml
highlight: [6, 7, 8, 9, 10, 11]
---
name = "my-worker"
account_id = "$yourAccountId"
type = "webpack"
workers_dev = true

[env.production]
# The ID of the domain to deploying to
zone_id = "$yourZoneId"

# The route pattern your Workers application will be served at
route = "example.com/*"
```

The `route` key here is a [route pattern](/platform/routes), which e.g., can contain wildcards.

If your route is configured to a hostname, you will need to add a DNS record to Cloudflare to ensure that the hostname can be resolved externally. If your Worker acts as your origin (the response comes directly from a Worker), you should enter a placeholder (dummy) AAAA record pointing to `100::`, which is the [reserved IPv6 discard prefix](https://tools.ietf.org/html/rfc6666).

--------------------------------

## 7. Publish your project

With our project configured, it’s time to publish it. The way we’ve configured it we have two deploy targets we can publish to.

To deploy to our workers.dev subdomain, we can run:

```sh
---
header: Publish to workers.dev
---
~/my-worker $ wrangler publish
```

<Aside>

__Note:__ When pushing to workers.dev project for the first time, you may initially see **523 errors** while DNS is propagating. It should work after a minute or so.

</Aside>

To deploy to our “production” environment we set in our `wrangler.toml`, we can pass the `--env` flag to the command:

```sh
---
header: Publish to example.com
---
~/my-worker $ wrangler publish --env production
```

For more information on environments, check out the [Wrangler documentation](/cli-wrangler/configuration#environments).

You can also configure a GitHub repo to automatically deploy every time you `git push`. You can do this by either using the [Workers GitHub action](https://github.com/marketplace/actions/github-action-for-cloudflare-workers), or by writing your own GitHub action and manually configuring the necessary [GitHub secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

--------------------------------

## Where to go next

This is just the beginning of what you can do with Cloudflare Workers. To dive deeper into building meaty projects, check out our [Tutorials](/tutorials).
