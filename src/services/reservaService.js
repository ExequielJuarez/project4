const { Op } = require("sequelize");
const db = require("../model/database/models");

// Horarios disponibles cada 30 minutos (cenas)
const HORARIOS = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
const CAPACIDAD_POR_HORARIO = 40; // personas
const MAX_PERSONAS = 12;

const hoy = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

async function lugaresLibres(fecha, hora) {
  const ocupado = await db.Reserva.sum("personas", {
    where: { fecha, hora, estado: { [Op.ne]: "cancelada" } },
  });
  return CAPACIDAD_POR_HORARIO - (ocupado || 0);
}

async function crear(datos) {
  if ((await lugaresLibres(datos.fecha, datos.hora)) < datos.personas) {
    const error = new Error("Ese horario ya no tiene lugar. Probá con otro.");
    error.codigo = "SIN_LUGAR";
    throw error;
  }
  return db.Reserva.create(datos);
}

module.exports = { HORARIOS, MAX_PERSONAS, hoy, lugaresLibres, crear };
