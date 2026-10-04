// Crea la base de datos "jb_sushi", sus tablas y carga el menú inicial.
// Uso: npm run db:instalar   (agregar --reset para borrar y recrear todo)
require("dotenv").config();
const mysql = require("mysql2/promise");
const config = require("../src/model/database/config/config").development;

async function main() {
  const reset = process.argv.includes("--reset");
  const conexion = await mysql.createConnection({
    host: config.host, port: config.port, user: config.username, password: config.password,
  });
  await conexion.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conexion.end();

  const db = require("../src/model/database/models");
  await db.sequelize.sync({ force: reset });

  if ((await db.Categoria.count()) === 0) {
    const datos = require("./datos-menu");
    for (const [i, c] of datos.entries()) {
      const categoria = await db.Categoria.create({ ...c.categoria, orden: i + 1 });
      await db.Plato.bulkCreate(c.platos.map((p) => ({ ...p, categoria_id: categoria.id })));
    }
    console.log("🍣 Menú inicial cargado");
  }
  console.log(`✅ Base "${config.database}" lista`);
  await db.sequelize.close();
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
