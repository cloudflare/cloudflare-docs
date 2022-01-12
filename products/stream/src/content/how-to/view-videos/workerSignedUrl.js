// WORKERS running here: https://dark-snow-43f8.thefrenchy.workers.dev/

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })

  // Global variables
  const jwkKey = 'REDACTED'
  const keyID = 'REDACTED'
  const videoID = 'REDACTED'
  // expiresTimeInS is the expired time in second of the video
  const expiresTimeInS = 3600

  // Main function
  async function streamSignedUrl () {
    const encoder = new TextEncoder()
    const expiresIn = Math.floor(Date.now() / 1000) + expiresTimeInS
    const headers = {
      "alg": "RS256",
      "kid": keyID
    }
    const data = {
      "sub": videoID,
      "kid": keyID,
      "exp": expiresIn,
      "accessRules": [
        {
          "type": "ip.geoip.country",
          "action": "allow",
          "country": [
            "GB"
          ]
        },
        {
          "type": "any",
          "action": "block"
        }
      ]
    }

    const token = `${objectToBase64url(headers)}.${objectToBase64url(data)}`

    const jwk = JSON.parse(atob(jwkKey))

    const key = await crypto.subtle.importKey(
      "jwk", jwk,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false, [ "sign" ]
    )

    const signature = await crypto.subtle.sign(
      { name: 'RSASSA-PKCS1-v1_5' }, key,
      encoder.encode(token)
    )

    const signedToken = `${token}.${arrayBufferToBase64Url(signature)}`

    return signedToken
  }

  // Utilities functions
  function arrayBufferToBase64Url(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  function objectToBase64url(payload) {
    return arrayBufferToBase64Url(
      new TextEncoder().encode(JSON.stringify(payload)),
    )
  }

  const someHtml = (token) => { return  `<!DOCTYPE html>
  <html>
    <body>
    <h1>Stream</h1>
    <p>This is all generated using a Worker</p>
    <stream src="`+token+`" controls></stream>
    <script data-cfasync="false" defer type="text/javascript" src="https://embed.videodelivery.net/embed/r4xu.fla9.latest.js?video=`+token+`"></script>
    </body>
  </html>` }

  /**
   * Respond to the request
   * @param {Request} request
   */
  async function handleRequest(request) {
      const init = {
          status: 200,
          headers: {
          'content-type': 'text/html;charset=UTF-8',
          },
      }
      const token = await streamSignedUrl()

      return new Response(someHtml(token), init)
  }