require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./model/database/models");
const indexRouter = require("./routes/index.Routes");

const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Helpers disponibles en todas las vistas
app.locals.formatoPrecio = (n) =>
  "$" + Number(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", indexRouter);

app.use((req, res) => res.status(404).render("404", { titulo: "No encontrada" }));

app.use((err, req, res, next) => {
  console.error("❌", err);
  if (req.accepts(["html", "json"]) === "json") {
    return res.status(500).json({ ok: false, mensaje: "Error del servidor, probá de nuevo" });
  }
  res.status(500).send("<h1>Algo salió mal</h1><p>Probá de nuevo en unos minutos.</p>");
});

db.sequelize
  .authenticate()
  .then(() => app.listen(puerto, () => console.log(`🚀 JB Sushi en http://localhost:${puerto}`)))
  .catch((error) => {
    console.error("❌ No se pudo conectar con la base de datos:", error.message);
    console.error("   Revisá el .env y que MySQL esté encendido. Para crear las tablas: npm run db:instalar");
    process.exit(1);
  });
