//http://api.sr.se/api/v2/channels?liveaudiotemplateid=2&audioquality=hi

$(document).ready(function(){
    var backgroundTask = chrome.extension.getBackgroundPage();

    backgroundTask.createAudioPlayer();
    backgroundTask.setAudioUrl('http://sverigesradio.se/topsy/direkt/132.mp3');

    $("#start_btn").click(function(){
        backgroundTask.start();
    });

    $("#stop_btn").click(function(){
        backgroundTask.stop();
    });
});

/*
document.addEventListener('DOMContentLoaded', function() {

	var audio = document.getElementById('audio-player');
	audio.src = 'http://sverigesradio.se/topsy/direkt/132.mp3';
	
});*/