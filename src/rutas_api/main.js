const mysql = require("mysql");
const express = require("express");
const ruta_mascotas = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  user: "postgres",
  password: "27115",
  database: "clinica"
});

connection.connect();
// ***********************************************MASCOTAS*********************************************************

// trae todas las mascotas
ruta_mascotas.get("/api/mensaje/", (req, res) => {
  connection.query(
    "select id, nombre, tipo, mensaje_template from clinica.tbl_ttipos_mensajes;",
    function (err, rows) {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});