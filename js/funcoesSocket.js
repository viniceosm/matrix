var socket = io();
var idUsuarioCliente;

socket.on('conectou', (idUsuario) => {
  idUsuarioCliente = idUsuario;
});

socket.on('criarPontoPoligono', (dados) => {
  criarPontoPoligono(dados.x, dados.y, dados.idUsuario);
});

socket.on('criarPonto', (dados) => {
  criarPonto(dados.x, dados.y, dados.poligonoSelecionadoSVG, dados.idUsuario);
});

socket.on('criarPontoCurvaPoligono', (dados) => {
  criarPontoCurvaPoligono(dados.x, dados.y, dados.idUsuario);
});

socket.on('criarPontoCurva', (dados) => {
  criarPontoCurva(dados.x, dados.y, dados.nomeEventoMouse, dados.poligonoSelecionadoSVG, dados.idUsuario);
});

socket.on('pintar', (dados) => {
  pintar(dados.cor, dados.poligonoSelecionadoSVG);
});

socket.on('moverPoligono', (dados) => {
  moverPoligonoRetorno(dados);
});
