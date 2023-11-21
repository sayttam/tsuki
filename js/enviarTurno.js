document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.querySelector(".turnos")

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            if (formulario.checkValidity()) {
                event.preventDefault()

                var nombreCan = document.getElementById("nombreCan").value
                var nombreHumano = document.getElementById("nombreHumano").value
                var servicio = document.getElementById("servicio").value
                var fechaTurno = document.getElementById("fechaTurno").value
                var horario = document.getElementById("horario").value
                var hora = document.getElementById("hora").value

                var numeroTelefono = "543515197866"

                var mensaje = "¡Hola! Solicité un turno para " + nombreCan + " el " + fechaTurno + " a las " + hora + " en el horario de la " + (horario === 'maniana' ? 'mañana' : 'tarde') + " para el servicio de " + servicio + ". El propietario es " + nombreHumano + "."

                var linkWhatsApp = "https://wa.me/" + numeroTelefono + "/?text=" + encodeURIComponent(mensaje)

                window.open(linkWhatsApp, "_blank")
            }
        });
    }
});