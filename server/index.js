const express = require("express");
const cors = require("cors");
const app = express();

const mysql = require("mysql2");

app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Painting1Blue!",
  database: "FlowerLover",
});

app.get("/", (req, res) => {
  db.query(
    "INSERT INTO users(usernamn, password) VALUES ('Testtest', '123')",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.listen(8080, () => {
  console.log("server 8080");
});
