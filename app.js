const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var sessions = require('express-session');
var cookieParser = require('cookie-parser');
const KEY = 'nome-do-cuck';
const SECRET = 'deTantoUsarReferenciaEuVireiReferenciaxD';
var cookie = cookieParser(SECRET);
var store = new sessions.MemoryStore();

var usuarios = [];

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/lib', express.static('lib'));

app.use(cookie);

var sessionMiddleware = sessions({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store
});

app.use(sessionMiddleware);

const PORT = 3000;
server.listen(PORT, ()=>{
  console.log(`Rodando na porta ${PORT}...`);
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/view/index.html');
  conectarUsuario(req);
});

io.use(function(socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', (socket)=>{
  let session = socket.request.session;
  console.log(`Usuario ${session.idUsuario} conectado.`);
  socket.emit('conectou', session.idUsuario);

  //PoligonoReto
  socket.on('criarPontoPoligono', (dados) =>{
    criarPontoPoligono(socket, dados);
  });
  socket.on('criarPonto', (dados) =>{
    criarPonto(socket, dados);
  });
  //Mao livre
  socket.on('criarPontoCurvaPoligono', (dados) =>{
    criarPontoCurvaPoligono(socket, dados);
  });
  socket.on('criarPontoCurva', (dados) =>{
    criarPontoCurva(socket, dados);
  });
  //Ferramentas
  socket.on('pintar', (dados) =>{
    pintar(socket, dados);
  });
  socket.on('moverPoligono', (dados) =>{
    moverPoligono(socket, dados);
  });
});


const criarPontoPoligono = (socket, dados) => {
  let session = socket.request.session;
  dados.idUsuario = session.idUsuario;
  io.emit('criarPontoPoligono', dados);
}

const criarPonto = (socket, dados) => {
  let session = socket.request.session;
  dados.idUsuario = session.idUsuario;
  io.emit('criarPonto', dados);
}

const criarPontoCurvaPoligono = (socket, dados) => {
  let session = socket.request.session;
  dados.idUsuario = session.idUsuario;
  io.emit('criarPontoCurvaPoligono', dados);
}

const criarPontoCurva = (socket, dados) => {
  let session = socket.request.session;
  dados.idUsuario = session.idUsuario;
  io.emit('criarPontoCurva', dados);
}

const pintar = (socket, dados) => {
  socket.broadcast.emit('pintar', dados);
}

const moverPoligono = (socket, dados) => {
  socket.broadcast.emit('moverPoligono', dados);
};

const conectarUsuario = (req) =>{
  let session = req.session;
  if(!session.exist){
    session.exist = true;
    session.idUsuario = usuarios.length;
    usuarios.push({ idUsuario: session.idUsuario });
  }
}
