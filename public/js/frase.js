var tempoInicial;
var botaoFrase = $("#botao-frase");
var botaoFraseId = $("#botao-frase-id");
var loader = $("#loading")
var frase = $(".frase");
var qtdCaracteres = $("#quantidade-caracteres");
var tamanhoFrase = $("#tamanho-frase");
var tempo = $("#tempo-digitacao");
var erro = $("#erro");
var span = $("<span>");

botaoFrase.click(fraseAleatoria);
botaoFraseId.click(buscaFrase);

function fraseAleatoria(){
	frase.hide();
	erro.fadeOut();
	loader.fadeIn(1000);

	$.get("http://localhost:3000/frases", trocaFrase)
	//fail será executada sempre que der erro na requisição
	.fail(function(){
		erro.fadeIn();
	})
	.done(function(){
		frase.fadeIn();
	})
	//always será executada independente do resultado da requisição
	.always(function(){
		loader.hide();
		frase.fadeIn();
	});
}

function trocaFrase(data){
	var qtdFrases = data.length;
	var indice = Math.round(Math.random() * qtdFrases);
	var novaFrase = data[indice].texto;
	var novoTempo = data[indice].tempo;
	

	frase.text(novaFrase);
	span.text(" (Frase ID: " + indice + ")");
	frase.append(span);
	tempo.text(novoTempo);
	qtdCaracteres.text(novaFrase.length);
	tempoInicial = novoTempo;

	reiniciaJogo();
	atualizaTamanhoFrase();
	inicializaCronometro();
}

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;

	qtdCaracteres.text(frase.length);
	tamanhoFrase.text(numPalavras);
}

function buscaFrase(){
	var fraseId = $("#frase-id").val();
	var dados = { id: fraseId};

	frase.hide();
	erro.fadeOut();
	loader.fadeIn(1000);
	$.get("http://localhost:3000/frases", dados, trocaFraseSelecionada)
	//fail será executada sempre que der erro na requisição
	.fail(function(){
		erro.fadeIn();
	})
	.done(function(){
		frase.fadeIn();
	})
	//always será executada independente do resultado da requisição
	.always(function(){
		loader.hide();
	});
}

function trocaFraseSelecionada(data){
	var novaFrase = data.texto;
	var novoTempo = data.tempo;
	
	frase.text(novaFrase);
	tempo.text(novoTempo);
	qtdCaracteres.text(novaFrase.length);
	tempoInicial = novoTempo;

	reiniciaJogo();
	atualizaTamanhoFrase();
	inicializaCronometro();
}