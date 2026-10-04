const { Sequelize } = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Categoria = require("./Categoria")(sequelize);
const Plato = require("./Plato")(sequelize);
const Reserva = require("./Reserva")(sequelize);

Categoria.hasMany(Plato, { foreignKey: "categoria_id", as: "platos" });
Plato.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });

module.exports = { sequelize, Sequelize, Categoria, Plato, Reserva };
