---
pcx_content_type: reference
---

# Handling Workers AI Errors

Learn how to handle Workers AI errors from both the REST API and Worker scripts. This page includes information on error response structures, handling methods, and lists of common errors with their respective HTTP status codes and descriptions.

## REST API Error Handling

When interacting with Workers AI via the [REST API](/workers-ai/get-started/rest-api/), errors are returned in the JSON payload. The error responses typically include an HTTP status code and a JSON body containing details about the error.

### Example of Error JSON Response

```json
{
  "error": {
    "code": "MODEL_NOT_FOUND",
    "message": "The specified model does not exist."
  }
}
```

### Handling REST API Errors in Your Code

You should check the HTTP status code of the response and handle the error based on the provided information.

#### Example in JavaScript

```js
fetch('https://api.cloudflare.com/client/v4/workers-ai/model/run', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  body: JSON.stringify({ /* your payload */ })
})
.then(response => {
  if (!response.ok) {
    return response.json().then(errorInfo => {
      throw new Error(`${response.status}: ${errorInfo.error.message}`);
    });
  }
  return response.json();
})
.then(data => {
  console.log('Model result:', data);
})
.catch(error => {
  console.error('Error running model:', error);
});
```

### List of Common REST API Errors

| HTTP Code | Error Code            | Message                                            |
|-----------|-----------------------|----------------------------------------------------|
| 400       | INVALID_REQUEST       | The request payload is malformed.                  |
| 401       | UNAUTHORIZED          | Authentication credentials are missing or invalid. |
| 403       | FORBIDDEN             | You do not have access to this resource.           |
| 404       | MODEL_NOT_FOUND       | The specified model does not exist.                |
| 500       | INTERNAL_SERVER_ERROR | An internal server error occurred.                 |

## Worker Scripts Error Handling

When using Workers AI in Worker scripts, errors can be caught using try/catch blocks. The `ai.run` function can throw errors which should be handled appropriately.

### Example of Error Handling in Worker Scripts

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const result = await ai.run('model-id', { /* your payload */ });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: error.statusCode || 500 });
  }
}
```

### Error Object Structure

The error object thrown by `ai.run` contains the following properties:
- `statusCode`: The HTTP status code associated with the error.
- `message`: A human-readable message describing the error.

### List of Common Worker Script Errors

| Error Code         | Description                                              |
|--------------------|----------------------------------------------------------|
| MODEL_NOT_FOUND    | The specified model does not exist.                      |
| INVALID_PAYLOAD    | The provided payload is invalid or malformed.            |
| UNAUTHORIZED       | Missing or invalid authentication credentials.           |
| FORBIDDEN          | You do not have permission to access the specified model.|
| INTERNAL_ERROR     | An internal error occurred while processing the request. |