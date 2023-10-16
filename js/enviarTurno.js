document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.querySelector(".turnos");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            if (formulario.checkValidity()) {
                event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

                // Obtener los valores de los campos
                var nombreCan = document.getElementById("nombreCan").value;
                var nombreHumano = document.getElementById("nombreHumano").value;
                var servicio = document.getElementById("servicio").value;
                var fechaTurno = document.getElementById("fechaTurno").value;
                var horario = document.getElementById("horario").value;
                var hora = document.getElementById("hora").value;

                var numeroTelefono = "543515197866"; // Reemplaza con el número de teléfono de WhatsApp al que deseas enviar el mensaje

                var mensaje = "¡Agendé un turno para " + nombreCan + " el " + fechaTurno + " a las " + hora + " en el horario de la " + (horario === 'maniana' ? 'mañana' : 'tarde') + " para el servicio de " + servicio + ". El propietario es " + nombreHumano + ".";

                var linkWhatsApp = "https://wa.me/" + numeroTelefono + "/?text=" + encodeURIComponent(mensaje);

                // Abre una nueva pestaña o ventana del navegador
                window.open(linkWhatsApp, "_blank");
            }
        });
    }
});