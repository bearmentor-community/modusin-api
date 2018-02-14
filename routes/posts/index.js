const express = require('express')
const router = express.Router()
const postsController = require('../../controllers/posts')

// GET all posts
router.get('/', postsController.list)

module.exports = router;
