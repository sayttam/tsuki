const carritoPS = JSON.parse(localStorage.getItem("carritoPS")) || []

let medioPagoSeleccionado = 0
let validacionMedioPago = false
let recargo = 1

const URL = '../js/productos.json'

const producto = []

function obtenerProductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => producto.push(...data))
        .then(() => mostrarProductos())
}

function carritoPetShop() {
    const carritoLleno = document.querySelector(".carritoLleno")
    const carritoVacio = document.querySelector(".carritoVacio")
    if (carritoPS.length > 0) {
        carritoLleno.style.display = "block"
        carritoVacio.style.display = "none"
    } else {
        carritoLleno.style.display = "none"
        carritoVacio.style.display = "block"
    }
}

function mostrarCarrito() {
    const divCarrito = document.querySelector(".contenedorCarrito")
    divCarrito.innerHTML = `<dialog class="mostrarCarrito"></dialog>`
    const contenedorCarritoPS = document.querySelector(".mostrarCarrito")
    contenedorCarritoPS.innerHTML = ``
    const cerrarCarritoPS = document.createElement("div")
    cerrarCarritoPS.innerHTML = `
        <button class="btn-close botonCerrar" onclick="cerrarModal()"></button>
    `
    const productosCarritoPS = document.createElement("div")
    productosCarritoPS.className = "productosCarritoDialog"
    productosCarritoPS.classList.add("card")
    productosCarritoPS.innerHTML = `
        <div class="card-header">
            Productos en el carrito
        </div>
        <ul class="list-group list-group-flush">
            ${carritoPS.map(prodCarrito => `
                <li class="list-group-item d-flex justify-content-between">
                    <div>${prodCarrito.nombre}</div>
                    <div>Cantidad: ${prodCarrito.cantidad}</div>
                    <div>Total: ${prodCarrito.cantidad * prodCarrito.importe}</div>
                    <button id="${prodCarrito.id}" class="btn btn-outline-danger quitarDelCarrito">Quitar</button>
                </li>
            `).join('')}
        </ul>
        <h3>El importe total es de: ${carritoPS.reduce((a, p) => a + (p.cantidad * p.importe), 0)}</h3>
    `

    const medioPagoSection = document.createElement("div")
    medioPagoSection.classList.add("mt-3")

    medioPagoSection.innerHTML = `
        <select id="medioPago" class="form-select" required>
            <option value="0">Selecciona medio de pago...</option>
            <option value="1">Debito</option>
            <option value="2">Credito</option>
            <option value="3">Transferencia</option>
        </select>
        <button class="btn btn-primary comprar" onclick="comprar()">Comprar</button>
        
        <div class="parrMedioPago mt-3">
            <p class="text-success text-center">Por la compra de 5 o más productos, se aplica el 50% de descuento sobre el producto de menor valor</p>
            <p class="small text-center">Debito: 10% de recargo</p>
            <p class="small text-center">Credito: 15% de recargo</p>
        </div>
    `

    contenedorCarritoPS.appendChild(cerrarCarritoPS)
    contenedorCarritoPS.appendChild(productosCarritoPS)
    contenedorCarritoPS.appendChild(medioPagoSection)
    contenedorCarritoPS.showModal()
    activarClickQuitar()
    const medioPago = document.querySelector("#medioPago")
    medioPago.addEventListener("change", function () {
        medioPagoSeleccionado = parseInt(medioPago.value)
    })
}

function cerrarModal() {
    const divCarrito = document.querySelector(".contenedorCarrito")
    divCarrito.innerHTML = ``
}


function mostrarProductos() {
    const contenedorProductos = document.querySelector("section.petshopProductos")
    const productosContainer = document.createElement("div")
    productosContainer.classList.add("row")

    producto.forEach(prod => {
        const card = document.createElement("div")
        card.classList.add("col-md-4", "mb-4")

        card.innerHTML = `
            <div class="card cardProductos">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}" style="height: 100px !important; width: 100px !important;">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">Importe: ${prod.importe}</p>
                    <label for="cantidadId${prod.id}">Cantidad:</label>
                    <input type="number" id="cantidadId${prod.id}" class="form-control" value="1" min="1" max="${prod.stock}" required>
                    <button id="${prod.id}" class="btn btn-primary agregarAlCarrito">Agregar al Carrito</button>
                </div>
            </div>
        `

        productosContainer.appendChild(card)
    })

    contenedorProductos.appendChild(productosContainer)
    activarClickAgregar()
}

function actualizarProductosCarrito() {
    activarClickQuitar()
    if (carritoPS.length === 0) {
        cerrarModal()
        carritoPetShop()
    }
}

function agregarAlCarrito(id, cantidad) {
    const productoExistente = carritoPS.find((prodCarrito) => prodCarrito.id === id)
    if (productoExistente) {
        productoExistente.cantidad += cantidad
    } else {
        const productoSeleccionado = producto.find((prod) => prod.id === id)
        productoSeleccionado.stock -= cantidad
        const carritoConCantidad = { ...productoSeleccionado, cantidad }
        carritoPS.push(carritoConCantidad)
    }
    localStorage.setItem("carritoPS", JSON.stringify(carritoPS))
    actualizarProductosCarrito()
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast()
}

function activarClickAgregar() {
    const botonesAgregar = document.querySelectorAll(".agregarAlCarrito")
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id)
            const stringInput = ("cantidadId" + String(id))
            const cantidadInput = document.getElementById(stringInput)
            const cantidad = parseInt(cantidadInput.value)
            agregarAlCarrito(id, cantidad)
            carritoPetShop()
        })
    })
}

function activarClickQuitar() {
    const botonesQuitar = document.querySelectorAll(".quitarDelCarrito")
    botonesQuitar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id)
            quitarDelCarrito(id)
            carritoPetShop()
            mostrarCarrito()
            if (carritoPS.length === 0) {
                cerrarModal()
                carritoPetShop()
            }
        })
    })
}

window.onload = function () {
    obtenerProductos()
    carritoPetShop()
    activarClickQuitar()

}

function buscarProducto(id) {
    let resultado = producto.find((productoBuscado) => productoBuscado.id === id)
    return resultado
}

function limpiarCarrito() {
    if (carritoPS.length > 4) {
        carritoPS[0].importe *= 2
    }
    carritoPS.length = 0
    localStorage.removeItem("carritoPS")
}

function obtenerIds(productos) {
    const identificadores = new Set()
    productos.forEach(producto => {
        identificadores.add(producto.id, producto.nombre)
    })
    const identificadoresLista = Array.from(identificadores)
    return identificadoresLista
}

function quitarDelCarrito(id) {
    const idProducto = carritoPS.findIndex((producto) => producto.id === id)
    if (idProducto > -1) {
        const productoEliminado = carritoPS.splice(idProducto, 1)[0]
        localStorage.setItem("carritoPS", JSON.stringify(carritoPS))
        actualizarProductosCarrito()
    }
}

function ordenarCarrito() {
    carritoPS.sort((a, b) => {
        if (a.importe > b.importe) {
            return 1
        }
        if (a.importe < b.importe) {
            return -1
        }
        return 0
    })
}

function medioDePago() {
    switch (medioPagoSeleccionado) {
        case 0:
            validacionMedioPago = false
            break
        case 1:
            recargo = 1.1
            validacionMedioPago = true
            break
        case 2:
            recargo = 1.15
            validacionMedioPago = true
            break
        case 3:
            recargo = 1
            validacionMedioPago = true
            break
    }
}

function calcularRecargo(importe) {
    return (importe * recargo).toFixed(2)
}

function restaurarValores() {
    validacionMedioPago = false
    medioPagoSeleccionado = 0
    recargo = 1
}

function comprar() {
    cerrarModal()
    medioDePago()
    const procesarCarrito = new Compra(carritoPS)
    if (validacionMedioPago) {
        let importePago = procesarCarrito.calcularImporte()
        importePago = calcularRecargo(importePago)
        restaurarValores()
        Swal.fire({
            title: "Confirma el procesamiento de la compra:",
            text: "Una vez hecha la compra no se puede modificar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, comprar!",
        }).then((result) => {
            if (result.isConfirmed) {
                const listaProductos = carritoPS.map(prod => `${prod.cantidad} x ${prod.nombre}`).join('<br>')
                const cantidadProductos = carritoPS.reduce((a, p) => a + p.cantidad, 0)
                let stringImportePago = importePago
                if (cantidadProductos > 4) {
                    stringImportePago = importePago + " (Se desconto el %50 del producto " + carritoPS[0].nombre + ")"
                }
                Swal.fire({
                    title: "Éxito!",
                    text: "El importe total es: $" + stringImportePago,
                    icon: "success",
                    footer: `
                <div><p>Su compra ha sido procesada correctamente, recibirá los productos en el transcurso de 5 días hábiles.</p></div>
                <div style="text-align: center;">Productos:<br>${listaProductos}</div>
                `
                })
                limpiarCarrito()
                cerrarModal()
                carritoPetShop()
            } else {
                mostrarCarrito()
            }
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No has seleccionado medio de pago!",
        }).then(() => mostrarCarrito())
    }
}