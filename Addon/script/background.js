var audio;
var autoplay = false;
var userStoppedAudio = false;
var timer;
var volume = 50;
var fetchedChannels;
var selectedChannel = 0;

$(document).ready(function(){
    createAudioPlayer();
    fetchData();
});

function getState() {
    return {
        playing: isPlaying(),
        volume: getVolume(),
        resume: getShouldAutoplay(),
        selectedChannel: selectedChannel,
        channels: fetchedChannels
    };
}

function createAudioPlayer() {
    if(audio === undefined) {
        audio = new Audio('');
        audio.loop="loop";
    }
}

function fetchData() {
    $.ajax({
        url: "http://api.sr.se/api/v2/channels?liveaudiotemplateid=2&audioquality=hi&format=json"
    }).done(function (data) {
        var parsedChannels = [];
        $.each(data.channels, function(i, item) {
            console.log('data fetched');

            parsedChannels.push({
                id : item.id,
                name : item.name,
                img : item.image,
                url: item.liveaudio.url
            });
        });
        fetchedChannels = parsedChannels;
        selectedChannel = parsedChannels[0].id;
        setChannel(selectedChannel);
    });
}

function setChannel(channel) {
    var channelData = findElement(fetchedChannels, 'id', channel);
    setAudioUrl(channelData.url);
}

function findElement(array, name, value) {
    for (var i=0; i < array.length; i++)
        if (array[i][name] == value)
            return array[i];
}

function setAudioUrl(url) {
    if(audio !== undefined) {
        audio.src = url;
    }
}

function start() {
    if(audio !== undefined) {
        userStoppedAudio = false;
        audio.play();
        startTimer();
    }
}

function stop() {
    if(audio !== undefined) {
        userStoppedAudio = true;
        audio.pause();
        stopTimer();
    }
}

function setVolume(volume) {
    if(audio !== undefined) {
        //audio.volume = parseFloat(volume / 100);
    }
}

function getVolume() {
    return volume * 100;
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
    }, 1000);
}

function stopTimer() {
    clearTimeout(timer);
}
