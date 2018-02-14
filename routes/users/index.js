var express = require('express');
var router = express.Router();
const usersController = require('../../controllers/users')

// GET all users
router.get('/', usersController.list)

module.exports = router;
