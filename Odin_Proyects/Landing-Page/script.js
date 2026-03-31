const toggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

/* abrir */
toggle.addEventListener("click", (e) => {
  e.stopPropagation();

  sidebar.classList.add("active");
  overlay.classList.add("active");
});

/* cerrar con overlay */
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

/* cerrar con click fuera */
document.addEventListener("click", (e) => {
  const inside = sidebar.contains(e.target) || toggle.contains(e.target);

  if (!inside) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});