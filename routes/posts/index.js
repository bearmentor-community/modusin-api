const express = require('express')
const router = express.Router()
const postsController = require('../../controllers/posts')
const helpers = require('../../helpers')

// GET all posts
router.get('/', postsController.list)

module.exports = router;
