const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();
const FILE = path.join(__dirname, "..", "products.json");
const isMongoConnected = () => mongoose.connection.readyState === 1;

function read() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function normalizeProduct(data) {
  return {
    nombre: data.nombre,
    precio: Number(data.precio),
    categoryId: Number(data.categoryId) || 1,
    imageUrl: data.imageUrl || ""
  };
}

router.get("/", async (_req, res) => {
  try {
    if (isMongoConnected()) {
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(read().map(normalizeProduct));
      }

      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }

    return res.json(read());
  } catch (_error) {
    return res.status(500).json({ error: "No se pudieron cargar los productos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (isMongoConnected()) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Producto no existe" });
      }

      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no existe" });

      return res.json(product);
    }

    const products = read();
    const product = products.find(p => p.id == req.params.id);

    if (!product) return res.status(404).json({ error: "Producto no existe" });

    return res.json(product);
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo cargar el producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = normalizeProduct(req.body);

    if (!payload.nombre || Number.isNaN(payload.precio)) {
      return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }

    if (isMongoConnected()) {
      const product = await Product.create(payload);
      return res.status(201).json(product);
    }

    const products = read();
    const newProduct = {
      id: Date.now(),
      ...payload
    };

    products.push(newProduct);
    write(products);

    return res.status(201).json(newProduct);
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo crear el producto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = normalizeProduct(req.body);

    if (isMongoConnected()) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Producto no existe" });
      }

      const product = await Product.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true
      });

      if (!product) return res.status(404).json({ error: "Producto no existe" });

      return res.json(product);
    }

    const products = read();
    const index = products.findIndex(p => p.id == req.params.id);

    if (index === -1) return res.status(404).json({ error: "Producto no existe" });

    products[index] = {
      ...products[index],
      ...payload,
      id: products[index].id
    };

    write(products);

    return res.json(products[index]);
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (isMongoConnected()) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "Producto no existe" });
      }

      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Producto no existe" });

      return res.json({ message: "Producto eliminado" });
    }

    const products = read();
    const nextProducts = products.filter(p => p.id != req.params.id);

    if (nextProducts.length === products.length) {
      return res.status(404).json({ error: "Producto no existe" });
    }

    write(nextProducts);

    return res.json({ message: "Producto eliminado" });
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
});

module.exports = router;
