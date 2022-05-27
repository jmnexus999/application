const express = require("express");
const consultas = express.Router();
const { isLoggedIn } = require("../lib/auth");
const cola = require("../databases");
const date = require("date-and-time");
const { application } = require("express");

consultas.get("/listauserdt", async (req, res) => {
  const data = await cola.query("SELECT * FROM usuarios");

  res.json(data);
  // console.log(registros); // para verificar la consulta de bd
  // res.send("Registros leidos"); // respuesta basica mas iva
});

consultas.get("/listauserdtu", async (req, res) => {
  const data = await cola.query(
    "SELECT * FROM usuarios WHERE tipo = 'Usuario' OR tipo = 'Promotor'"
  );

  res.json(data);
  // console.log(registros); // para verificar la consulta de bd
  // res.send("Registros leidos"); // respuesta basica mas iva
});

async function cformat() {
  for (i = 0; i < results.length; i++) {
    results[i].creado = date.format(results[i].creado, "DD-MM-YYYY HH:mm");
  }

  return results;

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  // datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
}
consultas.get("/consultap", isLoggedIn, (req, res) => {
  // const { id } = req.params;
  res.render("consultap");
});

consultas.get("/consultapr/:id", async (req, res) => {
  const { id } = req.params;

  results = await cola.query("SELECT * FROM tickets WHERE id_promotor = ?", [
    id,
  ]);

  if (results.length > 0) {
    datos = await cformat(results);

    res.json(datos);
    // console.log(data);
  } else {
    req.toastr.info(
      "NO hay registros",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
  }
});

consultas.get("/consultau", isLoggedIn, (req, res) => {
  // const { id } = req.params;
  res.render("consultau");
});

consultas.get("/consultadtu", async (req, res) => {
  results = await cola.query("SELECT * FROM tickets");

  if (results.length > 0) {
    datos = await cformat(results);

    res.json(datos);
    // console.log(data);
  } else {
    req.toastr.info(
      "NO hay registros",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
  }
});

consultas.get("/consultaad", isLoggedIn, (req, res) => {
  // const { id } = req.params;
  res.render("consultaad");
});

consultas.get("/consultadta", async (req, res) => {
  results = await cola.query("SELECT * FROM tickets");

  if (results.length > 0) {
    datos = await cformat(results);

    res.json(datos);
    // console.log(data);
  } else {
    req.toastr.info(
      "NO hay registros",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
  }
});

consultas.get("/eestatus/:id", async (req, res) => {
  const { id } = req.params;

  const registro = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = registro[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.render("eestatus", { datos });
});

consultas.post("/eestatus/:id", async (req, res) => {
  const { id } = req.params;
  var go = true;

  const { nestatus, motivo } = req.body;
  const datos = {
    estatus:nestatus,
    motivo:motivo,
  };

  if (motivo == "") {
    var go = false;
    req.toastr.error(
      "debe indicar el motivo por el cambio de estatus",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect(`/eestatus/${id}`);
  }

  if (go) {
      
    await cola.query("UPDATE tickets set ? WHERE id = ?", [datos, id]);
    req.toastr.info(
      "Estatus cambiado",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    // console.log(registros[0]); // esto es para obtener los datos del objeto
    res.redirect(`/eestatus/${id}`);
  }
  
});

consultas.get("/recibo/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.render("recibo", { datos });
});

consultas.get("/recibotest/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.json(datos);
});

consultas.get("/recibop/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.render("recibop", { datos });
});

consultas.get("/recibou/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.render("recibou", { datos });
});

consultas.get("/reciboad/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");
  res.render("reciboad", { datos });
});

module.exports = consultas;
