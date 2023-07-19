---
updated: 2020-03-09
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a todo list JAMstack application
layout: single
---

# Build a todo list JAMstack application

{{<render file="_tutorials-wrangler-v1-warning.md">}}

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will build a todo list application using HTML, CSS, and JavaScript. The application data will be stored in [Workers KV](/workers/runtime-apis/kv/).

![Preview of a finished todo list. Continue reading for instructions on how to set up a todo list.](/images/workers/tutorials/jamstack/finished.png)

Before starting this project, you should have some experience with HTML, CSS, and JavaScript. You will learn:

1.  How building with Workers makes it easy to focus on writing code and ship finished products.
2.  How the addition of Workers KV makes this tutorial a great introduction to building full, data-driven applications.

If you would like to see the finished code for this project, find the [project on GitHub](https://github.com/codewithkristian/cloudflare-workers-todos) and refer to the [live demo](https://todos.signalnerve.workers.dev/) to review what you will be building.

## Init

Cloudflare offers a collection of pre-built examples for getting started with Workers. These are often referred to as templates, each of which emphasizes a particular use case or language. Wrangler, Cloudflare’s command-line tool for managing Worker projects, integrates with all templates so that it is even easier to start writing Workers. In this tutorial, you will use the default JavaScript template to create a Workers project.

In your terminal, create a Worker project with your desired project name; for example, `todos`:

```sh
---
header: Generate a project
---
$ wrangler init todos
$ cd todos
```

Wrangler templates are Git repositories. You can create your own templates or use one from the [Template Gallery](/workers/examples/).

Wrangler’s default template includes support for building and deploying JavaScript-based projects, including Webpack support. Inside of your new `todos` directory, `index.js` represents the entry point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are triggered when a client makes a request to a Workers route. When that request occurs, your constructed response will be returned to the user. This tutorial will guide you through understanding how the request/response pattern works and how you can use it to build fully featured applications.

```js
---
filename: index.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello worker!', { status: 200 });
}
```

In your default `index.js` file, you can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text `"Hello worker!"`, as well as an explicit `200` status code. When a Worker receives a `fetch` event, the script must use `event.respondWith` to return the newly constructed response to the client. This means that your Cloudflare Worker script will serve new responses directly from [Cloudflare's global network](https://www.cloudflare.com/network).

If you compare this with more traditional architectures, where an origin server would accept requests and return responses, Cloudflare Workers allows you to do the same work without managing hardware and closer to the client, resulting in reduced cost and latencies.

## Build

The code provided by the default Wrangler template generates a simple text response and returns it to the client. In this tutorial, you will build off of that approach by reading data from KV and using it to populate an HTML response to send to the client.

The work needed to create this application is split into three tasks:

1.  Write data to KV.
2.  Rendering data from KV.
3.  Adding todos from the application UI.

For the remainder of this tutorial you will complete each task, iterating on your application, and then publish it to your own domain.

### Writing data to KV

To begin, you need to understand how to populate your todo list with actual data. To do this, use Cloudflare Workers KV — a key-value store that you can access inside of your Worker script to read and write data.

To get started with KV, set up a namespace. All of your cached data will be stored inside that namespace and, with configuration, you can access that namespace inside the script with a predefined variable. Use Wrangler to create a new namespace and get the associated namespace ID by running the following command in your terminal:

```sh
---
header: Create a new KV namespace
---
$ wrangler kv:namespace create "TODOS" --preview
```

Namespaces can be added to your application by defining them inside your Wrangler configuration. Copy your newly created namespace ID, and in your `wrangler.toml`, define a `kv_namespaces` key to set up your namespace:

```toml
---
filename: wrangler.toml
---
kv_namespaces = [
  {binding = "TODOS", id = "abcdef123"}
]
```

The defined namespace, `TODOS`, will now be available inside of your codebase. With that, it is time to understand the KV API. A KV namespace has three primary methods you can use to interface with your cache: `get`, `put`, and `delete`.

Start storing data by defining an initial set of data, which you will put inside of the cache using the `put` method. The following example defines a `defaultData` object instead of a simple array of todos. You may want to store metadata and other information inside of this cache object later on. Given that data object, use `JSON.stringify` to put a string into the cache:

```js
---
filename: index.js
---
async function handleRequest(request) {
  const defaultData = {
    todos: [
      {
        id: 1,
        name: 'Finish the Cloudflare Workers blog post',
        completed: false,
      },
    ],
  };
  TODOS.put('data', JSON.stringify(defaultData));

  // ...previous code
}
```

Workers KV is an eventually consistent, global datastore. Any writes within a region are immediately reflected within that same region but will not be immediately available in other regions. However, those writes will eventually be available everywhere and, at that point, Workers KV guarantees that data within each region will be consistent.

Given the presence of data in the cache and the assumption that your cache is eventually consistent, this code needs a slight adjustment: the application should check the cache and use its value, if the key exists. If it does not, you will use `defaultData` as the data source for now (it should be set in the future) and write it to the cache for future use. After breaking out the code into a few functions for simplicity, the result looks like this:

```js
---
filename: index.js
lines: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
---
const defaultData = {
  todos: [
    {
      id: 1,
      name: 'Finish the Cloudflare Workers blog post',
      completed: false,
    },
  ],
};

const setCache = data => TODOS.put('data', data);
const getCache = () => TODOS.get('data');

async function getTodos(request) {
  // ... previous code

  let data;
  const cache = await getCache();
  if (!cache) {
    await setCache(JSON.stringify(defaultData));
    data = defaultData;
  } else {
    data = JSON.parse(cache);
  }
}
```

### Rendering data from KV

Given the presence of data in your code, which is the cached data object for your application, you should take this data and render it in a user interface.

To do this, make a new `html` variable in your Workers script and use it to build up a static HTML template that you can serve to the client. In `handleRequest`, construct a new `Response` with a `Content-Type: text/html` header and serve it to the client:

```js
---
filename: index.js
---
const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Todos</title>
  </head>
  <body>
    <h1>Todos</h1>
  </body>
</html>
`;

async function handleRequest(request) {
  const response = new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
  return response;
}
```

You have a static HTML site being rendered and you can begin populating it with data. In the body, add a `div` tag with an `id` of `todos`:

```js
---
filename: index.js
highlight: [10]
---
const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Todos</title>
  </head>
  <body>
    <h1>Todos</h1>
    <div id="todos"></div>
  </body>
</html>
`;
```

Add a `<script>` element at the end of the body content that takes a `todos` array. For each `todo` in the array, create a `div` element and appends it to the `todos` HTML element:

```js
---
filename: index.js
highlight: [11, 12, 13, 14, 15, 16, 17, 18, 19]
---
const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Todos</title>
  </head>
  <body>
    <h1>Todos</h1>
    <div id="todos"></div>
    <script>
      window.todos = []
      var todoContainer = document.querySelector("#todos")
      window.todos.forEach(todo => {
        var el = document.createElement("div")
        el.textContent = todo.name
        todoContainer.appendChild(el)
      })
    </script>
  </body>
</html>
`;
```

Your static page can take in `window.todos` and render HTML based on it, but you have not actually passed in any data from KV. To do this, you will need to make a few changes.

First, your `html` variable will change to a function. The function will take in a `todos` argument, which will populate the `window.todos` variable in the above code sample:

```js
---
filename: index.js
highlight: [1, 6]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    window.todos = ${todos}
    var todoContainer = document.querySelector("#todos")
    // ...
  <script>
</html>
`;
```

In `handleRequest`, use the retrieved KV data to call the `html` function and generate a `Response` based on it:

```js
---
filename: index.js
highlight: [2]
---
async function handleRequest(request) {
  const body = html(JSON.stringify(data.todos).replace(/</g, '\\u003c'));
  const response = new Response(body, {
    headers: { 'Content-Type': 'text/html' },
  });
  return response;
}
```

### Adding todos from the UI

At this point, you have built a Cloudflare Worker that takes data from Cloudflare KV and renders a static page based on that Worker. That static page reads data and generates a todo list based on that data. The remaining task is creating todos from inside the application UI. You can add todos using the KV API — update the cache by running `TODOS.put(newData)`.

To update a todo item, you will add a second handler in your Workers script, designed to watch for `PUT` requests to `/`. When a request body is received at that URL, the Worker will send the new todo data to your KV store.

Add this new functionality in `handleRequest`: if the request method is a PUT, it will take the request body and update the cache.

```js
---
filename: index.js
highlight: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const setCache = data => TODOS.put('data', data);

async function updateTodos(request) {
  const body = await request.text();
  try {
    JSON.parse(body);
    await setCache(body);
    return new Response(body, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}

async function handleRequest(request) {
  if (request.method === 'PUT') {
    return updateTodos(request);
  } else {
    // Defined in previous code block
    return getTodos(request);
  }
}
```

Check that the request is a `PUT` and wrap the remainder of the code in a `try/catch` block. First, parse the body of the request coming in, ensuring that it is JSON, before you update the cache with the new data and return it to the user. If anything goes wrong, return a `500` status code. If the route is hit with an HTTP method other than `PUT` — for example, `POST` or `DELETE` — return a `404` error.

With this script, you can now add some dynamic functionality to your HTML page to actually hit this route. First, create an input for your todo name and a button for submitting the todo.

```js
---
filename: index.js
highlight: [5, 6, 7, 8]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <div>
    <input type="text" name="name" placeholder="A new todo"></input>
    <button id="create">Create</button>
  </div>
  <!-- existing script -->
</html>
`;
```

Given that input and button, add a corresponding JavaScript function to watch for clicks on the button — once the button is clicked, the browser will `PUT` to `/` and submit the todo.

```js
---
filename: index.js
highlight: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    // Existing JavaScript code

    var createTodo = function() {
      var input = document.querySelector("input[name=name]")
      if (input.value.length) {
        todos = [].concat(todos, {
          id: todos.length + 1,
          name: input.value,
          completed: false,
        })
        fetch("/", {
          method: "PUT",
          body: JSON.stringify({ todos: todos }),
        })
      }
    }

    document.querySelector("#create").addEventListener("click", createTodo)
  </script>
</html>
`;
```

This code updates the cache. Remember that the KV cache is eventually consistent — even if you were to update your Worker to read from the cache and return it, you have no guarantees it will actually be up to date. Instead, update the list of todos locally, by taking your original code for rendering the todo list, making it a re-usable function called `populateTodos`, and calling it when the page loads and when the cache request has finished:

```js
---
filename: index.js
highlight: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    var populateTodos = function() {
      var todoContainer = document.querySelector("#todos")
      todoContainer.innerHTML = null
      window.todos.forEach(todo => {
        var el = document.createElement("div")
        el.textContent = todo.name
        todoContainer.appendChild(el)
      })
    }

    populateTodos()

    var createTodo = function() {
      var input = document.querySelector("input[name=name]")
      if (input.value.length) {
        todos = [].concat(todos, {
          id: todos.length + 1,
          name: input.value,
          completed: false,
        })
        fetch("/", {
          method: "PUT",
          body: JSON.stringify({ todos: todos }),
        })
        populateTodos()
        input.value = ""
      }
    }

    document.querySelector("#create").addEventListener("click", createTodo)
  </script>
`;
```

With the client-side code in place, deploying the new version of the function should put all these pieces together. The result is an actual dynamic todo list.

### Updating todos from the application UI

For the final piece of your todo list, you need to be able to update todos — specifically, marking them as completed.

Luckily, a great deal of the infrastructure for this work is already in place. You can update the todo list data in the cache, as evidenced by your `createTodo` function. Performing updates on a todo is more of a client-side task than a Worker-side one.

To start, the `populateTodos` function can be updated to generate a `div` for each todo. In addition, move the name of the todo into a child element of that `div`:

```js
---
filename: index.js
highlight: [11, 12, 13]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    var populateTodos = function() {
      var todoContainer = document.querySelector("#todos")
      todoContainer.innerHTML = null
      window.todos.forEach(todo => {
        var el = document.createElement("div")
        var name = document.createElement("span")
        name.textContent = todo.name
        el.appendChild(name)
        todoContainer.appendChild(el)
      })
    }
  </script>
`;
```

You have designed the client-side part of this code to handle an array of todos and render a list of simple HTML elements. There is a number of things that you have been doing that you have not quite had a use for yet – specifically, the inclusion of IDs and updating the todo's completed state. These things work well together to actually support updating todos in the application UI.

To start, it would be useful to attach the ID of each todo in the HTML. By doing this, you can then refer to the element later in order to correspond it to the todo in the JavaScript part of your code. Data attributes and the corresponding `dataset` method in JavaScript are a perfect way to implement this. When you generate your `div` element for each todo, you can attach a data attribute called todo to each `div`:

```js
---
filename: index.js
highlight: [11]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    var populateTodos = function() {
      var todoContainer = document.querySelector("#todos")
      todoContainer.innerHTML = null
      window.todos.forEach(todo => {
        var el = document.createElement("div")
        el.dataset.todo = todo.id

        var name = document.createElement("span")
        name.textContent = todo.name

        el.appendChild(name)
        todoContainer.appendChild(el)
      })
    }
  </script>
`;
```

Inside your HTML, each `div` for a todo now has an attached data attribute, which looks like:

```html
<div data-todo="1"></div>
<div data-todo="2"></div>
```

You can now generate a checkbox for each todo element. This checkbox will default to unchecked for new todos but you can mark it as checked as the element is rendered in the window:

```js
---
filename: index.js
highlight: [13, 14, 15, 17]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    window.todos.forEach(todo => {
      var el = document.createElement("div")
      el.dataset.todo = todo.id

      var name = document.createElement("span")
      name.textContent = todo.name

      var checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.checked = todo.completed ? 1 : 0

      el.appendChild(checkbox)
      el.appendChild(name)
      todoContainer.appendChild(el)
    })
  </script>
`;
```

The checkbox is set up to correctly reflect the value of completed on each todo but it does not yet update when you actually check the box. To do this, attach the `completeTodo` function as an event listener on the `click` event. Inside the function, inspect the checkbox element, find its parent (the todo `div`), and use its `todo` data attribute to find the corresponding todo in the data array. You can toggle the completed status, update its properties, and rerender the UI:

```js
---
filename: index.js
highlight: [9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
---
const html = todos => `
<!doctype html>
<html>
  <!-- existing content -->
  <script>
    var populateTodos = function() {
      window.todos.forEach(todo => {
        // Existing todo element set up code
        checkbox.addEventListener("click", completeTodo)
      })
    }

    var completeTodo = function(evt) {
      var checkbox = evt.target
      var todoElement = checkbox.parentNode

      var newTodoSet = [].concat(window.todos)
      var todo = newTodoSet.find(t => t.id == todoElement.dataset.todo)
      todo.completed = !todo.completed
      todos = newTodoSet
      updateTodos()
    }
  </script>
`;
```

The final result of your code is a system that checks the `todos` variable, updates your Cloudflare KV cache with that value, and then does a re-render of the UI based on the data it has locally.

## Conclusions and next steps

By completing this tutorial, you have built a static HTML, CSS, and JavaScript application that is transparently powered by Workers and Workers KV, which take full advantage of Cloudflare's global network.

If you would like to keep improving on your project, you can implement a better design (you can refer to a live version available at [todos.signalnerve.workers.dev](https://todos.signalnerve.workers.dev/)), or make additional improvements to security and speed.

You may also want to add user-specific caching. Right now, the cache key is always `data` – this means that any visitor to the site will share the same todo list with other visitors. Within your Worker, you could use values from the client request to create and maintain user-specific lists. For example, you may generate a cache key based on the requesting IP:

```js
---
filename: index.js
highlight: [2, 3, 5, 20, 21, 24]
---
async function getTodos(request) {
  const ip = request.headers.get('CF-Connecting-IP');
  const myKey = `data-${ip}`;
  let data;
  const cache = await getCache(myKey);
  if (!cache) {
    await setCache(myKey, JSON.stringify(defaultData));
    data = defaultData;
  } else {
    data = JSON.parse(cache);
  }
  const body = html(JSON.stringify(data.todos || []).replace(/</g, '\\u003c'));
  return new Response(body, {
    headers: { 'Content-Type': 'text/html' },
  });
}

async function updateTodos(request) {
  const body = await request.text();
  const ip = request.headers.get('CF-Connecting-IP');
  const myKey = `data-${ip}`;
  try {
    JSON.parse(body);
    await setCache(myKey, body);
    return new Response(body, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
```

After making these changes and deploying the Worker one more time, your todo list application now includes per-user functionality while still taking full advantage of Cloudflare's global network.

The final version of your Worker script should look like this:

```js
---
filename: index.js
---
const html = todos => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Todos</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet"></link>
  </head>

  <body class="bg-blue-100">
    <div class="w-full h-full flex content-center justify-center mt-8">
      <div class="bg-white shadow-md rounded px-8 pt-6 py-8 mb-4">
        <h1 class="block text-grey-800 text-md font-bold mb-2">Todos</h1>
        <div class="flex">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-800 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" placeholder="A new todo"></input>
          <button class="bg-blue-500 hover:bg-blue-800 text-white font-bold ml-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="create" type="submit">Create</button>
        </div>
        <div class="mt-4" id="todos"></div>
      </div>
    </div>
  </body>

  <script>
    window.todos = ${todos}

    var updateTodos = function() {
      fetch("/", { method: "PUT", body: JSON.stringify({ todos: window.todos }) })
      populateTodos()
    }

    var completeTodo = function(evt) {
      var checkbox = evt.target
      var todoElement = checkbox.parentNode
      var newTodoSet = [].concat(window.todos)
      var todo = newTodoSet.find(t => t.id == todoElement.dataset.todo)
      todo.completed = !todo.completed
      window.todos = newTodoSet
      updateTodos()
    }

    var populateTodos = function() {
      var todoContainer = document.querySelector("#todos")
      todoContainer.innerHTML = null

      window.todos.forEach(todo => {
        var el = document.createElement("div")
        el.className = "border-t py-4"
        el.dataset.todo = todo.id

        var name = document.createElement("span")
        name.className = todo.completed ? "line-through" : ""
        name.textContent = todo.name

        var checkbox = document.createElement("input")
        checkbox.className = "mx-4"
        checkbox.type = "checkbox"
        checkbox.checked = todo.completed ? 1 : 0
        checkbox.addEventListener("click", completeTodo)

        el.appendChild(checkbox)
        el.appendChild(name)
        todoContainer.appendChild(el)
      })
    }

    populateTodos()

    var createTodo = function() {
      var input = document.querySelector("input[name=name]")
      if (input.value.length) {
        window.todos = [].concat(todos, { id: window.todos.length + 1, name: input.value, completed: false })
        input.value = ""
        updateTodos()
      }
    }

    document.querySelector("#create").addEventListener("click", createTodo)
  </script>
</html>
`;

const defaultData = { todos: [] };

const setCache = (key, data) => TODOS.put(key, data);
const getCache = key => TODOS.get(key);

async function getTodos(request) {
  const ip = request.headers.get('CF-Connecting-IP');
  const myKey = `data-${ip}`;
  let data;
  const cache = await getCache(myKey);
  if (!cache) {
    await setCache(myKey, JSON.stringify(defaultData));
    data = defaultData;
  } else {
    data = JSON.parse(cache);
  }
  const body = html(JSON.stringify(data.todos || []).replace(/</g, '\\u003c'));
  return new Response(body, {
    headers: { 'Content-Type': 'text/html' },
  });
}

async function updateTodos(request) {
  const body = await request.text();
  const ip = request.headers.get('CF-Connecting-IP');
  const myKey = `data-${ip}`;
  try {
    JSON.parse(body);
    await setCache(myKey, body);
    return new Response(body, { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}

async function handleRequest(request) {
  if (request.method === 'PUT') {
    return updateTodos(request);
  } else {
    return getTodos(request);
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
```

You can find the source code for this project, as well as a README with deployment instructions, [on GitHub](https://github.com/codewithkristian/cloudflare-workers-todos).
