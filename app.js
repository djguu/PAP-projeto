var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Log = require('log'),
    log = new Log('debug');

var nicknames = [];
var colors = ['#99ccff','#66d9ff','#ccffcc','#ffff66'];
var usedColors = [];


var port = process.env.PORT || 666;

http.listen(port, function(){
    log.info('A escutar em <ip>:666');
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + "/public" ))


io.on('connection', function(socket){

	function updateNicknames(){
		io.emit('usernames', {nicknames : nicknames, usedColors: usedColors});
	};

	socket.on('novo user', function(data, callback){
		var tmp = nicknames.join('~').toLowerCase();
		var array = tmp.split('~');

		if(array.indexOf(data.toLowerCase()) != -1){
            io.emit('erro user', 'Esse utilizador ja foi usado, tente novamente');
			callback(false);
		}
		else if(nicknames.length < 4){
			callback(true);
			socket.nickname = data;
            var color = colors[Math.floor(Math.random() * colors.length)];
            if(usedColors.length == 0){
                socket.color = color;
                usedColors.push(socket.color);
            }
            else
            if(usedColors.length <= 4){
                var c = 0;
                while(c < usedColors.length && usedColors.length <= 4){
                    if(usedColors[c] != color){
                        if(c+1 == usedColors.length){
                            socket.color = color;
                            usedColors.push(socket.color);
                            break;
                        }
                        c++;
                    }
                    else
                    if(usedColors[c] == color){
                        color = colors[Math.floor(Math.random() * colors.length)];
                        c = 0;
                    }

                }
            }

			nicknames.push(socket.nickname);
			updateNicknames();
			log.info('Utilizador ', socket.nickname, ' [',clientIp,'] juntou-se ao chat');
            socket.broadcast.emit('sound', '/sounds/user.mp3');
		}
		else{
			io.emit('erro user', 'A sala está cheia, tente mais tarde');
		}
	});

	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
        log.info('Utilizador ',socket.nickname, ' saiu do chat');
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        usedColors.splice(usedColors.indexOf(socket.color), 1);
		updateNicknames();
	});


	 socket.on('chat message', function(msg){
         io.emit('chat message',{msn : msg, nick: socket.nickname, color: socket.color});
    	socket.broadcast.emit('sound', '/sounds/msg.mp3');
  	});


	// emite o ip do cliente que se esta a ligar
    var clientIp = socket.request.connection.remoteAddress;
        clientIp = clientIp.replace(/^.*:/, '');

});
