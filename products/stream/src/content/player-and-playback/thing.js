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