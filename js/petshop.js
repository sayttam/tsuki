const carritoPS = JSON.parse(localStorage.getItem("carritoPS")) || []

const medioPago = document.querySelector("#medioPago")
let medioPagoSeleccionado = 1
medioPago.addEventListener("change", function () {
    medioPagoSeleccionado = parseInt(medioPago.value)
})

const URL = '../js/productos.json'

const producto = []

function obtenerProductos() {
    fetch(URL)
    .then((response)=> response.json())
    .then ((data)=> producto.push(...data))
    .then(()=> mostrarProductos())
}

function mostrarProductos() {
    const contenedorProductos = document.querySelector("section.petshopProductos")
    const productosTabla = document.createElement("table")
    const contenedorCarritoPS = document.querySelector("div.petshopCarrito")
    const productosCarritoPS = document.createElement("table")
    productosTabla.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Importe</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Carrito</th>
            </tr>
        </thead>
        <tbody>
            ${producto.map(prod => `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>${prod.importe}</td>
                    <td>${prod.categoria}</td>
                    <td><input type="number" id="cantidadId${prod.id}" value="1" min="1" max="${prod.stock}" required></td>
                    <td><button id="${prod.id}" class="agregarAlCarrito" >Agregar</button></td>
                </tr>
            `).join('')}
        </tbody>
    `
    productosCarritoPS.innerHTML = `
    <thead>
    <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Importe Unitario</th>
        <th>Importe Total</th>
    </tr>
</thead>
<tbody>
${carritoPS.map(prodCarrito => `
    <tr>
        <td>${prodCarrito.nombre}</td>
        <td>${prodCarrito.cantidad}</td>
        <td>${prodCarrito.importe}</td>
        <td>${prodCarrito.cantidad * prodCarrito.importe}</td>
        <td><button id="${prodCarrito.id}" class="quitarDelCarrito" >Quitar</button></td>
    </tr>
`).join('')}
</tbody>
    `
    contenedorProductos.appendChild(productosTabla)
    contenedorCarritoPS.appendChild(productosCarritoPS)
    activarClickAgregar()
}

function actualizarProductosCarrito() {
    const productosCarritoPS = document.querySelector("div.petshopCarrito table tbody")
    productosCarritoPS.innerHTML = carritoPS.map(prodCarrito => `
        <tr>
            <td>${prodCarrito.nombre}</td>
            <td>${prodCarrito.cantidad}</td>
            <td>${prodCarrito.importe}</td>
            <td>${prodCarrito.cantidad * prodCarrito.importe}</td>
            <td><button id="${prodCarrito.id}" class="quitarDelCarrito" >Quitar</button></td>
        </tr>
    `).join('')
    activarClickQuitar()
}

function agregarAlCarrito(id, cantidad) {
    if (carritoPS.length === 0) {
        const sinProductos = document.querySelector(".sinProductos")
        sinProductos.innerHTML = ``
    }
    const productoSeleccionado = producto.find((producto) => producto.id === id)
    productoSeleccionado.stock -= cantidad
    const carritoConCantidad = { ...productoSeleccionado, cantidad }
    carritoPS.push(carritoConCantidad)
    localStorage.setItem("carritoPS", JSON.stringify(carritoPS))
    actualizarProductosCarrito()

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
        })
    })
}

function activarClickQuitar() {
    const botonesQuitar = document.querySelectorAll(".quitarDelCarrito")
    botonesQuitar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id)
            quitarDelCarrito(id)
        })
    })
}



window.onload = function () {
    obtenerProductos()
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
    const productosCarritoPS = document.querySelector("div.petshopCarrito table tbody")
    productosCarritoPS.innerHTML = carritoPS.map(prodCarrito => `
                <tr>
                    <td>${prodCarrito.nombre}</td>
                    <td>${prodCarrito.cantidad}</td>
                    <td>${prodCarrito.importe}</td>
                    <td>${prodCarrito.cantidad * prodCarrito.importe}</td>
                </tr>
            `).join('')
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

function medioDePago(importe) {
    switch (medioPagoSeleccionado) {
        case 1:
            importe *= 1.1
            return importe
            break
        case 2:
            importe *= 1.15
            return importe
            break
        case 3:
            return importe
            break
    }
}

function mostrarCompra(importe) {
    let importePago = importe
    const detalleCompra = document.querySelector(".petshopCompra")
    const compraProcesada = document.createElement("p")
    compraProcesada.textContent = `El detalle de la compra es:`
    const detalleCarritoPS = document.createElement("table")
    detalleCarritoPS.innerHTML = carritoPS.map(prodCarrito => `
                <tbody>
                    <tr>
                        <td>${prodCarrito.cantidad}</td>
                        <td>${prodCarrito.nombre}</td>
                        <td>${prodCarrito.cantidad * prodCarrito.importe}</td>
                    </tr>
                </tbody>
            `).join('')
    detalleCompra.appendChild(compraProcesada)
    detalleCompra.appendChild(detalleCarritoPS)

    const totalCompra = document.createElement("p")
    const descuento = document.createElement("p")
    totalCompra.textContent = `Total de la compra: ${importePago}`
    let descuentoAplicado = carritoPS[0].importe
    let prendaDescuento = carritoPS[0].nombre
    if (carritoPS.length > 4) {
        descuento.textContent = `
            Se desconto un 50% ($${descuentoAplicado}) de la prenda: ${prendaDescuento}
        `
    }
    detalleCompra.appendChild(descuento)
    detalleCompra.appendChild(totalCompra)
    descuentoAplicado = 0
    prendaDescuento = ""
    detalleCompra.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
}


function comprar() {
    if (carritoPS.length === 0) {
        const sinProductos = document.querySelector(".sinProductos")
        sinProductos.innerHTML = `
        <p style="margin-top: 10px; color: red;">No hay productos en el carrito!!!</p>
        `
    } else {
        const sinProductos = document.querySelector(".sinProductos")
        sinProductos.innerHTML = ``
    }
    const detalleCompra = document.querySelector(".petshopCompra")
    detalleCompra.innerHTML = ``
    const procesarCarrito = new Compra(carritoPS)
    let importePago = procesarCarrito.calcularImporte()
    importePago = (medioDePago(importePago)).toFixed(0)
    mostrarCompra(importePago)
    limpiarCarrito()
}
