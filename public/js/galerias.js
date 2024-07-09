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

$(".guia-star").on("click", function (e) {
	e.preventDefault();
	$(this).toggleClass("liked");
	var star = $(this);
	var puntaje = star.data("puntaje");
	$(this).addClass("activada");
	$(this).prevAll().addClass("activada");
	$(this).nextAll().removeClass("activada");
	document.getElementById("guia_stars").value = puntaje;
});

$("#calificar").on("click", function (e) {
	e.preventDefault();
	var tour_stars = document.getElementById("tour_stars").value;
	var guia_stars = document.getElementById("guia_stars").value;
	var id_galeria = document.getElementById("id_galeria").value;
	var id_tour = document.getElementById("id_tour").value;
	var id_guia = document.getElementById("id_guia").value;
	var id_cliente = document.getElementById("id_cliente").value;
	var comentario = document.getElementById("comentario").value;
	$.ajax({
		type: "POST",
		data: {
			id_galeria: id_galeria,
			id_tour: id_tour,
			id_guia: id_guia,
			id_cliente: id_cliente,
			tour_stars: tour_stars,
			guia_stars: guia_stars,
			comentario: comentario,
		},
		url: base_url + "rating/insert",
		success: function (data) {
			//alert(data);
			$("#review-tour").addClass("d-none");
			$("#review-guia").addClass("d-none");
			$("#comentarie").addClass("d-none");
			$("#thanks").removeClass("d-none");
			//location.reload("?msg=gracias");
			/* 	if (data) {
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
			} */
		},
		dataType: "json",
	});
});
