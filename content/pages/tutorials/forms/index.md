---
updated: 2022-07-28
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Create an HTML form
layout: single
---

# Create an HTML form

In this tutorial, you will create a simple `<form>` using plain HTML and CSS and deploy it to Cloudflare Pages. While doing so, you will learn about some of the HTML form attributes and how to collect submitted data within a Worker.

{{<Aside type="note" header="MDN Introductory Series">}}

This tutorial will briefly touch upon the basics of HTML forms. For a more in-depth overview, refer to MDN's [Web Forms – Working with user data](https://developer.mozilla.org/en-US/docs/Learn/Forms) introductory series.

{{</Aside>}}

This tutorial will make heavy use of Cloudflare Pages and [its Workers integration](/pages/platform/functions/). Refer to the [Get started guide](/pages/get-started/) guide to familiarize yourself with the platform.

## Overview

On the web, forms are a common point of interaction between the user and the web document. They allow a user to enter data and, generally, submit their data to a server. A form is comprised of at least one form input, which can vary from text fields to dropdowns to checkboxes and more.

Each input should be named – using the [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-name) attribute – so that the input's value has an identifiable name when received by the server. Additionally, with the advancement of HTML5, form elements may declare additional attributes to opt into automatic form validation. The available validations vary by input type; for example, a text input that accepts emails (via [`type=email`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)) can ensure that the value looks like a valid email address, a number input (via `type=number`) will only accept integers or decimal values (if allowed), and generic text inputs can define a custom [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-pattern) to allow. However, all inputs can declare whether or not a value is [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-required).

Below is an example HTML5 form with a few inputs and their validation rules defined:

```html
<form method="POST" action="/api/submit">
  <input type="text" name="fullname" pattern="[A-Za-z]+" required />
  <input type="email" name="email" required />
  <input type="number" name="age" min="18" required />

  <button type="submit">Submit</button>
</form>
```

If an HTML5 form has validation rules defined, browsers will automatically check all rules when the user attempts to submit the form. Should there be any errors, the submission is prevented and the browser displays the error message(s) to the user for correction. The `<form>` will only `POST` data to the `/submit` endpoint when there are no outstanding validation errors. This entire process is native to HTML5 and only requires the appropriate form and input attributes to exist — no JavaScript is required.

Form elements may also have a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element associated with them, allowing you to clearly describe each input. This is great for visual clarity, of course, but it also allows for more accessible user experiences since the HTML markup is more well-defined. Assistive technologies directly benefit from this; for example, screen readers can announce which `<input>` is focused. And when a `<label>` is clicked, its assigned form input is focused instead, increasing the activation area for the input.

To enable this, you must create a `<label>` element for each input and assign each `<input>` element and unique `id` attribute value. The `<label>` must also possess a [`for`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#attr-for) attribute that reflects its input's unique `id` value. Amending the previous snippet should produce the following:

```html
<form method="POST" action="/api/submit">
  <label for="i-fullname">Full Name</label>
  <input id="i-fullname" type="text" name="fullname" pattern="[A-Za-z]+" required />

  <label for="i-email">Email Address</label>
  <input id="i-email" type="email" name="email" required />

  <label for="i-age">Your Age</label>
  <input id="i-age" type="number" name="age" min="18" required />

  <button type="submit">Submit</button>
</form>
```

{{<Aside type="note">}}

Your `for` and `id` values do not need to exactly match the values shown above. You may use any `id` values so long as they are unique to the HTML document. A `<label>` can only be linked with an `<input>` if the `for` and `id` attributes match.

{{</Aside>}}

When this `<form>` is submitted with valid data, its data contents are sent to the server. You may customize how and where this data is sent by declaring attributes on the form itself. If you do not provide these details, the `<form>` will GET the data to the current URL address, which is rarely the desired behavior. To fix this, at minimum, you need to define an [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute with the target URL address, but declaring a [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) is often recommended too, even if you are redeclaring the default `GET` value.

By default, HTML forms send their contents in the `application/x-www-form-urlencoded` MIME type. This value will be reflected in the `Content-Type` HTTP header, which the receiving server must read to determine how to parse the data contents. You may customize the MIME type through the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute. For example, to accept files (via `type=file`), you must change the `enctype` to the `multipart/form-data` value:

```html
<form method="POST" action="/api/submit" enctype="multipart/form-data">
  <label for="i-fullname">Full Name</label>
  <input id="i-fullname" type="text" name="fullname" pattern="[A-Za-z]+" required />

  <label for="i-email">Email Address</label>
  <input id="i-email" type="email" name="email" required />

  <label for="i-age">Your Age</label>
  <input id="i-age" type="number" name="age" min="18" required />

  <label for="i-avatar">Profile Picture</label>
  <input id="i-avatar" type="file" name="avatar" required />

  <button type="submit">Submit</button>
</form>
```

Because the `enctype` changed, the browser changes how it sends data to the server too. The `Content-Type` HTTP header will reflect the new approach and the HTTP request's body will conform to the new MIME type. The receiving server must accommodate the new format and adjust its request parsing method.

## Live example

The rest of this tutorial will focus on building an HTML form on Pages, including a Worker to receive and parse the form submissions.

{{<Aside type="note" header="GitHub Repository">}}

The source code for this example is [available on GitHub](https://github.com/cloudflare/submit.pages.dev). It is a live Pages application with a [live demo](https://submit.pages.dev/) available, too.

{{</Aside>}}

### Setup

To begin, create a [new GitHub repository](https://repo.new/). Then create a new local directory on your machine, initialize git, and attach the GitHub location as a remote destination:

```sh
# create new directory
$ mkdir new-project
# enter new directory
$ cd new-project
# initialize git
$ git init
# attach remote
$ git remote add origin git@github.com:<username>/<repo>.git
# change default branch name
$ git branch -M main
```

You may now begin working in the `new-project` directory you created.

### Markup

The form for this example is fairly straightforward. It includes an array of different input types, including checkboxes for selecting multiple values. The form also does not include any validations so that you may see how empty and/or missing values are interpreted on the server.

You will only be using plain HTML for this example project. You may use your preferred JavaScript framework, but raw languages have been chosen for simplicity and familiarity – all frameworks are abstracting and/or producing a similar result.

Create a `public/index.html` in your project directory. All front-end assets will exist within this `public` directory and this `index.html` file will serve as the home page for the website.

Copy and paste the following content into your `public/index.html` file:

```html
<html lang="en">
  <head>
    <meta charset="utf8" />
    <title>Form Demo</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body>
    <form method="POST" action="/api/submit">
      <div class="input">
        <label for="name">Full Name</label>
        <input id="name" name="name" type="text" />
      </div>

      <div class="input">
        <label for="email">Email Address</label>
        <input id="email" name="email" type="email" />
      </div>

      <div class="input">
        <label for="referers">How did you hear about us?</label>
        <select id="referers" name="referers">
          <option hidden disabled selected value></option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="Google">Google</option>
          <option value="Bing">Bing</option>
          <option value="Friends">Friends</option>
        </select>
      </div>

      <div class="checklist">
        <label>What are your favorite movies?</label>
        <ul>
          <li>
            <input id="m1" type="checkbox" name="movies" value="Space Jam" />
            <label for="m1">Space Jam</label>
          </li>
          <li>
            <input id="m2" type="checkbox" name="movies" value="Little Rascals" />
            <label for="m2">Little Rascals</label>
          </li>
          <li>
            <input id="m3" type="checkbox" name="movies" value="Frozen" />
            <label for="m3">Frozen</label>
          </li>
          <li>
            <input id="m4" type="checkbox" name="movies" value="Home Alone" />
            <label for="m4">Home Alone</label>
          </li>
        </ul>
      </div>

      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

This HTML document will contain a form with a few fields for the user to fill out. Because there is no validation rules within the form, all fields are optional and the user is able to submit an empty form. For this example, this is intended behavior.

{{<Aside type="note" header="Optional content">}}

Technically, only the `<form>` and its child elements are necessary. The `<head>` and the enclosing `<html>` and `<body>` tags are optional and not strictly necessary for a valid HTML document.

The HTML page is also completely unstyled at this point, relying on the browsers' default UI and color palettes. Styling the page is entirely optional and not necessary for the form to function. If you would like to attach a CSS stylesheet, you may [add a `<link>` element](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started#adding_css_to_our_document). Refer to the finished tutorial's [source code](https://github.com/cloudflare/submit.pages.dev/blob/8c0594f48681935c268987f2f08bcf3726a74c57/public/index.html#L11) for an example or any inspiration – the only requirement is that your CSS stylesheet also resides within the `public` directory.

{{</Aside>}}
### Worker

The HTML form is complete and ready for deployment. When the user submits this form, all data will be sent in a `POST` request to the `/api/submit` URL. This is due to the form's `method` and `action` attributes. However, there is currently no request handler at the `/api/submit` address. You will now create it.

Cloudflare Pages offers a [Functions](/pages/platform/functions/) feature, which allows you to define and deploy Workers for dynamic behaviors.

Functions are linked to the `functions` directory and conveniently construct URL request handlers in relation to the `functions` file structure. For example, the `functions/about.js` file will map to the `/about` URL and `functions/hello/[name].js` will handle the `/hello/:name` URL pattern, where `:name` is any matching URL segment. Refer to the [Functions routing](/pages/platform/functions/routing/) documentation for more information.

To define a handler for `/api/submit`, you must create a `functions/api/submit.js` file. This means that your `functions` and `public` directories should be siblings, with a total project structure similar to the following:

```txt
├── functions
│   └── api
│       └── submit.js
└── public
    └── index.html
```

The `<form>` will send `POST` requests, which means that the `functions/api/submit.js` file needs to export an `onRequestPost` handler:

```js
---
filename: functions/api/submit.js
---
/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
  // TODO: Handle the form submission
}
```

The `context` parameter is an object filled with several values of potential interest. For this example, you only need the [`Request`](/workers/runtime-apis/request/) object, which can be accessed through the `context.request` key.

As mentioned, a `<form>` defaults to the `application/x-www-form-urlencoded` MIME type when submitting. And, for more advanced scenarios, the `enctype="multipart/form-data"` attribute is needed. Luckily, both MIME types can be parsed and treated as [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData). This means that with Workers – which includes Pages Functions – you are able to use the native [`Request.formData`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) parser.

For illustrative purposes, the example application's form handler will reply with all values it received. A `Response` must always be returned by the handler, too:

```js
---
filename: functions/api/submit.js
---
/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    let pretty = JSON.stringify([...input], null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
```

With this handler in place, the example is now fully functional. When a submission is received, the Worker will reply with a JSON list of the `FormData` key-value pairs.

However, if you want to reply with a JSON object instead of the key-value pairs (an Array of Arrays), then you must do so manually. Recently, JavaScript added the [`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) utility. This works well in some cases; however, the example `<form>` includes a `movies` checklist that allows for multiple values. If using `Object.fromEntries`, the generated object would only keep one of the `movies` values, discarding the rest. To avoid this, you must write your own `FormData` to `Object` utility instead:

```js
---
filename: functions/api/submit.js
---
/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();

    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
```

The final snippet (above) allows the Worker to retain all values, returning a JSON response with an accurate representation of the `<form>` submission.

### Deployment

You are now ready to deploy your project.

If you have not already done so, save your progress within `git` and then push the commit(s) to the GitHub repository:

```sh
# Add all files
$ git add -A
# Commit w/ message
$ git commit -m "working example"
# Push commit(s) to remote
$ git push -u origin main
```

Your work now resides within the GitHub repository, which means that Pages is able to access it too.

If this is your first Cloudflare Pages project, refer to the [Get started guide](/pages/get-started/) for a complete walkthrough. After selecting the appropriate GitHub repository, you must configure your project with the following build settings:

- **Project name** – Your choice
- **Production branch** – `main`
- **Framework preset** – None
- **Build command** – None / Empty
- **Build output directory** – `public`

After clicking the **Save and Deploy** button, your Pages project will begin its first deployment. When successful, you will be presented with a unique `*.pages.dev` subdomain and a link to your live demo.

In this tutorial, you built and deployed a website and its back-end logic using Cloudflare Pages with its Workers integration. You created a static HTML document with a form that communicates with a Worker handler to parse the submission request(s).

If you would like to review the full source code for this application, you can find it on [GitHub](https://github.com/cloudflare/submit.pages.dev).

## Related resources

- [Build an API for your front end using Cloudflare Workers](/pages/tutorials/build-an-api-with-workers/)
- [Handle form submissions with Airtable](/workers/tutorials/handle-form-submissions-with-airtable/)
