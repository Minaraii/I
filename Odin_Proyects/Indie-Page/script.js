const monthlyIncome = 500; // Tu MRR
let current= 0; //El contador

const incomeElement = document.getElementById("income"); //Encuentra el elemento con id income

const counter = setInterval(() => {
  current += 10; //Esto ejecuta codigo cada cierto tiempo, cada 30 milisegundos

  incomeElement.textContent = `$${current}`; //Modifica la pagina en vivo

  if (current >= monthlyIncome) {
    clearInterval(counter);// cuando llega al objetivo se detiene
  }
}, 30);