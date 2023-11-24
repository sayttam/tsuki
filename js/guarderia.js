let precioPorDia = 2000
let dias

function mostrarPresupuestoDetallado(estadia, costoTotal) {
    let resultadoPresupuesto = document.getElementById("resultadoPresupuesto")

    let detallePresupuesto = document.createElement("div")
    detallePresupuesto.innerHTML = "<h3>Presupuesto Detallado</h3>"
    detallePresupuesto.innerHTML += "<p>Costo total de la estadia: $" + costoTotal.toFixed(2) + "</p>"

    for (let i = 1; i <= dias; i++) {
        detallePresupuesto.innerHTML += "<p>" + i + "° día. Costo: $" + parseFloat(estadia / dias).toFixed(2) + "</p>"
    }

    resultadoPresupuesto.innerHTML = ""
    resultadoPresupuesto.appendChild(detallePresupuesto)
}

function calcularPresupuesto() {
    let banderaNombre = false
    let banderaTamaño = false
    let banderaDias = false

    let nombreCanino = document.getElementById('nombreCanino').value

    if (nombreCanino === "") {
        const sinNombre = document.querySelector(".sinNombre")
        sinNombre.innerHTML = `<p style="color:red;font-weight:bolder;">Debe ingresar un nombre!</p>`
    } else {
        banderaNombre = true
        const sinNombre = document.querySelector(".sinNombre")
        sinNombre.innerHTML = ``
    }

    let tamaño = parseInt(document.getElementById('tamaño').value)

    if (tamaño < 1 || tamaño > 3 || isNaN(tamaño)) {
    } else {
        if (tamaño === 2) {
            precioPorDia *= 1.25
        } else if (tamaño === 3) {
            precioPorDia *= 1.5
        }
        banderaTamaño = true
    }

    dias = parseInt(document.getElementById('dias').value)

    if (dias > 0 && dias < 10) {
        banderaDias = true
    } else if (dias >= 10 && dias < 20) {
        precioPorDia *= 0.9
        banderaDias = true
    } else if (dias >= 20 && dias < 9999) {
        precioPorDia *= 0.85
        banderaDias = true
    }

    if (banderaNombre && banderaTamaño && banderaDias) {
        let cuidadosEspeciales = document.getElementById('cuidadosEspeciales').checked
        let costoAdicionalEspeciales = 0

        if (cuidadosEspeciales) {
            let opcionSeleccionada = parseInt(document.getElementById('opcionCuidados').value)
            switch (opcionSeleccionada) {
                case 1:
                    costoAdicionalEspeciales = 1.1
                    break
                case 2:
                    costoAdicionalEspeciales = 1.25
                    break
                default:
                    costoAdicionalEspeciales = 1
                    break
            }

            precioPorDia *= costoAdicionalEspeciales
        }

        function calcularPrecioEstadia(diasEstadia) {
            return precioPorDia * diasEstadia
        }

        let estadia = calcularPrecioEstadia(dias)

        function mostrarPrecioDia(precioTotal) {
            for (let i = 1; i <= dias; i++) {
            }
        }

        mostrarPrecioDia(estadia)
        mostrarPresupuestoDetallado(estadia, calcularPrecioEstadia(dias))
    } 
}