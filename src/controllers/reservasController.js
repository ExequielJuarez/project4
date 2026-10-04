const { body, validationResult } = require("express-validator");
const reservaService = require("../services/reservaService");

const { HORARIOS, MAX_PERSONAS } = reservaService;

const vista = (res, extra = {}) =>
  res.render("reservar", {
    titulo: "Reservar mesa",
    horarios: HORARIOS,
    maxPersonas: MAX_PERSONAS,
    minFecha: reservaService.hoy(),
    errores: {},
    valores: {},
    exito: null,
    ...extra,
  });

module.exports = {
  formulario: (req, res) => vista(res),

  validar: [
    body("nombre").trim().isLength({ min: 2, max: 100 }).withMessage("Ingresá tu nombre"),
    body("telefono").trim().matches(/^[0-9+\-()\s]{6,30}$/).withMessage("Ingresá un teléfono válido"),
    body("email").trim().optional({ values: "falsy" }).isEmail().withMessage("El email no es válido"),
    body("fecha")
      .isISO8601({ strict: true }).withMessage("Elegí una fecha")
      .bail()
      .custom((v) => v >= reservaService.hoy()).withMessage("La fecha no puede ser pasada"),
    body("hora").isIn(HORARIOS).withMessage("Elegí un horario"),
    body("personas").isInt({ min: 1, max: MAX_PERSONAS }).withMessage(`Entre 1 y ${MAX_PERSONAS} personas`).toInt(),
    body("comentarios").trim().isLength({ max: 300 }).withMessage("Máximo 300 caracteres"),
  ],

  async crear(req, res, next) {
    const quiereJson = req.accepts(["html", "json"]) === "json";
    const resultado = validationResult(req);
    if (!resultado.isEmpty()) {
      const errores = resultado.mapped();
      if (quiereJson) return res.status(422).json({ ok: false, errores });
      return res.status(422).render("reservar", {
        titulo: "Reservar mesa", horarios: HORARIOS, maxPersonas: MAX_PERSONAS,
        minFecha: reservaService.hoy(), errores, valores: req.body, exito: null,
      });
    }
    try {
      const { nombre, telefono, email, fecha, hora, personas, comentarios } = req.body;
      const reserva = await reservaService.crear({
        nombre, telefono, email: email || null, fecha, hora, personas, comentarios: comentarios || null,
      });
      if (quiereJson) return res.status(201).json({ ok: true, id: reserva.id });
      return vista(res, { exito: reserva });
    } catch (e) {
      if (e.codigo === "SIN_LUGAR") {
        const errores = { hora: { msg: e.message } };
        if (quiereJson) return res.status(409).json({ ok: false, errores });
        return res.status(409).render("reservar", {
          titulo: "Reservar mesa", horarios: HORARIOS, maxPersonas: MAX_PERSONAS,
          minFecha: reservaService.hoy(), errores, valores: req.body, exito: null,
        });
      }
      next(e);
    }
  },
};
