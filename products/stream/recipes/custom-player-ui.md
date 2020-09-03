---
title: Building a Custom UI
weight: 30
---

You can build a custom user interface on top of the Stream player. Here is a simple recipe to build a player with a simple play/pause button overlay and no other controls.

<div dangerouslySetInnerHTML={{__html: `<div id="player-wrapper">
   <stream src="5d5bc37ffcf54c9b82e996823bffbb81" preload height="270px" width="480px"></stream>
   <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>
    <div id="playpause"></div>
</div>`}}></div>

<script dangerouslySetInnerHTML={{__html: `
var playerWrapper = document.getElementById('player-wrapper');
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
});`}}></script>


<style dangerouslySetInnerHTML={{__html: `
#player-wrapper{
    width:auto;
    position:relative;
    width:50%;
}
#playpause {
    background-image:url(https://png-4.findicons.com/files/icons/2315/default_icon/256/media_play_pause_resume.png);
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


```html
<html>
    <body>
        <!--Create a wrapper for our player. This is where the player and the play button will live-->
        <div id="player-wrapper">
            <!--Include the player-->
            <stream src="5d5bc37ffcf54c9b82e996823bffbb81" preload height="270px" width="480px"></stream>
            <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

            <!--Include a div element where we will display a play pause button in CSS below-->
            <div id="playpause"></div>
        </div>

        <!--Include a div element where we will display a play pause button in CSS below-->
        <script>
        var playerWrapper = document.getElementById('player-wrapper');
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
        });
        </script>

        <style>
        #player-wrapper{
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
        }
        </style>
    </body>
</html>
```
