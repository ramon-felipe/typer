var corpoTabela = $(".placar").find("tbody");
var botaoSync = $("#botao-sync");
botaoSync.on("click", sincronizaPlacar);

function inserePlacar(){
	var numPalavras = $("#contador-palavras").text();
	var usuario = "Ramon";

	var linha = adicionaLinha(usuario, numPalavras);

	corpoTabela.append(linha);
	$(".placar").slideDown(1000);
	scrollPlacar();
}

function scrollPlacar(){
	var posicaoPlacar = $(".placar").offset().top;
	$("html, body").animate(
	{
		scrollTop: posicaoPlacar + "px"
	},1000);

	mostraPosicao();
}

function mostraPosicao(){
	var posicao = $("tbody tr:last-child");

	posicao.animate(
		{opacity: 0},800);
	posicao.animate(
		{opacity: 1},500);

	posicao.css("border", "2px dotted red").animate(
		{borderWidth: '0'},1000);
}

function adicionaLinha(usuario, numPalavras){
	var linha = $("<tr>");
	var celulaUsuario = $("<td>").text(usuario);
	var celulaPalavra = $("<td>").text(numPalavras);
	var celulaRemover = $("<td>");
	var link = $("<a>");
	var icone = $("<i>");

	linha.addClass("hoverable");
	link.addClass("botao-remover btn-flat");
	icone.addClass("material-icons red-text").text("delete");

	link.append(icone);
	celulaRemover.append(link);
	linha.append(celulaUsuario, celulaPalavra, celulaRemover);

	var btnRemover = linha.find(".botao-remover");
	btnRemover.click(removerLinha);

	return linha;
}

function removerLinha(){
	var linha = $(this).parents("tr");
	linha.fadeOut(500);

	setTimeout(function(){
		linha.remove();
	},1500);

}

$("#botao-placar").click(mostraPlacar);

function mostraPlacar(){
	$(".placar").stop().slideToggle(1000);
}

function sincronizaPlacar(){
	var placar = [];
	var linhas = corpoTabela.find("tr");

	console.log(linhas);

	linhas.each(function(){
		console.log(this);
		var usuario = $(this).find("td:nth-child(1)").text();
		console.log("Usuário: "+usuario);
	})


}
