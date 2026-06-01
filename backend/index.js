const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.FRONTEND_URL || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origen no permitido por CORS"));
  }
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "MercApp API",
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "mongodb" : "json-local"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API MercApp funcionando correctamente"
  });
});

app.use("/productos", require("./routes/products"));
app.use("/auth", require("./routes/auth"));

app.get("/categorias", (req, res) => {
  res.json([
    { id: 1, name: "Tecnologia" },
    { id: 2, name: "Hogar" },
    { id: 3, name: "Gaming" }
  ]);
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB conectado");
    } catch (error) {
      console.error("No se pudo conectar a MongoDB. Se usara JSON local.", error.message);
    }
  } else {
    console.log("MONGODB_URI no configurada. Se usara JSON local.");
  }


 
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

start();
