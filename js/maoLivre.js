//Cria path e ponto com curva
function criarPontoCurvaPoligono(x, y, idUsuario){
	var poligono = svg.path('M '+x+' '+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	document.getElementById("camada_pontos").innerHTML = "";

	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		selecionarPoligono(poligono);
		ferramantaSelecionada = 'mover';
	},false);
	ContPoligono++;
	ferramantaSelecionada = "criarPontoCurva";
	poligonosSVG[poligono.node.id] = poligono;

	if(idUsuario == idUsuarioCliente){
		poligonoSelecionadoSVG = poligono;
		mostrarPontosPoligono();
	}
}

//Adiciona ponto com curva de um path
function criarPontoCurva(x, y, nomeEventoMouse, poligonoCriar, idUsuario){
	let poligonoEditar = poligonosSVG[poligonoCriar];
	if(idUsuario == idUsuarioCliente){
		poligonoEditar = poligonoSelecionadoSVG;
	}

	var pontosPath = poligonoEditar.plot().value;

	if(nomeEventoMouse=="mousedown"){
		var pontoPathNovo = pontosPath.toString()+' Q '+x+' '+y+' '+x+' '+y;

		poligonoEditar.plot(pontoPathNovo);
		// mostrarPontosPoligono();
	}else if(nomeEventoMouse=="mouseup"){
		var ultimoPontoPath = pontosPath[pontosPath.length-1].toString().split(',');

		ultimoPontoPath[1] = x;
		ultimoPontoPath[2] = y;

		pontosPath[pontosPath.length-1] = ultimoPontoPath.join(',');
		poligonoEditar.plot(pontosPath.join(','));
		//FAZ JOIN NOVAMENTE PARA TIRAR VIRGULA DUPLICADA
		pontosPath = poligonoEditar.plot().value;
		poligonoEditar.plot(pontosPath.join(','));
	}
}
