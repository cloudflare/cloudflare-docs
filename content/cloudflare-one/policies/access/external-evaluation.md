---
pcx-content-type: how-to
title: External Evaluation rules
weight: 4
---

# External Evaluation rules

With Cloudflare Access, you can create Allow or Block policies which evaluate the user based on custom criteria. This is done by adding an **External Evaluation** rule to your policy. The **External Evaluation** selector requires two values:

- **Evaluate URL** — the API endpoint containing your business logic.
- **Keys URL** — the key that Access uses to verify that the response came from your API

After the user authenticates with your identity provider, Access sends the user's identity to the external API at **Evaluate URL**. The external API returns a True or False response to Access, which will then allow or deny access to the user.

To protect against man-in-the-middle attacks, Access signs all requests with your Access account key and checks that responses are signed by the key at **Keys URL**.

## Set up external API and key with Cloudflare Workers

### Prerequisites

- [Workers account](/workers/get-started/guide/)
- `wrangler` installation
- Application protected by Access

### 1. Create a new Worker

1. Open a terminal and create a new Workers project.

    ```sh
    wrangler generate my-worker
    ```

2. Navigate to the project directory.

    ```sh
    cd my-worker
    ```

### 2. Generate a key

1. Create a [Workers KV namespace](/workers/wrangler/workers-kv/) to store the key. The binding name should be `KV` if you want to try the example API.

    ```sh
    wrangler kv:namespace create "KV"
    ```

    The command will output the binding name and KV namespace ID, for example `{ binding = "KV", id = "3e56d0300d714e7994c209d7aff3ccbe" }`.

2. Open `wrangler.toml` in a text editor and insert the following:
    - `<ACCOUNT_ID>`: your Cloudflare account ID, shown in the [Cloudflare dashboard](https://dash.cloudflare.com/) in the **Workers** tab.
    - `<KV_NAMESPACE_ID>`: the `id` of your KV namespace.
    - `<TEAM_NAME>`: your Cloudflare Zero Trust [team name](/cloudflare-one/glossary/#team-name).

    ```txt
    ---
    filename: wrangler.toml
    ---
    name = "my-worker"
    type = "javascript"

    account_id = "<ACCOUNT_ID>"
    workers_dev = true
    route = ""
    zone_id = ""
    compatibility_date = "2022-05-16"

    kv_namespaces = [
    { binding = "KV", id = "<KV_NAMESPACE_ID>" }
    ]

    [vars]
    TEAM_DOMAIN="<TEAM_NAME>.cloudflareaccess.com"
    DEBUG=false
    ```

3. Publish the Worker to your account.

    ```sh
    wrangler publish
    ```

    The Worker will be deployed to your `*.workers.dev` subdomain at `my-worker.<YOUR_SUBDOMAIN>.workers.dev`.

4. To generate an RSA private/public key pair, open a browser and go to `https://my-worker.<YOUR_SUBDOMAIN>.workers.dev/keys`.

5. (Optional) To confirm that the key is stored in the `KV` namespace:
    1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Workers** > **KV**.
    2. Select **View** next to `my-worker-KV`.

    If you want to generate a new key, delete the existing key from the dashboard and visit `https://my-worker.<YOUR_SUBDOMAIN>.workers.dev/keys` again.

### 3. Program your business logic

1. In your `my-worker` directory, replace `index.js` with our [example code](https://github.com/cloudflare/workers-access-external-auth-example/blob/main/index.js).

2. Open `index.js` and modify the `externalEvaluation` function to perform logic on any identity-based data sent by Access.

3. Publish your changes.

    ```sh
    wrangler publish
    ```

{{<Aside type="note" header="What identity-based data is available?">}}
To view a list of available data fields, log in to your Access application and append `/cdn-cgi/access/get-identity` to the URL. For example, if `www.example.com` is behind Access, visit `https://www.example.com/cdn-cgi/access/get-identity`.
{{</Aside>}}

### 4. Create an External Evaluation rule

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to **Access** > **Applications**.

2. Find the application for which you want to apply the External Evaluation rule and select **Edit**.

3. In the **Policies** tab, edit an existing policy or select **Add a policy**.

4. Add the following rule to your policy:
| Rule Type | Selector      | Evaluate URL | Keys URL  |
| ----------| ------------- | -------------| --------- |
| Include   | External Evaluation |`https://my-worker.<YOUR_SUBDOMAIN>.workers.dev/` | `https://my-worker.<YOUR_SUBDOMAIN>.workers.dev/keys/` |

When a user logs in to your application, Access will now check their email, device, location, and other identity-based data against your business logic. To test your policies against an email, go to the **Policies** tab and select **Test your policies**.

### Troubleshooting the Worker

To debug your External Evaluation rule:

1. Navigate to your Worker directory.

    ```sh
    cd my-worker
    ```

2. Open `wrangler.toml` in a text editor and set the `debug` variable to `TRUE`.

3. Publish your changes.

    ```sh
    wrangler publish
    ```

4. Next, start a session to output realtime logs from your Worker.

    ```sh
    wrangler tail -f pretty
    ```

5. Log in to your Access application.

    The session logs should show an incoming and outgoing JWT. The incoming JWT was sent by Access to the Worker API, while the outgoing JWT was sent by the Worker back to Access.

6. To decode the contents of a JWT, you can copy the token into [jwt.io](https://jwt.io/).

    The incoming JWT should contain the user's identity data. The outgoing JWT should look similar to:

    ```js
    {
    "success": true,
    "iat": 1655409315,
    "exp": 1655409375,
    "nonce": "9J2E9Xg6wYj8tlnA5MV4Zgp6t8rzmS0Q"
    }
    ```

    Access checks the outgoing JWT for all of the following criteria:
    - Token was signed by **Keys URL**.
    - Expiration date has not elapsed.
    - API returns `"success": true`.
    - `nonce` is unchanged from the incoming JWT. The `nonce` value is unique per request.

    If any condition fails, the External Evaluation rule evaluates to false.

