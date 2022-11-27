---
updated: 2022-11-30
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
layout: single
title: Build a globally distributed full-stack app using Pages Functions, Next.js and Fauna
---

# Build a globally distributed full-stack app using Cloudflare Pages, Next.js and Fauna

## Introduction

In this tutorial, you will build a globally distributed full stack application using Cloudflare Pages (for the front end), Pages Functions (the backend), and Fauna as the database. You will use the Next.js  framework to tie all these services together in a cohesive and scalable codebase.

## Prerequisites

- A recent version of [Node and NPM](https://docs.npmjs.com/getting-started) on your computer
- A [Fauna](https://fauna.com/) account
- A [Cloudflare](https://www.cloudflare.com/) account

## What is a globally distributed app?

Before you continue, let’s explore what a globally distributed app is and why you might want to build one. A globally distributed app always runs closest to the end user, thus making the application response time extremely fast.

Cloudflare [Pages](https://developers.cloudflare.com/pages/) and Pages Functions run your code closest to the end user’s geographical location without you maintaining a server. While Fauna being a globally distributed database system, ensures that data reads and writes always happen on the closest replicas of your database. Thus this combination of Cloudflare Workers, Pages, and Fauna allows you to build highly performant apps with very low latency. 

## Create a new Project

Create a new Next.js project by running the following command. 

```sh
$ npx create-next-app <your-app-name>
```

> 💡 Info: When you create API routes in your Next.js application (i.e. under `/pages/api` folder) and deploy them to Cloudflare each of these functions become individual Cloudflare Workers function on the Edge.* 

### Configure the project to use the Edge Runtime

Next, enable edge-runtime for your API routes. Open the `pages/api/hello.js` file. This is an API route. When deployed this API route will become an edge function, however for this to work you have the add the following code. 

```jsx
// pages/api/hello.js

export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  return new Response(
    JSON.stringify({ name: 'John Doe' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
```

To learn more about how Edge Runtime works refer to Next.js' [Edge API Routes documentation](https://nextjs.org/docs/api-routes/edge-api-routes). 

Run the following command in the root of your project to locally build your application. 

```bash
$ npx @cloudflare/next-on-pages --experimental-minify
```

You will notice the following output for a successful build.

![Build output](/pages/tutorials/build-a-fullstack-app-with-pages-function/build-output.png)

Notice that a folder named `.vercel/output` is generated. Inside you can find the generated Clourflare Workers and Pages functions.


### Create a GitHub repository

Next, create a new GitHub repository by visiting [repo.new](https://repo.new/). When you are done creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```
$ git remote add origin <YOUR_GITHUB_REPO_URL>
$ git branch -M main
$ git push -u origin main

```


### Deploy with Cloudflare Pages

If you haven’t already signed up for a free Cloudflare Pages account, [create an account now](https://dash.cloudflare.com/pages).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
1. In **Account Home**, select **Pages** > **Create a project**.
1. In the build settings select `Next.js` you can leave everything else as default.


![Configure deployment](/pages/tutorials/build-a-fullstack-app-with-pages-function/configure-build.png)

4. In the environment variable section add a new variable called `NODE_VERSION` and add the node version of your project. **You require a node version 14 or greater.**

![Define Node Version in cloud flare configuration](/pages/tutorials/build-a-fullstack-app-with-pages-function/node_version.png)

5. Next, go to **Settings > Functions** and under compatibility flags add the following flags.

`streams_enable_constructors`, `transformstream_enable_standard_constructor`. 

![adding compatibility flags](/pages/tutorials/build-a-fullstack-app-with-pages-function/compatibility.png)

*These flags are scheduled to graduate on the 2022-11-30 compatibility date and should no longer be necessary to manually add after November 30, 2022.*

1. Select Save and Deploy

Visit the deployed site url to make sure everything is working as expected.

Next, visit [`https://<your-domain-name>/api/hello`](https://with-cloudflare-nextjs.pages.dev/api/hello) to make sure that the Pages function is working as expected. 

## Configure Fauna database

1. Head over to [Fauna](https://dashboard.fauna.com/) and create an account if you haven’t done so already. 
2. Next, create a new database. Give your database a name. Select the *classic region group* and select *create*.

Info:  *By default, Fauna allows you to save your data globally closer to your user. However, you can also limit your data's distribution to a specific geographic region group to comply with GDPR and data residency. Learn more about region groups [here](https://docs.fauna.com/fauna/current/learn/understanding/region_groups).*

*You also have the option to save data into privately distributed nodes with [Virtual Private Fauna.](https://www.globenewswire.com/news-release/2022/11/17/2558259/0/en/Fauna-Launches-Virtual-Private-Offering-of-its-Serverless-Database-for-the-Most-Demanding-Enterprise-Applications.html)*

![Create a database](/pages/tutorials/build-a-fullstack-app-with-pages-function/create_database.png)

3. Next, select *create new collection*. 

![Create a new collection](/pages/tutorials/build-a-fullstack-app-with-pages-function/new_collection.png)

4. Create a new Collection called `Products`.

![Create a new Collection called Products](/pages/tutorials/build-a-fullstack-app-with-pages-function/new_prod_collection.png)

5. You would require a secret to query your database from your application. Navigate to *Security > Keys* and select *New Key*.

![New Key](/pages/tutorials/build-a-fullstack-app-with-pages-function/new_key.png)

6. Select `Server` Role from the dropdown. Give your key a name and select *Save*. When the key is generated save it into a secure file.

![New Key Role](/pages/tutorials/build-a-fullstack-app-with-pages-function/new_key_conf.png)

7. For local development create a new file called `.env` in the root of your project and add the following code. Make sure you add `.env` to your git ignore file so it doesn’t get committed.

```bash
FAUNA_SECRET=fnAExxxx
```

8. Finally, head back to Cloudflare Pages settings and add a new environment variable called FAUNA_SECRET. 

![Fauna Secret](/pages/tutorials/build-a-fullstack-app-with-pages-function/fauna_secret.png)

## Build the Next.js application

### Create the add product page (Frontend)

Create a new front-end page to add data to your database. Create a new file `pages/add-products.js` in your project and add the following code to it.

```jsx
import { useState } from 'react';

export default function AddProducts() {
  
  const [state, setState] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // Make a API call to create a product
    
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(state),
    });

    setState({
      title: '',
      price: '',
      description: '',
    });
  }

  return (
    <div className="container">
      <h1>Add Products</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={state.title} onChange={handleChange}/>
        <br />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={state.price} onChange={handleChange}/>
        <br />
        <label htmlFor="description" >Description</label>
        <textarea name="description" value={state.description} onChange={handleChange}/>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
```


In the previous code block you have a simple form component to add products. On form submit it calls the `/api/products` api routes. 

Run the application locally with the following command.

```bash
$ npm run dev
```

Visit [`http://localhost:3000/add-products`](http://localhost:3000/add-products) and try to create a new product.

Notice, when you submit the form it gives you a *404 not found error.* This is because the api route for `api/products` doesn’t exist yet. Let’s go ahead and create the API route next. 

### Create the api route to add product (Backend)

Create a new file `pages/api/products.js` and add the following code to the file.

```jsx
// pages/api/products.js

export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  if(req.method === 'POST') {
    const { title, price, description } = req.body;
    // Save the product to the database
    // TODO: Add Database Code here
    return new Response(
      JSON.stringify({ message: 'Product created successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
```

Try creating a new product from the `add-products` page again. Open the network tab in your browser and notice that on form submit you will not get a 404 error anymore. 

### Reading data from request body in Edge Runtime

The Next.js Edge Runtime is based on standard Web APIs. This is slightly different than the default Node.js-powered API route. The request body for Edge Runtime gives you a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream). You have to decode this to read the request body. 

Make the following changes to your `pages/api/products.js` file to read the request body data.

```jsx
export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  if(req.method === 'POST') {
    const body = await readRequestBodyStream(req.body);
    const { title, price, description } = JSON.parse(body);
    // TODO: Save the product to the database
    return new Response(
      JSON.stringify({ 
        message: 'Product created successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

async function readRequestBodyStream(body) {
  const reader = body.getReader();
  let result = new Uint8Array(0);

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
        break;
    }

    const newResult = new Uint8Array(result.length + value.length);
    newResult.set(result);
    newResult.set(value, result.length);
    result = newResult;
  }
  return new TextDecoder().decode(result);
}
```

However, this is not saving the data in our database yet. Next, let’s add the code for database operation.

### Adding database operations

install the fauna package in your project by running the following command. 

```bash
$ npm i faunadb --save
```

Next, create a new file called `db.js` and add the following code.

```jsx
// db.js

import fauna from 'faunadb';

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_SECRET });

export const createProduct = async (title, price, description) => {
  const product = {
    data: {
      title,
      price,
      description,
    },
  };
  return client.query(q.Create(q.Collection('Products'), product));
};
```

You can import the `createProduct` function into your Edge runtime and execute it to create a new database record.

```jsx
// partials of pages/api/products.js
import { createProduct } from '../../db'

// ...

export default async function (req) {
  if(req.method === 'POST') {
    const body = await readRequestBodyStream(req.body);
    const { title, price, description } = JSON.parse(body);
    
    // Save the product to the database
    const product = await createProduct(title, price, description);

    return new Response(
      JSON.stringify({ 
        message: 'Product created successfully',
        product: {
          id: product.ref.id,
          title,
          price,
          description,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
// ... Rest of the file
```

### Retrieve Products API

Next, go ahead and create new database function to retrieve all the products. Add the following function to your `db.js` file.

```jsx
// db.js

// ... Rest of file

export const getProducts = async () => {
  const response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Products'))),
      q.Lambda(x => q.Get(x))
    )
  );
  const products = response.data.map((product) => ({ ...product.data, _id: product.ref.id }));
  return products;
}
```

Make the following changes in your `pages/index.js` to retrieve all the products.

```jsx
import styles from '../styles/Home.module.css'
import { getProducts } from '../db';

export const config = {
  runtime: 'experimental-edge',
}

export async function getServerSideProps() {
  const fauna_secret = process.env.FAUNA_SECRET;
  const products = await getProducts();
  return {
    props: {
      products,
      fauna_secret
    },
  }
}

export default function Home({ products, fauna_secret }) {
  return (
    <div className={styles.container}>
      <h1>Products</h1>
      <ul>
      {
        products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))
      }
      </ul>
    </div>
  )
} 
```

## Global Application Benchmark

Go to [https://www.webpagetest.org/](https://www.webpagetest.org/) and paste in your website url to check the performance of your global application. You can pick up various global location and network speed. 

For this simple application, the page resolves in less 15ms on average from different servers across the globe. 

The compute and database operations are almost the same across the globe. The powerful combination of Cloudflare CDN, workers and Fauna database allow your code and data to run closer to your end user reducing application latency globally. 

## Where to go from here

If you are looking to build something more practical and hands on we have created a self paced workshop on “How to build a global application with Cloudflare and Fauna”. You can check this out [here](https://github.com/fauna-labs/fauna-workers). 
