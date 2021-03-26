# Build an API for your frontend using Cloudflare Workers

## Introduction

In this tutorial, we'll build an API on Cloudflare Workers that can be used by your Pages application. Workers serves as a great companion to your frontend applications on Cloudflare Pages. In this tutorial, we'll build a simple JSON API that returns blog posts that can be retrieved and rendered in a front-end application.

This tutorial contains two, separate applications: the backend, a serverless API deployed on Cloudflare Workers, and the frontend, built with React and deployed using Cloudflare Pages.

If you're interested in a more comprehensive approach to building applications like this, you may benefit from moving from a serverless API for your content to a headless CMS — see our [headless CMS tutorial] to learn more!

## Deploying a serverless API

### Generating a new project

Let's begin by creating a new Cloudflare Workers project. If you haven't used Cloudflare Workers, or installed Wrangler, the command-line tool for managing and publishing Workers projects, you should check out the Quick Start guide in the Workers documentation. Once you've configured Wrangler and authenticated it with your Cloudflare account, you can return here to generate your API codebase.

We'll use the Workers TypeScript template to generate our project. Don't worry if you don't know TypeScript -- we won't be writing any complicated types, and if you're using VS Code or another editor with TypeScript support, your code will be validated and checked by the editor as you build your application. Run `wrangler generate` to create a new project using the template:

```bash
---
header: Creating a new Workers project with Wrangler
---
$ wrangler generate serverless-api https://github.com/cloudflare/worker-typescript-template
```

### Adding a router

Our Workers application will serve as a backend API to return blog post data using JSON to our static application. This means that it should have two routes: `/api/posts`, which will return a list of blog posts, and `/api/posts/:id`, which will be used to retrieve a specific blog post based on ID.

While you can manually parse incoming URLs, it's much easier to use a routing library to consistently handle incoming requests. We'll install and use [itty-router](https://github.com/kwhitley/itty-router), an open-source routing library with support for Cloudflare Workers:

```bash
---
header: Installing itty-router
---
$ npm install itty-router
---
```

With `itty-router` installed, we can open up `handler.ts` and set up our router. Begin by importing the `itty-router` package and setting up a new instance of the `Router` class:

```ts
---
filename: "src/handler.ts"
---
import { Router } from 'itty-router'

import Posts from './handlers/posts'
import Post from './handlers/post'

const router = Router()

router
  .get('/api/posts', Posts)
  .get('/api/posts/:id', Post)
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = request => router.handle(request)
```

The above routing configuration defines three routes: `/api/posts`, `/api/posts/:id`, and a _wildcard_ route, which will be called if the incoming request doesn't match the first two routes.

Create two files, `handlers/posts.ts` and `handlers/post.ts`, which will contain the handler code for our two API routes.

### Implementing API routes

In `handlers/posts.ts`, we'll return an array of posts as a JSON array. If you've never worked with JSON APIs before, all you need to know is that a serverless API returning JSON needs to define a `Content-type` header, which should be set to `application/json`. Any JSON data coming back as part of the response body should be turned into a JSON string using `JSON.stringify`.

In the below sample, we'll stub out the `posts` array, and later, we'll come back and fill it in with real data:

```ts
---
filename: "src/handlers/posts.ts"
---
const posts = []

const Posts = () => {
  const body = JSON.stringify(posts)
  const headers = { 'Content-type': 'application/json' }
  return new Response(body, { headers })
}

export default Posts
```

`Posts` is a simple function with no arguments that returns a JSON response. When an application makes a GET request to `/api/posts`, they'll receive a JSON-encoded array back, which they can use to render a list of blog posts.

We'll define something similar for `handlers/post.ts`, which returns a single blog post. Importantly, we'll use the request argument that `itty-router` passes to handlers, using it to retrieve the `:id` parameter that we defined in `handler.ts`. Again, we'll stub out the `post` data, but you can already begin to see in the below sample how to retrieve the `:id` param inside of a handler:

```ts
---
filename: "src/handlers/post.ts"
---
const post = {}

const Post = request => {
  // This will be used soon to retrieve a post
  const postId = request.params.id

  const body = JSON.stringify(post)
  const headers = { 'Content-type': 'application/json' }
  return new Response(body, { headers })
}

export default Post
```

### Defining a static data class

Until now, we've used empty stub data to return data in our API routes. To make this application meaningful, we'll define a static data class, called `PostsStore`, to simulate how you might retrieve data from a database or other data source. In `posts_store.ts`:

```ts
---
filename: "src/posts_store.ts"
---
const _posts = [
  {
    id: 1,
    title: "My first blog post",
    text: "Hello world! This is my first blog post on my new Cloudflare Workers + Pages blog.",
    published_at: new Date("2020-10-23")
  },
  {
    id: 2,
    title: "Updating my blog",
    text: "It's my second blog post! I'm still writing and publishing using Cloudflare Workers + Pages :)",
    published_at: new Date("2020-10-26")
  }
]

export default class PostsStore {
  async all() {
    return _posts
  }

  async find(id: number) {
    return _posts.find(post => post.id.toString() === id.toString())
  }
}
```

We're still referring to static content, but by building a `PostsStore` class, we can abstract the retrieval of posts and easily imagine a future where this class talks to a database, key-value store, or however you prefer to store your data.

With `PostsStore` set up, we can import it and use it in our handlers:

```ts
---
filename: "src/handlers/posts.ts"
highlight: [1, 4, 5]
---
import Store from '../posts_store'

const Posts = async () => {
  const posts = new Store()
  const body = JSON.stringify(await posts.all())
  const headers = { 'Content-type': 'application/json' }
  return new Response(body, { headers })
}

export default Posts
```

```ts
---
filename: "src/handlers/post.ts"
highlight: [1, 4, 7]
---
import Store from '../posts_store'

const Post = async request => {
  const posts = new Store()
  const postId = request.params.id

  const body = JSON.stringify(await posts.find(postId))
  const headers = { 'Content-type': 'application/json' }
  return new Response(body, { headers })
}

export default Post
```

### Adding CORS headers

Before we're ready to deploy, we'll make one more change to our handlers, adding [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to allow our frontend application to make requests to the API. In our handlers, we'll update the `headers` variable accordingly:

```ts
---
filename: "src/handlers/posts.ts"
highlight: [6, 7, 8, 9]
---
import Store from '../posts_store'

const Posts = async () => {
  const posts = new Store()
  const body = JSON.stringify(await posts.all())
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
  return new Response(body, { headers })
}

export default Posts
```

```ts
---
filename: "src/handlers/post.ts"
highlight: [8, 9, 10, 11]
---
import Store from '../posts_store'

const Post = async request => {
  const posts = new Store()
  const postId = request.params.id

  const body = JSON.stringify(await posts.find(postId))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
  return new Response(body, { headers })
}

export default Post
```

### Publishing the API

With our API configured, we're ready to publish! Run `wrangler publish`, and when you've successfully deployed your application, you should be able to make requests to your API to see data returned in the console:

```bash
---
header: "Testing the API"
---
$ curl serverless-api.signalnerve.workers.dev/api/posts
$ curl serverless-api.signalnerve.workers.dev/api/posts/1
```

## Deploying a new React application to pages

With our serverless API deployed, we can now build the frontend of our application with React. First, we'll generate the application, and then we'll define the functionality by adding routing, and rendering blog posts from the API. Once we're happy with the implementation locally, we'll use Cloudflare Pages to deploy it in just a matter of minutes!

### Generating a new React application

To start, create a new React app using `create-react-app` in your terminal, and then navigate into the directory and start a local development server:

```bash
---
header: "Creating a new React application"
---
$ npx create-react-app blog-frontend
$ cd blog-frontend
$ npm start
```

Start up the app locally, and clear out the contents of `App.js`:

```js
---
filename: "src/App.js"
---
function App() {
  return (
    <div>
      <span>Hello world</span>
    </div>
  );
}

export default App;
```

### Adding routing and consuming blog posts

Add `@reach/router`:

```bash
---
header: "Adding @reach/router"
---
$ yarn add @reach/router
```

Import it into `App.js`, and set up a new router with two routes:

```js
---
filename: "src/App.js"
---
import { Router } from "@reach/router";

import Posts from './components/posts'
import Post from './components/post'

function App() {
  return (
    <Router>
      <Posts path="/" />
      <Post path="/:id" />
    </Router>
  );
}

export default App;
```

Create a new folder called `components`, and inside of it, create two files: `posts.js`, and `post.js`. These components will load the blog posts from our API, and render them. Let's begin with `posts.js`:

```js
---
filename: "src/components/posts.js"
---
import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch(
        "https://serverless-api.signalnerve.workers.dev/api/posts"
      );
      const postsResp = await resp.json();
      setPosts(postsResp);
    };

    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Posts;
```

Next, add the component for individual blog posts, in `src/components/post.js`:

```js
---
filename: "src/components/post.js"
---
import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

const Posts = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(
        `https://serverless-api.signalnerve.workers.dev/api/posts/${id}`
      );
      const postResp = await resp.json();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div />;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p>
        <em>Published {new Date(post.published_at).toLocaleString()}</em>
      </p>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
};

export default Posts;
```

### Publishing with Cloudflare Pages

Publishing your project with Cloudflare Pages is an easy, two-step process: first, push your project to GitHub, and then in the Cloudflare Pages UI, set up a new project based on that GitHub repository. Pages will deploy a new version of your site each time you publish, and will even set up preview deployments whenever you open a new pull request.

To push your project to GitHub, [create a new repo](https://repo.new), and follow the instructions to push your local Git repository to GitHub.

Once you've pushed your project to GitHub, go to the Pages UI, and create a new project. When asked for your project's build configuration, just choose "React" -- Pages will set the correct fields for you automatically.

When your site has been deployed, you'll receive a unique URL to view it in production.

Congrats, you've deployed your own blog, powered by Cloudflare Workers and Cloudflare Pages.

## Custom domains

Cloudflare Workers and Pages both provide first-class support for custom domains. This means that you can deploy your Pages application to a custom domain, as you would for any normal website, and _also_ deploy your API (`/api/posts` and `/api/posts/:id`) "over" your Pages application, by specifying a route in your `wrangler.toml`.

For instance, given the example domain "myblog.com", you could set up your API application's `wrangler.toml` with the following config:

```toml
---
filename: wrangler.toml
---
workers_dev = false
route = "*myblog.com/api*"
zone_id = "$zoneId"
```

Now, when you run `wrangler publish`, your API will be published and served on `myblog.com`, but _only_ when you visit a route matching `/api*` -- this means that your basic routes (`/`, `/posts/:id`, etc.) will be sent to your frontend Pages application, but any API routes will be intercepted and handled by your Workers application.

## Conclusion

In this tutorial, you built a full blog application by combining a frontend deployed with Cloudflare Pages, and a serverless API built with Cloudflare Workers. You can find the source code for both codebases on GitHub:

- Blog frontend: https://github.com/signalnerve/blog-frontend
- Serverless API: https://github.com/signalnerve/serverless-api

If you enjoyed this tutorial, check out our [headless CMS tutorial]!

[headless CMS tutorial]:https://developers.cloudflare.com/pages/tutorials/build-a-blog-using-nuxt-and-sanity
