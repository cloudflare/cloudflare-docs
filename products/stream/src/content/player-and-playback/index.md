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

[Learn more](/video-playback/player-api/) about `<stream>` element attributes.

    <stream src="5d5bc37ffcf54c9b82e996823bffbb81" autoplay muted preload height="240px" width="480px"></stream>
    <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

<stream src="5d5bc37ffcf54c9b82e996823bffbb81" autoplay muted preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

## Javascript API

Stream player comes with a standards-compliant Javascript API. You can use the API to interact with the player using Javascript in the browser. Stream player supports calls such as `player.play();` and `player.currentTime = 120;`.

## Building a custom user interface

You can build any custom user interface on top of the Stream player. Below is a simple player with a simple play/pause button overlay and no other controls.

[Learn more](/recipes/custom-player-ui/) about how to create a custom player UI.

<div dangerouslyInsertInnerHTML={{__html: `<div id="player-wrapper">
   <stream src="5d5bc37ffcf54c9b82e996823bffbb81" preload height="270px" width="480px"></stream>
   <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>
    <div id="playpause"></div>
</div>`}}></div>



<script dangerouslySetInnerHTML={{__html: `var playerWrapper = document.getElementById('player-wrapper');
var playpause = document.getElementById('playpause');
var playing = false;
playerWrapper.addEventListener("click", function(){
    if (playing == false){
        playerWrapper.children[0].play()
        playing = true;
    } else {
        playerWrapper.children[0].pause()
        playing = false;
    }

    if (playpause.hidden === false) {
        playpause.hidden = true;
    } else {
        playpause.hidden = false;
    }
});`}} />


<style dangerouslyInsertInnerHTML={{__html: `#player-wrapper{
    width:auto;
    position:relative;
    width:50%;
}
#playpause {
    background-image:url(http://png-4.findicons.com/files/icons/2315/default_icon/256/media_play_pause_resume.png);
    background-repeat:no-repeat;
    width:50%;
    height:50%;
    position:absolute;
    left:0%;
    right:0%;
    top:0%;
    bottom:0%;
    margin:auto;
    background-size:contain;
    background-position: center;
}`}}></style>


