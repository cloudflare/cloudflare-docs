---
type: example
summary: Shows how to restrict access using the HTTP Basic schema.
tags:
  - Security
  - Originless
  - Authentication
pcx_content_type: configuration
title: HTTP Basic Authentication
weight: 1001
layout: example
---

{{<Aside type="warning" header="Caution when using in production">}}

This code is provided as a sample, and is not suitable for production code without protecting against timing attacks. To learn how to implement production-safe code, refer to the [`timingSafeEqual` example](/workers/examples/protect-against-timing-attacks/) for more information on how to mitigate against timing attacks in your Workers code.

{{</Aside>}}

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
/**
 * Shows how to restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 * A user-id containing a colon (":") character is invalid, as the
 * first colon in a user-pass string separates user and password.
 */
export default {
  async fetch(request) {
    const BASIC_USER = "admin";
    const BASIC_PASS = "admin";

    /**
     * Throws exception on verification failure.
     * @param {string} user
     * @param {string} pass
     * @throws {UnauthorizedException}
     */
    async function verifyCredentials(user, pass) {
      if (BASIC_USER !== user) {
        throw new UnauthorizedException("Invalid credentials.");
      }

      if (BASIC_PASS !== pass) {
        throw new UnauthorizedException("Invalid credentials.");
      }
    }

    /**
     * Parse HTTP Basic Authorization value.
     * @param {Request} request
     * @throws {BadRequestException}
     * @returns {{ user: string, pass: string }}
     */
    async function basicAuthentication(request) {
      const Authorization = request.headers.get("Authorization");

      const [scheme, encoded] = Authorization.split(" ");

      // The Authorization header must start with Basic, followed by a space.
      if (!encoded || scheme !== "Basic") {
        throw new BadRequestException("Malformed authorization header.");
      }

      // Decodes the base64 value and performs unicode normalization.
      // @see https://datatracker.ietf.org/doc/html/rfc7613#section-3.3.2 (and #section-4.2.2)
      // @see https://dev.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
      const buffer = Uint8Array.from(atob(encoded), (character) =>
        character.charCodeAt(0)
      );
      const decoded = new TextDecoder().decode(buffer).normalize();

      // The username & password are split by the first colon.
      //=> example: "username:password"
      const index = decoded.indexOf(":");

      // The user & password are split by the first colon and MUST NOT contain control characters.
      // @see https://tools.ietf.org/html/rfc5234#appendix-B.1 (=> "CTL = %x00-1F / %x7F")
      if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
        throw new BadRequestException("Invalid authorization value.");
      }

      return {
        user: decoded.substring(0, index),
        pass: decoded.substring(index + 1),
      };
    }

    async function UnauthorizedException(reason) {
      this.status = 401;
      this.statusText = "Unauthorized";
      this.reason = reason;
    }

    async function BadRequestException(reason) {
      this.status = 400;
      this.statusText = "Bad Request";
      this.reason = reason;
    }

    const { protocol, pathname } = new URL(request.url);

    // In the case of a Basic authentication, the exchange MUST happen over an HTTPS (TLS) connection to be secure.
    if (
      "https:" !== protocol ||
      "https" !== request.headers.get("x-forwarded-proto")
    ) {
      throw new BadRequestException("Please use a HTTPS connection.");
    }

    switch (pathname) {
      case "/":
        return new Response("Anyone can access the homepage.");

      case "/logout":
        // Invalidate the "Authorization" header by returning a HTTP 401.
        // We do not send a "WWW-Authenticate" header, as this would trigger
        // a popup in the browser, immediately asking for credentials again.
        return new Response("Logged out.", { status: 401 });

      case "/admin": {
        // The "Authorization" header is sent when authenticated.
        if (request.headers.has("Authorization")) {
          // Throws exception when authorization fails.
          const { user, pass } = basicAuthentication(request);
          verifyCredentials(user, pass);

          // Only returns this response when no exception is thrown.
          return new Response("You have private access.", {
            status: 200,
            headers: {
              "Cache-Control": "no-store",
            },
          });
        }

        // Not authenticated.
        return new Response("You need to login.", {
          status: 401,
          headers: {
            // Prompts the user for credentials.
            "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',
          },
        });
      }

      case "/favicon.ico":
      case "/robots.txt":
        return new Response(null, { status: 204 });
    }

    return new Response("Not Found.", { status: 404 });
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request: Request) {
    const BASIC_USER = "admin";
    const BASIC_PASS = "admin";

    /**
     * Throws exception on verification failure.
     * @param {string} user
     * @param {string} pass
     * @throws {UnauthorizedException}
     */
    async function verifyCredentials(user, pass) {
      if (BASIC_USER !== user) {
        throw new UnauthorizedException("Invalid credentials.");
      }

      if (BASIC_PASS !== pass) {
        throw new UnauthorizedException("Invalid credentials.");
      }
    }

    /**
     * Parse HTTP Basic Authorization value.
     * @param {Request} request
     * @throws {BadRequestException}
     * @returns {{ user: string, pass: string }}
     */
    async function basicAuthentication(request) {
      const Authorization = request.headers.get("Authorization");

      const [scheme, encoded] = Authorization.split(" ");

      // The Authorization header must start with Basic, followed by a space.
      if (!encoded || scheme !== "Basic") {
        throw new BadRequestException("Malformed authorization header.");
      }

      // Decodes the base64 value and performs unicode normalization.
      // @see https://datatracker.ietf.org/doc/html/rfc7613#section-3.3.2 (and #section-4.2.2)
      // @see https://dev.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
      const buffer = Uint8Array.from(atob(encoded), (character) =>
        character.charCodeAt(0)
      );
      const decoded = new TextDecoder().decode(buffer).normalize();

      // The username & password are split by the first colon.
      //=> example: "username:password"
      const index = decoded.indexOf(":");

      // The user & password are split by the first colon and MUST NOT contain control characters.
      // @see https://tools.ietf.org/html/rfc5234#appendix-B.1 (=> "CTL = %x00-1F / %x7F")
      if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
        throw new BadRequestException("Invalid authorization value.");
      }

      return {
        user: decoded.substring(0, index),
        pass: decoded.substring(index + 1),
      };
    }

    async function UnauthorizedException(reason) {
      this.status = 401;
      this.statusText = "Unauthorized";
      this.reason = reason;
    }

    async function BadRequestException(reason) {
      this.status = 400;
      this.statusText = "Bad Request";
      this.reason = reason;
    }

    const { protocol, pathname } = new URL(request.url);

    // In the case of a Basic authentication, the exchange MUST happen over an HTTPS (TLS) connection to be secure.
    if (
      "https:" !== protocol ||
      "https" !== request.headers.get("x-forwarded-proto")
    ) {
      throw new BadRequestException("Please use a HTTPS connection.");
    }

    switch (pathname) {
      case "/":
        return new Response("Anyone can access the homepage.");

      case "/logout":
        // Invalidate the "Authorization" header by returning a HTTP 401.
        // We do not send a "WWW-Authenticate" header, as this would trigger
        // a popup in the browser, immediately asking for credentials again.
        return new Response("Logged out.", { status: 401 });

      case "/admin": {
        // The "Authorization" header is sent when authenticated.
        if (request.headers.has("Authorization")) {
          // Throws exception when authorization fails.
          const { user, pass } = basicAuthentication(request);
          verifyCredentials(user, pass);

          // Only returns this response when no exception is thrown.
          return new Response("You have private access.", {
            status: 200,
            headers: {
              "Cache-Control": "no-store",
            },
          });
        }

        // Not authenticated.
        return new Response("You need to login.", {
          status: 401,
          headers: {
            // Prompts the user for credentials.
            "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',
          },
        });
      }

      case "/favicon.ico":
      case "/robots.txt":
        return new Response(null, { status: 204 });
    }

    return new Response("Not Found.", { status: 404 });
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
