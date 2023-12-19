const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/index.html"))
);

router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/login.html"))
);

router.get("/dashboard-home", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/dashboard-home.html"))
);

router.get("/dashboard-clientes", (req, res) =>
res.sendFile(path.join(__dirname + "../../views/dashboard-clients.html"))
);

router.get("/dashboard-reservaciones", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/dashboard-reservations.html"))
);

router.get("/dashboard-usuarios", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/dashboard-users.html"))
);

module.exports = router;
