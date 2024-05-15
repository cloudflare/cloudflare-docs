# Embeds

## Cloudflare Zaraz's Server-Side Rendering for Embeds

Embeds are tools for incorporating external content, like social media posts, directly onto webpages, enhancing user engagement without compromising site performance and security.

Cloudflare Zaraz introduces server-side rendering for embeds, avoiding third-party JavaScript to improve security, privacy, and page speed. This method processes content on the server side, removing the need for direct communication between the user's browser and third-party servers.

## Adding an Embed to Your Website

To embed content, add a placeholder in your HTML, specifying the necessary attributes. For a generic embed, the snippet looks like this:

```html
<componentName-embedName attribute1="value"></componentName-embedName>
```

Replace `componentName`, `embedName`, and `attribute1="value"` with the specific Managed Component requirements.

## Configuration and Setup

Configurations for embeds are straightforward. Activate the desired tools on your Cloudflare Zaraz dashboard. Zaraz automatically detects placeholders, injecting iframes to render the content securely and efficiently.

## Examples

For Twitter embed:

```html
<twitter-post tweet-id="12345"></twitter-post>
```
Replace `tweet-id` with the actual tweet ID for the content you wish to embed.

For Instagram embed:

```html
<instagram-post post-url="https://www.instagram.com/p/ABC/" captions="true"></instagram-post>
```

Replace `post-url` with the actual URL for the content you wish to embed. To include posts captions set captions attribute to “true”.
