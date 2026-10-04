const db = require("../model/database/models");

module.exports = {
  async carta(req, res, next) {
    try {
      const categorias = await db.Categoria.findAll({
        order: [["orden", "ASC"], [{ model: db.Plato, as: "platos" }, "nombre", "ASC"]],
        include: [{ model: db.Plato, as: "platos", where: { disponible: true }, required: false }],
      });
      res.render("menu", { titulo: "Menú", categorias });
    } catch (e) {
      next(e);
    }
  },
};
