Example of an Auth0 class that is compatible with Workers using ES modules format.

According to [Auth0's documentation](https://auth0.com/docs/secure/tokens/token-best-practices#jwt-validation):

> We strongly recommend that you use middleware or one of the existing open source third-party libraries to parse and validate JWTs. At JWT.io, you can find libraries for various platforms and languages...

[JWT.io's recommendations for JavaScript](https://jwt.io/libraries?language=JavaScript) feature [jose](https://www.npmjs.com/package/jose), an actively maintained, zero-dependency library with over 4M weekly downloads, and is compatible with the Workers runtime.

This example class imports jose as well as [cookie](https://www.npmjs.com/package/cookie), an import from the previous version of the [tutorial](/workers/tutorials/authorize-users-with-auth0).

```js
---
filename: src/auth0.mjs
---
import cookie from 'cookie'
import * as jose from 'jose'

/**
 * Gets the supplied date in seconds
 * @param {Date} d
 * @returns number
 */
export const dateInSecs = d => Math.ceil(Number(d) / 1000)

/**
 * Class for authenticating users with Auth0 within the Workers runtime
 * @param {Object} env Pass in the environment from module-style Workers
 */
export default class Auth0 {
  #env = null // module-style Workers environment
  #clientSecret = null // Auth0 client secret
  constructor(env) {
    this.#env = env
    this.domain = env.AUTH0_DOMAIN                  // Auth0 tenant domain
    this.clientId = env.AUTH0_CLIENT_ID             // Auth0 client ID
    this.#clientSecret = env.AUTH0_CLIENT_SECRET    // Auth0 client secret
    this.callbackUrl = env.AUTH0_CALLBACK_URL       // Current application's callback URL
    this.cookieKey = env.AUTH0_COOKIE_KEY           // Key for auth cookie, non-secret string
    this.cookieDomain = env.AUTH0_COOKIE_DOMAIN     // Domain for auth cookie, e.g. example.com

    this.logoutUrl =
      `https://${this.domain}/v2/logout` +
      `?client_id=${this.clientId}&returnTo=${env.AUTH0_LOGOUT_URL}`
  }

  // Validate a token like those described here:
  // https://auth0.com/docs/secure/tokens/access-tokens#sample-access-token
  async validateToken(token) {
    // Get remote keyset
    const jwks = jose.createRemoteJWKSet(
      new URL(`https://${this.domain}/.well-known/jwks.json`),
    )

    // Verify JWT. Auth0 recommends jose: https://jwt.io/libraries?language=JavaScript
    const { payload } = await jose.jwtVerify(token, jwks, {
      audience: this.clientId, // verify audience claim
      maxTokenAge: '12 hours', // verify max age of token
    })

    // Verify issuer claim
    const iss = new URL(payload.iss).hostname
    if (iss !== this.domain) {
      throw new Error(
        `Token iss value (${iss}) doesn't match configured AUTH0_DOMAIN`,
      )
    }

    // Verify aud claim
    if (payload.aud !== this.clientId) {
      throw new Error(
        `Token aud value (${payload.aud}) doesn't match configured AUTH0_CLIENT_ID`,
      )
    }

    // Verify expires time
    const date = new Date()
    if (payload.exp < dateInSecs(date)) {
      throw new Error(`Token exp value is before current time`)
    }

    // Return payload
    return payload
  }

  /**
   * Calls this.validateToken and persists the token in KV session store
   * @param {Promise} exchange Response from the token exchange endpoint
   * @param {*} storedState Stored state from original auth request
   * @returns object with status and headers for setting the cookie
   */
  async persistAuth(exchange, storedState) {
    // Get the token exchange response
    const body = await exchange.json()
    if (body.error) {
      throw new Error(body.error)
    }

    // Validate and decode the token
    let decoded = null
    try {
      decoded = await this.validateToken(body.id_token)
    } catch (err) {
      return { status: 401 }
    }
    if (!decoded || !decoded.sub) {
      return { status: 401 }
    }

    // Store exchange response body in KV (session handling) after validation
    const id = await this.putSession(JSON.stringify(body))
    const date = new Date()
    date.setDate(date.getDate() + 1) // 1 day

    // Make headers and set cookie with session ID
    const headers = {
      Location: new URL(storedState).href || '/',
      'Set-Cookie': this.serializedCookie(this.cookieKey, id, {
        expires: date,
      }),
    }
    return { headers, status: 302 }
  }

  // Make a request for an auth token and store it in KV
  async exchangeCode(code, storedState) {
    const body = JSON.stringify({
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.#clientSecret,
      code,
      redirect_uri: this.callbackUrl,
    })
    // Persist in KV
    return this.persistAuth(
      await fetch(`https://${this.domain}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
      }),
      storedState,
    )
  }

  // Returns initialization object for Response
  async handleCallback(request) {
    const url = new URL(request.url)

    // Check state param
    let state = url.searchParams.get('state')
    if (!state) {
      return null
    }
    state = decodeURIComponent(state)
    // Fetch stored state (from this.generateStateParam)
    const storedState = await this.#env.KV.get(`state-${state}`)
    if (!storedState) {
      return null
    }

    // We're using code type flow, exchange for auth token
    const code = url.searchParams.get('code')
    if (code) {
      // Return value is defined by this.persistAuth
      return this.exchangeCode(code, storedState)
    }
    return null
  }

  // Logs user out locally and at Auth0
  async logout(request) {
    // Get cookies
    const cookieHeader = request.headers.get('Cookie')
    // Set up headers
    let headers = {
      Location: this.logoutUrl,
    }
    // Delete existing cookie
    if (cookieHeader && cookieHeader.includes(this.cookieKey)) {
      // Reset cookie in response header
      headers['Set-Cookie'] = this.serializedCookie(this.cookieKey, '', {
        expires: new Date(), // expire now
      })
      // Parse incoming cookie to identify session
      const cookies = cookie.parse(cookieHeader)
      // We have an existing session, so delete it
      if (typeof cookies[this.cookieKey] !== 'undefined') {
        const id = cookies[this.cookieKey]
        await this.deleteSession(id)
      }
    }
    return { headers, status: 302 }
  }

  /**
   * Verify a user's session against the KV store
   * @param {Request} request
   * @returns object with auth info or null
   */
  async verifySession(request) {
    const cookieHeader = request.headers.get('Cookie')
    // Check existing cookie
    if (cookieHeader && cookieHeader.includes(this.cookieKey)) {
      const cookies = cookie.parse(cookieHeader)
      if (typeof cookies[this.cookieKey] !== 'string') {
        return null
      }

      const id = cookies[this.cookieKey]
      const kvData = await this.getSession(id)

      if (!kvData) {
        // We have a cookie but the KV data is missing or expired
        return null
      }

      let kvStored = null
      let userInfo = null
      try {
        // this is the response body from the Auth0 token endpoint, saved by persistAuth()
        kvStored = JSON.parse(kvData)
        userInfo = await this.validateToken(kvStored.id_token)
      } catch (err) {
        // Invalid stored session
        await this.deleteSession(id)
        throw new Error('Unable to parse auth information from Workers KV')
      }
      if (!userInfo || !userInfo.sub) {
        return null
      }

      const { access_token: accessToken, id_token: idToken } = kvStored
      return { accessToken, idToken, userInfo }
    }
    return null
  }

  /**
   * Gateway method to handle all auth requests, calls multiple other methods in this class
   * @param {Request} request
   * @param {string} successPath Return path after auth
   * @returns Array of [result: boolean, payload: object]
   */
  async authorize(request, successPath) {
    const auth = await this.verifySession(request)
    if (auth && auth.accessToken) {
      return [true, auth]
    } else {
      const url = new URL(request.url)
      const target = new URL(successPath, url.origin)
      const state = await this.generateStateParam(target.href)
      return [false, { redirectUrl: this.redirectUrl(state) }]
    }
  }

  // Utility functions to handle session-storage in KV
  // If we want an extra layer of security, we can encrypt the values in KV
  async deleteSession(id) {
    await this.#env.KV.delete(`id-${id}`)
  }

  async getSession(id) {
    return this.#env.KV.get(`id-${id}`)
  }

  // Store session data and return the id
  async putSession(data) {
    const id = crypto.randomUUID()
    await this.#env.KV.put(`id-${id}`, data, {
      expirationTtl: 86400, // 1 day
    })
    return id
  }

  // Returns a serialized cookie string ready to be set in headers
  serializedCookie(key, value, options = {}) {
    options = {
      domain: this.cookieDomain,
      httpOnly: true,
      path: '/',
      secure: true, // requires SSL certificate
      sameSite: 'lax',
      ...options,
    }
    return cookie.serialize(key, value, options)
  }

  // Utility to store a state param in KV
  // Predominantly the value is the URL requested by the user when this.authorize is called
  async generateStateParam(data) {
    const resp = await fetch('https://csprng.xyz/v1/api')
    const { Data: state } = await resp.json()
    await this.#env.KV.put(`state-${state}`, data, {
      expirationTtl: 600,
    })
    return state
  }

  // Returns an authorization URL for Auth0 login
  redirectUrl(state) {
    const url =
      `https://${this.domain}/authorize` +
      `?response_type=code&client_id=${this.clientId}` +
      `&redirect_uri=${this.callbackUrl}&scope=openid%20profile%20email` +
      `&state=${encodeURIComponent(state)}`
    return url
  }
}

```
