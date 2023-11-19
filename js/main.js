let horarioSelect = document.getElementById("horario")
let horaSelect = document.getElementById("hora")

horarioSelect.addEventListener("change", function() {
    var horarioSeleccionado = this.value
    
    horaSelect.querySelectorAll("option").forEach(function(option) {
        option.style.display = "none"
    })

    horaSelect.querySelectorAll("." + horarioSeleccionado).forEach(function(option) {
        option.style.display = "block"
    })

    var primeraOpcionVisible = horaSelect.querySelector("option[style='display: block;']")
    primeraOpcionVisible.selected = true
})




