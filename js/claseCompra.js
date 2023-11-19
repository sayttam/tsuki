class Compra {
    constructor(carritoPetShop) {
        this.carritoPS = carritoPetShop
    }
    calcularImporte() {
        if (this.carritoPS.length > 0) {
            if (this.carritoPS.length > 4) {
                alert("Por la compra de 5 o más productos, se descontara un 50% del precio de la prenda de menor valor")
                ordenarCarrito(this.carritoPS)
                this.carritoPS[0].importe = this.carritoPS[0].importe * 0.5
            }
            return this.carritoPS.reduce((acum, producto) => acum + producto.importe, 0)
        }
    }
}
