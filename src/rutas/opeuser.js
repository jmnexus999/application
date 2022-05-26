const express = require("express");
const rutas = express.Router();
const { isLoggedIn } = require("../lib/auth");
const cola = require("../databases");
const helpers = require("../lib/helpers");
const toastr = require("toastr");
// const { render } = require("express/lib/response");  // creo que no lo necesito ya que importe express completico

/// Registro de usuarios
const clave = "clave555";
const clave_v = "clave555";
rutas.post("/rusuarios", isLoggedIn, async (req, res) => {
  // incluir la variable clave si se pretende utilizar el metodo de colocar una en el formulario
  const { usuario, nombre, apellido, tipo, subtipo } = req.body;
  
  const nuser = {
    usuario:usuario,
    nombre:nombre,
    apellido:apellido,
    tipo:tipo,
    subtipo:subtipo,
  };
  
  // validar si el usuario a registrar ya existe en el sistema
  // validar go
  var go = true;
  if (nombre == "") {
    var go = false;
    req.toastr.error(
      "el campo nombre no debe estar vacio",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    // req.flash("message", "el campo nombre no debe estar vacio");
    res.redirect("/rusuarios");
  } else if (apellido == "") {
    var go = false;
    req.toastr.error(
      "el campo apellido no debe estar vacio",
      (title = "Error"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    res.redirect("/rusuarios");
  } else if (tipo == "Usuario" || tipo == "Administrador") {
    nuser.subtipo = "N/A";
  } else if (usuario == "") {
    var go = false;
    req.toastr.error(
      "el campo usuario no debe estar vacio",
      (title = "Error"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    res.redirect("/rusuarios");
    const registro = await cola.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );
    if (registro.length > 0) {
      var go = false;
      req.toastr.warning(
        "el usuario ya existe por favor intente con otra combinacion",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/rusuarios");
    } else {
      var go = true;
    }
  }
  // fin validacion go
  //fin de validacion si el usuario existe
  if (go) {
    // console.log(nuser)
    if (clave == clave_v) {
      nuser.clave = await helpers.encryptPassword(clave);
      const resultado = await cola.query("INSERT INTO usuarios SET ?", [nuser]);
      req.toastr.success(
        "EL usuario fue creado",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/rusuarios");
    } else {
      req.toastr.error(
        "las claves no coinciden",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/rusuarios");
    }
  }
});

// muestra los usuarios consultando la bd y retornando un arreglo de datos para poblar los campos de la vista
rutas.get("/listauser", isLoggedIn, async (req, res) => {
  const registros = await cola.query("SELECT * FROM usuarios");

  res.render("listuserdt", { registros });
  // console.log(registros); // para verificar la consulta de bd
  // res.send("Registros leidos"); // respuesta basica mas iva
});

rutas.get("/listauseru", isLoggedIn, async (req, res) => {
  const registros = await cola.query("SELECT * FROM usuarios WHERE tipo = 'Usuario' OR tipo = 'Promotor'");

  res.render("listuserdtu", { registros });
  // console.log(registros); // para verificar la consulta de bd
  // res.send("Registros leidos"); // respuesta basica mas iva
});

rutas.get("/listauser/borrar/:id", async (req, res) => {
  const { id } = req.params;
  if (id == "1") {
    req.toastr.error(
      "El Usuario maestro no puede ser eliminado",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/listauser");
  } else {
    await cola.query("DELETE FROM usuarios WHERE id = ?", [id]);
    req.toastr.info(
      "Usuario removido",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    res.redirect("/listauser");
    // console.log(req.params.id);
    // res.send("eliminando papu");
  }
});

//edicion usuarios por admin por aca 

rutas.get("/listauser/editar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  if (id == "1") {
    req.toastr.error(
      "El Usuario Maestro no puede ser editado",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/listauser");
  } else {
    const registros = await cola.query("SELECT * FROM usuarios WHERE id=?", [
      id,
    ]);
    // console.log(registros[0]); // esto es para obtener los datos del objeto
    res.render("edituser", { datos: registros[0] });
  }
});

rutas.post("/listauser/editar/:id", isLoggedIn, async (req, res) => {
  var go = true;
  const { id } = req.params;

  if (id == "1") {
    req.toastr.error(
      "El Usuario Maestro no puede ser editado",
      (title = "Error"),
      (options = {
        positionClass: "toast-top-left",
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/listauser");
  } else {
    const { usuario, nombre, apellido, tipo, subtipo } = req.body;
    const datos = {
      usuario,
      nombre,
      apellido,
      tipo,
      subtipo,
    };

    if (nombre == "") {
      var go = false;
      req.toastr.error(
        "el campo nombre no debe estar vacio",
        (title = "Error"),
        (options = {
          closeButton: true,
          progressBar: true,
          timeOut: "1550",
        })
      );

      res.redirect(`/listauser/editar/${id}`);
    } else if (apellido == "") {
      var go = false;
      req.toastr.error(
        "el campo apellido no debe estar vacio",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect(`/listauser/editar/${id}`);
    } else if (tipo == "Usuario" || tipo == "Administrador") {
      datos.subtipo = "N/A";
    } else if (usuario == "") {
      var go = false;
      req.toastr.error(
        "el campo usuario no debe estar vacio",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect(`/listauser/editar/${id}`);
    }
    if (go) {
      
      await cola.query("UPDATE usuarios set ? WHERE id = ?", [datos, id]);
      req.toastr.info(
        "Usuario editado",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      // console.log(registros[0]); // esto es para obtener los datos del objeto
      res.redirect("/listauser");
    }
  }
});

//edicion usuarios por usuario por aca 

rutas.get("/listauser/editaru/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  if (id == "1") {
    req.toastr.error(
      "El Usuario Maestro no puede ser editado",
      (title = "Error"),
      (options = {
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/listauseru");
  } else {
    const registros = await cola.query("SELECT * FROM usuarios WHERE id=?", [
      id,
    ]);
    // console.log(registros[0]); // esto es para obtener los datos del objeto
    res.render("edituseru", { datos: registros[0] });
  }
});

rutas.post("/listauser/editaru/:id", isLoggedIn, async (req, res) => {
  var go = true;
  const { id } = req.params;

  if (id == "1") {
    req.toastr.error(
      "El Usuario Maestro no puede ser editado",
      (title = "Error"),
      (options = {
        positionClass: "toast-top-left",
        closeButton: true,
        progressBar: true,
        timeOut: "1550",
      })
    );
    res.redirect("/listauseru");
  } else {
    const { usuario, nombre, apellido, tipo, subtipo } = req.body;
    const datos = {
      usuario,
      nombre,
      apellido,
      tipo,
      subtipo,
    };

    if (nombre == "") {
      var go = false;
      req.toastr.error(
        "el campo nombre no debe estar vacio",
        (title = "Error"),
        (options = {
          closeButton: true,
          progressBar: true,
          timeOut: "1550",
        })
      );

      res.redirect(`/listauser/editaru/${id}`);
    } else if (apellido == "") {
      var go = false;
      req.toastr.error(
        "el campo apellido no debe estar vacio",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect(`/listauser/editaru/${id}`);
    } else if (tipo == "Usuario" || tipo == "Administrador") {
      datos.subtipo = "N/A";
    } else if (usuario == "") {
      var go = false;
      req.toastr.error(
        "el campo usuario no debe estar vacio",
        (title = "Error"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect(`/listauser/editaru/${id}`);
    }
    if (go) {
      
      await cola.query("UPDATE usuarios set ? WHERE id = ?", [datos, id]);
      req.toastr.info(
        "Usuario editado",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      // console.log(registros[0]); // esto es para obtener los datos del objeto
      res.redirect("/listauseru");
    }
  }
});

// reset de clave
rutas.get("/listauser/resetpass/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const clave = "clave555";

  clavei = await helpers.encryptPassword(clave);
  await cola.query("UPDATE usuarios set clave=? WHERE id = ?", [clavei, id]);

  // UPDATE `tickets`.`usuarios` SET `clave`='clave555' WHERE  `id`=8;
  req.toastr.info(
    "clave rest a clave555",
    (title = "Sistema"),
    (options = {
      timeOut: "1550",
      closeButton: true,
      progressBar: true,
    })
  );
  // console.log(registros[0]); // esto es para obtener los datos del objeto
  res.redirect("/listauser");
});

rutas.get("/admincp", isLoggedIn, async (req, res) => {
  const uid = req.session.passport.user;
  // console.log(uid);
  // const user = "como se el usuario que esta activo"
  // console.log(user)
  const registros = await cola.query("SELECT * FROM usuarios WHERE id=?", [
    uid,
  ]);
  res.render("admincp", { datos: registros[0] });
});

// cambio de clave del menu admin
rutas.post("/admincp/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const clave = req.body.pass1;
  const clave_v = req.body.pass2;

  if (clave == "" || clave_v == "") {
    req.toastr.error(
      "uno de los campos estan vacios",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    res.redirect("/admincp");
  } else {
    if (clave == clave_v) {
      clavei = await helpers.encryptPassword(clave);
      await cola.query("UPDATE usuarios set clave=? WHERE id = ?", [
        clavei,
        id,
      ]);
      req.toastr.success(
        "clave cambiada",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/admin");
    } else {
      req.toastr.error(
        "las claves no coinciden",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/admincp");
    }
  }
});

rutas.get("/usercp", isLoggedIn, async (req, res) => {
  const uid = req.session.passport.user;
  // console.log(uid);
  // const user = "como se el usuario que esta activo"
  // console.log(user)
  const registros = await cola.query("SELECT * FROM usuarios WHERE id=?", [
    uid,
  ]);
  res.render("admincp", { datos: registros[0] });
});

rutas.post("/usercp/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const clave = req.body.pass1;
  const clave_v = req.body.pass2;

  if (clave == "" || clave_v == "") {
    req.toastr.error(
      "uno de los campos estan vacios",
      (title = "Sistema"),
      (options = {
        timeOut: "1550",
        closeButton: true,
        progressBar: true,
      })
    );
    res.redirect("/admincp");
  } else {
    if (clave == clave_v) {
      clavei = await helpers.encryptPassword(clave);
      await cola.query("UPDATE usuarios set clave=? WHERE id = ?", [
        clavei,
        id,
      ]);
      req.toastr.success(
        "clave cambiada",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/profile");
    } else {
      req.toastr.error(
        "las claves no coinciden",
        (title = "Sistema"),
        (options = {
          timeOut: "1550",
          closeButton: true,
          progressBar: true,
        })
      );
      res.redirect("/admincp");
    }
  }
});

module.exports = rutas;
