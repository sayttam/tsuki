
const horaURL = "http://worldtimeapi.org/api/ip"
let horaTsuki

function obtenerHora () {
    fetch(horaURL)
    .then((response)=> response.json())
    .then((data)=> horaTsuki = data)
    .then(()=> mostrarHora())
}

function mostrarHora() {
    const divHora = document.querySelector("#mostrarHora")
    let hora = horaTsuki.datetime
    divHora.innerHTML = `
    <h3 class="hora">${hora.slice(11, -13)}</h3>
    `
}

// setInterval(obtenerHora, 1000)
