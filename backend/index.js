const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ESTO ES LO QUE TE FALTA
app.get("/", (req, res) => {
  res.send("🚀 MercApp API funcionando correctamente");
});

// routes
app.use("/productos", require("./routes/products"));
app.use("/auth", require("./routes/auth"));

app.get("/categorias", (req, res) => {
  res.json([
    { id: 1, name: "Tecnología" },
    { id: 2, name: "Hogar" },
    { id: 3, name: "Gaming" }
  ]);
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});