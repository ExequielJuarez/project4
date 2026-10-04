const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("categorias", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(60), allowNull: false },
    slug: { type: DataTypes.STRING(60), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(255) },
    imagen: { type: DataTypes.STRING(255) }, // ruta dentro de /public/img (opcional)
    orden: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
