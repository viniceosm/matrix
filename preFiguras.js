//Cria pré figura triangulo
function criarPreTriangulo(){
	var poligono = svg.polygon('140,140 210,140 175,100').fill('none').stroke({
		width: 1
	});

	alteraAtributosGenericosPoligono(poligono, function(){
		if(ferramantaSelecionada = "moverPoligono"){
			selecionarPoligono(poligono);
		}
	});

	mostrarPontosPoligono();
}
