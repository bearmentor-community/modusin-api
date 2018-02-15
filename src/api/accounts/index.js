const express = require("express")
const router = express.Router()

const controller = require("./controller")
const helpers = require("../../helpers")

router.get("/", helpers.isAuthenticated, controller.get)
router.get("/:id", helpers.isAuthenticated, controller.getById)

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/logout", helpers.isAuthenticated, controller.logout)

module.exports = router
