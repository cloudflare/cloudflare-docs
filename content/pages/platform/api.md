---
order: 7
pcx-content-type: concept
---

# REST API

The [Pages API](https://api.cloudflare.com/#pages-project-properties) empowers you to build automations and integrate Pages with your development workflow. At a high level, the API endpoints let you manage deployments and builds and configure projects. Cloudflare supports [Deploy Hooks](/platform/deploy-hooks) for headless CMS deployments. Refer to the [API documentation](https://api.cloudflare.com/) for a full breakdown of object types and endpoints.

## How to use the API

### Get an API Key

Go to the [API Tokens](https://dash.cloudflare.com/profile/api-tokens) page and copy your **Global API Key**.

### Make requests

Now, you can authenticate and make requests to the API using your email and key in the request headers. For example, here is an API request to get all deployments in a project.

    curl --location --request GET 'https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments' \
    --header 'X-Auth-Email: {email}' \
    --header 'X-Auth-Key: {auth_key}' \

Try it with one of your projects by replacing `{account_id}`, `{project_name}`, `{email}`, and `{auth_key}`. You can find your `account_id` in the [Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers).

## Examples

The API is even more powerful when combined with Cloudflare Workers: the easiest way to deploy serverless functions on Cloudflare's global network. The following section includes three code examples on how to use the Pages API. To build and deploy these samples, refer to the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide).

### Triggering a new build every hour

Suppose we have a CMS that pulls data from live sources to compile a static output. You can keep the static content as recent as possible by triggering new builds periodically using the API.

```js
const endpoint =
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments";
const email = "{your_email}";

addEventListener("scheduled", (event) => {
  event.waitUntil(handleScheduled(event.scheduledTime));
});

async function handleScheduled(request) {
  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "X-Auth-Email": email,
      "X-Auth-Key": API_KEY,
      //We recommend you store API keys as secrets using the Workers dashboard or using Wrangler as documented here https://developers.cloudflare.com/workers/cli-wrangler/commands#secret
    },
  };

  const response = await fetch(endpoint, init);
  return new Response(200);
}
```

After you have deployed the JavaScript Worker, set a cron trigger through the Workers dashboard to run this script periodically. Refer to the [Cron Triggers guide](https://developers.cloudflare.com/workers/platform/cron-triggers) for more details.

### Deleting old deployments after a week

Cloudflare Pages hosts and serves all project deployments on preview links. Suppose you want to keep your project private and prevent access to your old deployments. You can use the API to delete deployments after a month, so that they are no longer public online.

```js
const deployments_endpoint =
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments";
const email = "{your_email}";
const expiration_days = 7;

addEventListener("scheduled", (event) => {
  event.waitUntil(handleScheduled(event.scheduledTime));
});

async function handleScheduled(request) {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "X-Auth-Email": email,
      "X-Auth-Key": API_KEY,
      // You should store API keys as secrets using the Workers dashboard or using Wrangler
      // @see https://developers.cloudflare.com/workers/cli-wrangler/commands#secret
    },
  };

  let response = await fetch(deployments_endpoint, init);
  let deployments = await response.json();
  let to_delete = [];

  deployments.result.forEach(function (deploy) {
    if (
      (Date.now() - new Date(deploy.created_on)) / 86400000 >
      expiration_days
    ) {
      to_delete.push(deploy.id);
    }
  });

  const delete_request = {
    method: "DELETE",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "X-Auth-Email": email,
      "X-Auth-Key": API_KEY,
    },
  };
  for (const id of to_delete) {
    await fetch(deployments_endpoint + "/" + id, delete_request);
  }
  return new Response("OK", { status: 200 });
}
```

After you have deployed the JavaScript Worker, you can set a cron trigger through the Workers dashboard to run this script periodically. Refer to the [Cron Triggers guide](https://developers.cloudflare.com/workers/platform/cron-triggers) for more details.

### Sharing project information

Imagine you are working on a development team using Pages to build your websites. You would want an easy way to share deployment preview links and build status without having to share Cloudflare accounts. Using the API, you can easily share project information, including deployment status and preview links, and serve this content as HTML from a Cloudflare Worker.

```js
const deployments_endpoint =
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments";
const project_endpoint =
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}";

const email = "{your_email}";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "X-Auth-Email": email,
      "X-Auth-Key": API_KEY,
      //We recommend you store API keys as secrets using the Workers dashboard or using Wrangler as documented here https://developers.cloudflare.com/workers/cli-wrangler/commands#secret
    },
  };

  let style = `body { padding: 6em; font-family: sans-serif; } h1 { color: #f6821f }`;
  let content = ``;

  content += `<h2>Project</h2>`;
  let response = await fetch(project_endpoint, init);
  let project_response = await response.json();
  content += `<p>Project Name: ${project_response.result.name}</p>`;
  content += `<p>Project ID: ${project_response.result.id}</p>`;
  content += `<p>Pages Subdomain: ${project_response.result.subdomain}</p>`;
  content += `<p>Domains: ${project_response.result.domains}</p>`;
  content += `<a href="${project_response.result.canonical_deployment.url}"><p>Latest preview: ${project_response.result.canonical_deployment.url}</p></a>`;

  content += `<h2>Deployments</h2>`;
  let d_response = await fetch(deployments_endpoint, init);
  let deployments_response = await d_response.json();
  deployments_response.result.forEach(function (deploy) {
    content += `<a href="${deploy.url}"><p>Deployment: ${deploy.id}</p></a>`;
  });

  let results = `
<!DOCTYPE html>
<head>
  <title>Example Pages Project</title>
</head>
<body>
  <style>${style}</style>
  <div id="container">
  ${content}
  </div>
</body>`;
  return new Response(results, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
```

## Related resources

*   [Pages API Docs](https://api.cloudflare.com/#pages-project-properties)
*   [Workers Getting Started Guide](https://developers.cloudflare.com/workers/get-started/guide)
*   [Workers Cron Triggers](https://developers.cloudflare.com/workers/platform/cron-triggers)
