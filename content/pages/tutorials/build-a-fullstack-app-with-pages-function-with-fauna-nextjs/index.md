---
updated: 2022-11-30
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
layout: single
title: Build a globally distributed full-stack app using Pages Functions, Next.js and Fauna
---

# Build a globally distributed full-stack application using Cloudflare Pages, Next.js and Fauna

In this tutorial, you will build a globally distributed full-stack application using Cloudflare Pages (the front end), Pages Functions (the back-end logic), and Fauna as the database. You will use the Next.js framework to tie all these services together in a cohesive and scalable codebase. 

## Prerequisites
You must have the following to continue:

- A recent version of [Node and NPM](https://docs.npmjs.com/getting-started) on your computer.
- A [Cloudflare](https://www.cloudflare.com/) account.
- A [Fauna](https://fauna.com/?utm_source=[graphql/aws/cloudflare]&utm_medium=fauna_workshop&utm_campaign=fauna_workshop) account.

## An introduction to globally distributed applications

A globally distributed application always runs closest to the end user, making the application response time fast.

Cloudflare [Pages](https://developers.cloudflare.com/pages/) and Pages Functions run closest to the end user without the need for you to maintain a server. Fauna is a globally distributed database system. It ensures data reads and writes always happen on the closest replicas of your database. The combination of Pages Functions and Fauna allows you to build highly performant applications with low latency.

## Create a new project

Create a new Next.js project by running the following command. 

```sh
$ npx create-next-app <YOUR_APP_NAME>
```

{{<Aside type="note">}}
When you create API routes in your Next.js application (under the `/pages/api` folder) these will be turned into a Pages Function which will run globally on Cloudflare's network.
{{</Aside>}}

### Configure the project to use the Edge Runtime

Next, enable edge-runtime for your API routes. Open the `pages/api/hello.js` file. This is an API route. When deployed this API route will become a Pages Function. For this to work, add the following code.

```jsx
---
filename: pages/api/hello.js
---

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

![Build output](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/build-output.png)

A folder named `.vercel/output` will be created. Find the generated Clourflare Workers and Pages Functions inside this folder.

### Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new/). When you are done creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```
$ git remote add origin <YOUR_GITHUB_REPO_URL>
$ git branch -M main
$ git push -u origin main

```

### Deploy with Cloudflare Pages

To deploy your project:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In Account Home, select **Pages** > **Create a project**.
3. In **Build settings**, select **Next.js** as your **Framework preset**.

![Configure deployment](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/configure-build.png)

4. In **Environment variables (advanced), add a new variable called `NODE_VERSION` and add the Node version of your project. You need a Node version `14` or higher.

![Define Node Version in Cloudflare configuration](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/node_version.png)

5. Select **Save and Deploy**.



Next, go to [`https://<YOUR_DOMAIN_NAME>/api/hello`](https://with-cloudflare-nextjs.pages.dev/api/hello) to make sure that the Pages Function is working as expected.
## Configure Fauna database

To configure your Fauna database:
1. Log in to your [Fauna dashboard](https://dashboard.fauna.com/) or create an account and log in.
2. Create a new database give your database a name. 

![Create a database](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/create_database.png)

3. Select **Classic** as your **Region Group** and select **Create**.
{{<Aside type="note">}}
By default, Fauna allows you to save your data globally closer to your user. You can limit your data's distribution to a specific geographic region group to comply with GDPR and data residency. Learn more about [region groups](https://docs.fauna.com/fauna/current/learn/understanding/region_groups).
You also have the option to save data into privately distributed nodes with [Virtual Private Fauna](https://www.globenewswire.com/news-release/2022/11/17/2558259/0/en/Fauna-Launches-Virtual-Private-Offering-of-its-Serverless-Database-for-the-Most-Demanding-Enterprise-Applications.html).
{{</Aside>}}



4. Next, select **NEW COLLECTION*. 

![Create a new Collection called Products](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/new_prod_collection.png)

5. Create a new Collection called `Products`.

![New Key](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/new_key.png)

6. You need a secret to query your database from your application. Go to **Security** > **Keys** and select **New Key**.

7. Select *Server* as your **Role**. 

8. Give your key a name and select **Save**. When the key is generated, save it into a secure file.

![New Key Role](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/new_key_conf.png)

9. For local development, create a new file called `.env` in the root of your project and add the following code. Make sure you add `.env` to your `.gitignore` file so it does not get committed.

```bash
FAUNA_SECRET=fnAExxxx
```

8. Finally, head back to Cloudflare Pages settings and add a new environment variable called FAUNA_SECRET. 

![Fauna Secret](/pages/tutorials/build-a-fullstack-app-with-pages-function-with-fauna-nextjs/fauna_secret.png)

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
---
filename: db.js
---

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
  const faunaSecret = process.env.FAUNA_SECRET;
  const products = await getProducts();
  return {
    props: {
      products,
      faunaSecret
    },
  }
}

export default function Home({ products, faunaSecret }) {
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

## Test your application's speed

Go to [https://www.webpagetest.org/](https://www.webpagetest.org/) and paste in your website url to check the performance of your global application. You can pick up various global location and network speed. 

For this simple application, the page should resolve in less 15 ms on average from different servers across the globe. 

The compute and database operations are almost the same across the globe. The combination of Cloudflare CDN, Workers and Fauna database allows your code and data to run closer to your end user reducing application latency globally.

## Related resources

* Build a [global application with Cloudflare and Fauna](https://github.com/fauna-labs/fauna-workers)