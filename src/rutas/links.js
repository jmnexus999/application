const express = require("express");
const rutas = express.Router();
const { isLoggedIn } = require("../lib/auth");
const cola = require("../databases");

rutas.get("/agregar",  isLoggedIn, (req, res) => {
  res.render("links/agregar");
});


rutas.post("/agregar",  isLoggedIn, async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  const nuevovinculo = {
    titulo,
    url,
    descripcion,
    usuario_id: req.user.id
  };
  // console.log(nuevovinculo); // verificar que se trae el gato
  // console.log(req.body);
  await cola.query("INSERT INTO links set ?", [nuevovinculo]);
  req.toastr.success(
    "Vinculo almacenado",
    (title = "Sitema"),
    (options = {
      closeButton: true,
      progressBar: true,
      timeOut: "1550",
    })
  );
  res.redirect("/links");
});

rutas.get("/", isLoggedIn, async (req, res) => {
  const registros = await cola.query("SELECT * FROM links WHERE usuario_id = ?", [ req.user.id]);
  res.render("links/lista", { registros });
  // console.log(registros); // para verificar la consulta de bd
  // res.send("Registros leidos"); // respuesta basica mas iva
});

rutas.get("/borrar/:id", async (req, res) => {
  const { id } = req.params;
  await cola.query("DELETE FROM links WHERE id = ?", [id]);
  req.toastr.success(
    "Vinculo removido",
    (title = "Sitema"),
    (options = {
      closeButton: true,
      progressBar: true,
      timeOut: "1550",
    })
  );
  res.redirect("/links");
  // console.log(req.params.id);
  // res.send("eliminando papu");
});

rutas.get("/editar/:id",  isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const registros = await cola.query("SELECT * FROM links WHERE id=?", [id]);
  // console.log(registros[0]); // esto es para obtener los datos del objeto
  res.render("links/editar", { datos: registros[0] });
});

rutas.post("/editar/:id",  isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { titulo, url, descripcion } = req.body;
  const datos = {
    titulo,
    url,
    descripcion,
  };
  await cola.query("UPDATE links set ? WHERE id = ?", [datos, id]);

  req.toastr.success(
    "Vinculo editado",
    (title = "Error"),
    (options = {
      closeButton: true,
      progressBar: true,
      timeOut: "1550",
    })
  );
  // console.log(registros[0]); // esto es para obtener los datos del objeto
  res.redirect("/links");
});

module.exports = rutas;
