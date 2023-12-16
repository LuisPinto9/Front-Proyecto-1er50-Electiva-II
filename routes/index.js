const router = require("express").Router()

const path = require("path")

router.get("/", (req, res)=> res.sendFile(path.join(__dirname + "../../views/index.html")))
router.get("/login", (req, res)=> res.sendFile(path.join(__dirname + "../../views/login.html")))
router.get("/tabla", (req, res)=> res.sendFile(path.join(__dirname + "../../views/dashboard-clients.html")))
// router.get("/add", (req, res)=> res.sendFile(path.join(__dirname + "../../views/dashboard-clients.html")))


module.exports = router