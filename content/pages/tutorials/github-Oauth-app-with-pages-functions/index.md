---
difficulty: Beginner
content_type: 📝 Tutorial
pcx-content-type: tutorial
title: Add GitHub login Option to your application with OAuth2.0 and Pages Functions
---

# Add GitHub login Option to your application with OAuth2.0 and Pages Functions

In this tutorial, you will build an Oauth app with GitHub apps and Pages Functions. In the process you will learn about JWTs, Oauth apps and how to intercept requests between client side JavaScript and serverless functions.

{{<Aside type="note">}}
This tutorial assumes you have registered a  GitHub OAuth app. If you have not, [create a new GitHub OAuth app](https://github.com/settings/applications/new) and set your  homepage URL and authorization callback URL to your project URL. E.g. http://localhost:8788/

{{</Aside>}}

This tutorial will make heavy use of Cloudflare Pages [Workers integration, Pages Functions](/pages/platform/functions/) and GitHub Authorization credentials. Refer to the [Get started guide](/pages/get-started/) guide to familiarize yourself with the platform.

## Overview

In most applications we use, there is usually an option to login or sign Up with a 3rd party application like Google, Twitter or GitHub. 

When you select any of these option, you are authorizing the application to query information that it would need to sign you up or log you into the app. 

These options would usually be links that send an authurization code to a server and the server then takes that code and exchanges it for a token which can be used to get user login information. In this Tutorial, you will use the token to get the user from the  `RESOURCE_ENDPOINT`. 

To make sure the user information is secure you will sign the user information as a payload with a secret in a Json Web Token format (JWT) and then set this `JWT` to the locally storage to make sure who is logged in at a particular time.

To take it a step further, you will can check that `JWT` is available before allowing the application to fetch repos, by first getting the `JWT` from the localStorage and verifying it to make sure it was signed by your secret.

Below is an example of what the Client HTML will look like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
  <section>
    <a class="btn">Authorize with GitHub</a>
    <button class="btn">Fetch repos</button>
  </section>
  <script src="./index.js" type="module" ></script>
</body>
</html>
```

## Setup 

To begin, create a `client/index.html` in the root of your project to serve the static part of your application. In the same client directory create a `index.js` file, this is where you will have your client side logic.

Copy and paste the following content into your `client/index.html` file, this file contains : 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
  <section>
    <a class="btn">Authorize with GitHub</a>
    <button class="btn">Fetch repos</button>
  </section>
  <script src="./index.js" type="module" ></script>
</body>
</html>
```

The HTML document contains a script that links it to the `index.js`, which is where the client side JavaScript for getting Authorization and handling the code coming from your OAuth app will live. 

Before setting up your Client site funtions, you will need to create a `config.js` file in the root of your project to handle all your GitHub app credentials. You will export these credentials so you can access anywhere in your application. 

```js
export default {
  CLIENT_ID: "********",
  CLIENT_SECRET: "***********",
  REDIRECT_URL: "http://localhost:8788/",
  AUTHORIZATION_ENDPOINT: "https://github.com/login/oauth/authorize",
  TOKEN_ENDPOINT: "https://github.com/login/oauth/access_token",
  RESOURCE_ENDPOINT: "https://api.github.com/",
};
```

{{<Aside type="note" header="Note">}}

Your REDIRECT_URL should be the same URL you used as your callback URL while setting  up your application.

{{</Aside>}}

## Get Authorization from OAuth App.

Now in your `index.js` file, import the `config.js` file and set up your authorization logic. You will need to access your OAuth app through the `AUTHORIZATION_ENDPOINT` then your app will respond with a code that you will then send to the server. 

```js 
import config from "../config";
import qs from "query-string";

function  getAppauthorization() {
  const oAuthQueryParams = {
    response_type: "code",
    scope: "user public_repo",
    redirect_url: config.REDIRECT_URL,
    client_id: config.CLIENT_ID,
    state: "random_state_string",
  };

  const query = qs.stringify(oAuthQueryParams);
  const url = `${config.AUTHORIZATION_ENDPOINT}?${query}`;
  const loginLink = document.querySelector("a");
  loginLink.setAttribute("href", url);
}


window.onload = function () {
    getAppauthorization();   
};

```

From the code block above you will notice we called an onload method to the window`window.onload`, we do this so the functions will be fired when the whole page has loaded, including all dependent resources such as stylesheets and images. 

Notice the response type is a code,  you will need to send this code to the server to be able to get the access token. To do this we need to get the response code from the URL. In the same file create a `handleCode` function and update the `window.onload` funtion

```js
function handleCode(){
  const parsedQuery = qs.parseUrl(window.location.href)

  if(parsedQuery.query.code){
    sendCodeToServer()
  }else{
    throw new Error("No code found in url")
  }

  async function sendCodeToServer(){
    const server = "http://localhost:8788/api/code"
    try {
      const res = await fetch(server,{
        method: "POST",
        body: JSON.stringify({
          code: parsedQuery.query.code,
          state: parsedQuery.query.state
        }),
        headers:{'Content-Type' :'application/json' }
      })
      
      const data = await res.json() 
      window.location.href = config.REDIRECT_URL;
      
    } catch (error) {
      console.log(error)
    }
  }
}
```
In the code block above, you will notice that we send the code to `http://localhost:8788/api/code` this is where our serverless code will be. 


## Setting up Server with Functions

Cloudflare Pages offers [Functions](pages/platform/functions/) which enable you to run server-side code to enable dynamic functionality without running a dedicated server, you can handle tasks like Authentication, quering databases or other applications.

In this tutorial we will be using Functions to handle exchanging our code for an access Token, signing JWTs, authenticating users and quering GitHub for resources using the detials of the authenticated user.

The code from your OAuth App is sent to `/api/code`, you must create a `functions/api/code.js` file in the root of your project. Your file structure should look like this now:

```txt
├── ...
├── functions
|   └── api
|         └── Code.js
├── Client
|   └── index.html
|   └── index.js
├── config.js
└── ...
``` 

The `handleCode` function will send `POST` requests, which means that the `functions/api/code.js` file needs to export an `OnRequestPost` handler:

```js
---
filename: functions/api/code.js
---
/**
 * Post /api/code
 */

export async function onRequestPost(context) {
  /** TODO:
   * 1. Exchange code for access token 
   * 2. Use acess token to fetch user info
   * 3. encode user info as JWT
   */
}
```
The `context` parameter is an object filled with several values of potential interest. For this example, you only need the [`Request`](/workers/runtime-apis/request/) object and the [`env`](/pages/platform/functions/#writing-your-first-function), which can be accessed through the `context.request` key.

As mentioned, the code is sent to `/api/code.js`, you can access it from within the request object and use a `json()` to make the request into a Readable stream. You then want to pass the code to a function to exchange the code for an Access token.

```js
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const token = await exchangeCodeForToken(body.code);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}
```

### Exchange Code for Access token. 

In the same, `code.js` file you will create an async function called `exchangeCodeForToken` that will take the code as an argument. You will need to use the config file parameters to query the `TOKEN_ENDPOINT` and send the other parameters as the body. The response to this will be an Object and you can get the access token by getting the value of `access_token` this can be seen in the code block below: 

```js
async function exchangeCodeForToken(code) {
  const TokenURL = config.TOKEN_ENDPOINT;
  const oAuthQueryParams = {
    grant_type: "authorization_code",
    redirect_url: config.REDIRECT_URL,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code: code,
  };

  const res = await fetch(TokenURL, {
    body: JSON.stringify(oAuthQueryParams),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.text();
  const parsedData = qs.parse(data);
  console.log(parsedData.access_token);
  return parsedData.access_token;
}
```

### Use Access token to fetch user information.

Now that you have the access token you can use it to query for user information. As mentioned your config file will be your access point to GitHub. Create a `fetchUser` function, this will take the access token as an argument.

In the fetchUser function, you will need to construct a userURL using your `RESOURCE_ENDPOINT` and a user paramenter like so, `config.RESOURCE_ENDPOINT + "user";`. The authorization object value will be your Access token. The `onRequestPOST` function will need to be updated to await your `fetchUser` function.


```js

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const token = await exchangeCodeForToken(body.code);
    const user = await fetchUser(token); // New Line
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}

async function exchangeCodeForToken(code) {
  const TokenURL = config.TOKEN_ENDPOINT;
  const oAuthQueryParams = {
    grant_type: "authorization_code",
    redirect_url: config.REDIRECT_URL,
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code: code,
  };

  const res = await fetch(TokenURL, {
    body: JSON.stringify(oAuthQueryParams),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.text();
  const parsedData = qs.parse(data);
  console.log(parsedData.access_token);
  return parsedData.access_token;
}

async function fetchUser(token) {
  const userURL = config.RESOURCE_ENDPOINT + "user";
  const res = await fetch(userURL, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "Mozilla/5.0", // Add user agent for GitHub API when using workers
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}
```

### Encode User information with a Json Web Token JWT.

The User information is sensitive and will be used on the client side. To make sure that this information is secure and isn't manipulated by a 3rd party we will use Json Web Token (JWT).

A [Json web tokens](https://jwt.io/introduction) is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims to resources.

We will use [Cloudflare Worker JWT](https://www.npmjs.com/package/@tsndr/cloudflare-worker-jwt) a light weight NPM package for JWT implementation to encode and decode our JWT. 

JWTs are usually created by signing a Payload with a secret. The payload can be user information and the secret key can be assigned by you. In this case we will define a secret key.

```
const myVerySecretString = "*********"
```
Your secret key can be any set of strings. In the `code.js` file import the package and use the `.sign` method to sign the jwtPayload and your secret string.

```js
import jwt from "@tsndr/cloudflare-worker-jwt";
import config from "../config";
import qs from "query-string";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    console.log(body) 
    const token = await exchangeCodeForToken(body.code);
    const user = await fetchUser(token);
    const jwtencoded = await encodeJWT(user, myVerySecretString);
    return new Response(JSON.stringify({ jwtencoded }),
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}

....

async function encodeJWT(user, token) {
  const jwtPayload = {
    login: user.login,
    id: user.id,
    avatar_url: user.avatar_url,
  };
  
  return jwt.sign(jwtPayload, token);
}

```


## Cache User infomation in KV

[Workers Kv](/workers/runtime-apis/kv/) is a global low-latency, key-value data store. It can be used to cache information that has been recieved from a server and in this case you will use it to cache user information. 

You will used the `env` argument to access your kv store, KV takes a first value as a string and then the next value can be JSON is this case we want to use the  user ID as the key and stringify the user infomation and access token as the value.

Since the user information is cached we will not need to do any network request for the user info if we want to fetch for repos as you will see in the next section.

```js
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    console.log(body) // use request.json  to make request body a readable stream
    const token = await exchangeCodeForToken(body.code);
    const user = await fetchUser(token);
    const jwtencoded = await encodeJWT(user, myVerySecretString);

    await env.kv_userDatabase.put(
      `${user.id}`,
      JSON.stringify({ user, token })
    ) // New Line 

    console.log(jwtencoded);
    return new Response(JSON.stringify({ jwtencoded }),
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}
```


## Use JWT for Client login validation and fetching User Repos. 

While you can use JWTs for validating users you can also use it to know when a user is logined or not and then give them access to other parts of your application based on the presence of this JWT. 

In your application you can do this by setting the JWT to localStorage. In the `client/index.js` file you will update your `handleCode` function to set the encoded JWT from the server to a jwt value: 

```js
---
filename: client/index.js
---

function handleCode(){
  const parsedQuery = qs.parseUrl(window.location.href)

  if(parsedQuery.query.code){
    sendCodeToServer()
  }else{
    throw new Error("No code found in url")
  }

  async function sendCodeToServer(){
    const server = "http://localhost:8788/api/code"
    try {
      const res = await fetch(server,{
        method: "POST",
        body: JSON.stringify({
          code: parsedQuery.query.code,
          state: parsedQuery.query.state
        }),
        headers:{'Content-Type' :'application/json' }
      })
      
      const data = await res.json() 
      console.log("hellloo ", data)
      localStorage.setItem("jwt", data.jwtencoded); // New line
      window.location.href = config.REDIRECT_URL;
      
    } catch (error) {
      console.log(error)
    }
  }
}
```

### Allowing access to routes based on JWT

Since we authenticate using a JWT we can create some restrictions based on the presence of this JWT. In the `client/index.html` file we have a fetch repos button, we can make this button inaccessible if the JWT is't present. 

This will mean that if a user hasn't authorized the application and has a JWT they will not be allowed to fetch repos. 

To do this, create a `ProtectedTask` function and within this function use the `querySelector` method to get the button and set the display to none. Then check that the JWT is present in the localStorage, if it is check the display to block and add an `EventListener` to fetch repos with a `fetchRepos` function onClick.

```js
function protectedRequest(){
  const requestButton = document.querySelector("button");

  requestButton.style.display = "none";

  if (localStorage.getItem("jwt")) {
    requestButton.style.display = "block";
    requestButton.addEventListener("click", function () {
      fetchRepos();
    });
  }
}
```

The `fetchRepos` functions makes a request to the server and sends the JWT in local storage to `api/code`

```js
async function fetchRepos() {
  const server = "http://localhost:8788/api/repos";
  try {
    const res = await fetch(server, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    const data = await res.json();

  } catch (error) {
    console.log(error);
  }
}
```

### Fetch and list Repos 

You now have your user information and can now use that to get repos. Since you are making a `GET` request you will need to send this request to another server route. The `fetchRepos` function will make a `GET` request to `http://localhost:8788/api/repos` which is a functions route. 

Create a `functions/api/repos.js`file and your files should look like this now

```txt
├── ...
├── functions
|   └── api
|         └── code.js
|         └── repos.js
├── client
|   └── index.html
|   └── index.js
├── config.js
└── ...
``` 

In the `repos.js` file export an async `onRequestGet` function to match the `GET` request. 

```js
export async function onRequestGet({ request, env }) {
   /** TODO:
   * 1. Get JWT from Localstorage
   * 2. Verify  and decode JWT
   * 3.fetch repos
   */
}
```

First, you will get the JWT from the client, verify and decode it. This will allow you to fetch repos. 

The JWT is sent in the request header and then you will verify it with the `.verify` method which takes the JWT token and your secret string as an argument.

If the JWT isn't valid you can return a `401` status code. If it is, use the `.decode` method to decode it then use the ID from the payload as a key to fetch from KV. You can then pass the user token to a `showRepo` function that fetches the repos.

```js
import jwt from "@tsndr/cloudflare-worker-jwt";
import { myVerySecretString } from "./code";
import config from "../config";

export async function onRequestGet({ request, env }) {
  try {
    const token = request.headers.get("Authorization").split(" ")[1];

    // verify JWT
    const verifiedJWT = await jwt.verify(token, myVerySecretString)
    if (!verifiedJWT) {
      return new Response("Not valid JWT", {status: 401})
    }
    
    const decodedJwt = jwt.decode(token)

    const user = await env.kv_userDatabase.get(`${decodedJwt.id}`, "json")

    if (!user) {
      return new Response("User not found", {status: 404})
    }

    const repos = await showRepos(user.token);
    return new Response(JSON.stringify(repos));
    // res.json(repos); // Send repos to client
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }));
  }
}

```

As mentioned the `showRepos` function takes the user token as an argument, then you will construct a url with the `RESOURCE_ENDPOINT` and user repo query string, this will return a lost of repos and a JSON object

```js
async function showRepos(token) {
   const url = `${config.RESOURCE_ENDPOINT}user/repos?sort=created&direction=asc`;
   const res = await fetch(url, {
     headers: {
       Authorization: `Bearer ${token}`,
       "user-agent": "Pages Functions"
     },
   });

   const data = await res.json();
   return data;
 }

```

### Show list of repos 

To list of repos is now a JSON Object that can be used in the reponse in the client. By iterating over the response from the Server you will create an element using the `createElement` method and setting the HTML of the element created to  the value of the reponse.

```js
async function fetchRepos() {
  const server = "http://localhost:8788/api/repos";
  try {
    const res = await fetch(server, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    const data = await res.json();

    for( var i of data){
      const repo = document.createElement("div")
      repo.innerHTML = i.name
      document.body.appendChild(repo)
    } //New line
  } catch (error) {
    console.log(error);
  }
}
```

In this tutorial, you built and deployed an OAuth app and its back-end logic using Cloudflare Pages with its Workers integration. You created serverless routes that handled Authentication, fetched user information, encoded user information as JWTs and used KV to cache the user information from GitHub.

## Related resources

- [Functions](/pages/platform/functions/)