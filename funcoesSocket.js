var socket = io.connect();

socket.on('criarPontoPoligono', function(dados){
	criarPontoPoligono(dados.x, dados.y);
});
socket.on('criarPonto', function(dados){
	criarPonto(dados.x, dados.y);
});