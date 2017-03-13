var ContPoligono = 0;
var pontos, idElementoSelecionado;
var svg, poligonoSelecionado, poligonoSelecionadoSVG;
var pontoSelecionado;
var ferramantaSelecionada;

window.onload = function () {
	//Eventos elementos click
	document.getElementById('adicionarPoligono').addEventListener("click", adicionarPoligono);
	document.getElementById('criarPontoPoligono').addEventListener("click", funcaoCriarPontoPoligono);
	document.getElementById('criarPontoCurvaPoligono').addEventListener("click", funcaoCriarPontoCurvaPoligono);
	document.getElementById('moverPoligono').addEventListener("click", funcaoMoverPoligono);

	svg = SVG('svgmain');
	document.getElementById('svgmain').onclick = function(evt){
		var x = evt.clientX;
		var y = evt.clientY - this.offsetTop;
		if (ferramantaSelecionada=="criarPontoPoligono") {
			criarPontoPoligono(x, y);
		}else if (ferramantaSelecionada=="criarPonto") {
			criarPonto(x, y);
		}else if (ferramantaSelecionada=="criarPontoCurvaPoligono") {
			criarPontoCurvaPoligono(x, y, evt);
		}
	}
}

function desmarcarPoligono(){
	poligonoSelecionado=null;
	poligonoSelecionadoSVG=null;
}

function funcaoCriarPontoPoligono(){
	ferramantaSelecionada = "criarPontoPoligono";
}
function funcaoMoverPoligono(){
	desmarcarPoligono();
	ferramantaSelecionada="mover";
}
function funcaoCriarPontoCurvaPoligono(){
	ferramantaSelecionada="criarPontoCurvaPoligono";
}

function adicionarPoligono() {
	var poligono = svg.polygon('0,0 100,50 50,100').fill('black').stroke({
		width: 1
	}).x(150).y(150);
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	ContPoligono++;
}

//Cria poligono e ponto
function criarPontoPoligono(x, y) {
	var poligono = svg.polygon(x+','+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	ContPoligono++;
	ferramantaSelecionada = "criarPonto";
	mostrarPontosPoligono();
}

//Adiciona ponto de um poligono ja selecionado
function criarPonto(x, y){
	poligonoSelecionadoSVG.plot(poligonoSelecionadoSVG.plot().toString()+' '+x+','+y);
	mostrarPontosPoligono();
}

//Cria path e ponto com curva
function criarPontoCurvaPoligono(x, y, evt){
	console.log("asdasda");
	var poligono = svg.path('M '+x+' '+y).fill('black').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	ContPoligono++;
}

function mostrarPontosPoligono() {
	if(this == window){
		poligonoSelecionado = poligonoSelecionadoSVG.node;
	}else{
		poligonoSelecionado = this;
		poligonoSelecionadoSVG = this;
	}
	if (poligonoSelecionado.getAttributeNS(null, 'points')) {
		pontos = poligonoSelecionado.getAttributeNS(null, 'points').split(' ');

		document.getElementById("camada_pontos").innerHTML = "";
		for (var i = 0; i < pontos.length; i++) {
			x = pontos[i].split(",")[0];
			y = pontos[i].split(",")[1];

			document.getElementById("camada_pontos").innerHTML += '' +
				' <div class="linha-ponto" id="linha-ponto_' + i + '"' +
				' onclick="mostrarPontoPoligonoNele(' + i + ')"> ' +
				' Ponto_' + i + '<br>' +
				//iput do x
				' <input type="number" ' +
				' data-ponto_' + i + ' ' +
				' oninput="aplicarPontos(' + i + ')" ' +
				' style="width:40px" ' +
				' value="' + x + '"/> ' +

				//iput do y
				' <input type="number" ' +
				' data-ponto_' + i + ' ' +
				' oninput="aplicarPontos(' + i + ')" ' +
				' style="width:40px" ' +
				' value="' + y + '"/> ' +
				' </div> ';
		}
	}
	mostrarPontoPoligonoNele(poligonoSelecionadoSVG.plot().value.length-1);
}

function mostrarPontoPoligonoNele(indicePonto) {
	pontoSelecionado = indicePonto;
	inputsPonto = document.querySelectorAll('[data-ponto_' + indicePonto + ']');
	xPonto = parseInt(inputsPonto[0].value);
	yPonto = parseInt(inputsPonto[1].value);

	if (document.getElementById('pontoSelecionadoVetor')) {
		//exclui elemento
		document.getElementById('pontoSelecionadoVetor').outerHTML = "";
	}

	//adiciona elemento
	var circle = svg.circle(6);
	circle.x(xPonto-2);
	circle.y(yPonto-2);
	circle.fill('red');
	circle.node.id = 'pontoSelecionadoVetor';
	circle.node.setAttributeNS(null, 'class', 'draggable');
	circle.draggable();
}

function aplicarPontos(indicePonto) {
	inputsPonto = document.querySelectorAll('[data-ponto_' + indicePonto + ']');

	pontos[indicePonto] = inputsPonto[0].value + ',' + inputsPonto[1].value;
	poligonoSelecionadoSVG.plot(pontos.join(" "));

	mostrarPontoPoligonoNele(indicePonto);
}