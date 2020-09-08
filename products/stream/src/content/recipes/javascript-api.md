# Using the Javascript API

Stream Player implements the HTML5 `<video>` element API so you can customize the player using Javascript. Using the standard `<video>` element functions, you can play, pause, mute videos, adjust the player volume and seek throughout the video playhead position.
You can also add event listeners that will run in response to player events, such as a player state change or a video playback quality change. The stream element supports majority of the [HTML5 Video API](https://www.w3schools.com/tags/ref_av_dom.asp), which contains a wide range of events throughout the player lifecycle.

## Example

The sample HTML below will create a Stream player and after you press play, video will play for 5 seconds and pause.

<!-- Create a <stream> tag. This will display your video. -->
<stream src="5d5bc37ffcf54c9b82e996823bffbb81" controls preload height="270px" width="480px"></stream>

<!-- This code will initialize the stream player -->
<script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

<script dangerouslySetInnerHTML={{__html: `
var firstStreamElement = document.getElementsByTagName('stream')[0];

// Playing event fired from the Strem element will call this function
// which will set a timeout to pause the video in 5 seconds
function onPlaying() {
    console.log("now the video is playing")
    setTimeout(pauseVideo, 5000);
}

// Function to pause the video, which will be called 5 seconds after
// the video starts playing
function pauseVideo() {
    firstStreamElement.pause();
    console.log("now the video is paused")
}

// Place event listeners to trigger the functions when time is ready
// The loadedmetadata is a good event to call to determine the element is
// ready for playout
firstStreamElement.addEventListener('play', onPlaying);
`}}></script>

below is the code we've used to create the player above:

```html
<!DOCTYPE html>
<html>
    <body>
        <!-- Create a <stream> tag. This will display your video. -->
        <stream src="5d5bc37ffcf54c9b82e996823bffbb81" controls preload height="270px" width="480px"></stream>

        <!-- This code will initialize the stream player -->
        <script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

        <script>
        var firstStreamElement = document.getElementsByTagName('stream')[0];

        // Playing event fired from the Strem element will call this function
        // which will set a timeout to pause the video in 5 seconds
        function onPlaying() {
            console.log("now the video is playing")
            setTimeout(pauseVideo, 5000);
            }
        }

        // Function to pause the video, which will be called 5 seconds after
        // the video starts playing
        function pauseVideo() {
            firstStreamElement.pause();
            console.log("now the video is paused")
        }

        // Place event listeners to trigger the functions when time is ready
        // The loadedmetadata is a good event to call to determine the element is
        // ready for playout
        firstStreamElement.addEventListener('play', onPlaying);
        </script>
    </body>
</html>
```
