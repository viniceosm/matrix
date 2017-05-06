var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;

server.listen(PORT,function(){
	console.log('Rodando na porta '+PORT+'...');
});

app.get('/', function(req, res){
	res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
	console.log('Um usuario conectado');
	connections.push(socket);

	socket.on('criarPontoPoligono', function(dados){
		io.emit('criarPontoPoligono', {x: dados.x, y: dados.y});
 	});
 	socket.on('criarPonto', function(dados){
		io.emit('criarPonto', {x: dados.x, y: dados.y});
 	});
});