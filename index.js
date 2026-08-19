const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const productos = [
  {
    id: "1",
    Nombre: "Miguel",
    Apellido: "Suarez",
    Documento: 55852552,
    Numero: 3143741464,
  },
  {
    id: "2",
    Nombre: "Massiel",
    Apellido: "Ricardo",
    Documento: 574555455,
    Numero: 2543131513,
  },
  {
    id: "3",
    Nombre: "Jimmi",
    Apellido: "Rincon",
    Documento: 55522662,
    Numero: 889966633,
  },
  {
    id: "4",
    Nombre: "Daniel",
    Apellido: "Parra",
    Documento: 98996623,
    Numero: 325554668,
  },
  {
    id: "5",
    Nombre: "Sebatian",
    Apellido: "vinasco",
    Documento: 5565666633,
    Numero: 3225156944,
  },
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );

  next();
});

app.get("/api/v1/status", (req, res) => {
  res.status(200).json({
    status: "OK",

    mensaje: "Servidor Backend UCompensar ejecutándose correctamente",

    timestamp: new Date(),
  });
});

app.get("/api/v1/productos", (req, res) => {
  res.status(200).json({
    success: true,

    total: productos.length,

    data: productos,
  });
});

app.get("/api/v1/productos/:id", (req, res) => {
  const id = req.params.id;

  const producto = productos.find((producto) => producto.id === id);

  if (!producto) {
    return res.status(404).json({
      success: false,

      mensaje: "Producto no encontrado",
    });
  }

  res.status(200).json({
    success: true,

    data: producto,
  });
});

app.get("/api/v1/status-error", (req, res) => {
  res.status(404).json({
    status: "error 404",

    mensaje: "Servidor Backend UCompensar no encontrado",

    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
