// Menú inicial de ejemplo (precios en pesos). Editable desde la base de datos.
module.exports = [
  {
    categoria: { nombre: "Rolls clásicos", slug: "rolls-clasicos", imagen: "/img/image4.png", descripcion: "Los infaltables, bien armados." },
    platos: [
      { nombre: "California Roll", descripcion: "Kani, palta y pepino, envuelto en sésamo.", precio: 9800, piezas: 8, destacado: true },
      { nombre: "Philadelphia Roll", descripcion: "Salmón rosado, queso crema y ciboulette.", precio: 11500, piezas: 8 },
      { nombre: "Ebi Furai Roll", descripcion: "Langostino rebozado, palta y mayonesa japonesa.", precio: 12200, piezas: 8 },
      { nombre: "Veggie Roll", descripcion: "Palta, zanahoria, pepino y queso crema.", precio: 8900, piezas: 8 },
    ],
  },
  {
    categoria: { nombre: "Rolls especiales", slug: "rolls-especiales", imagen: "/img/image7.png", descripcion: "Creaciones únicas de la casa." },
    platos: [
      { nombre: "JB Especial", descripcion: "Salmón flameado, palta, salsa teriyaki y brotes.", precio: 14900, piezas: 8, destacado: true },
      { nombre: "Dragon Roll", descripcion: "Langostino tempura, palta por fuera y anguila.", precio: 15800, piezas: 8 },
      { nombre: "Tartar Roll", descripcion: "Atún fresco, cebolla morada y crocante de sésamo.", precio: 15200, piezas: 8 },
      { nombre: "Spicy Salmón", descripcion: "Salmón, salsa picante y tobiko.", precio: 14200, piezas: 8 },
    ],
  },
  {
    categoria: { nombre: "Sashimi y nigiri", slug: "sashimi-nigiri", imagen: "/img/image6.png", descripcion: "Pescado fresco, corte tradicional." },
    platos: [
      { nombre: "Sashimi de salmón", descripcion: "Cinco cortes de salmón rosado.", precio: 11800, piezas: 5 },
      { nombre: "Sashimi mixto", descripcion: "Salmón, atún y pesca blanca del día.", precio: 14500, piezas: 9, destacado: true },
      { nombre: "Nigiri de salmón", descripcion: "Bolita de arroz con salmón.", precio: 8200, piezas: 4 },
      { nombre: "Nigiri de atún", descripcion: "Bolita de arroz con atún rojo.", precio: 9300, piezas: 4 },
    ],
  },
  {
    categoria: { nombre: "Bebidas", slug: "bebidas", imagen: "/img/image5.png", descripcion: "Para acompañar la noche." },
    platos: [
      { nombre: "Sake caliente", descripcion: "Servido en tokkuri, 180 ml.", precio: 6500 },
      { nombre: "Vino tinto copa", descripcion: "Malbec de selección.", precio: 5200 },
      { nombre: "Vino blanco copa", descripcion: "Chardonnay fresco.", precio: 5200 },
      { nombre: "Tragos de autor", descripcion: "Consultá la carta del día.", precio: 7800 },
      { nombre: "Gaseosa / agua", descripcion: "Línea completa.", precio: 2500 },
    ],
  },
];
