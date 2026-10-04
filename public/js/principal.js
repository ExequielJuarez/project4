// Menú móvil y carrusel del inicio
(function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("navegacion");

  function alternarMenu(abrir) {
    burger.setAttribute("aria-expanded", String(abrir));
    burger.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("abierto", abrir);
    document.body.classList.toggle("menu-abierto", abrir);
  }

  burger.addEventListener("click", () => alternarMenu(burger.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) alternarMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternarMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 820) alternarMenu(false); });

  // Carrusel del hero
  const fondos = document.querySelectorAll(".hero__fondo");
  if (!fondos.length) return;
  const contador = document.getElementById("slideActual");
  let actual = 0;
  let timer;

  function mostrar(i) {
    actual = (i + fondos.length) % fondos.length;
    fondos.forEach((f, n) => f.classList.toggle("activo", n === actual));
    contador.textContent = String(actual + 1).padStart(2, "0");
  }
  function programar() {
    clearInterval(timer);
    timer = setInterval(() => mostrar(actual + 1), 6000);
  }

  document.getElementById("slideNext").addEventListener("click", () => { mostrar(actual + 1); programar(); });
  document.getElementById("slidePrev").addEventListener("click", () => { mostrar(actual - 1); programar(); });
  programar();
})();
