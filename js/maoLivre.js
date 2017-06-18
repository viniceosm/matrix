//Cria path e ponto com curva
function criarPontoCurvaPoligono(x, y){
	var poligono = svg.path('M '+x+' '+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById("camada_pontos").innerHTML = "";
	
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		selecionarPoligono(poligono);
		ferramantaSelecionada = 'mover';
	},false);
	ContPoligono++;
	ferramantaSelecionada = "criarPontoCurva";
	mostrarPontosPoligono();
	
}

//Adiciona ponto com curva de um path
function criarPontoCurva(x, y, nomeEventoMouse){
	var pontosPath = poligonoSelecionadoSVG.plot().value;

	if(nomeEventoMouse=="mousedown"){
		var pontoPathNovo = pontosPath.toString()+' Q '+x+' '+y+' '+x+' '+y;

		poligonoSelecionadoSVG.plot(pontoPathNovo);
		mostrarPontosPoligono();
	}else if(nomeEventoMouse=="mouseup"){
		var ultimoPontoPath = pontosPath[pontosPath.length-1].toString().split(',');
		
		ultimoPontoPath[1] = x;
		ultimoPontoPath[2] = y;

		pontosPath[pontosPath.length-1] = ultimoPontoPath.join(',');
		poligonoSelecionadoSVG.plot(pontosPath.join(','));
		//FAZ JOIN NOVAMENTE PARA TIRAR VIRGULA DUPLICADA
		pontosPath = poligonoSelecionadoSVG.plot().value;
		poligonoSelecionadoSVG.plot(pontosPath.join(','));
	}
}