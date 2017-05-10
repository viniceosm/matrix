var ContPoligono = 0;
var pontos, idElementoSelecionado;
var svg, poligonoSelecionado, poligonoSelecionadoSVG;
var pontoSelecionado;
var ferramantaSelecionada;
var mousePressionado=false;
var pegarPoligono;
var pontoSelecionadoVetor;


window.onload = function () {
	//Eventos elementos click
	document.getElementById('criarPontoPoligono').addEventListener("click", funcaoCriarPontoPoligono);
	document.getElementById('criarPontoCurvaPoligono').addEventListener("click", funcaoCriarPontoCurvaPoligono);
	document.getElementById('moverPoligono').addEventListener("click", funcaoMoverPoligono);
	document.getElementById('deletar').addEventListener("click", deletar);
	document.getElementById('carregarImagem').addEventListener("click", funcaoCarregaImagem);
	var coresSub = document.getElementsByClassName('coresSub');
	for(var i=0;i<coresSub.length;i++){
		coresSub[i].addEventListener("click", pintar);
	};
	
	$( function() {
		$( "#ferramentas" ).draggable();
	} );
	$( function() {
		$( "#cores" ).draggable();
	} );
	$( function() {
		$( "#pontoVetores" ).draggable();
	} );
	
	//Atalhos
	document.onkeydown = function(){
		var tecla = event.keyCode;
		if(tecla==67){ //C
			funcaoCriarPontoCurvaPoligono();
		}else if(tecla==82){ //R
			funcaoCriarPontoPoligono();
		}else if(tecla==68){ //D
			deletar();
		}else if(tecla==77){ //M
			funcaoMoverPoligono();
		}else if(tecla==73){ //I
			funcaoCarregaImagem();
		}
	};

	document.addEventListener('click', function(e) {
    	e = e || window.event;
    	var target = e.target || e.srcElement,
        poligonoSelecionadoSVG = target.getElementById;
	}, false);
	
	svg = SVG('svgmain');
	document.getElementById('btnCarregarImagem').addEventListener("change", () =>{
		svg.image(URL.createObjectURL(event.target.files[0]), 200, 300).draggable();
	});
	document.getElementById('svgmain').onclick = function(evt){
		var x = evt.clientX;
		var y = evt.clientY - this.offsetTop;
		if (ferramantaSelecionada=="criarPontoPoligono") {
			criarPontoPoligono(x, y);
		}else if (ferramantaSelecionada=="criarPonto") {
			criarPonto(x, y);
		}
	}
	document.getElementById('svgmain').onmousedown = function(evt){
		var x = evt.clientX;
		var y = evt.clientY - this.offsetTop;
		if (ferramantaSelecionada=="criarPontoCurvaPoligono") {
			criarPontoCurvaPoligono(x, y);
		}else if(ferramantaSelecionada=="criarPontoCurva"){
			criarPontoCurva(x, y, "mousedown");
		}
		mousePressionado = true;
	}
	document.getElementById('svgmain').onmousemove = function(evt){
		if(mousePressionado){
			var x = evt.clientX;
			var y = evt.clientY - this.offsetTop;
			if (ferramantaSelecionada=="criarPontoCurva") {
				criarPontoCurva(x, y, "mouseup");
			}
		}
	}
	document.getElementById('svgmain').onmouseup = function(evt){
		var x = evt.clientX;
		var y = evt.clientY - this.offsetTop;
		if (ferramantaSelecionada=="criarPontoCurva") {
			criarPontoCurva(x, y, "mouseup");
		}
		mousePressionado=false;
	}
}
function deletar(){
	poligonoSelecionado.outerHTML = "";
	poligonoSelecionadoSVG.outerHTML = "";
	document.getElementById("camada_pontos").innerHTML = '';
	document.getElementById('pontoSelecionadoVetor').outerHTML = "";
}

function pintar(){
	console.log(poligonoSelecionadoSVG);
	poligonoSelecionadoSVG.fill(this.style.backgroundColor);
	
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
	console.log(poligonoSelecionadoSVG);
}
function funcaoCriarPontoCurvaPoligono(){
	ferramantaSelecionada="criarPontoCurvaPoligono";
}
function funcaoCarregaImagem(){
	//simula o click do input type="file"
	document.getElementById('btnCarregarImagem').click();
}
//Cria poligono e ponto
function criarPontoPoligono(x, y) {
	var poligono = svg.polygon(x+','+y).fill('none').stroke({
		width: 1
	}).fill('white');
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	//poligono.node.onclick = pegadoSaPorra(this);
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		pegadoSaPorra(poligono);
		ferramantaSelecionada = '';
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

function pegadoSaPorra(event)
{
    poligonoSelecionadoSVG = event;
}

//Cria path e ponto com curva
function criarPontoCurvaPoligono(x, y){
	var poligono = svg.path('M '+x+' '+y).fill('none').stroke({
		width: 1
	});
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	
	document.getElementById(poligono.node.id).addEventListener('click', funcaoSelecionarPoligono, false);
	ferramantaSelecionada = "criarPontoCurva";
	ContPoligono++;
}
//Selecionar poligono
function funcaoSelecionarPoligono(){
	poligonoSelecionado = this;
	poligonoSelecionadoSVG = this;
	console.log(poligonoSelecionado);
	ferramantaSelecionada = "";
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
		var ultimoPontoPath = pontosPath[pontosPath.length-1].toString().split(',')
		ultimoPontoPath[1] = x;
		ultimoPontoPath[2] = y;
		pontosPath[pontosPath.length-1] = ultimoPontoPath.join(',');
		
		console.log(pontosPath.join(','));

		poligonoSelecionadoSVG.plot(pontosPath.join(','));
	}
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
	pontoSelecionadoVetor = circle;
}

//atualiza posicao pontoPoligonoNele
//é chamado no svg.draggable.js quando arrasta poligono
function atualizaPontoPoligonoNele(elemento){
	mostrarPontosPoligono();

	if(pontoSelecionado == null || typeof pontoSelecionadoVetor == undefined){
		pontoSelecionado = 0;
	}
	inputsPonto = document.querySelectorAll('[data-ponto_' + pontoSelecionado + ']');

	if(inputsPonto.length>0){
		xPonto = parseInt(inputsPonto[0].value);
		yPonto = parseInt(inputsPonto[1].value);

		if(document.getElementById('pontoSelecionadoVetor')) {
			pontoSelecionadoVetor.x(xPonto-2);
			pontoSelecionadoVetor.y(yPonto-2);
		}
	}
}



function setTextColor(picker) {
	document.getElementById("bottonCor").style.backgroundColor = '#' + picker.toString();
	document.getElementById("textoCores").style.backgroundColor = '#' + picker.toString();
}

function aplicarPontos(indicePonto) {
	inputsPonto = document.querySelectorAll('[data-ponto_' + indicePonto + ']');

	pontos[indicePonto] = inputsPonto[0].value + ',' + inputsPonto[1].value;
	poligonoSelecionadoSVG.plot(pontos.join(" "));

	mostrarPontoPoligonoNele(indicePonto);
}