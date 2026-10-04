const express = require("express");
const router = express.Router();
const paginas = require("../controllers/paginasController");
const menu = require("../controllers/menuController");
const reservas = require("../controllers/reservasController");

router.get("/", paginas.inicio);
router.get("/nosotros", paginas.nosotros);
router.get("/contacto", paginas.contacto);

router.get("/menu", menu.carta);

router.get("/reservar", reservas.formulario);
router.post("/reservar", reservas.validar, reservas.crear);

module.exports = router;
