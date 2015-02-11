//http://api.sr.se/api/v2/channels?liveaudiotemplateid=2&audioquality=hi

$(document).ready(function(){
    var bgp = chrome.extension.getBackgroundPage();

    bgp.createAudioPlayer();

    $("#start_btn").click(function(){
        bgp.start();
    });

    $("#stop_btn").click(function(){
        bgp.stop();
    });
});

/*
document.addEventListener('DOMContentLoaded', function() {

	var audio = document.getElementById('audio-player');
	audio.src = 'http://sverigesradio.se/topsy/direkt/132.mp3';
	
});*/