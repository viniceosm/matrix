//Cria poligono e ponto
function criarPontoPoligono(x, y) {
	var poligono = svg.polygon(x+','+y).fill('none').stroke({
		width: 1
	});

	alteraAtributosGenericosPoligono(poligono, function(){
		if(ferramantaSelecionada = "moverPoligono"){
			selecionarPoligono(poligono);
		};
	});

	ferramantaSelecionada = "criarPonto";
	mostrarPontosPoligono();
}

//Adiciona ponto de um poligono ja selecionado
function criarPonto(x, y){
	poligonoSelecionadoSVG.plot(poligonoSelecionadoSVG.plot().toString()+' '+x+','+y);
	mostrarPontosPoligono();
}
