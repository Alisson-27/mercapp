const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();
const FILE = path.join(__dirname, "..", "user.json");
const isMongoConnected = () => mongoose.connection.readyState === 1;

function read() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

router.post("/register", async (req, res) => {
  try {
    const { name = "", email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios" });
    }

    if (isMongoConnected()) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ error: "Usuario ya existe" });

      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      });

      return res.status(201).json({ message: "Usuario registrado", user });
    }

    const users = read();
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(409).json({ error: "Usuario ya existe" });

    const user = {
      id: Date.now(),
      name,
      email,
      password: await bcrypt.hash(password, 10)
    };

    users.push(user);
    write(users);

    const { password: _password, ...safeUser } = user;
    return res.status(201).json({ message: "Usuario registrado", user: safeUser });
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son obligatorios" });
    }

    const user = isMongoConnected()
      ? await User.findOne({ email })
      : read().find(u => u.email === email);

    if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

    const passwordOk = user.password.startsWith("$2")
      ? await bcrypt.compare(password, user.password)
      : user.password === password;

    if (!passwordOk) return res.status(401).json({ error: "Credenciales incorrectas" });

    const safeUser = isMongoConnected() ? user.toJSON() : { ...user };
    delete safeUser.password;

    const token = jwt.sign(
      { id: safeUser.id, email: safeUser.email },
      process.env.JWT_SECRET || "mercapp-dev-secret",
      { expiresIn: "1d" }
    );

    return res.json({ message: "Login OK", token, user: safeUser });
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo iniciar sesion" });
  }
});

module.exports = router;
