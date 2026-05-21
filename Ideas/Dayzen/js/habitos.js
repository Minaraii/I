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


// ========== ESTRELLAS ==========

// Seleccionamos el elemento <canvas> donde vamos a dibujar las estrellas 
const canvas = document.getElementById("stars");

// Obtenemos el "contexto" 2D del canvas (es como el pincel para dibujar)
const ctx = canvas.getContext("2d");

// Funcion que ajusta el tamaño del canvas al tamaño de la ventana
function ajustarCanvas() {
    canvas.width = window.innerWidth;   // Ancho completo de la pantalla
    canvas.height = window.innerHeight;   // Alto completo de la pantalla
}

// Cuando el usuario cambie el tamaño de la ventana, ajustamos el canvas 
window.addEventListener("resize", ajustarCanvas);

//Ajustamos el canvas al cargar la pagina 
ajustarCanvas();

// Creamos un array con 200 estrellas, cada una con propiedades aleatorias
const estrellas = Array.from({length: 200}, () => ({
    x: Math.random() * canvas.width,   // Posicion horizontal aleatoria 
    y: Math.random() * canvas.height,   // Posicion vertical aleatoria 
    tamaño: Math.random() * 2.5 +1,  // Tamaño entre 1 y 3.5 pixeles
    velocidad: Math.random() * 0.7 + 0.3,   // Velocidad de caida 
    brillo: Math.random() * 0.7 + 0.5   // Nivel de transparencia/brillo
}));

//  Funcion que dibuja y anima todas las estrellas 
function dibujarEstrellas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada frame

    // Recorremos cada estrella 
    for (let estrella of estrellas) {
        ctx.globalAlpha = estrella.brillo;  // Aplicamos el brillo/transparencia
        ctx.fillStyle = "#ffffff";   // Color blanco para las estrellas 
        ctx.fillRect(estrella.x, estrella.y, estrella.tamaño, estrella.tamaño); // Dibujamos la estrella

            // Movemos la estrella hacia abajo
            estrella.y += estrella.velocidad;

            // Si la estrella sale por abajo, la volvemos a poner arriba (efecto infinito)
            if (estrella.y > canvas.height) estrella.y = 0;
    }

    // Llamamos de nuevo a esta funcion para crear animacion fluida 
    requestAnimationFrame(dibujarEstrellas);
}

// Iniciamos la animacion de las estrellas
dibujarEstrellas();