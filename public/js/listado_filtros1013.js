var arraytematica = new Array();
var arraycontenido = new Array();
var arraylisttematica = new Array();

/* $(window).load(function () {
	$(function () {
		var inicio = new Date();
		inicio.setDate(new Date().getDate() + 0);
		inicio.setHours(inicio.getHours() + 24);
		$('input[name="textfecha"]')
			.daterangepicker({
				autoUpdateInput: true,
				parentEl: ".scroll-fix",
				singleDatePicker: true,
				autoApply: true,
				minDate: inicio,
				showCustomRangeLabel: false,
				locale: {
					format: "DD-MM-YYYY",
				},
			})
			.on("apply.daterangepicker", function (ev, picker) {
				var fecha_inicio = picker.startDate.format("YYYY/MM/DD");
				var num_dias = $("#num_dias").val();
				$.get(
					base_url + "sesionescontrol/set_fecha_inicio/" + fecha_inicio,
					function (result) {
						//location.reload();
					}
				);
			});
	});
	$filtrado = $("#option_filtro").val();
	if ($filtrado == 0) {
		//$("#bd-example-modal-xl").modal("show");
	}
}); */

$(".btn_search").on("click", function (e) {
	e.preventDefault();
	var distrito = $("#destino").val();
	var tipo = $("#alojamiento").val();
	var url = "";

	if (distrito === "") {
		url = base_url + "alojamientos";
	} else if (tipo === "") {
		url = base_url + "alojamientos/" + distrito;
	} else {
		url = base_url + "alojamientos/" + distrito + "/" + tipo;
	}
	window.location.href = url;
});

$(".listing_tipo").on("ifChanged", function (event) {
	if (
		$("#valorDestino").val() == "" ||
		$("#valorDestino").val() == "Seleccionar"
	) {
		var destino = "";
	} else {
		var destino = $("#valorDestino").val();
	}
	if ($("input:radio[name=listing_tipo]:checked").val() != undefined) {
		if ($("input:radio[name=listing_tipo]:checked").val() == "tours") {
			window.location.href = base_url + "tours";
		} else {
			window.location.href = base_url + "paquetes";
		}
	}
});

$(".listing_categorias").on("ifChanged", function (event) {
	var categoria = $(this).val();
	if (
		$("#valorDestino").val() == "" ||
		$("#valorDestino").val() == "Seleccionar"
	) {
		var destino = "";
	} else {
		var destino = "/" + $("#valorDestino").val() + "/";
	}
	if ($("input:radio[name=listing_tipo]:checked").val() != undefined) {
		if ($("input:radio[name=listing_tipo]:checked").val() == "tours") {
			window.location.href = base_url + "tours" + destino + "?cat=" + categoria;
		} else {
			window.location.href =
				base_url + "paquetes" + destino + "?cat=" + categoria;
		}
	}
});

$(".listing_tipo2").on("ifChanged", function () {
	var dias = $("input:radio[name=listing_tipo2]:checked").val();
	if ($("input:radio[name=listing_tipo2]:checked").val() != undefined) {
		window.location.href = dias;
	}
});

function ordenar() {
	"use strict";
	var orden = $("input:radio[name=listing_orden]:checked").val();
	$.ajax({
		type: "POST",
		data: { orden: orden },
		url: base_url + "filtros/ordena",
		error: function (xhr, error, response) {
			alert(response + " " + error + xhr);
		},
		success: function () {
			//alert(response);
			location.reload();
		},
	});
}

function number_format(amount, decimals) {
	amount += "";
	amount = parseFloat(amount.replace(/[^0-9\.]/g, ""));

	decimals = decimals || 0;

	// si es mayor o menor que cero retorno el valor formateado como numero
	amount = "" + amount.toFixed(decimals);

	var amount_parts = amount.split("."),
		regexp = /(\d+)(\d{3})/;

	while (regexp.test(amount_parts[0]))
		amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

	if (isFloat(amount)) {
		return amount_parts.join(".");
	} else {
		return amount_parts[0];
	}
}

function isFloat(n) {
	return n % 1 != 0;
}

function titulojs(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

$("#buscador_listados").select2({
	placeholder: "Buscar por nombre",
	tags: true,
});

$("#buscador_listados_aloja").select2({
	placeholder: "Buscar por nombre",
	tags: true,
});
