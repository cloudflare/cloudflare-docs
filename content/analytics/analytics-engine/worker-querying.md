---
title: Querying from a Worker
pcx_content_type: reference
weight: 7
meta:
  title: Querying Workers Analytics Engine from a Worker
---

# Querying Workers Analytics Engine from a Worker

If you want to access Analytics Engine data from within a Worker you can use `fetch` to access the SQL API. The API can return JSON data that is easy to interact with in JavaScript.

## Authentication

In order that your Worker can authenticate with the API you will need your account ID and an API token. 

* Your 32 character account ID can be obtained from the Cloudflare dashboard.
* An API token can also be generated in the dashboard. Refer to the [SQL API docs](/analytics/analytics-engine/sql-api/#authentication) for more information on this.

We recommend storing the account ID as an environment variable and the API token as a secret in your worker. This can be done through the dashboard or through Wrangler. Refer to the [Workers documentation](/workers/platform/environment-variables/) for more details on this.

## Querying

Use the JavaScript `fetch` API as follows to execute a query:

```JavaScript
const query = 'SELECT * FROM my_dataset'
const API = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/analytics_engine/sql`;
const response = await fetch(API, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${env.API_TOKEN}`,
    },
    body: query,
});
const responseJSON = await response.json();
```

The data will be returned in the format described in the [FORMAT section of the API docs](/analytics/analytics-engine/sql-reference/#json) allowing you to extract meta information about the names and types of returned columns in addition to the data itself and a row count.


## Example Worker

The following is a sample Worker which executes a query against a dataset of weather readings and displays minimum and maximum values for each city.

### Environment variable setup

First the environment variables are set up with the account ID and API token.

The account ID is set in `wrangler.toml`:
```TOML
[vars]
ACCOUNT_ID = "<account_id>"
```

The API_TOKEN can be set as a secret, using the wrangler command line tool, by running the following and entering your token string:
```sh
$ npx wrangler secret put API_TOKEN
```

### Worker script

The worker script itself executes a query and formats the result:
```JavaScript
export default {
    async fetch(request, env) {
        // This worker only responds to requests at the root.
        if (new URL(request.url).pathname != '/') {
            return new Response('Not found', {status: 404});
        }

        // SQL string to be executed.
        const query = `
            SELECT
                blob1 AS city,
                max(double1) as max_temp,
                min(double1) as min_temp
            FROM weather
            WHERE timestamp > NOW() - INTERVAL '1' DAY
            GROUP BY city
            ORDER BY city`;
            
        // Build the API endpoint URL and make a POST request with the query string
        const API = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/analytics_engine/sql`;
        const queryResponse = await fetch(API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.API_TOKEN}`,
            },
            body: query,
        });
        
        // The API will return a 200 status code if the query succeeded.
        // In case of failure we log the error message and return a failure message.
        if (queryResponse.status != 200) {
            console.error('Error querying:', await queryResponse.text());
            return new Response('An error occurred!', {status: 500});
        }

        // Read the JSON data from the query response and render the data as HTML.
        const queryJSON = await queryResponse.json();
        return new Response(
            renderResponse(queryJSON.data),
            {
                headers: {'content-type': 'text/html'},
            }
        );
    }
}

// renderCity renders a table row as HTML from a data row.
function renderCity(row) {
    return `<tr><td>${row.city}</td><td>${row.min_temp}</td><td>${row.max_temp}</td></tr>`;
}

// renderResponse renders a simple HTML table of results.
function renderResponse(data) {
    return `<!DOCTYPE html>
<html>
    <body>
        <table>
            <tr><th>City</th><th>Min Temp</th><th>Max Temp</th></tr>
            ${data.map(renderCity).join('\n')}
        </table>
    </body>
<html>`;
}
```
