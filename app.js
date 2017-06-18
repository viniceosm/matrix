const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/lib', express.static('lib'));

const PORT = 3000;
server.listen(PORT, ()=>{
  console.log(`Rodando na porta ${PORT}`);
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/index.html');
});
