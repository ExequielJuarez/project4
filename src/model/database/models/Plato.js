const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("platos", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoria_id: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.STRING(255) },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    piezas: { type: DataTypes.INTEGER }, // cantidad de piezas (rolls, nigiri, etc.)
    imagen: { type: DataTypes.STRING(255) },
    destacado: { type: DataTypes.BOOLEAN, defaultValue: false },
    disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
