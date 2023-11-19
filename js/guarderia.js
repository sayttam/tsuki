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
        alert("Debe ingresar el nombre del canino")
    } else {
        banderaNombre = true
    }

    let tamaño = parseInt(document.getElementById('tamaño').value)

    if (tamaño < 1 || tamaño > 3 || isNaN(tamaño)) {
        console.warn("Ingrese un número de tamaño válido")
    } else {
        if (tamaño === 2) {
            precioPorDia *= 1.25
        } else if (tamaño === 3) {
            precioPorDia *= 1.5
        }
        console.log("Tamaño seleccionado")
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
    } else {
        console.warn("Ingrese un número de días válido")
    }

    if (banderaNombre && banderaTamaño && banderaDias) {
        let cuidadosEspeciales = document.getElementById('cuidadosEspeciales').checked
        let costoAdicionalEspeciales = 0

        if (cuidadosEspeciales) {
            let opcionSeleccionada = parseInt(document.getElementById('opcionCuidados').value)
            switch (opcionSeleccionada) {
                case 1:
                    costoAdicionalEspeciales = 1.1
                    console.log("10% adicional por medicación")
                    break
                case 2:
                    costoAdicionalEspeciales = 1.25
                    console.log("25% adicional por discapacidad")
                    break
                default:
                    costoAdicionalEspeciales = 1
                    console.warn("No ha ingresado la opción correcta")
                    break
            }

            precioPorDia *= costoAdicionalEspeciales
        } else {
            console.log("Sin cuidados especiales")
        }

        function calcularPrecioEstadia(diasEstadia) {
            return precioPorDia * diasEstadia
        }

        let estadia = calcularPrecioEstadia(dias)

        function mostrarPrecioDia(precioTotal) {
            console.log("El importe detallado es:")
            for (let i = 1; i <= dias; i++) {
                console.log(i + "° día. Costo: ", parseFloat(precioTotal / dias).toFixed(2))
            }
        }

        mostrarPrecioDia(estadia)
        console.log("Costo total de la estadia: ", calcularPrecioEstadia(dias))
        mostrarPresupuestoDetallado(estadia, calcularPrecioEstadia(dias))
    } else {
        console.error("No ha ingresado los datos correctamente para el presupuesto")
    }
}