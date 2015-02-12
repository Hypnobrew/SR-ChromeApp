//http://api.sr.se/api/v2/channels?liveaudiotemplateid=2&audioquality=hi

//http://api.sr.se/api/v2/channels?liveaudiotemplateid=0&audioquality=hi

$(document).ready(function(){
    var backgroundTask = chrome.extension.getBackgroundPage();
    var shouldAutoplay = $("#autoplay");
    shouldAutoplay.prop('checked', backgroundTask.getShouldAutoplay());

    backgroundTask.createAudioPlayer();

    $("#start_btn").click(function(){
        backgroundTask.setAudioUrl('http://sverigesradio.se/topsy/direkt/164.mp3');
        backgroundTask.start();
    });

    $("#stop_btn").click(function(){
        backgroundTask.stop();
    });

    $('#autoplay').click(function() {
        if(shouldAutoplay.is(':checked')) {
            backgroundTask.setShouldAutoplay(true);
        }
        else {
            backgroundTask.setShouldAutoplay(false);
        }
    });
});