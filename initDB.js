"use strict";

const getDB = require("./db");

//Escribe a partir de aquí el código solicitado

let connection;

async function main() {
  try {
    connection = await getDB();
    console.log("Conexión establecida");

    //Crear la BBDD
    await connection.query("CREATE DATABASE if not exists users");

    await connection.query("USE users;");

    //Borrar tablas
    console.log("Borrando tablas...");

    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query(`DROP TABLE IF EXISTS products`);

    //Crear tablas
    console.log("creando tablas...");
    await connection.query(`CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100),
    name VARCHAR(255),
    telephone varchar (12)
  )`);

    await connection.query(`
  CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT NOT NULL,
    name VARCHAR(255),
    price varchar (10),
    type varchar (150),
    description varchar (500),
    FOREIGN KEY (users_id) REFERENCES users (id)
  )`);

    console.log("Tablas creadas correctamente");
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
