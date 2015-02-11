var audio;
function createAudioPlayer() {
    audio = new Audio('http://sverigesradio.se/topsy/direkt/132.mp3');
    audio.loop="loop";
}

function start(){
    if(audio !== undefined) {
        audio.play();
    }
}

function stop(){
    if(audio !== undefined) {
        audio.pause();
    }
}
