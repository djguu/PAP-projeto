//$('#VideoChatLeave').hide();
var connection = new RTCMultiConnection();

// linha que controla o video
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.session = {
    audio: true,
    video: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

connection.onstream = function(event) {
    var video = event.mediaElement;
    console.log(video);
    console.log(JSON.stringify(event));
    console.log(event.stream.streamid);
    if (event.userid === connection.userid) {
        Local.appendChild(video);
        var local = document.getElementById(event.streamid);
        if ($(window).width() < 768) {
            local.height = 150;
        }
        else{
            local.height = 200;
        }
        local.style.borderRadius = "10px";
        local.controls = false;
    } else {
        Remote.appendChild(video);
        var remote = document.getElementById(event.streamid);
        // remote.height = (window.outerHeight - 50)/2;
        if ($(window).width() < 768) {
            remote.width = window.outerWidth;
        }
        else{
            remote.width = window.outerWidth/2;
        }
        remote.style.borderRadius = "10px";
    }
};

document.getElementById('video').onclick = function() {
    connection.openOrJoin('Pap-Room4');
    $('#video').hide();
};
/*
document.getElementById('VideoChatLeave').onclick = function() {
    connection.attachStreams.forEach(function(localStream) {
        localStream.stop();
    });
    connection.close();
    $('#VideoChatEnter').show();
    $('#VideoChatLeave').hide();
};*/
