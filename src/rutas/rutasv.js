const express = require("express");
const rutasv = express.Router();
const { isLoggedIn } = require("../lib/auth");
const cola = require("../databases");
const { application } = require("express");
const colors = require("colors");
const { timeago } = require("../lib/handlebars");
const date = require("date-and-time");
// const { reset } = require("nodemon");
const { emailsending, emailsendingm } = require("./email");

// registro dev ventas

rutasv.get("/rventas", isLoggedIn, (req, res) => {
  res.render("rventas");
});

var go = true;
rutasv.post("/rventas", isLoggedIn, async (req, res) => {
  const uid = req.session.passport.user;

  let {
    ci,
    nombre,
    apellido,
    ncontacto,
    correo,
    mpago,
    ref,
    ciudad,
    pais,
    comentario,
    monto,
  } = req.body;
  var go = true;

  if (nombre == "") {
    var go = false;
    req.toastr.error(
      "Se require el nombre",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (apellido == "") {
    var go = false;
    req.toastr.error(
      "Se require el apellido",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (ci == "") {
    var go = false;
    req.toastr.error(
      "Se require el numero de cedula",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (ncontacto == "") {
    var go = false;
    req.toastr.error(
      "Se require el numero de contacto",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (correo == "") {
    var go = false;
    req.toastr.error(
      "Se require el correo electronico",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (monto == "") {
    var go = false;
    req.toastr.error(
      "Se require el monto del importe",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (ciudad == "") {
    var go = false;
    req.toastr.error(
      "Se require la ciudad",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (pais == "") {
    var go = false;
    req.toastr.error(
      "Se require el pais",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (comentario == "") {
    var go = false;
    req.toastr.error(
      "Se indique el comentario",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventas");
  } else if (mpago == "Seleccionar metodo de pago") {
    var go = false;
    req.toastr.error(
      "Seleccionar metodo de pago",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  }

  if (ref == "") {
    if (mpago == "efectivo_Bsd" || mpago == "efectivo_Div") {
      ref = "N/A";
    } else if (mpago == "pago_movil" || mpago == "transferencia") {
      var go = false;
      req.toastr.error(
        "Se require la referencia",
        (title = "Error"),
        (options = {
          closeButton: true,
          progressBar: true,
          timeOut: "1550",
        })
      );
      res.redirect("/rventas");
    }
  }
  var stipo = await bpromotor(uid);
  const venta = {
    cedula: ci,
    nombre: nombre,
    apellido: apellido,
    numcontacto: ncontacto,
    email: correo,
    mpago: mpago,
    ciudad: ciudad,
    pais: pais,
    comentario: comentario,
    ref: ref,
    monto: monto,
    id_promotor: uid,
    subtipo: stipo,
  };
  if (go) {
    const registro = await cola.query("INSERT INTO tickets SET ?", [venta]);
    req.toastr.success(
      "venta registrada",
      (title = "Sistema"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    // const idc = registro.insertId;
    // emitir el recibo
    res.redirect(`dprecibo/${registro.insertId}`);
  }
});

rutasv.get("/dprecibo/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  res.render("ventareporte", { id: id });
});

// ten esto a la mano por si hay que registrar varios de un solo carajaso
// Se implementa el envio de correo mientras se genera el recibo

rutasv.post("/recibo/:id", async (req, res) => {
  const { id } = req.params;

  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");

  // antes de cargar el recibo se procede a enviar el correo y aprovechar los datos del cliente para incluirlos en el email

  emailsending(datos);

  // y por ultimo se muestra el recibo
  res.render("recibo", { datos });
});

//  ventas multiples

rutasv.get("/rventasm", isLoggedIn, (req, res) => {
  // res.send("opcion en mantenimiento");
  res.render("rventasm");
});

async function bpromotor(uid) {
  const dato = await cola.query("SELECT * FROM usuarios WHERE id = ?", [uid]);

  var stipo = dato[0].subtipo;

  return stipo;
}

let pasalo = [];
let grantotal = 0

rutasv.post("/rventasm", isLoggedIn, async (req, res) => {
  const uid = req.session.passport.user;

  let {
    nombre,
    apellido,
    ci,
    ncontacto,
    correo,
    mpago,
    ref,
    ciudad,
    pais,
    comentario,
    monto,
  } = req.body;
  var go = true;

  if (nombre == "") {
    var go = false;
    req.toastr.error(
      "Se require el nombre",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (apellido == "") {
    var go = false;
    req.toastr.error(
      "Se require el apellido",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (ci == "") {
    var go = false;
    req.toastr.error(
      "Se require el numero de cedula",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (ncontacto == "") {
    var go = false;
    req.toastr.error(
      "Se require el numero de contacto",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (correo == "") {
    var go = false;
    req.toastr.error(
      "Se require el correo electronico",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (monto == "") {
    var go = false;
    req.toastr.error(
      "Se require el monto del importe",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (ciudad == "") {
    var go = false;
    req.toastr.error(
      "Se require la ciudad",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (pais == "") {
    var go = false;
    req.toastr.error(
      "Se require el pais",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (comentario == "") {
    var go = false;
    req.toastr.error(
      "Se indique el comentario",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  } else if (mpago == "Seleccionar metodo de pago") {
    var go = false;
    req.toastr.error(
      "Seleccionar metodo de pago",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/rventasm");
  }

  if (ref == "") {
    if (mpago == "efectivo_Bsd" || mpago == "efectivo_Div") {
      ref = "N/A";
    } else if (mpago == "pago_movil" || mpago == "transferencia") {
      var go = false;
      req.toastr.error(
        "Se require la referencia",
        (title = "Error"),
        (options = {
          closeButton: true,
          progressBar: true,
          timeOut: "1550",
        })
      );
      res.redirect("/rventasm");
    }
  }
  var stipo = await bpromotor(uid);
  const venta = {
    nombre: nombre,
    apellido: apellido,
    cedula: ci,
    numcontacto: ncontacto,
    email: correo,
    mpago: mpago,
    ciudad: ciudad,
    pais: pais,
    comentario: comentario,
    ref: ref,
    monto: monto,
    id_promotor: uid,
    subtipo: stipo,
  };

  // maniobra para duplicar los registros en caso de compra de varios ticket

  async function registralo() {
    var ticketv = [];
    for (var i = 0; i < req.body.cantidad; i++) {
      registro = await cola.query("INSERT INTO tickets SET ?", [venta]);
      ticketv[i] = registro.insertId;
    }
    return ticketv;
  }

  if (go) {
    var ticketsv = await registralo(venta);

    
    // cualculando el Total de la venta
    grantotal = 0
    grantotal = venta.monto * req.body.cantidad;
    console.log(grantotal);

    pasalo = [];
    pasalo = ticketsv;
    // emitir el recibo
    // mensaje no funciona con el render -_-
    // req.toastr.success(
    //   "ventas multiples registradas bebe",
    //   (title = "Sistema"),
    //   (options = {
    //     closeButton: true,
    //     progressBar: true,
    //     timeOut: "1550",
    //   })
    // );

    res.redirect(`dprecibom/${ticketsv[0]}`);
    // res.render("ventareportem", { id: ticketv[0], ticketv });

    // res.render("ventareportem", { id: registro.insertId });
  }
});

// se debe trabajar con el primer tk generado

rutasv.get("/dprecibom/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  res.render("ventareportem", { id: id });
});

rutasv.post("/recibom/:id", async (req, res) => {
  const { id } = req.params;
  // const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", "35");
  const drecibo = await cola.query("SELECT * FROM tickets WHERE id = ?", [id]);
  // res.render("recibo", { datos: drecibo[0] });
  const datos = drecibo[0];
  const { creado } = datos;

  // dando formato al timestamp que mariadb me lo transaforma en la consulta pero en un formato XXXXXL
  datos.creado = date.format(datos.creado, "DD-MM-YYYY HH:mm");

  ticketv = pasalo;
  totalv = grantotal;
  emailsendingm(datos, ticketv, totalv);

  res.render("recibom", { datos, ticketv, totalv });
});

module.exports = rutasv;
