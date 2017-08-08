var ContPoligono = 0;
var pontos, idElementoSelecionado;
var svg, poligonoSelecionado, poligonoSelecionadoSVG;
var pontoSelecionado;
var ferramantaSelecionada;
var mousePressionado=false;
var pegarPoligono;
var pontoSelecionadoVetor;

//testando git
window.onload = function () {
	//Eventos elementos click
	document.getElementById('criarPontoPoligono').addEventListener("click", funcaoCriarPontoPoligono);
	document.getElementById('criarPontoCurvaPoligono').addEventListener("click", funcaoCriarPontoCurvaPoligono);
	document.getElementById('moverPoligono').addEventListener("click", funcaoMoverPoligono);
	document.getElementById('deletar').addEventListener("click", deletar);
	document.getElementById('carregarImagem').addEventListener("click", funcaoCarregaImagem);
	document.getElementById('bottonCorParente').addEventListener("click", pintar);
	document.getElementById('bottonCorParente2').addEventListener("click", pintar2);
	document.getElementById('btnPintarFundo').addEventListener("click", pintar);
	document.getElementById('btnPintarContorno').addEventListener("click", pintarContorno);
	document.getElementById('criarPreTriangulo').addEventListener("click", criarPreTriangulo);
	document.getElementById('criarPreQuadado').addEventListener("click", criarPreQuadado);
	document.getElementById('adicionarPonto').addEventListener("click", funcaoAdicionaPonto);

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


}

function corTransparente(){
	var aux = poligonoSelecionado;
	var aux2 = poligonoSelecionadoSVG;
	console.log(aux);
	poligonoSelecionado.style.fill="green";
	poligonoSelecionado = aux;
	poligonoSelecionadoSVG = aux2;
	console.log(poligonoSelecionado);
}

function deletar(){
	poligonoSelecionado.outerHTML = "";
	poligonoSelecionadoSVG.outerHTML = "";
	document.getElementById("camada_pontos").innerHTML = '';
	document.getElementById('pontoSelecionadoVetor').outerHTML = "";
}

function pintar(){
	poligonoSelecionado.style.color = (document.getElementById('textoCores').style.backgroundColor);
	poligonoSelecionadoSVG.fill(document.getElementById('textoCores').style.backgroundColor);
}

function pintarContorno(){
	poligonoSelecionadoSVG.stroke(document.getElementById('textoCores').style.backgroundColor);
}

function pintar2(){
	poligonoSelecionadoSVG.fill("none");
}

function desmarcarPoligono(){
	poligonoSelecionado=null;
	poligonoSelecionadoSVG=null;
}

function funcaoCriarPontoPoligono(){
	poligonoSelecionadoSVG = null;
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
function funcaoAdicionaPonto(){
	if(poligonoSelecionadoSVG != null){
		ferramantaSelecionada = "criarPonto";
	}
}
function selecionarPoligono(event){
	poligonoSelecionadoSVG = event;
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

			document.getElementById("camada_pontos").innerHTML += `
				<div class="linha-ponto" id="linha-ponto_${i}"
					onclick="mostrarPontoPoligonoNele(${i})">
					Ponto_${i}<br>
					<input type="number"
					data-ponto_${i}
					oninput="aplicarPontos(${i})"
					style="width:40px"
					value="${x}"/>

					<input type="number"
					data-ponto_${i} +
					oninput="aplicarPontos(${i})"
					style="width:40px"
					value="${y}"/>
				</div> `;
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
	document.getElementById("textoCores").style.backgroundColor = '#' + picker.toString();
}

function aplicarPontos(indicePonto) {
	inputsPonto = document.querySelectorAll('[data-ponto_' + indicePonto + ']');

	pontos[indicePonto] = inputsPonto[0].value + ',' + inputsPonto[1].value;
	poligonoSelecionadoSVG.plot(pontos.join(" "));

	mostrarPontoPoligonoNele(indicePonto);
}

//Altera atributos que todos os poligonos usam, passando uma função para onclick
function alteraAtributosGenericosPoligono(poligono, fOnClick){
	poligono.node.id = 'poligono_' + ContPoligono;
	poligono.node.setAttributeNS(null, 'class', 'draggable');
	poligono.draggable();
	poligonoSelecionadoSVG = poligono;
	document.getElementById(poligono.node.id).addEventListener('click', mostrarPontosPoligono, false);
	document.getElementById(poligono.node.id).addEventListener('click', function(){
		fOnClick();
	},false);
	ContPoligono++;
}
