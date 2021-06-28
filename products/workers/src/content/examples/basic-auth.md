---
order: 1000
type: example
summary: Shows how to restrict access using the HTTP "Basic" schema.
tags:
  - Security
  - Originless
  - Authentication
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
  const { protocol, pathname } = new URL(request.url)

  // In the case of a "Basic" authentication, the exchange 
  // MUST happen over an HTTPS (TLS) connection to be secure.
  if ('https:' !== protocol || 'https' !== request.headers.get('x-forwarded-proto')) {
    throw new BadRequestException('Please use a HTTPS connection.')
  }

  switch (pathname) {
    case '/':
      return new Response('Anyone can access the homepage.')

    case '/logout':
      // Invalidate the "Authorization" header by returning a HTTP 401.
      // We do not send a "WWW-Authenticate" header, as this would trigger
      // a popup in the browser, immediately asking for credentials again.
      return new Response('Logged out.', { status: 401 })

    case '/admin': {
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
    }

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
  if (BASIC_USER !== user) {
    throw new UnauthorizedException('Invalid username.')
  }

  if (BASIC_PASS !== pass) {
    throw new UnauthorizedException('Invalid password.')
  }
}

/**
 * Parse HTTP Basic Authorization value.
 * @param {Request} request
 * @throws {BadRequestException}
 * @returns {{ user: string, pass: string }}
 */
function basicAuthentication(request) {
  const Authorization = request.headers.get('Authorization')

  const [scheme, encoded] = Authorization.split(' ')

  // The Authorization header must look like "Basic user:encoded".
  if (scheme !== 'Basic') throw new BadRequestException('Malformed authorization header.')

  // Decode the base64 value.
  const decoded = atob(encoded)

  // The username & password are split by the first colon.
  const seperatorPosition = decoded.indexOf(':')
  
  // NOTE: Without `.normalize()` unicode characters could fail verification.
  // @see https://dev.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

  return { 
    // The username is the value before the first colon.
    user: decoded.substring(0, seperatorPosition).normalize(),
    // The password is everything after the first colon.
    pass: decoded.substring(seperatorPosition + 1).normalize(),
  }
}

function UnauthorizedException(reason) {
  this.status = 401
  this.statusText = 'Unauthorized'
  this.reason = reason
}

function BadRequestException(reason) {
  this.status = 400
  this.statusText = 'Bad Request'
  this.reason = reason
}

addEventListener('fetch', event => {
  event.respondWith(
    handleRequest(event.request).catch(err => {
      const message = err.reason || err.stack || 'Unknown Error'

      return new Response(message, {
        status: err.status || 500,
        statusText: err.statusText || null,
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
          // Disables caching by default.
          'Cache-Control': 'no-store',
          // Returns the "Content-Length" header for HTTP HEAD requests.
          'Content-Length': message.length,
        }
      })
    })
  )
})
```
