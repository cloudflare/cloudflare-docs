---
order: 1000
type: example
summary: Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.
tags:
  - Authentication
  - WebCrypto
pcx-content-type: configuration
---

# Auth with headers

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The custom header name for the key
const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
// The hard-coded key value that the application expects
const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
function handleRequest(request) {
  const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);
  // Correct header key supplied; fetch from origin
  if (psk === PRESHARED_AUTH_HEADER_VALUE) {
    return fetch(request);
  }
  // Incorrect key supplied; reject the request
  return new Response("Sorry, you have supplied an invalid key.", {
    status: 403,
  });
}
export default {
  fetch(request) {
    return handleRequest(request);
  },
};
```
