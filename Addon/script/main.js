//http://api.sr.se/api/v2/channels?liveaudiotemplateid=2&audioquality=hi
//http://api.sr.se/api/v2/channels?liveaudiotemplateid=0&audioquality=hi

$(document).ready(function(){

    var backgroundTask = chrome.extension.getBackgroundPage();
    var shouldAutoplay = $("#autoplay");
    shouldAutoplay.prop('checked', backgroundTask.getShouldAutoplay());

    fetchChannels();

    $("#start_btn").click(function(){
        var url = $('#channels').val();
        backgroundTask.setAudioUrl(url);
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

    function fetchChannels() {
        var httpPromise = backgroundTask.getState();
        httpPromise.done(function (data) {
            console.log(JSON.stringify(data));
            handleData(data.channels);
        });

    }

    function handleData(data) {
        var channels = $('#channels');
        $.each(data, function(i, item) {
            channels.append(new Option(item.name, item.liveaudio.url));
        });
    };
});


