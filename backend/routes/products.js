const express = require("express");
const fs = require("fs");
const router = express.Router();

const FILE = "./products.json";

function read() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET ALL
router.get("/", (req, res) => {
  res.json(read());
});

// GET ONE
router.get("/:id", (req, res) => {
  const products = read();
  const product = products.find(p => p.id == req.params.id);

  if (!product) return res.status(404).json({ error: "No existe" });

  res.json(product);
});

// CREATE
router.post("/", (req, res) => {
  const products = read();

  const newProduct = {
    id: Date.now(),
    nombre: req.body.nombre,
    precio: req.body.precio,
    categoryId: req.body.categoryId || 1
  };

  products.push(newProduct);
  write(products);

  res.json(newProduct);
});

// DELETE
router.delete("/:id", (req, res) => {
  let products = read();

  products = products.filter(p => p.id != req.params.id);

  write(products);

  res.json({ message: "Eliminado ✅" });
});

module.exports = router;