var campo = $(".campo-digitacao");
var botaoReiniciar = $("#botao-reiniciar");
var tempoDigitacao = $("#tempo-digitacao");

$(document).ready(function(){
	$('#usuarios').selectize({
    create: true,
    sortField: 'text'
	});
	$('#botao-sync').tooltipster({
		theme: 'tooltipster-light',
		animation: 'swing',
		delay: 100,
		animationDuration: 500,
		trigger: 'custom'
	});

	fraseAleatoria();
	inicializaContadores();
	inicializaMarcadores();
	botaoReiniciar.on("click", reiniciaJogo);
	atualizaPlacar();
});

function inicializaCronometro(){
	var tempoRestante = tempoInicial;

	campo.one("keypress", function(){
		var cronometroId = setInterval(function(){
			tempoRestante--;
			tempoDigitacao.text(tempoRestante);

			if(tempoRestante <= 0){
				clearInterval(cronometroId);

				finalizaJogo();
			}
		}, "1000");
	});
}

function inicializaContadores(){
	campo.on("input", function(){
		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\s+\w/).length;
		var qtdCaracteres = conteudo.length;

		$("#contador-palavras").text(qtdPalavras);
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaMarcadores(){
	campo.on("input", function(){
		var digitado = campo.val();
		var frase = $(".frase").text();
		var comparavel = frase.substr(0, digitado.length);

		if(digitado.length > 0){
			if (digitado == comparavel) {
				campo.addClass("campo-correto");
				campo.removeClass("campo-incorreto");
			}
			else{
				campo.removeClass("campo-correto");
				campo.addClass("campo-incorreto");
			}
		}
		else{
			campo.removeClass("campo-correto");
			campo.removeClass("campo-incorreto");
		}
	});
}

function reiniciaJogo(){
	if (!botaoReiniciar.attr("disabled")) {
		limpaCampos();
		inicializaCronometro();
		scrollPage();
	}
}

function finalizaJogo(){
	campo.attr("disabled", true);
	botaoReiniciar.removeClass("disabled");
	botaoReiniciar.attr("disabled", false);
	inserePlacar();
}

function limpaCampos(){
	botaoReiniciar.addClass("disabled");
	botaoReiniciar.attr("disabled", true);
	campo.attr("disabled", false);
	campo.val("");
	tempoDigitacao.text(tempoInicial);
	tempoRestante = tempoInicial;

	campo.removeClass("campo-correto");
	campo.removeClass("campo-incorreto");

	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
}

function scrollPage(){
	$("html, body").animate(
		{scrollTop: "0px"},500
	);
}

var fecharChip = $("#erro .close");
fecharChip.on("click", function(){

	$(this).parents("#erro").fadeOut();
});
