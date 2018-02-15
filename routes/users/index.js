const express = require("express")
const router = express.Router()

const controller = require("../../controllers/users")
const helpers = require('../../helpers')

router.get("/", helpers.isAuthenticated, controller.getAll)
router.get("/:id", helpers.isAuthenticated, controller.getOne)

router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/logout", controller.logout)

router.post("/test", helpers.isAuthenticated, controller.test)

module.exports = router
