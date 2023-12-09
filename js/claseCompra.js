class Compra {
    constructor(carritoPetShop) {
        this.carritoPS = carritoPetShop
    }

    calcularImporte() {
        let cantidadItems = this.carritoPS.reduce((acum, producto) => acum + producto.cantidad, 0)
        if (cantidadItems > 0) {
            if (cantidadItems > 4) {
                ordenarCarrito(this.carritoPS)
                this.carritoPS[0].importe = this.carritoPS[0].importe - ((this.carritoPS[0].importe / this.carritoPS[0].cantidad) / 2)
            }
            return this.carritoPS.reduce((acum, producto) => acum + (producto.importe * producto.cantidad), 0)
        }
    }
}
