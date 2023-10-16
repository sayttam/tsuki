var horarioSelect = document.getElementById("horario");
var horaSelect = document.getElementById("hora");

horarioSelect.addEventListener("change", function() {
    var horarioSeleccionado = this.value;
    
    // Ocultar todas las opciones
    horaSelect.querySelectorAll("option").forEach(function(option) {
        option.style.display = "none";
    });

    // Mostrar solo las opciones correspondientes al horario seleccionado
    horaSelect.querySelectorAll("." + horarioSeleccionado).forEach(function(option) {
        option.style.display = "block";
    });

    // Seleccionar la primera opción visible por defecto
    var primeraOpcionVisible = horaSelect.querySelector("option[style='display: block;']");
    primeraOpcionVisible.selected = true;
});