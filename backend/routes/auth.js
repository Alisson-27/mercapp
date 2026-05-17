const express = require("express");
const fs = require("fs");
const router = express.Router();

const FILE = "./users.json";

function read() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// REGISTER
router.post("/register", (req, res) => {
  const users = read();

  const exists = users.find(u => u.email === req.body.email);
  if (exists) return res.json({ error: "Usuario ya existe" });

  users.push(req.body);
  write(users);

  res.json({ message: "Registrado ✅" });
});

// LOGIN
router.post("/login", (req, res) => {
  const users = read();

  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  if (!user) return res.json({ error: "Credenciales incorrectas" });

  res.json({ message: "Login OK", user });
});

module.exports = router;