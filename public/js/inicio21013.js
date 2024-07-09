// Variables array globales

/* $("#actividad").change(function (event) {
	event.preventDefault();
	var actividad = $("#actividad").val();
	if (actividad === "alojamientos") {
		$(".alojamiento").removeClass("disabled");
	} else {
		$(".alojamiento").addClass("disabled");
	}
}); */

$(".btn_search").on("click", function (e) {
	e.preventDefault();
	//var actividad = $("#actividad").val();
	var distrito = $("#destino").val();
	var fechas = $("#fechas").val();
	if (fechas !== "") {
		fechas = fechas.replace(/\s+/g, "");
	}

	var participantes = $("#participantes").val();
	var url = "";
	if (distrito === "") {
		url = base_url + "paquetes";
	} else {
		url =
			base_url +
			"buscador/?fuente=home&destino=" +
			distrito +
			"&fechas=" +
			fechas +
			"&participantes=" +
			participantes;
	}
	window.location.href = url;
});

/*   $(document).ready(function(){
		$("#txtbusca").keyup(function(){
			var parametros='parametros='+$(this).val();
			console.log(parametros);
			$.ajax({
				data:  parametros,
				url:   'salida',
				type:  'post',
					beforeSend: function () { },
					success:  function (response) {                 
						$(".salida").html(response);
				},
				error:function(){
							alert(response)
					}
				});
		})
}) */

$(function () {
	"use strict";
	$('input[name="dates"]').daterangepicker({
		autoApply: true,
		autoUpdateInput: false,
		minDate: new Date(),
		showCustomRangeLabel: false,
		locale: {
			format: "DD/MM/YYYY",
			customRangeLabel: "Personalizar",
			daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
			monthNames: [
				"Enero",
				"Febrero",
				"Marzo",
				"Abril",
				"Mayo",
				"Junio",
				"Julio",
				"Agosto",
				"Setiembre",
				"Octubre",
				"Noviembre",
				"Diciembre",
			],
		},
	});
	$('input[name="dates"]').on("apply.daterangepicker", function (ev, picker) {
		$(this).val(
			picker.startDate.format("DD-MM-YY") +
				" > " +
				picker.endDate.format("DD-MM-YY")
		);
	});
	$('input[name="dates"]').on("cancel.daterangepicker", function (ev, picker) {
		$(this).val("");
	});
});

function suscribir() {
	var email = $("#email").val();
	if (
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		)
	) {
		$.ajax({
			data: {
				email: $("#email").val(),
			},
			type: "POST",
			url: base_url + "suscripcion/suscribir",
			success: function (data) {
				if (data == "no existe") {
					var mensaje = document.getElementById("mensaje-confirmacion");
					mensaje.innerHTML =
						'<div class="alert alert-success" role="alert">Muchas gracias por suscribirte</div>';
					$("#mensaje-confirmacion").show("slow");
					setTimeout(() => {
						$("#mensaje-confirmacion").hide("slow");
					}, 4000);
					$("#email").val("");
				} else {
					var mensaje = document.getElementById("mensaje-confirmacion");
					mensaje.innerHTML =
						'<div class="alert alert-danger" role="alert">El Email ya se encuentra registrado</div>';
					$("#mensaje-confirmacion").show("slow");
					setTimeout(() => {
						$("#mensaje-confirmacion").hide("slow");
					}, 4000);
				}
			},
		});
	} else {
		var mensaje = document.getElementById("mensaje-confirmacion");
		mensaje.innerHTML =
			'<div class="alert alert-danger" role="alert">Ingrese un email válido</div>';
		$("#mensaje-confirmacion").show("slow");
		setTimeout(() => {
			$("#mensaje-confirmacion").hide("slow");
		}, 4000);
	}
}

$(document).ready(function () {
	$.ajax({
		url: base_url + "sesionescontrol/banner",
		type: "GET",
		success: function (result) {
			if (result == 0) {
				setTimeout(() => {
					//$("#popup_paquete").modal("show");
				}, "3000");
			}
		},
	});
});

/* $(document).ready(function () {
	setTimeout(() => {
		$(".custom-search-input-2").removeClass("d-none");
	}, "3000");
}); */
