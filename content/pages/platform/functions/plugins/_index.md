---
pcx_content_type: concept
title: Pages Plugins
layout: single
weight: 9
---

# Pages Plugins

Cloudflare maintains a number of official Pages Plugins for you to use in your Pages projects:

{{<directory-listing>}}

---

## Author a Pages Plugin

A Pages Plugin is a Pages Functions distributable which includes built-in routing and functionality. Developers can include a Plugin as a part of their Pages project wherever they chose, and can pass it some configuration options. The full power of Functions is available to Plugins, including middleware, parameterized routes, and static assets.

For example, a Pages Plugin could:

- Intercept HTML pages and inject in a third-party script.
- Proxy a third-party service's API.
- Validate authorization headers.
- Provide a full admin web app experience.
- Store data in KV or Durable Objects.
- Server-side render (SSR) webpages with data from a CMS.
- Report errors and track performance.

A Pages Plugin is essentially a library that developers can use to augment their existing Pages project with a deep integration to Functions.

## Use a Pages Plugin

Developers can enhance their projects by mounting a Pages Plugin at a route of their application. Plugins will provide instructions of where they should typically be mounted (for example, an admin interface might be mounted at `functions/admin/[[path]].ts`, and an error logger might be mounted at `functions/_middleware.ts`). Additionally, each Plugin may take some configuration (for example, with an API token).

---

## Static form example

In this example, you will build a Pages Plugin and then include it in a project.

The first Plugin should:

- intercept HTML forms.
- store the form submission in [KV](/workers/runtime-apis/kv/).
- respond to submissions with a developer's custom response.

### 1. Create a new Pages Plugin

Create a `package.json` with the following:

```json
---
filename: package.json
---
{
  "name": "@cloudflare/static-form-interceptor",
  "main": "dist/index.js",
  "types": "index.d.ts",
  "files": ["dist", "index.d.ts", "tsconfig.json"],
  "scripts": {
    "build": "npx wrangler pages functions build --plugin --outdir=dist",
    "prepare": "npm run build"
  }
}
```

`dist/index.js` will be the entrypoint to your Plugin. This is a generated file built by Wrangler with the `npm run build` command. Add the `dist/` directory to your `.gitignore`.

Next, create a `functions` directory and start coding your Plugin. The `functions` folder will be mounted at some route by the developer, so consider how you want to structure your files. Generally:

- if you want your Plugin to run on a single route of the developer's choice (for example, `/foo`), create a `functions/index.ts` file.
- if you want your Plugin to be mounted and serve all requests beyond a certain path (for example, `/admin/login` and `/admin/dashboard`), create a `functions/[[path]].ts` file.
- if you want your Plugin to intercept requests but fallback on either other Functions or the project's static assets, create a `functions/_middleware.ts` file.

{{<Aside type="note" header="Do not include the mounted path in your Plugin">}}

Your Plugin should not use the mounted path anywhere in the file structure (for example, `/foo` or `/admin`). Developers should be free to mount your Plugin wherever they choose, but you can make recommendations of how you expect this to be mounted in your `README.md`.

{{</Aside>}}

You are free to use as many different files as you need. The structure of a Plugin is exactly the same as Functions in a Pages project today, except that the handlers receive a new property of their parameter object, `pluginArgs`. This property is the initialization parameter that a developer passes when mounting a Plugin. You can use this to receive API tokens, KV/Durable Object namespaces, or anything else that your Plugin needs to work.

Returning to your static form example, if you want to intercept requests and override the behavior of an HTML form, you need to create a `functions/_middleware.ts`. Developers could then mount your Plugin on a single route, or on their entire project.

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

### 2. Type your Pages Plugin

To create a good developer experience, you should consider adding TypeScript typings to your Plugin. This allows developers to use their IDE features for autocompletion, and also ensure that they include all the parameters you are expecting.

In the `index.d.ts`, export a function which takes your `pluginArgs` and returns a `PagesFunction`. For your static form example, you take two properties, `kv`, a KV namespace, and `respondWith`, a function which takes an object with a `formData` property (`FormData`) and returns a `Promise` of a `Response`:

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

### 3. Test your Pages Plugin

We are still working on creating a great testing experience for Pages Plugins authors. Please be patient with us until all those pieces come together. In the meantime, you can create an example project and include your Plugin manually for testing.

### 4. Publish your Pages Plugin

You can distribute your Plugin however you choose. Popular options include publishing on [npm](https://www.npmjs.com/), showcasing it in the #what-i-built or #pages-plugins channels in our [Developer Discord](https://discord.com/invite/cloudflaredev), and open-sourcing on [GitHub](https://github.com/).

Make sure you are including the generated `dist/` directory, your typings `index.d.ts`, as well as a `README.md` with instructions on how developers can use your Plugin.

---

### 5. Install your Pages Plugin

If you want to include a Pages Plugin in your application, you need to first install that Plugin to your project.

If you are not yet using `npm` in your project, run `npm init` to create a `package.json` file. The Plugin's `README.md` will typically include an installation command (for example, `npm install --save @cloudflare/static-form-interceptor`).

### 6. Mount your Pages Plugin

The `README.md` of the Plugin will likely include instructions for how to mount the Plugin in your application. You will need to:

1. Create a `functions` directory, if you do not already have one.
2. Decide where you want this Plugin to run and create a corresponding file in the `functions` directory.
3. Import the Plugin and export an `onRequest` method in this file, initializing the Plugin with any arguments it requires.

In the static form example, the Plugin you have created already was created as a middleware. This means it can run on either a single route, or across your entire project. If you had a single contact form on your website at `/contact`, you could create a `functions/contact.ts` file to intercept just that route. You could also create a `functions/_middleware.ts` file to intercept all other routes and any other future forms you might create. As the developer, you can choose where this Plugin can run.

A Plugin's default export is a function which takes the same context parameter that a normal Pages Functions handler is given.

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

### 7. Test your Pages Plugin

You can use `wrangler pages dev` to test a Pages project, including any Plugins you have installed. Remember to include any KV bindings and environment variables that the Plugin is expecting.

With your Plugin mounted on the `/contact` route, a corresponding HTML file might look like this:

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

Your plugin should pick up the `data-static-form-name="contact"` attribute, set the `method="POST"`, inject in an `<input type="hidden" name="static-form-name" value="contact" />` element, and capture `POST` submissions.

### 8. Deploy your Pages project

Make sure the new Plugin has been added to your `package.json` and that everything works locally as you would expect. You can then `git commit` and `git push` to trigger a Cloudflare Pages deployment.

If you experience any problems with any one Plugin, file an issue on that Plugin's bug tracker.

If you experience any problems with Plugins in general, we would appreciate your feedback in the #pages-plugins channel in [Discord](https://discord.com/invite/cloudflaredev)! We are excited to see what you build with Plugins and welcome any feedback about the authoring or developer experience. Let us know in the Discord channel if there is anything you need to make Plugins even more powerful.

---

## Include Static Assets with a Plugin (alpha)

A Pages Plugin can also bring along static assets to be included in a user's Pages project. This is useful if you want to build a full experience for your Plugin (for example, an admin interface for users to interact with).

A Plugin can import an `onRequest` handler from a folder of static assets by prefixing with the `assets:` protocol to the import statement. For example, with a folder of static assets (`public`), a Plugin can serve these static assets with a `functions/[[path]].ts` Function:

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
export { onRequest } from 'assets:../public';
```

Ensure you add the directory of static assets to your `package.json`'s `files` field so that they are included in your distribution:

```json
---
filename: package.json
---
{
  "name": "@cloudflare/a-fictional-admin-plugin",
  "main": "dist/index.js",
  "types": "index.d.ts",
  "files": ["dist", "index.d.ts", "tsconfig.json", "public"],
  "scripts": {
    "build": "npx wrangler pages functions build --plugin --outdir=dist",
    "prepare": "npm run build"
  }
}
```

Again, there should be no reference to where this Plugin will eventually be mounted. It is up to the developer to mount the Plugin wherever they choose. In this case, they may choose to include the plugin on a `/admin` route like so:

```typescript
---
filename: functions/admin/_middleware.ts
---
import adminDashboardPlugin from '@cloudflare/an-admin-plugin';

export const onRequest = adminDashboardPlugin();
```

## Chain your Plugin

Finally, as with Pages Functions generally, it is possible to chain together Plugins in order to combine together different features. Middleware defined higher up in the filesystem will run before other handlers, and individual files can chain together Functions in an array like so:

```typescript
---
filename: functions/admin/_middleware.ts
---
import sentryPlugin from "@cloudflare/pages-plugin-sentry";
import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";
import adminDashboardPlugin from "@cloudflare/a-fictional-admin-plugin";

export const onRequest = [
  // Initialize a Sentry Plugin to capture any errors
  sentryPlugin({ dsn: "https://sentry.io/welcome/xyz" }),

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
