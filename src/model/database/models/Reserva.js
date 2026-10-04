const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("reservas", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(30), allowNull: false },
    email: { type: DataTypes.STRING(120) },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.STRING(5), allowNull: false }, // "21:00"
    personas: { type: DataTypes.INTEGER, allowNull: false },
    comentarios: { type: DataTypes.STRING(300) },
    estado: {
      type: DataTypes.ENUM("pendiente", "confirmada", "cancelada"),
      defaultValue: "pendiente",
    },
  });
