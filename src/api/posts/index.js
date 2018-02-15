const express = require("express")
const router = express.Router()

const controller = require("./controller")

const helpers = require("../../helpers")

router.get("/", controller.get)
router.get("/:id", controller.getById)

router.post("/", helpers.isAuthenticated, controller.post)

router.delete("/", controller.delete)
router.delete("/:id", controller.deleteById)

router.put("/:id", helpers.isAuthenticated, controller.putById)

module.exports = router
