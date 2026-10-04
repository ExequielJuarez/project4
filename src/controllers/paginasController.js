const db = require("../model/database/models");

module.exports = {
  async inicio(req, res, next) {
    try {
      const categorias = await db.Categoria.findAll({ order: [["orden", "ASC"]] });
      res.render("inicio", { titulo: "Una experiencia para la noche", categorias });
    } catch (e) {
      next(e);
    }
  },
  nosotros: (req, res) => res.render("nosotros", { titulo: "Nosotros" }),
  contacto: (req, res) => res.render("contacto", { titulo: "Contacto" }),
};
