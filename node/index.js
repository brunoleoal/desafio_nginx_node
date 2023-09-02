const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
let connection = mysql.createConnection(config);

const create = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`;
connection.query(create);
const sql = `INSERT INTO people(name) values('Dev Full Cycle')`;
connection.query(sql);
connection.end();

app.get("/", (req, res) => {
  connection = mysql.createConnection(config);
  connection.query("SELECT name FROM people;", function (err, rows) {
    if (err) {
      console.log(err);
      res.send("<h1>Full Cycle</h1><br/> - Erro ao consultar o banco de dados");
    } else {
      res.send(
        "<h1>Full Cycle</h1><br/> - Lista de nomes cadastrados no banco de dados: <br/>" +
          rows.map((row) => row.name).join("<br/>") +
          "<br/>"
      );
    }
  });
  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
