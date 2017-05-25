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

    // now you can search all <video>
    // whose "data-userid" matches current userid
    $(video).attr('data-userid', event.userid);

    if (event.userid === connection.userid) {
        Local.appendChild(video);
    } else {
        Remote.appendChild(video);
    }


};

var predefinedRoomId = 'Pap-Room';

document.getElementById('VideoChatEnter').onclick = function() {
    connection.open(predefinedRoomId);
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
