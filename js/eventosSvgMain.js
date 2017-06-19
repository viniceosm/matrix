svg = SVG('svgmain');
document.getElementById('btnCarregarImagem').addEventListener("change", () =>{
	svg.image(URL.createObjectURL(event.target.files[0]), 500, 600).draggable();
});
document.getElementById('svgmain').onclick = function(evt){
	var x = evt.clientX;
	var y = evt.clientY - this.offsetTop;
	if (ferramantaSelecionada=="criarPontoPoligono") {
		let dados = {x, y};
		socket.emit('criarPontoPoligono', dados);
	}else if (ferramantaSelecionada=="criarPonto") {
		let dados = {x, y, poligonoSelecionadoSVG: poligonoSelecionadoSVG.node.id};
		socket.emit('criarPonto', dados);
	}
}
document.getElementById('svgmain').onmousedown = function(evt){
	var x = evt.clientX;
	var y = evt.clientY - this.offsetTop;
	if (ferramantaSelecionada=="criarPontoCurvaPoligono") {
		// criarPontoCurvaPoligono(x, y);
		let dados = {x, y};
		socket.emit('criarPontoCurvaPoligono', dados);
	}else if(ferramantaSelecionada=="criarPontoCurva"){
		// criarPontoCurva(x, y, "mousedown");
		let dados = {x, y, nomeEventoMouse: "mousedown", poligonoSelecionadoSVG: poligonoSelecionadoSVG.node.id};
		socket.emit('criarPontoCurva', dados);
	}
	mousePressionado = true;
}
document.getElementById('svgmain').onmousemove = function(evt){
	if(mousePressionado){
		var x = evt.clientX;
		var y = evt.clientY - this.offsetTop;
		if (ferramantaSelecionada=="criarPontoCurva") {
			// criarPontoCurva(x, y, "mousedown");
			let dados = {x, y, nomeEventoMouse: "mousedown", poligonoSelecionadoSVG: poligonoSelecionadoSVG.node.id};
			socket.emit('criarPontoCurva', dados);
		}
	}
}
document.getElementById('svgmain').onmouseup = function(evt){
	var x = evt.clientX;
	var y = evt.clientY - this.offsetTop;
	if (ferramantaSelecionada=="criarPontoCurva") {
		// criarPontoCurva(x, y, "mouseup");
		let dados = {x, y, nomeEventoMouse: "mouseup", poligonoSelecionadoSVG: poligonoSelecionadoSVG.node.id};
		socket.emit('criarPontoCurva', dados);
	}
	mousePressionado=false;
}
