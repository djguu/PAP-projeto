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
    document.body.appendChild( event.mediaElement );
};

var predefinedRoomId = 'Pap-Room';

document.getElementById('btn-open-room').onclick = function() {;
    connection.open( predefinedRoomId );
};
