// JavaScript Document
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
		//$('.infoPrecio').text(number_format(precio, 2));
	}
}

function plusOne(ref) {
	var element = ref.parentNode.querySelector("input[type=number]");
	var dias_cant = Number($("#calc_dias").val());
	var cant = Number(element.value);
	var max = Number(element.getAttribute("max"));
	if (dias_cant == 0) {
		$("#select_fecha").modal({ backdrop: "static", keyboard: false });
	} else if (cant < max) {
		ref.parentNode.parentNode.classList.add("borde-verde");
		element.stepUp();
	}
}
function minusOne(ref) {
	var dias_cant = Number($("#calc_dias").val());
	var element = ref.parentNode.querySelector("input[type=number]");
	var cant = Number(element.value);
	if (cant > 0) {
		element.stepDown();
		if (element.value == 0) {
			ref.parentNode.parentNode.classList.remove("borde-verde");
		}
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

$(".adcpaquete").on("click", function (e) {
	var $i = 0;
	var arrayItems = [];
	var id;
	var tipo;
	var precio;
	var cantidad;
	var sub_total;
	var noches;
	var dias_cant;
	var total = 0;
	var accion = "agregar";
	var fecha;
	$(".quantity").each(function () {
		if (this.value > 0) {
			id = this.getAttribute("data-id");
			id_item_hotel = this.getAttribute("data-id_hotel");
			noches = Number(this.getAttribute("data-noches"));
			precio = Number(this.getAttribute("data-precio_soles"));
			cantidad = Number(this.value);
			id_item_cart = this.getAttribute("data-id_item_cart");
			fecha_inicio = $("#fecha_actual-" + id_item_cart).val();
			sub_total = precio;
			total = sub_total * cantidad;
			arrayItems[$i] = {
				tipo: "Alojamiento",
				id_item: id_item_hotel,
				id_habitacion: id,
				cantidad: cantidad,
				precio: precio,
				total: total,
				dias: noches + 1,
				noches: noches,
				fecha: fecha_inicio,
			};
			$i++;
		}
	});
	if ($i > 0) {
		$.ajax({
			type: "POST",
			data: { arrayItems: arrayItems, accion },
			url: base_url + "carrito/add_alojamiento_paquete",
			success: function (data) {
				if (data) {
					var resultado = data;
					//alert(data);
					//$("#descripcion").html(data);
					//$(".cantidad_servicios_paquete").html(data);
					window.location.href = base_url + "paquetes/personalizar/paso1";
					//$('#personalizar').modal('show')
				} else {
					//mensaje de errors
					alert("Error en el modulo de listado de servicios");
				}
			},
		});
	} else {
		var msg = "Por favor, seleccione la cantidad para la habitación deseada";
		document.getElementById("reserva_msg").innerHTML = msg;
		$("#aviso").modal("show");
	}
});

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
	function removeAnimation() {
		$(".qtyTotal").removeClass("rotate-x");
	}
	const counter = document.querySelector(".qtyTotal");
});

//fecha de uso en carrito de paquete
var hoy = new Date();
var inicio = new Date();
inicio.setDate(new Date().getDate() + 1);
//inicio.setHours(inicio.getHours() + 24);
//alert(inicio);
const final = new Date();
$('input[name="textfecha1"]')
	.daterangepicker({
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
	})
	.on("apply.daterangepicker", function (ev, picker) {
		var fecha_inicio = picker.startDate.format("YYYY-MM-DD");
		var num_dias = $("#num_dias").val();
		$.get(
			base_url +
				"sesionescontrol/set_fechaspaquete/" +
				fecha_inicio +
				"/" +
				num_dias
		);
	});

$('input[name="textfecha"]')
	.daterangepicker({
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
	})
	.on("apply.daterangepicker", function (ev, picker) {
		var fecha_inicio = picker.startDate.format("YYYY-MM-DD");
		var num_dias = $("#num_dias").val();
		$.get(
			base_url +
				"sesionescontrol/set_fechaspaquete/" +
				fecha_inicio +
				"/" +
				num_dias,
			function (result) {
				location.reload();
			}
		);
	});

$("#ir_fecha").on("click", function (e) {
	$("#fecha_confirm_modal").modal("hide");
	$("#fecha_confirm_modal2").modal("hide");
	$("html, body").animate(
		{
			scrollTop: $("#sidebar").offset().top - 140,
		},
		800,
		"swing"
	);
});

$('input[name="fecha"]')
	.daterangepicker({
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
	})
	.on("apply.daterangepicker", function (ev, picker) {});
$('input[name="fecha_tour"]')
	.daterangepicker({
		//autoUpdateInput:false,
		minDate: inicio,
		autoApply: true,
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
	})
	.on("apply.daterangepicker", function (ev, picker) {});

$(".alojamiento_seleccionable").on("click", function () {
	//$(".alojamiento_seleccionable").removeClass("borde-verde");
	var precio_inicial_bruto = Number($("#precio_bruto").val());
	var precio_sin_desc = Number($("#precio_sin_desc").val());
	var precio_final = Number($("#precio_final").val());

	var total_tours_bruto = Number($("#total_tours_bruto").val());
	var total_tours = Number($("#total_tours").val());
	var total_tours_final = Number($("#total_tours_final").val());

	var descuento = $("#descuento").val();
	//var total_tours = $("#total_tours").val();
	var cap_min = $("#cap_min").val();
	var total_alojamientos = 0;
	var antes = 0;
	var ahora = 0;
	var ahorro = 0;
	var subtotal = 0;
	if ($(this).find("input").prop("checked") == true) {
		$(this).removeClass("borde-verde").find("input").prop("checked", false);
		$(".alojamiento_seleccionable").each(function () {
			if ($(this).find("input").prop("checked") == true) {
				total_alojamientos += parseFloat(
					$(this).find(":input").attr("data-precio")
				);
			}
		});
		antes = parseFloat((total_tours_bruto + total_alojamientos) / cap_min);
		if (total_alojamientos > 0) {
			subtotal = parseFloat(total_tours + total_alojamientos);
			ahora = (subtotal - subtotal * (descuento / 100)) / cap_min;
		} else {
			ahora = parseFloat(total_tours / cap_min);
		}
		ahorro = parseFloat(antes - ahora);
		document.getElementById("infoPrecioAntes").innerHTML =
			Number(antes).toFixed(2);
		document.getElementById("infoPrecio").innerHTML = Number(ahora).toFixed(2);
		document.getElementById("infoPrecio2").innerHTML = Number(ahora).toFixed(2);
		document.getElementById("ahorro").innerHTML = Number(ahorro).toFixed(2);
	} else {
		$(this).addClass("borde-verde").find("input").prop("checked", true);
		var yourArray = [];
		$(".alojamiento_seleccionable").each(function () {
			if ($(this).find("input").prop("checked") == true) {
				yourArray.push($(this).addClass("borde-verde"));
				total_alojamientos += parseFloat(
					$(this).find(":input").attr("data-precio")
				);
			}
		});

		$(".alojamiento_seleccionable").each(function () {
			if ($(this).find("input").prop("checked") == false) {
				$(this).removeClass("borde-verde");
			}
		});

		//antes = parseFloat(total_tours_bruto + total_alojamientos);
		antes = parseFloat((total_tours_bruto + total_alojamientos) / cap_min);
		subtotal = parseFloat(total_tours + total_alojamientos);
		ahora = (subtotal - subtotal * (descuento / 100)) / cap_min;
		ahorro = parseFloat(antes - ahora);
		document.getElementById("infoPrecioAntes").innerHTML =
			Number(antes).toFixed(2);
		document.getElementById("infoPrecio").innerHTML = Number(ahora).toFixed(2);
		document.getElementById("infoPrecio2").innerHTML = Number(ahora).toFixed(2);
		document.getElementById("ahorro").innerHTML = Number(ahorro).toFixed(2);
	}
});

//Add Favoritos
$("#add_wishlist").on("click", function (e) {
	e.preventDefault();
	var id_item = $("#id_item").val();
	$.ajax({
		type: "POST",
		data: {
			id_item: id_item,
			tipo: "paquete",
		},
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

//Add Favoritos
$("#add_wishlist2").on("click", function (e) {
	e.preventDefault();
	var id_item = $("#id_item").val();
	$.ajax({
		type: "POST",
		data: {
			id_item: id_item,
			tipo: "paquete",
		},
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

// Agregar a carrito
$("#continuar").on("click", function (e) {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: base_url + "paquetes/control",
		error: function () {
			alert("Intentalo más tarde");
		},
		success: function (data) {
			window.location.href = base_url + "paquetes/personalizar/paso2";
			/*if(data.num_tours<2 || data.num_alojamientos < 1){
				$('#NoesPaquete').modal('show');	
			}else{
				window.location.href = base_url+"reserva";
			}		*/
		},
	});
});

// Agregar a carrito
$("#continuar2").on("click", function (e) {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: base_url + "paquetes/control",
		error: function () {
			alert("Intentalo más tarde");
		},
		success: function (data) {
			window.location.href = base_url + "paquetes/personalizar/paso2";
			/*if(data.num_tours<2 || data.num_alojamientos < 1){
				$('#NoesPaquete').modal('show');	
			}else{
				window.location.href = base_url+"reserva";
			}		*/
		},
	});
});

$(".btnrserva").on("click", function (e) {
	//LOADING SCREEN
	$('[data-loader="circle-side"]').show();
	$("#preloader").show("slow");

	var fecha = $("#textfecha").val();
	var id_item = $("#id_item").val();
	var cantidad = $("#textqtyAdulto").val();
	var ninios = $("#textqtyNino").val();
	var precio = $("#precio").val();
	var existe_alojamiento = document.querySelector(
		'input[name="alojamiento1"]:checked'
	);

	var alojamiento = [];
	$(":radio:checked").each(function (i) {
		alojamiento[i] = $(this).val();
	});

	//alert(alojamiento);
	var num_dias = $("#num_dias").val();
	var tipo = "Paquete";
	var descuento = $("#descuento").val();
	var total = cantidad * precio;
	//debugger;
	$.ajax({
		type: "POST",
		data: {
			fecha: fecha,
			id_item: id_item,
			tipo: tipo,
			cantidad: cantidad,
			precio: precio,
			total: total,
			descuento: descuento,
			ninios: ninios,
			num_dias: num_dias,
			alojamiento: alojamiento,
		},
		url: base_url + "carrito/add_paquete",
		success: function (data) {
			if (data) {
				var resultado = data;
				//alert(data);
				$(".cantidad_servicios_paquete").html(data);
				window.location.href = base_url + "paquetes/personalizar/paso1";
			} else {
				//mensaje de errors
				alert("Error en el modulo de listado de servicios");
			}
		},
	});
});

function crear_coti() {
	$("#loading").removeClass("d-none");
	var fecha = $("#textfecha").val();
	var id_item = $("#id_item").val();
	var cantidad = $("#textqtyAdulto").val();
	var ninios = $("#textqtyNino").val();
	var precio = $("#precio").val();
	var existe_alojamiento = document.querySelector(
		'input[name="alojamiento1"]:checked'
	);

	var alojamiento = [];
	$(":radio:checked").each(function (i) {
		alojamiento[i] = $(this).val();
	});

	//alert(alojamiento);
	var num_dias = $("#num_dias").val();
	var tipo = "Paquete";
	var descuento = $("#descuento").val();
	var total = cantidad * precio;
	var titulo = $("#titulo").val();
	var nombres = $("#nombres").val();
	var apellidos = $("#apellidos").val();
	var email = $("#email").val();
	var telefono = $("#telefono").val();
	var consulta = $("#consulta").val();
	//debugger;
	$.ajax({
		type: "POST",
		data: {
			fecha: fecha,
			id_item: id_item,
			tipo: tipo,
			cantidad: cantidad,
			precio: precio,
			total: total,
			descuento: descuento,
			ninios: ninios,
			num_dias: num_dias,
			alojamiento: alojamiento,
			titulo: titulo,
			nombres: nombres,
			apellidos: apellidos,
			email: email,
			telefono: telefono,
			consulta: consulta,
		},
		dataType: "json",
		url: base_url + "carrito/add_paquete_coti",
		success: function (data) {
			if (data) {
				var resultado = data;
				//console.log(data);
				//$(".cantidad_servicios_paquete").html(data);
				window.open(data.url_wasa, "_new");
				window.location.href = data.url_coti;
				//document.forms["cotizar_gestor"].submit();
				//mandar_coti();
			} else {
				//mensaje de errors
				alert("Error en el modulo de listado de servicios");
			}
		},
	});
}

$("#fecha_confirm").on("click", function (e) {
	e.preventDefault();
	var fecha_input = $("#textfecha").val();
	//alert(fecha_input);
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
$("#fecha_confirm3").on("click", function (e) {
	e.preventDefault();
	var fecha_input = $("#textfecha").val();
	var adultos_seleccionados = $("#textqtyAdulto").val();

	//alert (adultos_seleccionados);
	document.getElementById("cantidad_seleccionada").value =
		adultos_seleccionados;
	document.getElementById("fecha_seleccionada").innerHTML = fecha_input;
	document.getElementById("adultos_seleccionados").innerHTML =
		adultos_seleccionados;
	$("#fecha_confirm_modal2").modal("show");
});
$("#fecha_confirm4").on("click", function (e) {
	e.preventDefault();
	var fecha_input = $("#textfecha").val();
	var adultos_seleccionados = $("#textqtyAdulto").val();
	document.getElementById("cantidad_seleccionada").value =
		adultos_seleccionados;
	document.getElementById("fecha_seleccionada").innerHTML = fecha_input;
	document.getElementById("adultos_seleccionados").innerHTML =
		adultos_seleccionados;
	$("#fecha_confirm_modal2").modal("show");
});
$(".elimina-tour").on("click", function (e) {
	id_item = $(this).data("id_tour");
	$.ajax({
		type: "POST",
		data: {
			id_item: id_item,
		},
		url: base_url + "carrito/delete_item",
		success: function (data) {
			if (data) {
				var resultado = data;
				//console.log(data);
				//alert(data["num_items"]);
				$(".cantidad_servicios_paquete").html(data["num_items"]);
				$("#infoPrecio").html(data["precio_regular"]);
				$("#infoPrecio_final").html(data["precio_final"]);
				$("#infoAhorro").html(data["ahorras"]);
				document.getElementById(id_item).remove();
				$("#eliminar-" + id_item).modal("toggle");
			} else {
				//mensaje de errors
				alert("Sucedió un error, vuelva a intentarlo");
			}
		},
		dataType: "json",
	});
});
$(function () {
	var hoy = new Date();
	hoy.setDate(new Date().getDate() + 1);
	$('input[name="fecha_first"]').daterangepicker(
		{
			opens: "left",
			minDate: hoy,
			locale: {
				format: "DD/MM/YYYY",
				applyLabel: "Listo",
				cancelLabel: "Cancelar",
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
		},
		function (start, end, label) {}
	);
});
$(".actualiza_tour").on("click", function (e) {
	id_item = $(this).data("id_tour");
	var inputs = document.getElementById("actualiza-" + id_item).elements;
	var fecha = inputs["fecha_tour"].value;
	var horario = inputs["horario"].value;
	var participantes = inputs["participantes"].value;
	//alert(fecha + "-" + horario + "-" + participantes);
	$.ajax({
		type: "POST",
		data: {
			id_item: id_item,
			fecha: fecha,
			horario: horario,
			participantes: participantes,
		},
		url: base_url + "carrito/update_item",
		success: function (data) {
			if (data) {
				var resultado = data;
				//console.log(data);
				$("#infoPrecio").html(data["precio_regular"]);
				$("#infoPrecio_final").html(data["precio_final"]);
				$("#infoAhorro").html(data["ahorras"]);
				$("#fecha-" + id_item).html(data["fecha_uso"]);
				$("#salida-" + id_item).html(data["salida"]);
				$("#cantidad-" + id_item).html(data["cantidad"]);
				$("#total-" + id_item).html(data["total"]);
				$("#editar-" + id_item).modal("toggle");
			} else {
				//mensaje de errors
				alert("Sucedió un error, vuelva a intentarlo");
			}
		},
		dataType: "json",
	});
});
$(".actualiza_alojamiento").on("click", function (e) {
	id_item = $(this).data("id_alojamiento");
	var inputs = document.getElementById("actualiza-" + id_item).elements;
	var fechas = inputs["fecha_first"].value;
	var cantidad = inputs["cantidad"].value;
	$.ajax({
		type: "POST",
		data: {
			id_item: id_item,
			fechas: fechas,
			cantidad: cantidad,
		},
		url: base_url + "carrito/update_item_alojamiento",
		success: function (data) {
			if (data) {
				var resultado = data;
				//console.log(data);
				$("#infoPrecio").html(data["precio_regular"]);
				$("#infoPrecio_final").html(data["precio_final"]);
				$("#infoAhorro").html(data["ahorras"]);

				$("#fecha-" + id_item).html(data["fechas"]);
				$("#noches-" + id_item).html(data["noches"]);
				$("#precio_pieza-" + id_item).html(data["precio"]);
				$("#cantidad-" + id_item).html(data["cantidad"]);
				$("#total-" + id_item).html(data["total"]);
				$("#editar-" + id_item).modal("toggle");
			} else {
				//mensaje de errors
				alert("Sucedió un error, vuelva a intentarlo");
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + textStatus);
			alert("Error: " + errorThrown);
		},
		dataType: "json",
	});
});
