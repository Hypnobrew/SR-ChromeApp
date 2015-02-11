var audio;
var autoplay = false;
var timer;

function createAudioPlayer() {
    audio = new Audio('');
    audio.loop="loop";
}

function setAudioUrl(url) {
    if(audio !== undefined) {
        audio.src = url;
    }
}

function start() {
    if(audio !== undefined) {
        audio.play();
        startTimer();
    }
}

function stop() {
    if(audio !== undefined) {
        audio.pause();
        stopTimer();
    }
}

function isPlaying() {
  return !audio.paused;
}

function getShouldAutoplay() {
    return autoplay;
}

function setShouldAutoplay(auto) {
    autoplay = auto;
}

function startTimer() {
    timer = setTimeout(function() {
        if(getShouldAutoplay() === true && isPlaying() === false) {
            start();
        }
    }, 3000);
}

function stopTimer() {
    clearTimeout(timer);
}
