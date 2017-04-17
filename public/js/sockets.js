var socket = io();

$('#setNick').submit(function(e){
    e.preventDefault();
    if($('#nickname').val() != ""){
        socket.emit('novo user', $('#nickname').val(), function(data){
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }
            else if (data =='full'){
                alert('asdasd');
            }
            else{
                $('#nickError').html('Esse utilizador ja foi usado, tente novamente');
            }
        });
    }

    $('#nickname').val('');
});

socket.on('usernames', function(data){
    var html = '';
    for(i=0; i < data.nicknames.length; i++){
        html += '<li class="media">\
                    <div class="media-body">\
                        <div class="media">\
                            <img class="pull-left" class="media-object img-circle" style="max-height:15px;" src="images/on.png" />\
                            <div class="media-body" >\
                                <h5 style="background-color: '+data.usedColors[i]+'">' + data.nicknames[i] + '</h5>\
                            </div>\
                        </div>\
                    </div>\
                </li>';
    }
    $('#user').html(html);
})

$('#bt').click(function(){
    $('#chatform').submit();
});

$('#chatform').submit(function(){
    if($('#mm').val() !=  ""){
        socket.emit('chat message', $('#mm').val());
        $('#mm').val('');
    }
    return false;
});

socket.on('chat message', function(msg){
    var txt = '<li class="media" style="background: ' + msg.color + '"> \
                    <div class="media-body"> \
                        <div class="media"> \
                            <b>' + msg.nick + ':</b> \
                            <div class="media-body" > \
                                ' + msg.msn + ' \
                                <hr /> \
                            </div> \
                        </div> \
                    </div> \
                </li>'
    $('#mensagem').append(txt);
    $("#chatmsg").scrollTop(($("#chatmsg")[0].scrollHeight)+100);
});

/*socket.on('disconnect', function(){
    alert('Pedimos desculpa, o servidor desconectou-se');
});*/
