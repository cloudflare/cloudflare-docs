---
order: 2
---

# Player and playback

Stream comes with a standard web player with a number of features built in:

- built-in analytics reporting
- adaptive bitrate streaming
- robust API to control and customize the player behavior
- ability to build custom user interfaces and CTAs

 It works with any video uploaded to Cloudflare Stream right out of the box. The embed code looks like this:

    <stream src="5d5bc37ffcf54c9b82e996823bffbb81" controls preload height="240px" width="480px"></stream>
    <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

<stream src="5d5bc37ffcf54c9b82e996823bffbb81" controls preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

## Using HTML attributes to customize

You can have your videos autoplay without any controls displayed, by modifying the HTML tag attributes.

    <stream src="5d5bc37ffcf54c9b82e996823bffbb81" autoplay muted preload height="240px" width="480px"></stream>
    <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

<stream src="5d5bc37ffcf54c9b82e996823bffbb81" autoplay muted preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

## Javascript API

Stream player comes with a standards-compliant Javascript API. You can use the API to interact with the player using Javascript in the browser. Stream player supports calls such as `player.play();` and `player.currentTime = 120;`.


