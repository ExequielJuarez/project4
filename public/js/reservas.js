// Envío del formulario de reservas sin recargar la página
(function () {
  const form = document.getElementById("formReserva");
  if (!form) return;
  const aviso = document.getElementById("formAviso");
  const boton = form.querySelector("button[type=submit]");

  function mostrarErrores(errores) {
    form.querySelectorAll("[data-error]").forEach((el) => {
      const e = errores[el.dataset.error];
      el.textContent = e ? e.msg : "";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    aviso.textContent = "";
    boton.disabled = true;
    try {
      const respuesta = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const datos = await respuesta.json();
      if (datos.ok) {
        const f = new FormData(form);
        const caja = document.createElement("div");
        caja.className = "reservar__exito";
        caja.setAttribute("role", "status");
        caja.innerHTML = "<h2></h2><p></p><p class='texto'></p><a href='/' class='boton boton--chico'>Volver al inicio</a>";
        caja.querySelector("h2").textContent = "¡Reserva recibida!";
        caja.querySelectorAll("p")[0].textContent =
          `${f.get("nombre")}, te esperamos el ${f.get("fecha").split("-").reverse().join("/")} a las ${f.get("hora")} hs para ${f.get("personas")} persona(s).`;
        caja.querySelectorAll("p")[1].textContent = `Te vamos a confirmar por teléfono o email. Número de reserva: #${datos.id}`;
        form.replaceWith(caja);
        return;
      }
      mostrarErrores(datos.errores || {});
      if (!datos.errores) aviso.textContent = datos.mensaje || "No se pudo enviar la reserva.";
    } catch {
      aviso.textContent = "No pudimos conectar. Probá de nuevo.";
    } finally {
      boton.disabled = false;
    }
  });
})();
