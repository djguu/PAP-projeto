var socket = io();

$('#setNick').submit(function(e) {
    e.preventDefault();
    if ($('#nickname').val() !== "") {
        socket.emit('new user', $('#nickname').val(), function(data) {
            if (data) {
                $('#formWrapperFlex').hide();
                $('#contentWrap').show();
            }
        });
    }

    $('#nickname').val('');
});


socket.on('user error', function(data) {
    $('#nickError').html(data);
});

socket.on('usernames', function(data) {
    var html = '';
    for (i = 0; i < data.nicknames.length; i++) {
        var cor = data.usedColors[i].replace('#', '');
        html += '<li class="media">\
                    <div class="media-body">\
                        <div class="media">\
                            <img class="pull-left" class="media-object img-circle" style="max-height:17px;" src="images/' + cor + '.png" />\
                            <div class="media-body" >\
                                <h5>' + data.nicknames[i] + '</h5>\
                            </div>\
                        </div>\
                    </div>\
                </li>';
    }
    $('#user').html(html);
});


$('#bt').click(function() {
    $('#chatform').submit();
});

$('#chatform').submit(function() {
    if ($('#mm').val() !== "") {
        socket.emit('chat message', $('#mm').val());
        $('#mm').val('');
    }
    return false;
});

socket.on('status user', function(data) {
    var txt = '<li class="media"> \
                    <div class="media-body"> \
                        <div class="media"> \
                            <div class="media-body" > \
                                ' + data + ' \
                            </div> \
                        </div> \
                    </div> \
                </li>';
    $('#mensagem').append(txt);
    $("#chatmsg").scrollTop(($("#chatmsg")[0].scrollHeight) + 100);
});

socket.on('chat message', function(msg) {
    var txt = '<li class="media" style="background: ' + msg.color + '"> \
                    <div class="media-body"> \
                        <div class="media"> \
                            <b>' + msg.nick + ':</b> \
                            <div class="media-body" > \
                                ' + msg.msn + ' \
                            </div> \
                        </div> \
                    </div> \
                </li>';
    $('#mensagem').append(txt);
    $("#chatmsg").scrollTop(($("#chatmsg")[0].scrollHeight) + 100);
});

socket.on('sound', function(data) {
    var audio = new Audio(data);
    audio.play();
});
