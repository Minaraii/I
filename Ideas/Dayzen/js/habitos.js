// ========== RELOJ ==========

// Función que actualiza la hora actual en pantalla
function actualizarReloj() {
    const ahora = new Date();     // Crea un objeto con la fecha y hora actual 

    // Formatea cada parte (hora, minutos, segundos) para que siempre tenga 2 dígitos
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    // Muestra la hora en el elemento con id="time"
    document.getElementById("time").textContent = `${horas}:${minutos}:${segundos}`; 
}

// Ejecuta la funcion actualizarReloj cada 1000 milisegundos (1 segundo)
setInterval(actualizarReloj, 1000);

// Ejecuta la funcion una vez al cargar la pagina para que no espere 1 segundo 
actualizarReloj();


