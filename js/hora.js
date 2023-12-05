
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
    divHora.innerHTML = `
    <h3>${horaTsuki.datetime}</h3>
    `
}

setInterval(obtenerHora, 1000)
