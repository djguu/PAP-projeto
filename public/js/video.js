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

    if (event.userid === connection.userid) {
        Local.appendChild(video);
    } else {
        Remote.appendChild(video);
    }
};

document.getElementById('VideoChatEnter').onclick = function() {
    connection.openOrJoin('Pap-Room');
    $('#VideoChatEnter').hide();
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
