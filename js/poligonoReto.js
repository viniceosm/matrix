//Cria poligono e ponto
function criarPontoPoligono(x, y) {
	
	var poligono = svg.polygon(x+','+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	//poligono.node.onclick = selecionarPoligono(this);
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		if(ferramantaSelecionada = "moverPoligono"){
			selecionarPoligono(poligono);
		}
		
	},false);
	ContPoligono++;
	ferramantaSelecionada = "criarPonto";
	mostrarPontosPoligono();
}

//Adiciona ponto de um poligono ja selecionado
function criarPonto(x, y){
	poligonoSelecionadoSVG.plot(poligonoSelecionadoSVG.plot().toString()+' '+x+','+y);
	mostrarPontosPoligono();
}