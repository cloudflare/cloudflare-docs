# Security considerations

## Limiting Where Videos Can Be Embedded

By default, Stream embed codes can be used on any domain. If needed, you can limit the domains a video can be embedded on from the Stream dashboard.

In the dashboard, you will see a text box by each video labeled `Enter allowed origin domains separated by commas`. If you click on it, you can list the domains that the Stream embed code should be able to be used on.

  * `*.badtortilla.com` covers a.badtortilla.com, a.b.badtortilla.com and badtortilla.com
  * `example.com` does not cover www.example.com or any subdomain of example.com
  * `localhost` covers localhost at any port
  * There's no path support - `example.com` covers example.com/*

You can also control embed limitation programmatically using the Stream API. `uid` in the example below refers to the video id.

```bash
curl -X POST \
-H "X-Auth-Key: $APIKEY" -H "X-Auth-Email: $EMAIL" \
-d '{"uid": "$VIDEOID", "allowedOrigins": ["example.com"]}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID

```

## Signed URLs

Combining [signed URLs](/security/signed-urls/) with embedding restrictions allows you to strongly control how your videos are viewed. This lets you serve only trusted users while preventing the signed URL from being hosted on an unknown site.

To do so

1. Sign a token and use it in an embed code on your site
1. Make the video private
1. Restrict the viewing domains to your site

## Content Security Policy (CSP) considerations

Content Security Policy (CSP) is a layer of security that helps to detect and prevent certain types of cross site scripting and data injection attacks. Most common way servers set CSP information is through headers at your origin server.

If you are using CSP, you will need to add all subdomains of `cloudflarestream.com` and `videodelivery.net` to your CSP policy in order for Stream to work.

    Content-Security-Policy: default-src 'self' *.cloudflarestream.com *.videodelivery.net

If CSP is misconfigured your videos might not play or you might see an error similar to the one below in your browser's javascript console.

    Refused to load the script 'https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js' because it violates the following Content Security Policy directive: ...

Read more about Content Security Policy at [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
