var audio;
function createAudioPlayer() {
    audio = new Audio('');
    audio.loop="loop";
}

function setAudioUrl(url) {
    if(audio !== undefined) {
        audio.src = url;
    }
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
