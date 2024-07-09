// JavaScript Document

//Add Favoritos
$("#add_wishlist").on("click", function (e) {
	e.preventDefault();
	var id_item = $("#id_item").val();
	$.ajax({
		type: "POST",
		data: { id_item: id_item, tipo: "tour" },
		url: base_url + "favoritos/agregar",
		error: function () {
			alert("Intentalo más tarde");
		},
		success: function (data) {
			var btn = document.getElementById("add_wishlist");
			if ($.trim(data) == "eliminado") {
				var contenido = '<i class="icon_heart"></i>&nbsp;Añadir a favoritos';
				document.getElementById("add_wishlist").innerHTML = contenido;
			} else if ($.trim(data) == "agregado") {
				var contenido =
					'<i class="icon_heart rojo"></i>&nbsp;Añadido a favoritos';
				document.getElementById("add_wishlist").innerHTML = contenido;
			} else {
				var contenido = data;
				document.getElementById("mensaje").innerHTML = contenido;
				$("#myModal").modal("show");
			}
		},
	});
});

$("#fecha_confirm").on("click", function (e) {
	e.preventDefault();
	var fecha_input = $("#textfecha").val();
	var partes = fecha_input.split("https://aventuras.pe/");
	var dia_select = partes[0];
	var today = new Date();
	var year = today.getFullYear();
	var mes = today.getMonth() + 1;
	var dia = today.getDate() + 1;
	var dia_sel = partes[0];
	var mes_sel = partes[1];
	var anio_sel = partes[2];
	var fecha_seleccionada = new Date(anio_sel + "/" + mes_sel + "/" + dia_sel);
	var fecha = year + "/" + mes + "/" + dia;
	var fecha_default = new Date(fecha);
	if (fecha_seleccionada.getTime() === fecha_default.getTime()) {
		document.getElementById("fecha_seleccionada").innerHTML = fecha_input;
		$("#fecha_confirm_modal").modal("show");
	} else {
		document.getElementById("btn-reservar").click();
	}
});

$("#fecha_confirm2").on("click", function (e) {
	e.preventDefault();
	var fecha_input = $("#textfecha").val();
	var partes = fecha_input.split("https://aventuras.pe/");
	var dia_select = partes[0];
	var today = new Date();
	var year = today.getFullYear();
	var mes = today.getMonth() + 1;
	var dia = today.getDate() + 1;
	var dia_sel = partes[0];
	var mes_sel = partes[1];
	var anio_sel = partes[2];
	var fecha_seleccionada = new Date(anio_sel + "/" + mes_sel + "/" + dia_sel);
	var fecha = year + "/" + mes + "/" + dia;
	var fecha_default = new Date(fecha);
	if (fecha_seleccionada.getTime() === fecha_default.getTime()) {
		document.getElementById("fecha_seleccionada").innerHTML = fecha_input;
		$("#fecha_confirm_modal").modal("show");
	} else {
		document.getElementById("btn-reservar").click();
	}
});

// Agregar a carrito

$(".btnrserva").on("click", function (e) {
	var fecha = $("#textfecha").val();
	var id_item = $("#id_item").val();
	var cantidad = $("#textqtyAdulto").val();
	var ninios = $("#textqtyNino").val();
	var precio_bruto = $("#precio_bruto").val();
	var precio = $("#precio_soles").val();
	var descuento = $("#descuento").val();
	var salida = $("#salida").val();
	var porc_reserva = $("#porc_reserva").val();
	var tipo = "Tour";
	var total = cantidad * precio;
	//alert(fecha+'-'+id_item+'-'+cantidad+'-'+precio+'-'+total);
	$.ajax({
		type: "POST",
		//dataType:"JSON",
		data: {
			fecha: fecha,
			id_item: id_item,
			tipo: tipo,
			cantidad: cantidad,
			precio_bruto: precio_bruto,
			descuento: descuento,
			precio: precio,
			total: total,
			ninios: ninios,
			salida: salida,
			porc_reserva: porc_reserva,
		},
		url: base_url + "carrito/add_item",
		success: function (data) {
			if (data) {
				var resultado = data;
				//alert(data);
				$("#fecha_confirm_modal").modal("hide");
				$(".cantidad_servicios").html(data);
				$("#continuar").modal("show");
			} else {
				//mensaje de errors
				alert("Error en el modulo de listado de servicios");
			}
		},
	});
});

$(".adcpaquete").on("click", function (e) {
	var fecha = $("#textfecha").val();
	var id_item = $("#id_item").val();
	var cantidad = $("#textqtyAdulto").val();
	var ninios = $("#textqtyNino").val();
	var precio_bruto = $("#precio_bruto").val();
	var precio = $("#precio_soles").val();
	var descuento = $("#descuento").val();
	var salida = $("#salida").val();
	var tipo = "Tour";
	var total = cantidad * precio;

	//alert(fecha+'-'+id_item+'-'+cantidad+'-'+precio+'-'+total);

	$.ajax({
		type: "POST",
		//dataType:"JSON",
		data: {
			fecha: fecha,
			id_item: id_item,
			tipo: tipo,
			cantidad: cantidad,
			precio_bruto: precio_bruto,
			descuento: descuento,
			precio: precio,
			total: total,
			ninios: ninios,
			salida: salida,
		},
		url: base_url + "carrito/add_tour_paquete",
		success: function (data) {
			if (data) {
				var resultado = data;
				//alert(data);
				$(".cantidad_servicios_paquete").html(data);
				//$('#personalizar').modal('show')
				window.location.href = base_url + "paquetes/personalizar/paso2";
			} else {
				//mensaje de errors
				alert("Error en el modulo de listado de servicios");
			}
		},
	});
});

// Quantity buttons
function qtySum() {
	var arr = document.getElementsByName("textqtyInput");
	var tot = 0;
	for (var i = 0; i < arr.length; i++) {
		if (parseInt(arr[i].value)) tot += parseInt(arr[i].value);
	}
	var cardQty = document.querySelector(".qtyTotal");
	cardQty.innerHTML = tot;
	precio = calcular_precio_simple(
		$("#precio").val(),
		$("#textqtyAdulto").val()
	);
	if ($("#textqtyAdulto").val() == "0") {
		$(".infoPrecio").text("0");
		$("#textqtyAdulto").focus();
		$("#message-personas-adulta").text(
			"* Selecciona un adulto o más en persona."
		);
	} else {
		$("#message-personas-adulta").text("");
		$(".infoPrecio").text(number_format(precio, 2, "."));
	}
}

function calcular_precio_simple(precio, num_adultos) {
	var precio_total = parseFloat(precio) * num_adultos;
	return precio_total;
}

function number_format(number, decimals, dec_point, thousands_sep) {
	// Strip all characters but numerical ones.
	number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
		dec = typeof dec_point === "undefined" ? "." : dec_point,
		s = "",
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return "" + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || "").length < prec) {
		s[1] = s[1] || "";
		s[1] += new Array(prec - s[1].length + 1).join("0");
	}
	return s.join(dec);
}

function isFloat(n) {
	return n % 1 != 0;
}

$(function () {
	var cap_min = $("#cap_min").val();
	$(".qtyButtons input").after('<div class="qtyInc"></div>');
	$(".qtyButtons input").before('<div class="qtyDec"></div>');
	$(".qtyDec,.qtyInc").on("click", function () {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		var kidValue = $button.parent().find("#textqtyNino").val();

		if ($button.hasClass("qtyInc")) {
			var newVal = parseFloat(oldValue) + 1;
			if (kidValue >= 2) {
				var newVal = parseFloat(oldValue);
			}
		} else {
			// don't allow decrementing below zero
			if (oldValue > cap_min) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				if (kidValue >= 0) {
					newVal = 0;
				} else {
					newVal = cap_min;
				}
			}
		}
		$button.parent().find("input").val(newVal);
		qtySum();
		$(".qtyTotal").addClass("rotate-x");
	});

	////////////////////////EVENTOS/////////////////////////

	var cap_max = $("#cap_min").val();
	$(".qtyButtons2 input").after('<div class="qtyInc2"></div>');
	$(".qtyButtons2 input").before('<div class="qtyDec2"></div>');
	$(".qtyDec2,.qtyInc2").on("click", function () {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		var kidValue = $button.parent().find("#textqtyNino").val();

		if ($button.hasClass("qtyInc2")) {
			if (oldValue === cap_max) {
				console.log("capacidad máxima");
				console.log(cap_max);
				console.log(oldValue);
				var newVal = parseFloat(oldValue);
			} else {
				var newVal = parseFloat(oldValue) + 1;
			}

			if (kidValue >= 2) {
				var newVal = parseFloat(oldValue);
			}
		} else {
			// don't allow decrementing below zero
			//console.log(oldValue);
			if (oldValue == 1) {
				console.log(oldValue);
				var newVal = parseFloat(oldValue);
			} else if (oldValue > 1) {
				console.log(oldValue);
				var newVal = parseFloat(oldValue) - 1;
			} else {
			}
			if (kidValue > 0 || kidValue == 0) {
				newVal = 0;
			}
		}
		$button.parent().find("input").val(newVal);
		qtySum();
		$(".qtyTotal").addClass("rotate-x");
	});
	/////////////////////// FIN EVENTOS/////////////////////////

	function removeAnimation() {
		$(".qtyTotal").removeClass("rotate-x");
	}
	const counter = document.querySelector(".qtyTotal");
});

//fecha de uso en carrito de paquete
var hoy = new Date();
var inicio = new Date();
var id_item = $("#id_item").val();
inicio.setDate(new Date().getDate() + 0);

if (
	id_item == 148 ||
	id_item == 312 ||
	id_item == 345 ||
	id_item == 350 ||
	id_item == 352 ||
	id_item == 354
) {
	// COMENTAR LUEGO DEL 10 DE AGOSTO 2021
	//year, month, day, hours, minutes, seconds, milliseconds)
	//inicio = new Date(2021, 08, 15);
	inicio.setHours(inicio.getHours() + 24);
} else {
	inicio.setHours(inicio.getHours() + 24);
}
//inicio.setHours(inicio.getHours() + 12);
//alert(inicio);
const final = new Date();
$('input[name="textfecha"]').daterangepicker({
	//autoUpdateInput:false,
	minDate: inicio,
	autoApply: true,
	parentEl: "#input_date",
	singleDatePicker: true,
	linkedCalendars: false,
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

$(".alojamiento_seleccionable").on("click", function () {
	$(".alojamiento_seleccionable").removeClass("borde-verde");
	$(this).addClass("borde-verde").find("input").prop("checked", true);
});

$(".tour-star").on("click", function (e) {
	e.preventDefault();
	$(this).toggleClass("liked");
	var star = $(this);
	var puntaje = star.data("puntaje");
	$(this).addClass("activada");
	$(this).prevAll().addClass("activada");
	$(this).nextAll().removeClass("activada");
	document.getElementById("tour_stars").value = puntaje;
});

$("#calificar").on("click", function (e) {
	e.preventDefault();
	var tour_stars = document.getElementById("tour_stars").value;
	var id_tour = document.getElementById("id_tour").value;
	var id_cliente = document.getElementById("id_cliente").value;
	var comentario = document.getElementById("comentario").value;

	//alert(tour_stars + id_tour + id_cliente + comentario);
	$.ajax({
		type: "POST",
		data: {
			id_tour: id_tour,
			id_cliente: id_cliente,
			tour_stars: tour_stars,
			comentario: comentario,
		},
		url: base_url + "rating/insert_tour",
		success: function (data) {
			//alert(data);
			$("#review-tour").addClass("d-none");
			$("#comentarie").addClass("d-none");
			$("#thanks").removeClass("d-none");
		},
		dataType: "json",
	});
});
