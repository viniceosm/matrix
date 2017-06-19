//Cria poligono e ponto
function criarPontoPoligono(x, y, idUsuario) {

	var poligono = svg.polygon(x+','+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	//poligono.node.onclick = selecionarPoligono(this);
	poligono.draggable();
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		if(ferramantaSelecionada = "moverPoligono"){
			selecionarPoligono(poligono);
		}

	},false);
	ContPoligono++;
	ferramantaSelecionada = "criarPonto";
	poligonosSVG[poligono.node.id] = poligono;

	if(idUsuario == idUsuarioCliente){
		poligonoSelecionadoSVG = poligono;
		mostrarPontosPoligono();
	}
}

//Adiciona ponto de um poligono ja selecionado
function criarPonto(x, y, poligonoCriar, idUsuario){
	let poligonoEditar = poligonosSVG[poligonoCriar];
	if(idUsuario == idUsuarioCliente){
		poligonoEditar = poligonoSelecionadoSVG;
	}

	poligonoEditar.plot(poligonoEditar.plot().toString()+' '+x+','+y);;

	if(idUsuario == idUsuarioCliente){
		mostrarPontosPoligono();
	}
}
