const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const { listUsers, addNewUser } = require("./usersControllers");
const { listProducts, addNewProduct } = require("./productsController");

app.use(cors());

app.use(express.json());

// endpoint

app.get("/listUsers", listUsers);
app.get("/listProducts", listProducts);

app.post("/newUser", addNewUser);
app.post("/newProduct", addNewProduct);

//Middleware error
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status();
  res.status(500);
  res.send("Algo salió mal");
});

//Middleware 404
app.use((req, res, next) => {
  res.status(404).send("404: Not found");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
