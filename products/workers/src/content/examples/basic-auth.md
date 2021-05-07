---
order: 1000
type: example
summary: Shows how to restrict access using the HTTP "Basic" schema.
tags:
  - Security
  - Originless
---

# HTTP "Basic" Authentication

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * Shows how to restrict access using the HTTP "Basic" schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 * The user and password MUST NOT contain any control characters.
 * @see https://tools.ietf.org/html/rfc5234#appendix-B.1
 *
 * A user-id containing a colon (":") character is invalid, as the
 * first colon in a user-pass string separates user and password.
 */
const BASIC_USER = 'admin'
const BASIC_PASS = 'admin'

/**
 * Receives a HTTP request and replies with a response.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { method, url } = request
  const { host, pathname, protocol } = new URL(url)

  // In the case of a "Basic" authentication, the exchange 
  // MUST happen over an HTTPS (TLS) connection to be secure.
  if ('https'  !== request.headers.get('x-forwarded-proto')
   || 'https:' !== protocol
  ) throw new BadRequestException('Please use a HTTPS connection.')

  switch (pathname)
  {
    case '/':
      return new Response('Anyone can access the homepage.')

    case '/logout':
      // Invalidate the "Authorization" header by returning a HTTP 401.
      // We do not send a "WWW-Authenticate" header, as this would trigger
      // a popup in the browser, immediately asking for credentials again.
      return new Response('Logged out.', { status: 401 })

    case '/admin':
      // The "Authorization" header is sent when authenticated.
      if (request.headers.has('Authorization')) {
        // Throws exception when authorization fails.
        const { user, pass } = basicAuthentication(request)
        verifyCredentials(user, pass)

        // Only returns this response when no exception is thrown.
        return new Response('You have private access.', {
          status: 200,
          headers: {
            'Cache-Control': 'no-store'
          }
        })
      }

      // Not authenticated.
      return new Response('You need to login.', {
        status: 401,
        headers: {
          // Prompts the user for credentials.
          'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"'
        }
      })
    break

    case '/favicon.ico':
    case '/robots.txt':
      return new Response(null, { status: 204 })
  }

  return new Response('Not Found.', { status: 404 })
}

/**
 * Throws exception on verification failure.
 * @param {string} user
 * @param {string} pass
 * @throws {UnauthorizedException}
 */
function verifyCredentials(user, pass) {

  user = String(user).normalize()
  pass = String(pass).normalize()

  if (BASIC_USER !== user)
    throw new UnauthorizedException('Username does not match.')

  if (BASIC_PASS !== pass)
    throw new UnauthorizedException('Password does not match.')
}

/**
 * Parse HTTP Basic Authorization value.
 * @param {Request} request
 * @throws {BadRequestException}
 * @returns { (string)user, (string)pass }
 */
function basicAuthentication(request) {
  // The value after "Basic ", which contains 6 characters, is
  // the base 64 encoded string containing the username & password.
  const base64Encoded = getAuthorizationValue(request, 'Basic')

  // developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
  try {
    const base64Decoded = atob(base64Encoded)

    // The username & password are split by the first colon.
    const seperatorPosition = base64Decoded.indexOf(':')

    // The username is the value before the first colon.
    const user = base64Decoded.substr(0, seperatorPosition)

    // The password is the value after the first colon,
    // not including that colon in the value (skip 1 position).
    const pass = base64Decoded.substr(seperatorPosition + 1)

    return { user, pass }
  }
  catch (exception) {
    // Catch atob()
    throw new BadRequestException(exception)
  }
}

/**
 * Returns the authorization header without the scheme prefix.
 * @param {Request} request
 * @param  {string} authenticationScheme ['Basic', 'Bearer']
 * @throws {BadRequestException}
 * @returns {string} authorizationValue
 */
function getAuthorizationValue(request, authenticationScheme) {
  // Returns the value of the "Authorization" header.
  const header = request.headers.get('Authorization')

  // The value of the header should start with the scheme plus one space.
  if ( ! header.startsWith(`${authenticationScheme} `) )
    throw new BadRequestException('Malformed authorization header.')

  // Strip the authorization scheme.
  const authorizationValue = header.substr(authenticationScheme.length + 1)

  return authorizationValue
}

function UnauthorizedException(reason) {
  this.value = reason
  this.status = 401
  this.headers = {}
  this.toString = () => {
    return '401 Unauthorized: ' + this.value
  }
}

function BadRequestException(reason) {
  this.value = reason
  this.status = 400
  this.headers = {}
  this.toString = () => {
    return '400 Bad Request: ' + this.value
  }
}

addEventListener('fetch',function(event) {
   const response = handleRequest(event.request)
  .catch(exception => {
    const message = exception.stack   || exception, // .toString()
          headers = exception.headers || {},
          status  = exception.status  || 500

    return new Response(message, { status,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
        // Disables caching by default.
        'Cache-Control': 'no-store',
        // Returns the "Content-Length" header for HTTP HEAD requests.
        'Content-Length': message.toString().length,
        // Overwrites the values above.
        ...headers
      }
    })
  })
  
  event.respondWith(response)
})

```
