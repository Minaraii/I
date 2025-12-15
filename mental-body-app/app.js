const steps = [
  "Respira profundo 5 veces",
  "Rota cuello lentamente (30s)",
  "Estira espalda y hombros",
  "Cierra los ojos 60 segundos",
  "Levántate y camina 1 minuto"
];

let index = 0;
const stepEl = document.getElementById("step");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  stepEl.textContent = steps[index];
  btn.textContent = "Siguiente";
  index++;

  if (index >= steps.length) {
    btn.textContent = "Terminar";
    btn.onclick = () => location.reload();
  }
});
