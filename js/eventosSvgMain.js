svg = SVG('svgmain');
document.getElementById('btnCarregarImagem').addEventListener("change", () =>{
	svg.image(URL.createObjectURL(event.target.files[0]), 500, 600).draggable();
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
			criarPontoCurva(x, y, "mousedown");
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