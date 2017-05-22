var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Log = require('log'),
    log = new Log('debug');

var nicknames = [];
var colors = ['#99ccff','#66d9ff','#ccffcc','#ffff66'];
var usedColors = [];


var port = process.env.PORT || 666; //responsavel pela porta usada pelo site

//O servidor escuta para a porta indicada
http.listen(port, function(){
    log.info('A escutar em <ip>:666');
});

//Indica a pagina inicial
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

//Indica a pasta a ser utilizada pelo website
app.use(express.static(__dirname + "/public" ))

//espera por uma coneção de um utilizador
io.on('connection', function(socket){

    //atualiza a lista de utilizadores no site
	function updateNicknames(){
		io.emit('usernames', {nicknames : nicknames, usedColors: usedColors});
	};

    //trata da entrada de utilizadores no site
	socket.on('novo user', function(data, callback){ //espera por um evento de novo utilizador

        //cria um array temporario com os nomes em lowerCase
		var tmp = nicknames.join('~').toLowerCase();
		var array = tmp.split('~');

        //verifica se o utilizador ja existe dentro da sala
		if(array.indexOf(data.toLowerCase()) != -1){
            io.emit('erro user', 'Esse utilizador ja foi usado, tente novamente');
			callback(false);
		}
		else if(nicknames.length < 4){ //define o limite de utilizadores no site
			callback(true);
			socket.nickname = data;
            var color = colors[Math.floor(Math.random() * colors.length)];
            if(usedColors.length == 0){
                socket.color = color;
                usedColors.push(socket.color);
            }
            else
            if(usedColor.length <= 4){ //define o limite de cores no site
                var c = 0;
                while(c < usedColors.length && usedColors.length <= 4){
                    if(usedColors[c] != color){
                        if(c+1 == usedColors.length){
                            socket.color = color;
                            usedColors.push(socket.color);
                            io.emit('status user', 'O utilizador '+socket.nickname+' juntou-se ao chat');
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

    //é ativo quando o utilizador sai da pagina.
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
        log.info('Utilizador ',socket.nickname, ' saiu do chat');
        io.emit('status user', 'O utilizador '+socket.nickname+' saiu do chat');
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        usedColors.splice(usedColors.indexOf(socket.color), 1);
		updateNicknames();
	});

    //espera pelo evento de envio de mensagens
	 socket.on('chat message', function(msg){
        msg = msg.replace(/(www\..+?)(\s|$)/g, function(text, link) {
           return '<a href="http://'+ link +'" target="_blank">'+ link +'</a>';
        })
        io.emit('chat message',{msn : msg, nick: socket.nickname, color: socket.color});
    	socket.broadcast.emit('sound', '/sounds/msg.mp3');
  	});


	// emite o ip do cliente que se esta a ligar
    var clientIp = socket.request.connection.remoteAddress;
        clientIp = clientIp.replace(/^.*:/, '');

});
