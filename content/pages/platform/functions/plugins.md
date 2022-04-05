---
pcx-content-type: concept
title: Pages Plugins
---

# Pages Plugins

## Authoring a Pages Plugin

A Pages Plugin is a Pages Functions distributable which includes routing and functionality built-in. Developers can include a plugin as a part of their Pages project wherever they chose, and can pass it some configuration options. The full power of Functions is available to Plugins, including middleware, parameterized routes, and static assets.

For example, a Pages Plugin could:

- intercept HTML pages and inject in a third-party script
- proxy a third-party service's API
- validate authorization headers
- provide a full admin web app experience
- store data in KV or Durable Objects
- SSR pages with data from a CMS
- report errors and track performance

A Pages Plugin is essentially a library that developers can use to augment their existing Pages project with a deep integration to Functions.

## Using a Pages Plugin

Developers can enhance their projects by mounting a Pages Plugin at some route of their app. Plugins will provide instructions of where they should typically be mounted (e.g. an admin interface might be mounted at `functions/admin/[[path]].ts`, and an error logger might be mounted at `functions/_middleware.ts`). Additionally, each Plugin may take some configuration (e.g. an API token).

---

## Static Form Example

In this example, we'll build a Pages Plugin and then include it in a project.

The first Plugin should:

- intercept HTML forms
- store the form submission in KV
- respond to submissions with a developer's custom response

### 1. Creating a new Pages Plugin

Create a `package.json` with the following:

```json
---
filename: package.json
---
{
  "name": "@cloudflare/static-form-interceptor",
  "main": "index.js",
  "types": "index.d.ts",
  "files": ["index.js", "index.d.ts", "tsconfig.json"],
  "scripts": {
    "build": "npx wrangler pages functions build --plugin --outfile=index.js",
    "prepare": "npm run build"
  }
}
```

`index.js` will be the entrypoint to your plugin. It's a generated file (built by wrangler with the `npm run build` command), so add `index.js` to your `.gitignore`.

Next, create a `functions` directory and get started coding your Plugin! The `functions` folder will be mounted at some route by the developer, so consider how to structure your files. Generally:

- if you want your plugin to run on a single route of the developer's choice (e.g. `/foo`), create a `functions/index.ts` file;
- if you want your plugin to be mounted and serve all requests beyond a certain path (e.g. `/admin/login` and `/admin/dashboard`), create a `functions/[[path]].ts` file;
- and if you want your plugin to intercept requests but fallback on either other Functions or the project's static assets, create a `functions/_middleware.ts` file.

{{<Aside type="note" header="Don't include the mounted path in your Plugin">}}

Your Plugin shouldn't have use the mounted path anywhere in the file structure (e.g. `/foo` or `/admin`). Developers should be free to mount your Plugin whereever they choose, but of course, you can make recommendations of how you expect this to be mounted in your `README.md`.

{{</Aside>}}

You are free to use as many different files as you need. The structure of a Plugin is exactly the same as Functions in a Pages project today, except that the handlers receive a new property of their parameter object, `pluginArgs`. This property is the initialization parameter that a developer passes when mounting a Plugin. You can use this to receive from developers API tokens, KV/Durable Object namespaces, or anything else that your Plugin needs to work.

Returning to our static form example, if we want to intercept requests and override the behavior of an HTML form, we should create a `functions/_middleware.ts`. Developers could then mount our Plugin on a single route, or on their entire project.

```typescript
---
filename: functions/_middleware.ts
---
class FormHandler {
  element(element) {
    const name = element.getAttribute('data-static-form-name')
    element.setAttribute('method', 'POST')
    element.removeAttribute('action')
    element.append(`<input type="hidden" name="static-form-name" value="${name}" />`, { html: true })
  }
}

export const onRequestGet = async ({ next }) => {
  // We first get the original response from the project
  const response = await next()

  // Then, using HTMLRewriter, we transform `form` elements with a `data-static-form-name` attribute, to tell them to POST to the current page
  return new HTMLRewriter().on('form[data-static-form-name]', new FormHandler()).transform(response)
}

export const onRequestPost = async ({ request, pluginArgs, waitUntil }) => {
  // Parse the form
  const formData = await request.formData()
  const name = formData.get('static-form-name')
  const entries = Object.fromEntries([...formData.entries()].filter(([name]) => name !== 'static-form-name'))

  // Get the arguments given to the Plugin by the developer
  const { kv, respondWith } = pluginArgs


  // Store form data in KV under key `form-name:YYYY-MM-DDTHH:MM:SSZ`
  const key = `${name}:${new Date().toISOString()}`
  waitUntil(kv.put(name, JSON.stringify(entries)))

  // Respond with whatever the developer wants
  const response = await respondWith({ formData })
  return response
}
```

### 2. Typing your Pages Plugin

To create a good developer experience, you should consider adding TypeScript typings to your Plugin. This allows developers to use their IDE features for autocompletion, and also ensure that they include all the parameters you are expecting.

In the `index.d.ts`, export a function which takes your `pluginArgs` and returns a `PagesFunction`. For our static form example, we take two properties, `kv`, a KV namespace, and `respondWith`, a function which takes an object with a `formData` property (`FormData`) and returns a `Promise` of a `Response`:

```typescript
---
filename: index.d.ts
---
export type PluginArgs = {
  kv: KVNamespace;
  respondWith: (args: { formData: FormData }) => Promise<Response>;
};

export default function (args: PluginArgs): PagesFunction;
```

### 3. Testing your Pages Plugin

{{<Aside type="note">}}

We're still working on creating a great testing experience for Pages Plugins authors. Please bear with us until all those pieces come together. In the meantime, you can create an example project and include your Plugin manually for testing.

{{</Aside>}}

### 4. Publishing your Pages Plugin

You can distribute your Plugin however you choose. Popular options include publishing on [npm](https://www.npmjs.com/), showcasing it in the #what-i-built or #pages-plugins channels in our [Developer Discord](https://discord.com/invite/cloudflaredev), or open-sourcing on [GitHub](https://github.com/). Or all three!

Make sure you're including the generated `index.js` and your typings `index.d.ts` as well as a `README.md` with instructions on how developers can use your Plugin.

---

### 5. Installing a Pages Plugin

If you're wanting to include a Pages Plugin in your application, the first step is to install that plugin to your project. If you're not yet using `npm` in your project, run `npm init` to create a `package.json` file. The Plugin's `README.md` will typically include an installation command (e.g. `npm install --save @cloudflare/static-form-interceptor`).

### 6. Mounting a Pages Plugin

Again, the `README.md` of the Plugin will likely include instructions for how to mount the Plugin in your application. Generally, this will involve:

1. creating a `functions` directory if you don't already have one,
2. deciding where you want this Plugin to run and creating a corresponding file in the `functions` directory,
3. import the Plugin and export an `onRequest` method in this file, initializing the Plugin with any arguments it requires.

In our static form example, the Plugin we have created already was created as a middleware. This means it can run on either a single route, or across our entire project. If we had a single contact form on our website at `/contact`, we could create a `functions/contact.ts` file to intercept just that route, or we could create a `functions/_middleware.ts` file to intercept all other routes and any other future forms we might create. As the developer, we can choose where this Plugin can run.

A plugin's default export is a function which takes the same context parameter that a normal Pages Functions handler is given.

```typescript
---
filename: functions/contact.ts
---
import staticFormInterceptorPlugin from "@cloudflare/static-form-interceptor";

export const onRequest = (context) => {
  return staticFormInterceptorPlugin({
    kv: context.env.FORM_KV,
    respondWith: async ({ formData }) => {
      // Could call email/notification service here
      const name = formData.get("name");
      return new Response(`Thank you for your submission, ${name}!`);
    },
  })(context);
};
```

### 7. Testing a Pages Plugin

As normal, you can use `wrangler pages dev` to test a Pages project, including any Plugins you have installed. Remember to include an KV bindings and environment variables etc. that the Plugin is expecting.

With our Plugin mounted on the `/contact` route, a corresponding HTML file might look like this:

```html
---
filename: public/contact.html
---

<!DOCTYPE html>
<html>
  <body>
    <h1>Contact us</h1>
    <!-- Include the `data-static-form-name` attribute to name the submission -->
    <form data-static-form-name="contact">
      <label>
        <span>Name</span>
        <input type="text" autocomplete="name" name="name" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message"></textarea>
      </label>
    </form>
  </body>
</html>
```

Our plugin should pick up the `data-static-form-name="contact"` attribute, set the `method="POST"`, inject in an `<input type="hidden" name="static-form-name" value="contact" />` element, and capture `POST` submissions.

### 8. Deploying a Pages project

Ensure the new Plugin has been added to your `package.json` and that everything works locally as you'd expect. You can then `git commit` and `git push` to trigger a Cloudflare Pages deployment and try it out for real!

If you experience any problems with any one Plugin, please file an issue on that Plugin's bug tracker.

If you experience any problems with Plugins in general, we'd love to hear feedback in the #pages-plugins channel in [Discord](https://discord.com/invite/cloudflaredev)! We're very excited to see what you build with Plugins and welcome any feedback about the authoring or developer experience. Let us know if there's anything you need to make Plugins even more powerful.

---

## Including Static Assets with a Plugin (alpha)

A Pages Plugin can also bring along static assets to be included in user's Pages project. This is useful if you want to build a full experience for your Plugin (e.g. an admin interface for users to interact with).

A Plugin can import an `onRequest` handler from a folder of static assets by appending `.static` to the path. For example, with a folder of static assets (`public`), a Plugin can serve these static assets with a `functions/[[path]].ts` Function:

```html
---
filename: public/index.html
---

<!DOCTYPE html>
<html>
  <body>
    <h1>Admin Dashboard</h1>
  </body>
</html>
```

```typescript
---
filename: functions/[[path]].ts
---
export { onRequest } from '../public.static';
```

Ensure you add the directory of static assets to your `package.json`'s `files` field so that they are included in your distribution:

```json
---
filename: package.json
---
{
  "name": "@cloudflare/an-admin-plugin",
  "main": "index.js",
  "types": "index.d.ts",
  "files": ["index.js", "index.d.ts", "tsconfig.json", "public"],
  "scripts": {
    "build": "npx wrangler pages functions build --plugin --outfile=index.js",
    "prepare": "npm run build"
  }
}
```

Again, there should be no reference to where this Plugin will eventually be mounted. It is up to the developer to mount the Plugin wherever they choose. In this case, they may choose to include the plugin on a `/admin` route like so:

```typescript
---
filename: functions/admin/[[path]].ts
---
import adminDashboardPlugin from '@cloudflare/an-admin-plugin';

export const onRequest = adminDashboardPlugin();
```

## Chaining Plugins

Finally, as with Pages Functions generally, it is possible to chain together Plugins in order to combine together different features. `_middleware`'s higher up in the filesystem will run before other handlers, and individual files can chain together Functions in an array like so:

```typescript
---
filename: functions/admin/[[path]].ts
---
import sentryPlugin from "@cloudflare/sentry-pages-plugin";
import cloudflareAccessPlugin from "@cloudflare/cloudflare-access-pages-plugin";
import adminDashboardPlugin from "@cloudflare/an-admin-plugin";

export const onRequest = [
  // Initialize a Sentry Plugin to capture any errors
  sentryPlugin({ dsn: "https://sentry.io/xyz" }),

  // Initialize a Cloudflare Access Plugin to ensure only administrators can access this protected route
  cloudflareAccessPlugin({
    domain: "https://test.cloudflareaccess.com",
    aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",
  }),

  // Populate the Sentry plugin with additional information about the current user
  ({ data, next }) => {
    const email = data.cloudflareAccessJWT.payload?.email || "service user";

    data.sentry.setUser({ email });

    return next();
  },

  // Finally, serve the admin dashboard plugin, knowing that errors will be captured and that every incoming request has been authenticated
  adminDashboardPlugin(),
];
```
